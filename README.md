# [Kloda.ru](https://Kloda.ru)

Фулстек веб-приложение с карточками, по которым можно обучаться, готовиться к собеседованиям, повторять и
закреплять пройденный материал.

- Фронтенд: [Kloda.ru](https://Kloda.ru).
- Бэкенд: [github.com/SergFediaev/kloda-api](https://github.com/SergFediaev/kloda-api).

## 🚀 Стек технологий

- Фреймворки:
    - JS: [Next.js App Router](https://nextjs.org/docs).
    - CSS [Tailwind CSS](https://tailwindcss.com/docs/installation).
- Типизация: [TypeScript](https://www.typescriptlang.org/docs).
- Среда выполнения и пакетный менеджер: [Bun](https://bun.sh/docs).
- Линтер и форматер: [Biome](https://biomejs.dev/guides/getting-started).
- Архитектурная методология: [подход Дэна Абрамова](https://react-file-structure.surge.sh), вместо FSD.
- HTTP-клиент: [Ky](https://github.com/sindresorhus/ky).
- Формы:
    - Управление: [React Hook Form](https://react-hook-form.com/docs).
    - Валидация: [Zod](https://zod.dev).
- Стейт-менеджмент:
    - Серверный: [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview).
    - Клиентский: [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction).
- Аналитика:
    - Google Analytics 4.
    - Яндекс Метрика с вебвизором.
- SEO:
    - [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) — для страниц.
    - [Metadata Files API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) — `robots.ts`,
      `sitemap.ts`.
- Отправка email: [EmailJS](https://www.emailjs.com/docs) — используется для отправки отчёта об ошибке.
- Конвенции:
    - [Семантическое версионирование](https://semver.org).
    - [Соглашение о коммитах](https://www.conventionalcommits.org/en/v1.0.0).
- Стиль кода:
    - Универсальные полиморфные компоненты.
    - Flat Code, Guard Clause.

## ‍🎨 UI/UX

- Вёрстка:
    - Семантика HTML5.
    - Адаптивность и отзывчивость.
    - Оптимизация под мобильные.
- Кастомные компоненты — [NextUI](https://nextui.org/docs/guide/introduction):
    - [Checkbox](https://nextui.org/docs/components/checkbox).
    - [Radio group](https://nextui.org/docs/components/radio-group).
    - [Select](https://nextui.org/docs/components/select).
    - [Slider](https://nextui.org/docs/components/slider).
    - [Pagination](https://nextui.org/docs/components/pagination).
- Multiselect: [React Select](https://github.com/JedWatson/react-select) — используется в шапке для выбора и поиска
  категорий карточек.
- Модальное окно: кастомная модалка `dialog.tsx`, сделанная на `<dialog>`
  и [React Portal](https://react.dev/reference/react-dom/createPortal).
- Иконки: [Lucide Icons](https://lucide.dev/guide).
- Светлая и тёмная тема: [Next-Themes](https://github.com/pacocoursey/next-themes).
- Индикатор загрузки: [Holy Loader](https://github.com/tomcru/holy-loader).
- Плавные переходы между страницами: [View Transitions API](https://github.com/shuding/next-view-transitions).
- Всплывающие уведомления: [React-Toastify](https://github.com/fkhadra/react-toastify).
- Минификация ресурсов.

## 🗝️ Основные возможности

- Text-to-Speech (TTS): [Web SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) —
  используется не только для доступности, но и для удобного hands-free прослушивания карточек с созданием динамических
  плейлистов
  из query-параметров текущей страницы.
- Голосовой поиск по карточкам и пользователям, реализованный
  на [Web SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).
- Импорт карточек из [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts).
- Экспорт всех созданных пользователем карточек в формате CSV,
  защищённый [Google reCAPTCHA v2](https://github.com/dozoisch/react-google-recaptcha).

## `/create-card` Создание карточки

- Все ссылки в карточке конвертируются в соответствующие медиа элементы:
    - Ссылки на видео: `.mp4`, `.avi`, `.mov`, `.mkv`, `.webm` — `<video>`.
    - Ссылки на музыку: `.mp3`, `.wav`, `.ogg`, `.aac` — `<audio>`.
    - Ссылки с картинками: `.png`, `.jpeg`, `.gif`, `.bmp`, `.svg`, `.webp` — `<img>`.
    - Ссылки на YouTube — `<iframe>`.
    - Обычные ссылки — кликабельные и нумерованные `<a>`.
- Весь набранный контент в создаваемой карточке сохраняется в `localStorage`.
- Автоматическое заполнение username и email пользователя в создаваемой карточке.
- Динамические категории:
    - Категории в созданной карточке, которых ещё нет в базе данных, будут созданы и подтянуты автоматически.
    - Если удаляется карточка, которая была единственной в категории, то вместе с карточкой удаляется осиротевшая
      категория.

## `/cards` Дашборд карточек

- Голосовой и текстовый поиск карточек по заголовку и контенту с выбором множества категорий.
- Сортировка карточек:
    - По ID, заголовку, контенту, автору.
    - По количеству лайков, дизлайков, добавлений в избранное.
    - По дате создания/обновления.
- Лайк, дизлайк и добавление карточки в избранное — доступно только авторизованному пользователю.
- Редактирование и удаление карточки — доступно только автору карточки.
- Копирование заголовка и контента карточки в буфер обмена.
- Карточкой можно поделиться, если устройство
  поддерживает [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API). Если устройство не
  поддерживает эту технологию, то
  вместо функции «Поделиться» будет копирование ссылки на карточку в буфер обмена.

## `/card/ID` Подробности карточки

На странице с подробностями карточки в шапке появляется управление карточками:

- Листание в обе стороны карточек из текущих категорий.
- Если выбрать категории, в которых нет текущей карточки, то будет открыта первая карточка из выбранных категорий.
- Открытие случайной карточки из текущих категорий.
- Отображение порядкового номера открытой карточки и общее количество карточек в текущих категориях.

## `/user/ID` Профиль пользователя

- Быстрый поиск всех созданных, лайкнутых, дизлайкнутых и избранных карточек пользователя через query-параметры.
- Импорт карточек из Google Sheets с подробной пользовательской инструкцией.
- Экспорт всех созданных карточек в формате CSV.
- Удаление всех созданных карточек.

## `/users` Дашборд пользователей

- Голосовой и текстовый поиск пользователей по username и email.
- Сортировка пользователей:
    - По ID, username, email.
    - По количеству созданных, избранных, лайкнутых или дизлайкнутых карточек.
    - По дате регистрации/последнего логина.

## `/settings` Настройки приложения

- Статистика:
    - Аптайм бэкенда в реальном времени по нативным веб-сокетам.
    - Общая статистика карточек и пользователей в базе данных.
- Сброс всех настроек и очистка `session/localStorage`.
- Информация о версии приложения и всех зависимостях проекта из `package.json`.
- Настройка режима карточек и их отображения на дашборде.
- Отладочный режим:
    - Отображение разметки.
    - Время бездействия.
    - Демонстрация 404 страницы и обработки ошибки во время исполнения.

## 🛠️ Общее

- Карточки и пользователи:
    - Умная пагинация с выбором количества сущностей на страницу.
    - Порядок отображения сущностей на странице: по убыванию и возрастанию.
    - Настраиваемое количество колонок.
- Регистрация/логин пользователя по email и паролю.
- В полях ввода форм отображается количество символов с помощью `watch()` из `useForm()`.
- Режимы карточек, которые можно переключать в шапке глобально или индивидуально для каждой карточки:
    - Режим изучения — контент карточки отображается сразу.
    - Режим практики — отображается заголовок карточки, а её контент изначально скрыт и показывается по нажатию кнопки
      для
      самопроверки.
- Импровизированный `screensaver.tsx`, запускающийся во время бездействия пользователя (настроить и форсировать его
  можно в настройках приложения).
- Кастомные хуки:
    - `useDebounce.ts`, `useActivity.ts`, `useOnline.ts`, `useVoice.ts`, `useWidth.ts`.
    - И многие другие в директории `hooks`.
- Логотип в шапке отображает состояние сети (если подключения к сети нет, то вместо логотипа появится
  соответствующая иконка).
- Обработка ошибок:
    - Ошибки во время исполнения обрабатываются с помощью `global-error.tsx`.
    - На странице ошибки можно отправить отчёт об ошибке с трассировкой стека.
    - Автоматическая перезагрузка страницы по таймеру, которую можно отменить.