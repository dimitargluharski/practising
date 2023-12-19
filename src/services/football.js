const KEY = '443bc4cec33e610efcf112f0c916db37'
const API_HOST = 'v3.football.api-sports.io';

export const getLiveMatches = async () => {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures?live=all`, {
        headers: {
            "X-RapidAPI-Key": `${KEY}`,
            "X-RapidAPI-Host": `${API_HOST}`,
        },
    });

    const json = await res.json();
    return json.response;
};
