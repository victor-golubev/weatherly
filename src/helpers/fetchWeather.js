const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // твой ключ
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
    );
    if (!res.ok) throw new Error("Ошибка при получении погоды");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
