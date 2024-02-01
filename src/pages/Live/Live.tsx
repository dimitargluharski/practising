import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
import * as APIfootball from '../../services/football.js'
import { Fixture } from '../../types/MatchProps.js';
import Row from '../../components/Row/Row.js';
import InputField from '../../components/InputField/InputField.js';
import Pagination from '../../components/Pagination/Pagination.js';

const Live = () => {
    const [matches, setMatches] = useState<Fixture[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const matchesPerPage: number = 10;


    const onSearchTermChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    useEffect(() => {
        const fetchMatches = () => {
            setIsLoading(true);
            APIfootball.getLiveMatches().then((data: Fixture[]) => {
                setMatches(data);
            }).catch((err: any) => {
                console.log(err);
                setError('Failed to load matches');
            }).finally(() => {
                setIsLoading(false);
            });
        }

        fetchMatches();

    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }


    const filteredMatches = matches.filter(match =>
        match.teams.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.teams.away.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastPageIndex = currentPage * matchesPerPage;
    const firstPageIndex = lastPageIndex - matchesPerPage;
    const currentSlicedPage = filteredMatches.slice(firstPageIndex, lastPageIndex);

    return (
        <div className='flex flex-col m-auto w-full rounded-md bg-slate-300 p-2'>
            <InputField onSearchTermChange={onSearchTermChange} placeholder='Search...' />

            <h1 className='p-1'>Live: {filteredMatches.length}</h1>

            <div className='w-full rounded-md'>
                {filteredMatches.length > 0
                    ? currentSlicedPage.map((m) => (
                        <Link to={`/match-details/${m.fixture.id}`} key={m.fixture.id}>
                            <Row {...m} />
                        </Link>
                    ))
                    : searchTerm
                        ? 'No matches found for your search'
                        : 'There are no live matches'
                }
                {filteredMatches.length > 10 ? <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalMatches={filteredMatches.length} matchesPerPage={matchesPerPage} /> : null}
            </div>
        </div>
    )
}

export default Live;