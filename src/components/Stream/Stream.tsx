import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getHighlights } from '../../services/scoreBat';

const Stream = () => {
    // @ts-ignore
    const [liveStream, setLiveStream] = useState([]);
    const [high, setHigh] = useState([]);

    const fetchHighlights = useCallback(async () => {
        const data = await getHighlights();

        // @ts-ignore
        const sortedArray = data.liveStream.sort((a, b) => a.date.localeCompare(b.date));
        const sortedHigh = data.highlightVideos.sort((a, b) => {
            const [hourA, minuteA] = a.date.split(':').map(Number);
            const [hourB, minuteB] = b.date.split(':').map(Number);
            return hourB - hourA || minuteB - minuteA;
        });

        // setLiveStream(sortedArray);
        // highlightVideos(highlightVideos)
        // @ts-ignore
        setHigh(sortedHigh);
    }, []);

    useEffect(() => {
        fetchHighlights();
    }, [fetchHighlights]);

    console.log(high);

    return (
        <div className='sm:grid sm:grid-cols-1 w-[768px]'>
            <Link to="/">back</Link>
            <div className='sm:grid sm:grid-cols-3 gap-2'>

                {high.slice(0, 35).map((stream: any) => (
                    <div key={stream.title} className="max-w-md mx-auto bg-white rounded-xl shadow-md ">
                        <div className="p-2 flex items-center justify-between">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{stream.title}</div>
                            <div>{stream.date}</div>
                        </div>

                        <div className="p-2">
                            <div className="w-[235px]">
                                {/* <div dangerouslySetInnerHTML={{ __html: stream.embed }} className="h-full w-full" /> */}
                                <iframe width={235} height={150} allowFullScreen={true} src={stream.videoSrc} className='w-full' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stream;