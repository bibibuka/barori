"""Local audit regression checks. All form POSTs and captcha calls are mocked.
Run with the preview already running: python scripts/check_audit.py
"""
from email.parser import BytesParser
from email.policy import default
from pathlib import Path
import re
from playwright.sync_api import sync_playwright, expect

BASE = 'http://127.0.0.1:5173'
OUT = Path('.tmp/qa')
OUT.mkdir(parents=True, exist_ok=True)
CAPTCHA = '''window.smartCaptcha = {
  render: function(el, options) { this.callback = options.callback; return 1; },
  subscribe: function() {}, destroy: function() {}, reset: function() {},
  execute: function() { setTimeout(() => this.callback('local-qa-token'), 0); }
};'''

def parse_form(request):
    header = ('Content-Type: ' + request.headers['content-type'] + '\r\n\r\n').encode()
    message = BytesParser(policy=default).parsebytes(header + request.post_data_buffer)
    return {part.get_param('name', header='content-disposition'): part.get_payload(decode=True).decode('utf-8') for part in message.iter_parts()}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
    requests, errors = [], []
    accepted = [True]

    def route_request(route):
        request = route.request
        if request.url.endswith('/local/tools/form-handler.php'):
            requests.append(parse_form(request))
            route.fulfill(status=200, content_type='application/json', body='{"success":true}' if accepted[0] else '{"success":false}')
        elif 'smartcaptcha.yandexcloud.net/captcha.js' in request.url:
            route.fulfill(status=200, content_type='application/javascript', body=CAPTCHA)
        elif request.url.startswith(BASE):
            route.continue_()
        else:
            route.abort()

    context.route('**/*', route_request)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE, wait_until='networkidle')
    page.get_by_role('button', name='Только необходимые').click(timeout=10000)
    expect(page.locator('main > section')).to_have_count(11)
    expect(page.locator('#faq + #order')).to_have_count(1)
    expect(page.locator('#vacancies a')).to_have_count(4)
    assert [link.get_attribute('href') for link in page.locator('#vacancies a').all()] == ['/dostavka/', '/smena/', '/taxi/', '/eda/']
    page.locator('#faq summary').first.click()
    expect(page.locator('#faq details').first).to_have_attribute('open', '')

    calc = page.locator('#calculator')
    expect(calc.locator('table')).to_have_count(0)
    expect(calc.locator('output')).to_have_text(re.compile(r'135\s800 ₽'))
    slider = calc.get_by_role('slider', name='Доход в месяц')
    slider.fill('200000')
    expect(calc.locator('output')).to_have_text(re.compile(r'194\s000 ₽'))
    calc.get_by_role('button', name='Яндекс Еда', exact=True).click()
    expect(calc.locator('output')).to_have_text(re.compile(r'190\s000 ₽'))
    calc.get_by_role('button', name=re.compile('Парковый сотрудник')).click()
    expect(calc.get_by_role('button', name='Такси', exact=True)).to_have_count(0)
    expect(calc.locator('output')).to_have_text(re.compile(r'186\s000 ₽'))
    calc.get_by_role('button', name='Яндекс Смена', exact=True).click()
    expect(calc.locator('output')).to_have_text(re.compile(r'192\s000 ₽'))
    print('PASS: block order, direction links, FAQ and calculator arithmetic')

    reviews = page.locator('#reviews')
    reviews.scroll_into_view_if_needed()
    expect(reviews.locator('.swiper-slide')).to_have_count(10)
    expect(reviews.get_by_role('link')).to_have_attribute('href', 'https://yandex.ru/maps/org/barori_park/70152279860/reviews/')
    reviews.get_by_role('button', name='Включить автопрокрутку').click()
    page.mouse.move(0, 0)
    initial = reviews.locator('.swiper').evaluate('(el) => el.swiper.realIndex')
    page.wait_for_function('(start) => document.querySelector("#reviews .swiper").swiper.realIndex !== start', arg=initial, timeout=9000)
    reviews.get_by_role('button', name='Приостановить автопрокрутку').click()
    assert not reviews.locator('.swiper').evaluate('(el) => el.swiper.autoplay.running')
    print('PASS: all 10 reviews, Yandex link, autoplay and pause')

    form = page.locator('#add-job')
    form.scroll_into_view_if_needed()
    direction = form.locator('#contact-direction')
    preference = form.locator('#contact-preference')
    expected = {
      'delivery': ['Пешком', 'Вело или самокат', 'Автомобиль', 'Пока не решил'],
      'smena': ['Любые доступные', 'Сборка', 'Касса', 'Склад и выкладка', 'Кухня', 'Клининг'],
      'taxi': ['На своём автомобиле', 'Нужна аренда', 'Пока не решил'],
      'eda': ['Пешком', 'Вело или самокат', 'Автомобиль', 'Пока не решил'],
    }
    for key, options in expected.items():
        direction.select_option(key)
        assert preference.locator('option').all_text_contents() == options
    form.locator('input[name="additionalDirections"][value="taxi"]').check()
    direction.select_option('taxi')
    expect(form.locator('input[name="additionalDirections"][value="taxi"]')).to_have_count(0)
    form.locator('input[name="additionalDirections"][value="smena"]').check()
    form.locator('input[name="additionalDirections"][value="eda"]').check()
    preference.select_option('rental')
    form.locator('#contact-name').fill('Тест формы')
    form.locator('#contact-city').fill('Москва')
    form.locator('#contact-phone').fill('+7 (999) 000-00-00')
    form.locator('#contact-message').fill('Только локальная проверка')
    expect(form.get_by_role('button', name='Отправить заявку')).to_be_disabled()
    form.locator('#consent').check()
    expect(form.locator('input[type="email"], [name="marketingConsent"]')).to_have_count(0)
    form.get_by_role('button', name='Отправить заявку').click()
    expect(page.get_by_text('Спасибо за заявку! Наш оператор свяжется с вами в ближайшее время!', exact=True)).to_be_visible()
    assert len(requests) == 1
    data = requests[-1]
    assert data['status'] == 'Хочу устроиться'
    assert data['department'] == 'Яндекс Такси' and data['position'] == 'Водитель такси'
    assert 'Нужна аренда' in data['message'] and 'Курьер Яндекс Еды' in data['message']
    assert 'email' not in data and 'marketing_consent' not in data
    assert data['soglasie'] == 'Y' and data['smart-token'] == 'local-qa-token'
    expect(form.locator('#consent')).not_to_be_checked()
    print('PASS: dynamic choices, multi-select, consent and captured applicant payload')

    # Existing-worker inquiries keep their legacy routing and do not submit hidden selections.
    form.get_by_text('Да, уже работаю', exact=True).click()
    form.locator('#contact-name').fill('Тест поддержки')
    form.locator('#contact-city').fill('Санкт-Петербург')
    form.locator('#contact-phone').fill('+7 (999) 000-00-00')
    form.locator('#contact-department').select_option('Купер')
    form.locator('#contact-problem').fill('Локальная проверка обращения')
    form.locator('#consent').check()
    accepted[0] = False
    form.get_by_role('button', name='Отправить заявку').click()
    expect(page.get_by_text('Что-то пошло не так, попробуйте позже.', exact=True)).to_be_visible()
    assert len(requests) == 2
    data = requests[-1]
    assert data['status'] == 'Я уже работаю' and data['department'] == 'Купер'
    assert 'Локальная проверка обращения' in data['problem']
    assert 'email' not in data and 'marketing_consent' not in data
    assert data['additional_directions'] == ''
    expect(form.locator('#contact-name')).to_have_value('Тест поддержки')
    print('PASS: support routing and rejected server response')

    # Each landing retains its own FAQ/form while sharing the same footer.
    for path in ['/', '/dostavka/', '/eda/', '/taxi/', '/smena/', '/tariffs/', '/info/']:
        page.goto(BASE + path, wait_until='networkidle')
        expect(page.locator('footer.site-footer')).to_have_count(1)
        expect(page.locator('footer a[href="tel:+79219000997"]')).to_have_count(1)
        expect(page.locator('footer a[href="tel:+79990330037"]')).to_have_count(1)
        if path != '/info/':
            assert page.evaluate('document.querySelector("#faq").compareDocumentPosition(document.querySelector("#order")) & Node.DOCUMENT_POSITION_FOLLOWING')
        for width in [1440, 390, 320]:
            page.set_viewport_size({'width': width, 'height': 900})
            page.wait_for_function('document.documentElement.scrollWidth <= innerWidth', timeout=3000)
        print('PASS: responsive page and footer', path)
    assert not errors, errors
    print('PASS: no browser runtime errors; all form requests were intercepted locally')
    browser.close()
