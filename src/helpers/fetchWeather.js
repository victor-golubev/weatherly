const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  if (!city || typeof city !== "string") return null;

  try {
    const res = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric&lang=ru`
    );

    if (!res.ok) {
      if (res.status === 404) throw new Error("Город не найден");
      throw new Error("Ошибка при получении погоды");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
