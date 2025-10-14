# Weatherly

Веб-приложение для отображения текущей погоды и прогноза по городу.

## Функционал
- Поиск погоды по названию города
- Просмотр текущей погоды (температура, "ощущается как", влажность, давление, ветер, восход/заход солнца)
- История поиска с возможностью очистки
- Клик по городу в истории или избранном — отображение погоды в основной карточке
- Компонент избранного с добавлением/удалением города

## Стек
- HTML, CSS, JavaScript
- React, React Router
- Lucide React (иконки)

## Структура
- `components/` — UI-компоненты (`Search`, `WeatherCard`, `Favorites`, `Header`)
- `pages/` — страницы (`SearchHistoryPage`)
- `helpers/` — работа с историей и избранным, кастомные хуки

## Установка и запуск
```bash
git clone https://github.com/victor-golubev/weatherly.git
cd weatherly
npm install
npm run dev
```

Приложение будет доступно по http://localhost:5173.

## Ссылка на проект

[Weatherly на Vercel](https://weatherly-woad-five.vercel.app/)
