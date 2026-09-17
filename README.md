# Restaurant Platform

Учебное SPA для управления ресторанной платформой: каталог ресторанов, интерактивная карта, план зала, работа с заказами и справочник сотрудников. Интерфейс реализован по макету Figma.

**Live demo:** [restaurant-platform-henna.vercel.app](https://restaurant-platform-henna.vercel.app)  
**Repository:** [Pl0hoiKiDiK/restaurant-platform](https://github.com/Pl0hoiKiDiK/restaurant-platform)

## Возможности

### Рестораны

- Загрузка ресторанов из Cloud Firestore.
- Поиск по названию, городу и кухне.
- Фильтрация каталога.
- Интерактивная карта на Leaflet и OpenStreetMap.
- Карточки ресторанов с локальными WebP-изображениями.

### Столы и заказы

- План зала со свободными, занятыми и зарезервированными столами.
- Просмотр деталей стола и активного заказа.
- Добавление и удаление блюд, изменение количества, комментарии и скидки.
- Расчёт стоимости заказа в центах.
- Атомарное завершение заказа: позиции очищаются, стол освобождается, итог закрытия сохраняется в `lastReceipt`.
- Защита от конфликтов редактирования через поле `revision` и Firestore transactions.

### Сотрудники

- Загрузка списка сотрудников из Cloud Firestore.
- Статистика, вычисляемая из данных базы.
- Локальные WebP-аватары, сопоставленные с `avatarKey` из Firestore.

### Общее

- Loading, error и empty states.
- Клиентская маршрутизация TanStack Router.
- Кэширование и синхронизация серверного состояния через TanStack Query.
- Production deployment на Vercel.

## Стек

| Задача               | Инструменты                           |
| -------------------- | ------------------------------------- |
| Интерфейс            | React 19, TypeScript 6                |
| Сборка               | Vite 8, `@vitejs/plugin-react`        |
| Маршрутизация        | TanStack Router                       |
| Серверное состояние  | TanStack Query                        |
| База данных          | Firebase 12, Cloud Firestore Lite     |
| Карта                | Leaflet, React Leaflet, OpenStreetMap |
| UI и стили           | Tailwind CSS 4, shadcn/ui, Base UI    |
| Уведомления и иконки | Sonner, Lucide React                  |
| Качество кода        | ESLint, Prettier, Vitest              |
| CI и deploy          | GitHub Actions, Vercel                |

Полный список зависимостей находится в [`package.json`](package.json), а зафиксированные версии — в [`package-lock.json`](package-lock.json).

## Локальный запуск

### Требования

- Node.js 22.12 или выше.
- npm.
- Firebase project с созданной Cloud Firestore database.

Установка зависимостей:

```bash
npm ci
```

Создайте `.env` на основе шаблона:

```powershell
Copy-Item .env.example .env
```

Заполните значения из настроек Firebase Web App:

```dotenv
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Запустите приложение:

```bash
npm run dev
```

После изменения `.env` перезапустите Vite.

> `VITE_*` — клиентская конфигурация. Не добавляйте в `.env` service-account keys или другие серверные секреты. Локальный `.env` исключён из Git.

## Demo data

Приложение читает данные из Firestore. Для пустой учебной базы можно добавить демоданные.

Запустите приложение локально, откройте DevTools Console и выполните:

```js
const { seedDemoData } = await import('/src/dev/seed-demo-data.ts');
await seedDemoData();
```

Затем обновите страницу. Seed logic доступен только в development и предназначен для учебной базы; в production UI он не вызывается.

| Коллекция     | Назначение                                           |
| ------------- | ---------------------------------------------------- |
| `restaurants` | Рестораны, кухни, координаты и ключи изображений     |
| `employees`   | Сотрудники, смены и даты                             |
| `tables`      | Номер, статус и время резервирования стола           |
| `tableOrders` | Позиции заказа и `revision`; ID совпадает с ID стола |

## Архитектура

```text
src/
  app/                 # Router, providers, layouts и home page
  routes/              # File-based route declarations
  features/
    restaurants/       # Каталог, фильтры, карта, API и UI
    tables/            # План зала, заказ, mutations и transactions
    employees/         # Справочник сотрудников, API и UI
  components/          # Общие UI-компоненты
  lib/                 # Firebase, имена коллекций и утилиты
  dev/                 # Демоданные и development seed logic
  assets/              # Изображения, шрифты и иконки
```

Поток данных:

```text
Component → Hook → API → Firestore
```

Внутри feature-модулей используются `api`, `components`, `hooks`, `lib`, `pages` и `types`. Firestore-документы проверяются runtime parsers перед использованием в интерфейсе.

| Route                    | Назначение                          |
| ------------------------ | ----------------------------------- |
| `/`                      | Главный экран                       |
| `/restaurants`           | Каталог ресторанов, фильтры и карта |
| `/staff/tables`          | План столов                         |
| `/staff/tables/$tableId` | Детали стола и заказ                |
| `/staff/employees`       | Справочник сотрудников              |

`src/routeTree.gen.ts` генерируется TanStack Router автоматически и не редактируется вручную.

## Проверки

```bash
npm run format:check
npm run lint
npm run test
npm run build
```

Полная проверка перед commit или deploy:

```bash
npm run check
```

Команда запускает Prettier, ESLint, Vitest и production build. Тесты покрывают расчёт заказа, пустой заказ, конфликты `revision` и транзакционное закрытие заказа.

Дополнительные команды:

```bash
npm run format       # Применить форматирование
npm run test:watch   # Запустить тесты в watch mode
npm run preview      # Локально открыть production build
```

## Деплой

Приложение опубликовано на Vercel: [restaurant-platform-henna.vercel.app](https://restaurant-platform-henna.vercel.app).

Конфигурация находится в [`vercel.json`](vercel.json). В Vercel заданы переменные окружения из [`.env.example`](.env.example), а SPA rewrite позволяет открывать и обновлять вложенные client-side routes напрямую.

## Ограничения

Следующие элементы не входят в текущий scope или остаются визуальными заглушками:

- Дополнительные разделы CRM.
- Уведомления, профиль, корзина и бонусная программа.
- Фильтры сотрудников и массовое выделение.
- Создание нового заказа и бронирование стола.
- Firebase Authentication и ролевая модель доступа.
- WebSocket-чат.
- Интеграция с реальными платежами: `lastReceipt` хранит только итог закрытого заказа.

Firebase web configuration не заменяет правила доступа к данным. Для приложения с реальными данными нужно настроить Firebase Authentication и Cloud Firestore Security Rules.

## Документация

- [Checklist для сдачи](docs/submission-checklist.md)
- [Lighthouse audit](docs/lighthouse.md)
- [Vercel configuration](vercel.json)
- [Environment variable template](.env.example)
