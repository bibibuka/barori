# Header Centering and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Строго центрировать десктопную навигацию и вернуть анимации телефона и кнопки заявки.

**Architecture:** Существующий компонент сохраняет поведение и получает только презентационные span-элементы для символов номера. Центрирование и анимации выполняются в текущем `Header.css`; браузерный тест фиксирует геометрию и reduced-motion.

**Tech Stack:** React 19, TypeScript, CSS, Python Playwright, Vite.

## Global Constraints

- Не менять ссылки, аналитику, меню и брейкпоинты.
- Не добавлять зависимости.
- Анимировать только `transform` и `opacity`.
- Полностью отключать движение при `prefers-reduced-motion: reduce`.

---

### Task 1: Добавить проваливающуюся браузерную проверку

**Files:**
- Modify: `scripts/check_header.py`

**Interfaces:**
- Consumes: `.classic-header__row`, `.classic-header__desktop-nav`, `.classic-header__phone-character`, `.classic-header__cta`.
- Produces: проверку точного центра и отключения анимаций.

- [ ] Добавить для ширины от 1200 px сравнение центров row/nav с допуском 1 px.
- [ ] Проверить наличие символов номера и `animationName == 'none'` в reduced-motion.
- [ ] Запустить `scripts/check_header.py` и подтвердить падение на смещённой навигации.

### Task 2: Реализовать центрирование и анимации

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Header.css`

**Interfaces:**
- Consumes: строку `phone.text`.
- Produces: `.classic-header__phone-text` и `.classic-header__phone-character` без изменения доступного имени ссылки.

- [ ] Разбить видимый номер на `span`-символы с последовательным `animationDelay` и `aria-hidden="true"` на контейнере.
- [ ] Перевести десктопную строку на `grid-template-columns: 1fr auto 1fr`, а до 1199 px вернуть `display:flex`.
- [ ] Добавить короткие циклы `phone-ring`, `phone-character-wave` и `cta-wave`, активное состояние кнопки и reduced-motion override.
- [ ] Запустить `scripts/check_header.py` и подтвердить прохождение Chromium/WebKit.

### Task 3: Полная проверка

**Files:**
- Verify: `src/components/Header.tsx`
- Verify: `src/components/Header.css`

**Interfaces:**
- Consumes: готовую шапку.
- Produces: проверенный localhost.

- [ ] Выполнить `npm test`.
- [ ] Выполнить `npm run build`.
- [ ] Визуально проверить снимки 390 и 1280 px.
