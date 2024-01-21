import { useState, useEffect } from 'react';
import moment from 'moment';

// @ts-ignore
import * as ScoreBathService from '../../services/ScoreBat';

interface VideoProps {
    competition: string;
    competitionUrl: string;
    date: string;
    matchviewUrl: string;
    thumbnail: string;
    title: string;
    embed: string;
}

const Highlight = () => {
    const [videos, setVideos] = useState<VideoProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEmbed, setCurrentEmbed] = useState('');

    useEffect(() => {
        setLoading(true);
        ScoreBathService.getHighlights().then((data: any) => {
            setVideos(prevVideos => [...prevVideos, ...data.slice((page - 1) * 15, page * 15)]);
            setLoading(false);
        }).catch((err: string) => {
            console.log(err);
            setLoading(false);
        });
    }, [page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    const openModal = (videos: { embed: string }[]) => {
        if (videos && videos[0] && videos[0].embed) {
            const srcRegex = /src='([^']*)'/;
            const match = videos[0].embed.match(srcRegex);
            if (match && match[1]) {
                setCurrentEmbed(match[1]);
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
            {videos.map((v, i) => (
                // @ts-ignore
                <div key={i} onClick={() => openModal(v.videos)} className='flex items-center m-1 shadow-lg rounded-lg p-2 bg-slate-300 hover:bg-slate-900 hover:text-white'>
                    <div className='w-[25px] h-[25px]'>
                        <img src={v.thumbnail} className='w-full h-full' />
                    </div>
                    <div className='bg-url ml-2 italic'>
                        {v.title} ({moment.utc(v.date).local().format('DD MMMM')})
                    </div>
                </div>
            ))}

            {loading && <div>Loading...</div>}

            <button onClick={loadMore} className='m-2 p-2 bg-blue-500 text-white rounded'>Load More</button>

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

export default Highlight;