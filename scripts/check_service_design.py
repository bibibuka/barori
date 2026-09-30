"""Visual/content checks for service pages. Run against the local Vite server.

python scripts/check_service_design.py --baseline
python scripts/check_service_design.py
External services are blocked; this audit never sends production leads.
"""
import json
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('SITE_URL', 'http://127.0.0.1:5174')
OUT = Path('.tmp/service-design')
OUT.mkdir(parents=True, exist_ok=True)
ROUTES = ['/dostavka/', '/smena/', '/taxi/', '/eda/', '/tariffs/', '/info/']
BASELINE = '--baseline' in sys.argv
QUICK = '--quick' in sys.argv

with sync_playwright() as p:
    for engine in (['chromium'] if BASELINE or QUICK else ['chromium', 'webkit']):
        browser = getattr(p, engine).launch(headless=True)
        widths = [1440] if BASELINE else ([390, 1440] if QUICK else [320, 390, 768, 1024, 1440])
        for width in widths:
            context = browser.new_context(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
            context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(BASE) else route.abort())
            context.add_init_script("localStorage.setItem('barori_cookie_consent', 'declined')")
            page = context.new_page()
            page.set_default_timeout(10000)
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            for path in ((['/'] + ROUTES) if BASELINE or QUICK else ROUTES):
                slug = path.strip('/') or 'home'
                response = page.goto(BASE + path, wait_until='networkidle')
                page.locator('h1').wait_for()
                page.evaluate('document.fonts.ready')
                if page.get_by_role('button', name='Только необходимые', exact=True).is_visible():
                    page.get_by_role('button', name='Только необходимые', exact=True).click()
                if BASELINE:
                    data = {'text': page.locator('main').text_content(),
                            'links': page.locator('main a[href]').evaluate_all('(els) => els.map(e => e.getAttribute("href"))'),
                            'images': page.locator('main img').evaluate_all('(els) => els.map(e => e.getAttribute("src"))')}
                    (OUT / f'before-{slug}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
                    page.screenshot(path=str(OUT / f'before-{slug}.png'))
                    continue
                assert response.ok, (path, response.status)
                assert page.locator('h1').count() == 1, (path, 'heading count')
                dimensions = page.evaluate('({width:innerWidth, doc:document.documentElement.scrollWidth, body:document.body.scrollWidth})')
                assert dimensions['doc'] <= width + 1 and dimensions['body'] <= width + 1, (engine, width, path, 'overflow', dimensions)
                assert page.locator('.classic-header__row').evaluate('(e) => e.scrollWidth <= e.clientWidth + 1'), (engine, width, path, 'header overflow')
                if path != '/':
                    assert page.locator('.service-site').count() == 1
                    for href in page.locator('main a[href^="#"]').evaluate_all('(els) => [...new Set(els.map(e => e.getAttribute("href")))]'):
                        assert href == '#' or page.locator(f'[id="{href[1:]}"]').count(), (path, 'missing anchor', href)
                    if width < 1200:
                        page.get_by_role('button', name='Открыть меню', exact=True).click()
                        assert page.locator('#site-menu').is_visible()
                        assert page.locator('#site-menu .site-links a').count() == 7
                        page.keyboard.press('Escape')
                        page.locator('#site-menu').wait_for(state='detached')
                    else:
                        page.locator('.classic-header__desktop-nav summary').click()
                        assert page.locator('.classic-header__desktop-nav details[open] a').count() == 5
                        page.keyboard.press('Escape')
                    assert page.locator('footer .site-links [aria-current="page"]').get_attribute('href') == path
                # Reveal lazy sections before full-page captures.
                for y in range(0, page.locator('body').bounding_box()['height'].__ceil__(), 650):
                    page.evaluate('(y) => window.scrollTo(0, y)', y)
                    page.wait_for_timeout(40)
                page.evaluate('window.scrollTo(0,0)')
                page.wait_for_timeout(650)
                page.wait_for_function('Array.from(document.querySelectorAll("main img")).filter(e => e.src.startsWith(location.origin)).every(e => e.complete && e.naturalWidth > 0)')
                if width in [390, 1440]:
                    page.screenshot(path=str(OUT / f'{engine}-{width}-{slug}.png'), full_page=True)
                    page.screenshot(path=str(OUT / f'{engine}-{width}-{slug}-hero.png'))
                broken = page.locator('main img').evaluate_all('(els) => els.filter(e => e.src.startsWith(location.origin) && (!e.complete || e.naturalWidth === 0)).map(e => e.src)')
                assert not broken, (path, 'broken images', broken)
                assert not errors, (path, errors)
                print(engine, width, slug, 'PASS', flush=True)
            context.close()
        browser.close()
