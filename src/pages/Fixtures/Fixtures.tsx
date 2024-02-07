import { useState, useEffect } from 'react';

import Calendar from '../../components/Calendar/Calendar';
import { getCurrentDate, getFixturesByDate } from '../../services/football';

const Fixtures = () => {
    const [state, setState] = useState({
        clickedDate: getCurrentDate(),
        fixtures: []
    });

    const handleClick = async (day: any) => {
        const fixtures = await getFixturesByDate(day.date);
        setState({
            clickedDate: day.date,
            fixtures
        });
    };

    useEffect(() => {
        handleClick({ date: state.clickedDate });
    }, []);

    return (
        <div>
            <Calendar handleClick={handleClick} />

            <div>
                <h2>Fixtures for {state.clickedDate}</h2>

                <ul>
                    {state.fixtures.map((fixture: any) => (
                        <li key={fixture.id}>
                            {fixture.teams.home.name} vs {fixture.teams.away.name}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default Fixtures;