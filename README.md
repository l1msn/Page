# 
<div align="center">
<img alt="Static Badge" src="https://img.shields.io/badge/build-passing-brightgreen">
<img alt="GitHub commit activity (branch)" src="https://img.shields.io/github/commit-activity/m/l1msn/Page">
<img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/l1msn/Page">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/l1msn/Page">
<img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/l1msn/Page/master">
</div>

## Оглавление

- [Обзор проекта](https://github.com/l1msn/Page#обзор-проекта)
- [Стек](https://github.com/l1msn/Page#стек)
- [Запуск проекта](https://github.com/l1msn/Page#запуск-проекта)
- [Скрипты](https://github.com/l1msn/Page#скрипты)
- [Netlify](https://github.com/l1msn/Page#netlify-и-vercel)
- [Архитектура проекта](https://github.com/l1msn/Page#архитектура-проекта)
- [Работа с переводами](https://github.com/l1msn/Page#работа-c-переводами)
- [Линтинг](https://github.com/l1msn/Page#линтинг)
- [Конфигурация проекта](https://github.com/l1msn/Page#конфигурация-проекта)

----

## Обзор проекта

Оценить проект можите по [ссылке](https://jocular-pudding-6919e5.netlify.app/calls)

----

## Стек


| Стэк         | Технологии                                   |
|--------------|----------------------------------------------|
| Клиентская часть | TypeScript, SCSS, HTML, React, Framer Motion |
| Сборщики | Webpack, Vite                                |
| Линтеры/Форматирование | ESLint, StyleLint, Prettier                  |
| Дополнительно | Babel, i18n                                  |

----

### Запуск проекта

```
npm install - устанавливаем зависимости
npm start - запуск сервера проекта в dev режиме (Vite)
```

----

### Скрипты

- `npm run start:dev:webpack` - Запуск frontend проекта на webpack dev server
- `npm start` - Запуск frontend проекта на vite
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run prettier` - Исправление prettier
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда


----

### Netlify

Серверная часть размещена на [Netlify](https://vercel.com) - https://jocular-pudding-6919e5.netlify.app/calls

----

### Архитектура проекта

Проект написан в соответствии с методологией `Feature sliced design`

>[Документация feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

### Работа с переводами

В проекте используется библиотека `i18next` для работы с переводами.
Файлы с переводами хранятся в public/locales.

>[Документация i18next](https://react.i18next.com/)

----

### Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью `storybook-addon-mock`.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:
- `npm run storybook`

Пример:

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import ThemeButton from '../consts/ThemeButton';
import '@/app/styles/index.scss';
import themeDecorator from '@/shared/config/storybook/themeDecorator/themeDecorator';
import ButtonSize from '../consts/ButtonSize';
import Themes from '@/shared/consts/theme';

const meta = {
   title: 'shared/Button',
   component: Button,
   tags: ['autodocs'],
   argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Text',
    },
};

export const Clear: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.CLEAR,
    },
};

export const Outline: Story = {
    args: {
        children: 'Text',
        theme: ThemeButton.OUTLINE,
    },
};
```


----

### .loki

Для Скриншотного тестирование используется библиотека `.loki`,
освнованный на образов со storybook

>[Подробнее о loki](https://loki.js.org])

----

### Линтинг

В проекте используется `eslint` для проверки `typescript` кода и `stylelint` для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin *eslint-plugin-l1msn-plugin*,
который содержит 3 правила
>1) path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
>2) layer-imports - проверяет корректность использования слоев с точки зрения FSD
    (например widgets нельзя использовать в features и entitites)
>3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером


----


### Конфигурация проекта

Для разработки проект содержит 2 конфига:
>1. `Webpack` - ./config/build - в основном используется для создание build'ов
>2. `vite `- vite.config.ts - в основном используется для dev'а

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config
- /config/babel - `babel`
- /config/build - конфигурация `webpack`
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

----
