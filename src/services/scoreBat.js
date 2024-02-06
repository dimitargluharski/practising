import moment from 'moment';

const url = 'https://www.scorebat.com/video-api/v3/feed/?token=';
const key = 'NzA3NzlfMTcwNTc0NTU4Ml8zOGE0ZjdjYjYyNTk2MmQzODM0OTUwMjExZDY4MjcxODUxOWE0NmNk';

export const getHighlights = async () => {
    const response = await fetch(url + key);
    const data = await response.json();


    let liveStream = [];
    let highlightVideos = [];

    for (let i = 0; i < data.response.length; i++) {
        if (data.response[i].hasOwnProperty('videos') && data.response[i].videos.length > 0) {
            for (let y = 0; y < data.response[i].videos.length; y++) {
                const embed = data.response[i].videos[y].embed;
                const srcRegex = /src='(.*?)'/;
                const match = embed.match(srcRegex);

                let videoSrc;
                if (match && match[1]) {
                    videoSrc = match[1];
                }

                const localDate = moment(data.response[i].date).local().format('H:mm');


                if (data.response[i].videos[y].title === "Live Stream") {
                    liveStream.push({
                        id: data.response[i].id,
                        title: data.response[i].title,
                        thumbnail: data.response[i].thumbnail,
                        embed: embed,
                        videoSrc: videoSrc,
                        date: localDate
                    });
                } else {
                    highlightVideos.push({
                        id: data.response[i].id,
                        title: data.response[i].title,
                        thumbnail: data.response[i].thumbnail,
                        embed: embed,
                        videoSrc: videoSrc,
                        date: localDate
                    });
                }
            }
        }
    }

    return {
        liveStream,
        highlightVideos
    };
}