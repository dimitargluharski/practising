const url = 'https://www.scorebat.com/video-api/v3/feed/?token=';
const key = 'NzA3NzlfMTcwNTc0NTU4Ml8zOGE0ZjdjYjYyNTk2MmQzODM0OTUwMjExZDY4MjcxODUxOWE0NmNk';

export const getHighlights = async () => {
    const response = await fetch(url + key);
    const data = await response.json();

    return data.response;
}