const KEY = '0994604109a6e8c02639fc02913eb96e'; // not good practice to show the key, move it in .env file later
const API_HOST = 'v3.football.api-sports.io';

export const getLiveMatches = async () => {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures?live=all`, {
        headers: {
            "X-RapidAPI-Key": `${KEY}`,
            "X-RapidAPI-Host": `${API_HOST}`,
        },
    });

    const json = await res.json();
    console.log('res', json.response)
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

export const getMatchLineups = async (matchId) => {
    try {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=${matchId}`, {
            headers: {
                "X-RapidAPI-Key": `${KEY}`,
                "X-RapidAPI-Host": `${API_HOST}`,
            },
        });
        const data = await response.json();
        console.log('data');
        return data.response;

    } catch (error) {
        console.log(error)
    }
}

export const getMatchPrediction = async (matchId) => {
    try {
        const response = await fetch(`https://v3.football.api-sports.io/predictions?fixture=${matchId}`, {
            headers: {
                "X-RapidAPI-Key": `${KEY}`,
                "X-RapidAPI-Host": `${API_HOST}`,
            },
        });
        const data = await response.json();
        // console.log('data', data);
        return data.response;

    } catch (error) {
        console.log(error)
    }
}