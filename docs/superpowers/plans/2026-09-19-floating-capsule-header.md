# Floating Capsule Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить общую фиксированную шапку в выбранную белую «парящую капсулу» без изменения её логики и содержимого.

**Architecture:** Существующий React-компонент и все обработчики остаются неизменными. Визуальное решение реализуется в `Header.css`, синхронизация фиксированной высоты остаётся в существующих spacer-правилах, а браузерная проверка расширяется геометрическими утверждениями для Chromium и WebKit.

**Tech Stack:** React 19, TypeScript, CSS, Python Playwright, Vite.

## Global Constraints

- Не менять ссылки, подписи, номера телефонов, цели аналитики, выпадающие списки, базу знаний и мобильный `dialog`.
- Не добавлять зависимости, варианты компонента или новую логику прокрутки.
- Сохранить брейкпоинты `1200px` и `640px`.
- Сохранить зоны нажатия не меньше `44×44px`.
- Поддержать ширины от `320px`, safe-area iOS, клавиатуру и `prefers-reduced-motion`.
- Не коммитить `src/components/Header.css`: файл уже содержит незакоммиченные пользовательские изменения и должен остаться в рабочей копии.

---

### Task 1: Зафиксировать адаптивную геометрию шапки

**Files:**
- Modify: `scripts/check_header.py`
- Test: `scripts/check_header.py`

**Interfaces:**
- Consumes: `.classic-header`, `.classic-header__row`, `.classic-header__desktop-nav` из существующего DOM.
- Produces: проверку прозрачной внешней оболочки, отступа капсулы от краёв, скругления и подложки десктопной навигации.

- [ ] **Step 1: Добавить проваливающуюся проверку выбранного дизайна**

После получения локаторов `header` и `.classic-header__row` добавить:

```python
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
```

- [ ] **Step 2: Запустить проверку и подтвердить ожидаемое падение**

Run:

```powershell
python C:\Users\Lecoo\.agents\skills\webapp-testing\scripts\with_server.py --server "npm run dev -- --port 5173" --port 5173 -- python scripts/check_header.py
```

Expected: `AssertionError` с причиной `header shell is opaque` на первой проверенной ширине.

### Task 2: Оформить шапку как адаптивную капсулу

**Files:**
- Modify: `src/components/Header.css`

**Interfaces:**
- Consumes: существующие BEM-классы компонента `Header`.
- Produces: тот же DOM и поведение с новой геометрией на трёх диапазонах ширины.

- [ ] **Step 1: Реализовать минимальное CSS-изменение**

Обновить существующие правила без изменения JSX:

```css
.classic-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  padding: calc(8px + env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) 0 max(12px, env(safe-area-inset-left));
  background: transparent;
  color: #24332b;
}
.classic-header__row {
  width: 100%;
  max-width: 1280px;
  height: 64px;
  margin: auto;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(255,255,255,.97);
  border: 1px solid rgba(36,51,43,.1);
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(20,40,28,.12);
}
.classic-header__desktop-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  padding: 4px;
  border-radius: 999px;
  background: #f0f5f2;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.classic-header__desktop-nav > a,
.classic-header__desktop-nav > button,
.classic-header__desktop-nav > details > summary {
  min-height: 36px;
  padding: 0 10px;
  border-radius: 999px;
}
.classic-header__desktop-nav > a:hover,
.classic-header__desktop-nav > button:hover,
.classic-header__desktop-nav > details > summary:hover,
.classic-header__desktop-nav > a[aria-current='page'] {
  background: #fff;
  color: #15803d;
  box-shadow: 0 2px 8px rgba(20,55,35,.08);
}
.classic-header__cta { border-radius: 999px; }
.classic-menu {
  height: 100vh;
  max-height: 100vh;
  height: 100dvh;
  max-height: 100dvh;
}
@media (max-width: 1199px) {
  .classic-header { padding-top: calc(8px + env(safe-area-inset-top)); }
  .classic-header__row { height: 60px; padding-inline: 14px; gap: 16px; }
}
@media (max-width: 639px) {
  .classic-header { padding: calc(6px + env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) 0 max(8px, env(safe-area-inset-left)); }
  .classic-header__row { height: 58px; padding-inline: 10px; gap: 8px; }
  .classic-header__logo { flex-basis: 88px; }
  .classic-header__logo img { width: 88px; }
  .classic-header__actions { gap: 6px; }
}
```

Сохранить остальные правила выпадающих меню и мобильной панели; уменьшить логотип на десктопе до `100px`, а интервалы actions до `12px`, чтобы строка гарантированно помещалась на `1200px`.

- [ ] **Step 2: Запустить браузерную проверку и подтвердить зелёный результат**

Run:

```powershell
python C:\Users\Lecoo\.agents\skills\webapp-testing\scripts\with_server.py --server "npm run dev -- --port 5173" --port 5173 -- python scripts/check_header.py
```

Expected: для Chromium и WebKit каждая ширина завершается `PASS`, процесс возвращает код `0`.

### Task 3: Проверить весь сайт

**Files:**
- Verify: `src/components/Header.css`
- Verify: `scripts/check_header.py`

**Interfaces:**
- Consumes: готовую шапку.
- Produces: подтверждение сборки, регрессий и адаптивности на семи маршрутах.

- [ ] **Step 1: Запустить модульные проверки**

Run: `npm test`

Expected: все Node tests проходят, код возврата `0`.

- [ ] **Step 2: Собрать production-версию**

Run: `npm run build`

Expected: Vite завершает сборку без ошибок, код возврата `0`.

- [ ] **Step 3: Запустить полный браузерный smoke-test**

Run:

```powershell
python C:\Users\Lecoo\.agents\skills\webapp-testing\scripts\with_server.py --server "npm run dev -- --port 5173" --port 5173 -- python scripts/check_site.py
```

Expected: Chromium и WebKit проходят семь маршрутов на всех контрольных размерах, код возврата `0`.

- [ ] **Step 4: Оставить изменения в рабочей копии для проверки пользователем**

Не создавать коммит с `Header.css`, потому что файл уже был незакоммичен до задачи. Пользователь проверяет результат на запущенном localhost.
