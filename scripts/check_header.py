"""Run: python scripts/check_header.py. No external requests or messages are sent."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = 'http://localhost:5173'
OUT = Path(os.environ['TEMP']) / 'barori-header'
OUT.mkdir(exist_ok=True)
ROUTES = ['/', '/dostavka/', '/eda/', '/taxi/', '/smena/', '/tariffs/', '/info/']

with sync_playwright() as p:
    for engine in ['chromium', 'webkit']:
        browser = getattr(p, engine).launch()
        for width in [320, 390, 768, 1024, 1199, 1200, 1280, 1440]:
            page = browser.new_page(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
            page.route('**/*', lambda r: r.continue_() if r.request.url.startswith(BASE) else r.abort())
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            for route in (ROUTES if width in [390, 1280] else ['/']):
                page.goto(BASE + route)
                page.locator('h1').wait_for()
                header = page.locator('.classic-header')
                expect(header).to_have_count(1)
                shell = header.evaluate("""(el) => {
                    const row = el.querySelector('.classic-header__row');
                    const box = row.getBoundingClientRect();
                    return {
                        background: getComputedStyle(el).backgroundColor,
                        rowTop: box.top,
                        rowLeft: box.left,
                        rowRight: box.right,
                        radius: parseFloat(getComputedStyle(row).borderTopLeftRadius),
                    };
                }""")
                assert shell['background'] in ['rgba(0, 0, 0, 0)', 'transparent'], (engine, width, route, 'header shell is opaque')
                assert shell['rowTop'] >= 6, (engine, width, route, 'capsule touches top edge')
                assert shell['rowLeft'] >= 8 and shell['rowRight'] <= width - 8, (engine, width, route, 'capsule touches side edge')
                assert shell['radius'] >= 24, (engine, width, route, 'capsule is not rounded')
                if width >= 1200:
                    nav_style = header.locator('.classic-header__desktop-nav').evaluate("""(el) => ({
                        background: getComputedStyle(el).backgroundColor,
                        radius: parseFloat(getComputedStyle(el).borderTopLeftRadius),
                    })""")
                    assert nav_style['background'] not in ['rgba(0, 0, 0, 0)', 'transparent'], (engine, width, route, 'desktop nav has no capsule')
                    assert nav_style['radius'] >= 20, (engine, width, route, 'desktop nav is not rounded')
                    centers = header.evaluate("""(el) => {
                        const row = el.querySelector('.classic-header__row').getBoundingClientRect();
                        const nav = el.querySelector('.classic-header__desktop-nav').getBoundingClientRect();
                        return { row: (row.left + row.right) / 2, nav: (nav.left + nav.right) / 2 };
                    }""")
                    assert abs(centers['row'] - centers['nav']) <= 1, (engine, width, route, 'desktop nav is not centered')
                assert header.evaluate('(el) => el.getBoundingClientRect().height <= 85'), (engine, width, route, 'too tall')
                assert header.locator('.classic-header__row').evaluate('(el) => el.scrollWidth <= el.clientWidth'), (engine, width, route, 'overflow')
                boxes = header.locator('.classic-header__row > *:visible').evaluate_all('(els) => els.map(el => {const b=el.getBoundingClientRect();return {left:b.left,right:b.right}})')
                assert all(a['right'] <= b['left'] + 1 for a,b in zip(boxes, boxes[1:])), (engine,width,route,'overlap')
                expected_phone = '+79219000997' if route in ['/', '/smena/', '/info/'] else '+79990330037'
                assert header.locator('a[href^="tel:"]').first.get_attribute('href') == 'tel:' + expected_phone
                phone_characters = header.locator('.classic-header__phone-character')
                assert phone_characters.count() > 0, (engine, width, route, 'phone characters are not animated individually')
                assert phone_characters.first.evaluate('(el) => getComputedStyle(el).animationName') == 'none', (engine, width, route, 'reduced motion does not stop phone animation')
                assert header.locator('.classic-header__cta').first.evaluate("(el) => getComputedStyle(el, '::after').animationName") == 'none', (engine, width, route, 'reduced motion does not stop CTA animation')
                if width < 1200:
                    trigger = page.get_by_role('button', name='Открыть меню', exact=True)
                    trigger.click()
                    panel = page.locator('#site-menu')
                    expect(panel).to_be_visible()
                    for path in ROUTES:
                        expect(panel.locator(f'nav a[href="{path}"]')).to_be_visible()
                    expect(panel.get_by_role('link', name='Telegram', exact=True)).to_be_visible()
                    page.keyboard.press('Escape')
                    expect(panel).to_have_count(0)
                    expect(trigger).to_be_focused()
                else:
                    header.locator('summary').filter(has_text='Направления').click()
                    expect(header.locator('a[href="/eda/"]')).to_be_visible()
                    page.keyboard.press('Escape')
                    expect(header.locator('details[open]')).to_have_count(0)
                    header.get_by_label('Способы связи', exact=True).click()
                    expect(header.get_by_role('link', name='Telegram', exact=True)).to_be_visible()
                    expect(header.get_by_role('link', name='ВКонтакте', exact=True)).to_be_visible()
                    expect(header.get_by_role('link', name='MAX', exact=True)).to_be_visible()
                    page.keyboard.press('Escape')
                    header.get_by_role('button', name='База знаний', exact=True).click()
                    expect(page.locator('dialog[open]')).to_be_visible()
                    page.keyboard.press('Escape')
                    expect(page.locator('dialog[open]')).to_have_count(0)
                assert not errors, errors
                if width in [390, 1280]:
                    page.screenshot(path=str(OUT / f'{engine}-{width}-{route.strip("/") or "home"}.png'))
            print(engine, width, 'PASS', flush=True)
            page.close()
        motion_page = browser.new_page(viewport={'width': 1280, 'height': 900}, reduced_motion='no-preference')
        motion_page.goto(BASE)
        motion_page.locator('h1').wait_for()
        motion_header = motion_page.locator('.classic-header')
        assert motion_header.locator('.classic-header__phone-icon').evaluate('(el) => getComputedStyle(el).animationName') == 'classic-phone-ring', (engine, 'phone icon animation missing')
        assert motion_header.locator('.classic-header__phone-character').first.evaluate('(el) => getComputedStyle(el).animationName') == 'classic-phone-character-wave', (engine, 'phone character animation missing')
        assert motion_header.locator('.classic-header__cta').first.evaluate("(el) => getComputedStyle(el, '::after').animationName") == 'classic-cta-wave', (engine, 'CTA wave animation missing')
        motion_page.close()
        browser.close()
