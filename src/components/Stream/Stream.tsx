import { useState, useEffect, useCallback } from 'react';

import { getHighlights } from '../../services/scoreBat';

const Stream = () => {
    // @ts-ignore
    const [liveStream, setLiveStream] = useState([]);
    const [high, setHigh] = useState([]);
    const [randomNumber, setRandomNumber] = useState(0);

    const fetchHighlights = useCallback(async () => {
        const data = await getHighlights();

        // @ts-ignore
        // const sortedArray = data.liveStream.sort((a, b) => {
        //     const [hourA, minuteA] = a.date.split(':').map(Number);
        //     const [hourB, minuteB] = b.date.split(':').map(Number);
        //     return hourB - hourA || minuteB - minuteA;
        // });

        const sortedHigh = data.highlightVideos.sort((a, b) => {
            const [hourA, minuteA] = a.date.split(':').map(Number);
            const [hourB, minuteB] = b.date.split(':').map(Number);
            return hourB - hourA || minuteB - minuteA;
        });

        // @ts-ignore
        setHigh(sortedHigh);
    }, []);

    useEffect(() => {
        fetchHighlights();
    }, []);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * high.length);
            setRandomNumber(randomNumber);
        }, 10000);

        return () => {
            clearInterval(timeInterval);
        }
    }, [high]);

    return (
        <div className='w-full h-[300px] p-2'>
            {high[randomNumber] && (
                <div className='h-full w-full' key={randomNumber}>
                    <div className='w-full bg-red-500 relative'>
                        {/* @ts-ignore */}
                        <img src={`${high[randomNumber].thumbnail}`} className='block w-full h-full' />

                        <p className='absolute top-0 w-full p-2 bg-gradient-to-b from-slate-950 to-transparent text-slate-50'>
                            {/* @ts-ignore */}
                            {high[randomNumber].title}
                        </p>
                    </div>

                    <button className='w-full bg-slate-300'>view more</button>
                </div>
            )}
        </div>
    );
};

export default Stream;