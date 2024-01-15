// request rate 1 000 000 p/m;

const API_KEY = '61aaf44eafe14d92b78220028220303';

export const getCurrentWeather = async (city) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`);
    const data = await response.json();

    return data;
}