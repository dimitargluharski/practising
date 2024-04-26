export const getNews = async () => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-03-26&sortBy=publishedAt&apiKey=28ea213dbea9483f86676f7b0735449f`);
    const data = await response.json();

    return data;
}