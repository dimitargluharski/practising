import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Row from '../../components/Row/Row';

import { getCurrentDate, getFixturesByDate } from '../../services/football';

const Fixtures = () => {
    const [state, setState] = useState({
        clickedDate: getCurrentDate(),
        fixtures: []
    });

    // @ts-ignore
    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 10;

    const handleClick = async (day: any) => {
        const fixtures = await getFixturesByDate(day.date);
        setState({
            clickedDate: day.date,
            fixtures
        });
    };

    const lastIndex = currentPage * matchesPerPage;
    const firstIndex = lastIndex - matchesPerPage;
    const result = state.fixtures.slice(firstIndex, lastIndex);

    useEffect(() => {
        handleClick({ date: state.clickedDate });
    }, []);

    return (
        <div className='w-full p-1'>
            {result.map((fixture: any) => (
                <Link key={fixture.id} to={`/match-details/${fixture.fixture.id}`}>
                    <Row {...fixture} />
                </Link>
            ))}
        </div>
    )
}

export default Fixtures;