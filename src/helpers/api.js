const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  if (!city || typeof city !== "string") {
    throw new Error("Некорректное название города");
  }

  const res = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=ru`
  );

  if (!res.ok) {
    if (res.status === 404) throw new Error("Город не найден");
    throw new Error("Ошибка при получении погоды");
  }

  return await res.json();
}
