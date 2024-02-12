import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Row from '../../components/Row/Row';

import Calendar from '../../components/Calendar/Calendar';
import { getCurrentDate, getFixturesByDate } from '../../services/football';
import Pagination from '../../components/Pagination/Pagination';

const Fixtures = () => {
    const [state, setState] = useState({
        clickedDate: getCurrentDate(),
        fixtures: []
    });
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
        <div className='flex'>
            <div style={{ width: '500px', marginRight: '5px' }}>
                {/* <h2>Fixtures for {state.clickedDate}</h2> */}

                {result.map((fixture: any) => (
                    <Link key={fixture.id} to={`/match-details/${fixture.fixture.id}`}>
                        <Row {...fixture} />
                    </Link>
                ))}

                <Pagination
                    currentPage={currentPage}
                    totalMatches={state.fixtures.length}
                    matchesPerPage={matchesPerPage}
                    setCurrentPage={setCurrentPage}
                />

            </div>

            <div>
                <Calendar handleClick={handleClick} />
            </div>

        </div>
    )
}

export default Fixtures;