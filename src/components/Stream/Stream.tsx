import { useState, useEffect, useCallback } from 'react';

import { getHighlights } from '../../services/scoreBat';
import Pagination from '../Pagination/Pagination';
import InputField from '../InputField/InputField';

const Stream = () => {
    // @ts-ignore
    const [liveStream, setLiveStream] = useState([]);
    const [high, setHigh] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const matchesPerPage: number = 9;

    const onSearchTermChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const fetchHighlights = useCallback(async () => {
        setLoading(true);
        const data = await getHighlights();

        // @ts-ignore
        const sortedArray = data.liveStream.sort((a, b) => {
            const [hourA, minuteA] = a.date.split(':').map(Number);
            const [hourB, minuteB] = b.date.split(':').map(Number);
            return hourB - hourA || minuteB - minuteA;
        });

        const sortedHigh = data.highlightVideos.sort((a, b) => {
            const [hourA, minuteA] = a.date.split(':').map(Number);
            const [hourB, minuteB] = b.date.split(':').map(Number);
            return hourB - hourA || minuteB - minuteA;
        });

        // setLiveStream(sortedArray);
        // highlightVideos(highlightVideos)
        // @ts-ignore
        setHigh(sortedHigh);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchHighlights();
    }, [fetchHighlights]);



    const filteredMatches = high.filter(match =>
        match.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const lastPageIndex = currentPage * matchesPerPage;
    const firstPageIndex = lastPageIndex - matchesPerPage;
    const currentSlicedPage = filteredMatches.slice(firstPageIndex, lastPageIndex);

    return (
        <div className='flex flex-col w-[768px]'>
            <InputField
                onSearchTermChange={onSearchTermChange}
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='flex flex-col'>
                    <div className='grid grid-cols-3 gap-5'>
                        {currentSlicedPage.length > 0 ? currentSlicedPage.map((stream: any, index: number) => (
                            <div key={index} className="max-w-md mx-auto bg-white rounded-xl shadow-md ">
                                <div className="p-2 flex items-center justify-between">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                        {stream.title.slice(0, 20)}...
                                    </div>
                                </div>

                                <div className="p-2">
                                    <div className="w-[235px]">
                                        <iframe width={235} height={150} allowFullScreen={true} src={stream.videoSrc} className='w-full' />
                                    </div>
                                </div>
                            </div>
                        )) : searchTerm ? (
                            <div className='text-center'>No results found</div>
                        ) : (
                            <div className='text-center'>No matches found</div>
                        )}
                    </div>

                    <div className='mt-5'>
                        <Pagination
                            totalMatches={high.length}
                            matchesPerPage={9}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stream;