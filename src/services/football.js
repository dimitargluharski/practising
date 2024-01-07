const KEY = '443bc4cec33e610efcf112f0c916db37'; // not good practice to show the key, move it in .env file later
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


export const getFixtureDetails = async (matchId) => {
    try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?id=${matchId}`, {
            headers: {
                "X-RapidAPI-Key": `${KEY}`,
                "X-RapidAPI-Host": `${API_HOST}`,
            },
        });
        const data = await response.json();
        return data.response;

    } catch (error) {
        console.log(error)
    }
}