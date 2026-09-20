# Миграция на целевой многостраничный сайт — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Цель:** превратить текущую техническую MPA-сборку в полноценный многостраничный сайт, где главная работает как хаб, а Еда, такси, доставка и Смена имеют собственные индексируемые целевые лендинги. Все существующие пользовательские тексты должны сохраниться дословно хотя бы на одном публичном URL.

**Архитектура:** сохранить текущие семь HTML-входов Vite и обычные ссылки между страницами. Не добавлять React Router и новые зависимости. Сначала закрепить текстовый baseline, затем разнести смешанный контент по владельцам, открыть целевые страницы для индексации и только после этого удалить дубли с главной.

**Стек:** Vite 7, React 19, TypeScript, Tailwind CSS 4, Node test runner, Python Playwright.

## Целевая карта страниц

| URL | Роль | Содержимое после миграции |
|---|---|---|
| `/` | Корпоративный хаб | Общее предложение Барори Парк, краткие преимущества, каталог направлений/вакансий, партнёры, отзывы, общий процесс, общая форма и контакты. |
| `/dostavka/` | Таргет: доставка | Пешая, вело/самокат, экспресс, плановая и грузовая доставка; без текстов про доставку еды. |
| `/eda/` | Таргет: Яндекс Еда | Форматы передвижения, слоты, зоны, оформление и две существующие точки заявки. |
| `/taxi/` | Таргет: такси | Требования к водителю, подключение, доходный калькулятор, документы, выплаты, FAQ и заявка. |
| `/smena/` | Таргет: смены | Виды смен, длительность, кому подходит, оформление, честные ограничения, поддержка, FAQ и заявка. |
| `/tariffs/` | Тарифы | Единственный полный экземпляр тарифной таблицы и калькулятора комиссий. |
| `/info/` | Условия | Юридические и операционные условия для исполнителей. |

## Обязательные ограничения

- Не менять формулировки существующих текстов во время переноса. Редактура — отдельная задача после приёмки миграции.
- Не менять публичные URL и hash-якоря форм без необходимости.
- Не объединять Еду с общей доставкой: это два разных пользовательских намерения.
- Не добавлять роутер, CMS или новую библиотеку компонентов.
- План исходит из того, что четыре целевых лендинга становятся постоянными страницами сайта и должны индексироваться. Если они должны остаться только рекламными `noindex`-страницами, SEO-задачу 2 нужно отменить до начала реализации.

## Задача 1. Закрепить сохранность текста

**Файлы:**

- Create: `docs/content/multipage-copy-map.md`
- Create: `scripts/fixtures/site-copy.json`
- Modify: `scripts/check_site.py`
- Modify: `package.json`

**Шаги:**

1. В Playwright собрать из каждого `main` текст узлов `h1–h6`, `p`, `li`, `summary`, `label`, `button` и содержательных ссылок.
2. Нормализовать только пробелы и документированные динамические значения счётчиков/калькулятора. Не исправлять орфографию и не перефразировать строки.
3. Сохранить уникальные строки с исходным URL в `scripts/fixtures/site-copy.json`.
4. В `docs/content/multipage-copy-map.md` назначить каждому блоку целевую страницу. Отдельно перечислить смешанные блоки `Tariffs`, `SeoLandingContent`, `Schedule` и карточки `Vacancies`.
5. Добавить режим проверки, который собирает текст всех семи страниц и падает, если хотя бы одна baseline-строка отсутствует на всём сайте. Дубли разрешено удалять, если строка остаётся на другом URL.
6. Добавить `npm run check:content`, вызывающий эту проверку.

**Проверка:**

```powershell
npm run check:content
```

Ожидаемый результат: все исходные строки найдены, отчёт показывает 7 проверенных URL и 0 потерянных строк.

## Задача 2. Сделать целевые лендинги полноценными страницами сайта

**Файлы:**

- Modify: `dostavka/index.html`
- Modify: `eda/index.html`
- Modify: `taxi/index.html`
- Modify: `smena/index.html`
- Modify: `public/sitemap.xml`
- Modify: `src/landing/metadata.test.ts`
- Modify: `src/dostavka/metadata.test.ts`
- Modify: `src/eda/metadata.test.ts`

**Шаги:**

1. Заменить `noindex, nofollow` на `index, follow, max-image-preview:large`.
2. Добавить self-referencing canonical на каждый из четырёх URL.
3. Сохранить существующие `title`, description, Open Graph и Twitter-тексты без редакторских изменений.
4. Добавить четыре URL в sitemap с актуальным `lastmod`; оставить только канонические URL со слешем в конце.
5. Переписать тест, который сейчас специально требует `noindex`, на проверку `index`, canonical и наличия URL в sitemap.
6. Расширить единый metadata-тест так, чтобы такси и Смена проверялись наравне с доставкой и Едой.

**Проверка:**

```powershell
npm test
```

Ожидаемый результат: семь страниц имеют корректный статус индексации; четыре target URL присутствуют в sitemap.

## Задача 3. Связать главную с целевыми страницами

**Файлы:**

- Modify: `src/components/Vacancies.tsx`
- Modify: `src/components/YandexEda.test.ts`
- Create: `src/components/VacancyRoutes.test.ts`
- Modify: `package.json`
- Modify: `src/components/SiteNavigation.tsx` только если карта ссылок из задачи 1 выявит расхождение

**Шаги:**

1. Добавить `href="/smena/#order"` карточке `yandex-smena`.
2. Добавить `href="/taxi/#order"` карточке `taxi-driver`.
3. Направить `cargo-delivery`, `express-delivery` и `planned-delivery` на релевантные секции `/dostavka/`; при отсутствии стабильных секционных id сначала добавить id в существующие секции, не менять их текст.
4. Сохранить `/eda/#apply` для карточки Яндекс Еды.
5. Оставить modal только у вакансий, для которых нет отдельной страницы.
6. Проверить, что header и footer с любой страницы дают один клик до каждого из четырёх направлений.

**Проверка:**

```powershell
npm test
python scripts/check_interactions.py
```

Ожидаемый результат: четыре направления открывают свои URL, остальные вакансии продолжают открывать modal.

## Задача 4. Убрать конкуренцию главной с `/tariffs/`

**Файлы:**

- Modify: `src/App.tsx`
- Modify: `src/tariffs/TariffsLanding.tsx`
- Modify: `scripts/fixtures/site-copy.json` только через утверждённую команду переснятия baseline после успешной проверки старого baseline

**Шаги:**

1. Убедиться, что все строки компонента `Tariffs` уже присутствуют на `/tariffs/`.
2. Удалить статический импорт и рендер `<Tariffs />` из главной.
3. Оставить на главной существующие ссылки на `/tariffs/` в header и добавить один короткий CTA из подходящего существующего блока без нового маркетингового текста.
4. Не менять сам компонент тарифов и не дублировать его данные в новом компоненте.

**Проверка:**

```powershell
npm run check:content
npm run build
```

Ожидаемый результат: тарифные тексты найдены на `/tariffs/`, главная больше не загружает chunk `Tariffs-*` на старте.

## Задача 5. Разнести смешанный SEO-блок по целевым страницам

**Файлы:**

- Modify: `src/components/SeoLandingContent.tsx`
- Modify: `src/dostavka/CourierLanding.tsx`
- Modify: `src/eda/EdaLanding.tsx`
- Modify: `src/taxi/TaxiLanding.tsx`
- Modify: `src/smena/SmenaLanding.tsx`
- Modify: `src/App.tsx`

**Шаги:**

1. По карте контента перенести тексты про курьерский парк и доставку в `/dostavka/`.
2. Перенести вопросы про подработку в такси на выходных и требования к гражданам СНГ в `/taxi/`; если один абзац относится к двум направлениям, сохранить его дословно на обоих до отдельной редакторской задачи.
3. Перенести вопросы и ответы про Яндекс Смену в `/smena/`.
4. Перенести тексты про Яндекс Еду только в `/eda/`; не добавлять их в общую доставку.
5. Общие фразы о Барори Парк, поддержке и форматах занятости оставить на главной.
6. После успешного `check:content` удалить `<SeoLandingContent />` с главной и удалить компонент, если у него больше нет импортов.
7. Не менять существующие hero, цифры, оговорки, требования и CTA целевых страниц.

**Проверка:**

```powershell
npm run check:content
rg -n "SeoLandingContent" src
```

Ожидаемый результат: первая команда проходит; вторая не находит runtime-импортов компонента.

## Задача 6. Исправить стандарты доступности, затронутые миграцией

**Файлы:**

- Modify: `src/components/Header.tsx`
- Modify: `src/hooks/useModalDialog.ts`
- Modify: `src/components/Vacancies.tsx`
- Modify: `src/components/Reviews.tsx`
- Modify: `src/components/Tariffs.tsx`
- Modify: `scripts/check_header.py`
- Modify: `scripts/check_site.py`

**Шаги:**

1. Исправить возврат фокуса на кнопку открытия мобильного меню после Escape в Chromium и WebKit. Передавать trigger ref явно, чтобы cleanup не зависел от момента размонтирования dialog.
2. Заменить `h5` карточек вакансий и обнаруженные `h4/h5` после `h2` на последовательные `h3`, не меняя видимый текст.
3. Удалить `onClick` и `cursor-pointer` с `<tr>` тарифов; оставить существующую кнопку «Подключить» единственным действием строки.
4. Добавить доступные имена стрелкам слайдеров отзывов/вакансий, если текущая библиотека не выставляет их сама.
5. Добавить в `check_site.py` автоматическую проверку скачков heading outline, пустых accessible names и дублирующихся id.
6. Сохранить существующий режим `prefers-reduced-motion` и touch-target не меньше 44 px для основных CTA и controls.

**Проверка:**

```powershell
python scripts/check_header.py
python scripts/check_site.py
```

Ожидаемый результат: Chromium и WebKit проходят на всех ширинах; нет heading jumps, пустых имён controls, overflow и дублирующихся id.

## Задача 7. Убрать лишнюю начальную загрузку страниц

**Файлы:**

- Modify: `vite.config.ts`
- Modify: `src/hooks/useSmartCaptcha.ts`
- Modify: `index.html`
- Modify: `dostavka/index.html`
- Modify: `eda/index.html`
- Modify: `taxi/index.html`
- Modify: `smena/index.html`
- Modify: `tariffs/index.html`
- Modify: `src/vite-env.d.ts`
- Modify: `scripts/check_interactions.py`

**Шаги:**

1. После удаления тарифов и смешанного SEO-блока с главной собрать проект и записать реальную gzip-стоимость каждого entry.
2. Убрать ручное выделение `vendor-motion`, если оно продолжает добавлять preload на страницы, где motion не используется; доверить Vite разделение по графу импортов и сравнить результат.
3. Загружать SmartCaptcha один раз из `useSmartCaptcha` при первом фокусе/намерении отправить форму; удалить статические captcha `<script>` из HTML.
4. При ошибке загрузки сохранить текущую понятную ошибку формы и возможность повторной попытки.
5. Не оптимизировать `LegalModal` до измерения: он уже lazy-loaded и не входит в первоначальный execution path.

**Проверка:**

```powershell
npm run build
python scripts/check_interactions.py
```

Критерии: target HTML не preload-ит `vendor-motion`, SmartCaptcha не запрашивается до взаимодействия с формой, все mock-сценарии отправки проходят.

## Задача 8. Финальная приёмка MPA

**Файлы:**

- Modify: `scripts/check_site.py`
- Modify: `scripts/check_interactions.py` только при необходимости покрыть новые переходы
- Modify: `COMPLIANCE.md` только если фактические условия/интеграции изменились

**Автоматическая проверка:**

```powershell
npm test
npx tsc --noEmit
npm run build
npm run check:content
python scripts/check_header.py
python scripts/check_site.py
python scripts/check_interactions.py
```

**Матрица ручной проверки:**

- iPhone viewport: 320, 375 и 390 px; portrait и landscape; safe-area; fixed/sticky CTA; клавиатура в формах.
- iPad/tablet: 768 и 1024 px.
- Mac desktop: Safari/WebKit и Chromium при 1280 и 1440 px.
- Все семь URL: header, текущий пункт, один `h1`, CTA, форма, legal modal, cookie banner, внутренние якоря, back/forward.
- С выключенной анимацией: `prefers-reduced-motion: reduce`.
- SEO: status 200, canonical, robots, sitemap, уникальные title/description и social preview.

Физический iPhone/Mac остаётся обязательной последней проверкой: WebKit Playwright на Windows ловит большую часть различий движка, но не воспроизводит реальный Safari, системную клавиатуру и safe-area устройства полностью.

## Критерии завершения

- Главная больше не содержит полный тарифный блок и смешанный SEO-лендинг.
- `/dostavka/`, `/eda/`, `/taxi/`, `/smena/` индексируемы, каноничны и находятся в sitemap.
- Карточки четырёх направлений ведут на свои landing pages.
- `npm run check:content` подтверждает отсутствие потерянных исходных текстов.
- Все автоматические проверки проходят в Chromium и WebKit.
- На целевых ширинах нет overflow, сломанной навигации, потери фокуса или недоступных действий.
