"""Run: python scripts/check_site.py [--baseline] [--capture]. Requires Playwright browsers."""
import json
import os
import sys
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('SITE_URL', 'http://localhost:5173')
ROUTES = ['/', '/dostavka/', '/eda/', '/taxi/', '/smena/', '/tariffs/', '/info/']
OUTPUT = Path(os.environ.get('TEMP', '.')) / 'barori-site-check'
OUTPUT.mkdir(exist_ok=True)
baseline = '--baseline' in sys.argv
capture = '--capture' in sys.argv

with sync_playwright() as p:
    for engine in (['chromium'] if baseline else ['chromium', 'webkit']):
        browser = getattr(p, engine).launch()
        for width, height in ([(1440, 900)] if baseline else [(320, 700), (375, 812), (390, 844), (844, 390), (768, 1024), (1024, 768), (1440, 900)]):
            context = browser.new_context(viewport={'width': width, 'height': height}, reduced_motion='reduce', has_touch=width < 1024)
            # No analytics, maps, captcha or external messages during automated checks.
            context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(BASE) else route.abort())
            page = context.new_page()
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            for route in ROUTES:
                response = page.goto(BASE + route)
                page.wait_for_load_state('networkidle')
                page.locator('h1').wait_for()
                if route == '/':
                    page.locator('#vacancies').wait_for(state='attached')
                    page.get_by_text('Отзывы сотрудников', exact=True).wait_for(state='attached')
                    page.get_by_text('Всё под контролем', exact=True).wait_for(state='attached')
                text = page.locator('main').text_content()
                snapshot = OUTPUT / ((route.strip('/') or 'home') + '.txt')
                if baseline:
                    snapshot.write_text(text, encoding='utf-8')
                    continue
                assert response.ok, (engine, width, route, response.status)
                assert page.locator('h1').count() == 1, (route, 'h1')
                # The home hero counts to 200,000; /tariffs/ previously mounted the home App by mistake.
                normalize = lambda value: re.sub(r'(с доходом до )[\d\s\u00a0]+ ₽', r'\1[animated] ₽', value)
                if route != '/tariffs/' and snapshot.exists():
                    assert normalize(text) == normalize(snapshot.read_text(encoding='utf-8')), (route, 'content changed')
                if capture:
                    continue
                nav = page.locator('footer nav[aria-label="Разделы сайта"]')
                if width < 1200:
                    page.get_by_role('button', name='Открыть меню', exact=True).click()
                    assert page.locator('#site-menu').is_visible(), (route, 'mobile menu hidden')
                else:
                    assert page.locator('header nav[aria-label="Основная навигация"]').is_visible(), (route, 'desktop navigation hidden')
                assert nav.is_visible(), (route, 'navigation hidden')
                assert nav.locator('a').evaluate_all('(links) => links.map(a => a.getAttribute("href"))') == ROUTES
                assert nav.locator('[aria-current="page"]').get_attribute('href') == route
                if width < 1200:
                    page.keyboard.press('Escape')
                    page.locator('#site-menu').wait_for(state='detached')
                dimensions = page.evaluate('({width:innerWidth, doc:document.documentElement.scrollWidth})')
                assert dimensions['doc'] <= dimensions['width'] + 1, (engine, width, route, dimensions)
                header_card = page.locator('.classic-header__row')
                assert header_card.evaluate('(el) => el.scrollWidth <= el.clientWidth + 1'), (engine, width, route, 'header overflow')
                # Every local hash points at a real destination; all internal pages exist.
                for href in page.locator('a[href]').evaluate_all('(links) => [...new Set(links.map(a=>a.getAttribute("href")))]'):
                    if href.startswith('#') and len(href) > 1:
                        assert page.locator('[id="' + href[1:] + '"]').count(), (route, 'broken anchor', href)
                if width in [375, 1440]:
                    page.screenshot(path=str(OUTPUT / f'{engine}-{width}-{route.strip("/") or "home"}.png'))
                assert not errors, (route, errors)
            print(engine, width, 'PASS', flush=True)
            context.close()
        browser.close()
