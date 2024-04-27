import { useState, useEffect } from 'react';
import moment from 'moment';

// @ts-ignore
import * as ScoreBatService from '../../services/scoreBat.js';

interface VideoProps {
    competition: string;
    competitionUrl: string;
    date: string;
    matchviewUrl: string;
    thumbnail: string;
    title: string;
    embed: string;
    videoSrc: string;
    video: string[];
    videos: string[];
}

export const Highlight = () => {
    const [videos, setVideos] = useState<VideoProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEmbed, setCurrentEmbed] = useState('');

    useEffect(() => {
        setLoading(true);
        ScoreBatService.getHighlights().then((data: any) => {
            setVideos(data.liveStream);
            setLoading(false);
        }).catch((err: string) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    const openModal = (videos: any) => {
        console.log('video', videos);

        if (videos) {
            const srcRegex = /src='([^']*)'/;
            const match = videos.embed.match(srcRegex);
            console.log('embed', match);

            if (match && match[1]) {
                setCurrentEmbed(match[1]);
                console.log('currentEmbed', currentEmbed)
            }
            setModalOpen(true);
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className='flex flex-col h-[804px] overflow-y-scroll'>
            <div className='text-white'>
                Videos: {videos.length}
            </div>

            {videos.map((video, i) => (
                <div key={i} onClick={() => openModal(video)}>
                    {/* Render the video here */}<div key={i} onClick={() => openModal(video.videos)} className='flex items-center m-1 shadow-lg rounded-lg p-2 bg-slate-300 hover:bg-slate-900 hover:text-white'>
                        <div className='w-[25px] h-[25px]'>
                            <img src={video.thumbnail} className='w-full h-full' />
                        </div>
                        <div className='bg-url ml-2 italic'>
                            {video.title}
                        </div>
                    </div>
                </div>
            ))}

            {loading && <div>Loading...</div>}

            {modalOpen && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center' onClick={closeModal}>
                    <div className='bg-white p-4 rounded w-[1024px] h-[600px] relative' onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className='absolute top-[-20px] right-[-20px] bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center'>X</button>
                        <div className='w-full h-full'>
                            <iframe src={currentEmbed} width="100%" height="100%" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}