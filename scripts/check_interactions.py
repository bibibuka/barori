"""Run: python scripts/check_interactions.py. Local mocked submissions only."""
import os
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('SITE_URL', 'http://localhost:5173')
ROUTES = ['/', '/dostavka/', '/eda/', '/taxi/', '/smena/', '/tariffs/', '/info/']
CAPTCHA = """(() => {
  const widgets = new Map(); let next = 0;
  window.__captchaMode = 'success';
  window.smartCaptcha = {
    render: (id, opts) => { widgets.set(++next, {opts, events: {}}); return next; },
    subscribe: (id, name, cb) => { widgets.get(id).events[name] = cb; return () => {}; },
    execute: id => {
      const w = widgets.get(id);
      if(window.__captchaMode === 'cancel') w.events['challenge-hidden']();
      else w.opts.callback('test-token-not-valid-on-real-server');
    }, reset: () => {}, destroy: id => widgets.delete(id)
  };
})();"""

with sync_playwright() as p:
    for engine in ['chromium', 'webkit']:
        browser = getattr(p, engine).launch()
        for width in [375, 1440]:
            context = browser.new_context(viewport={'width': width, 'height': 900}, reduced_motion='reduce')
            context.add_init_script(CAPTCHA)
            response = {'body': '{"error":true,"message":"Test rejection"}'}
            requests = []
            def route_request(route):
                url = route.request.url
                if url == BASE + '/local/tools/form-handler.php':
                    requests.append(route.request.post_data)
                    route.fulfill(status=200, content_type='application/json', body=response['body'])
                elif url.startswith(BASE):
                    route.continue_()
                else:
                    route.abort()
            context.route('**/*', route_request)
            page = context.new_page()
            page.set_default_timeout(8000)
            for path in ROUTES:
                page.goto(BASE + path)
                page.wait_for_load_state('networkidle')
                page.locator('h1').wait_for()
                consent = page.get_by_role('button', name='Только необходимые', exact=True)
                if consent.is_visible(): consent.click()
                # Native modal focus containment, Escape, restoration and scroll unlocking.
                opener = page.get_by_role('button', name='Публичная оферта', exact=True).first
                opener.focus()
                opener.press('Enter')
                modal = page.locator('dialog[open]')
                expect(modal).to_be_visible()
                page.keyboard.press('Shift+Tab')
                assert modal.evaluate('(el) => el.contains(document.activeElement) || document.activeElement === document.body'), (path, 'focus escaped')
                page.keyboard.press('Tab')
                page.keyboard.press('Escape')
                expect(modal).to_have_count(0)
                expect(opener).to_be_focused()
                assert page.evaluate('document.body.style.overflow') != 'hidden'

                if path == '/' and width == 375:
                    menu_button = page.get_by_role('button', name='Открыть меню', exact=True)
                    menu_button.click()
                    expect(page.locator('#site-menu')).to_be_visible()
                    page.keyboard.press('Escape')
                    expect(page.locator('#site-menu')).to_have_count(0)
                    menu_button.click()
                    page.locator('#site-menu').get_by_role('button', name='База знаний', exact=True).click()
                    expect(page.locator('dialog[open]')).to_be_visible()
                    page.keyboard.press('Escape')
                    expect(page.locator('dialog[open]')).to_have_count(0)
                    page.wait_for_function('document.body.style.overflow !== "hidden"')
                    assert page.evaluate('document.body.style.overflow') != 'hidden'

                if path != '/info/':
                    form = page.locator('main form').first
                    names = form.locator('input[type="text"]')
                    for i in range(names.count()):
                        names.nth(i).fill('Тестовый Пользователь' if i == 0 else 'Санкт-Петербург')
                    phone = form.locator('input[type="tel"]')
                    phone.fill('+79990000000')
                    for select in form.locator('select').all():
                        options = select.locator('option').evaluate_all('(opts) => opts.filter(o=>o.value).map(o=>o.value)')
                        select.select_option(options[0])
                    for radio_name in form.locator('input[type="radio"]').evaluate_all('(els)=>[...new Set(els.map(e=>e.name))]'):
                        if radio_name == 'status': continue
                        radio = form.locator(f'input[type="radio"][name="{radio_name}"]').first
                        radio.locator('..').click()
                        expect(radio).to_be_checked()
                    consent = form.locator('input[type="checkbox"]').first
                    # No consent: no network submission.
                    before = len(requests)
                    form.evaluate('(form) => form.requestSubmit()')
                    page.wait_for_timeout(100)
                    assert len(requests) == before, (path, 'submitted without consent')
                    consent.check()
                    button = form.locator('button[type="submit"]')
                    # Closing CAPTCHA lets the user retry.
                    page.evaluate("window.__captchaMode = 'cancel'")
                    button.click()
                    expect(button).to_be_enabled()
                    assert len(requests) == before
                    page.evaluate("window.__captchaMode = 'success'")
                    # HTTP 200 with rejection must preserve input.
                    response['body'] = '{"error":true,"message":"Test rejection"}'
                    button.click()
                    expect(button).to_be_enabled()
                    assert len(requests) == before + 1, (path, 'no request', page.locator('[role="alert"]').all_text_contents())
                    expect(names.first).to_have_value('Тестовый Пользователь')
                    expect(phone).to_have_value('+79990000000')
                    # Explicit acceptance is the only path that clears input.
                    response['body'] = '{"success":true}'
                    button.click()
                    expect(names.first).to_have_value('')
                    expect(phone).to_have_value('')
                    assert len(requests) == before + 2
                    assert 'test-token-not-valid-on-real-server' in requests[-1]
                if path in ['/tariffs/', '/taxi/']:
                    slider = page.get_by_role('slider').first
                    previous = slider.input_value()
                    slider.focus()
                    slider.press('ArrowRight')
                    assert slider.input_value() != previous
                    faq = page.locator('main details').first
                    faq.locator('summary').click()
                    expect(faq).to_have_attribute('open', '')
                    if path == '/tariffs/':
                        toggle = page.get_by_role('button', name='Парковый сотрудник', exact=False).first
                        toggle.click()
                        expect(toggle).to_have_attribute('aria-pressed', 'true')
                print(engine, width, path, 'interactions PASS', flush=True)

            # Follow links rather than only loading URLs, then exercise browser history.
            for path in ROUTES:
                nav = page.locator('footer nav[aria-label="Разделы сайта"]')
                nav.locator(f'a[href="{path}"]').click()
                page.wait_for_url(BASE + path)
                expect(page.locator('h1')).to_be_visible()
            page.go_back()
            page.wait_for_url(BASE + '/tariffs/')
            page.reload()
            expect(page.get_by_role('heading', level=1)).to_contain_text('ТАРИФЫ')
            context.close()
        browser.close()
