import { useEffect, useState } from 'react';

import * as APIfootball from '../../services/football.js'
import { Fixture } from '../../types/MatchProps.js';
import Row from '../../components/Row/Row.js';
import InputField from '../../components/InputField/InputField.js';

const Live = () => {
    const [matches, setMatches] = useState<Fixture[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredMatches = matches.filter(match =>
        match.teams.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.teams.away.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        APIfootball.getLiveMatches().then((data: Fixture[]) => {
            setIsLoading(true);
            setMatches(data);
            setIsLoading(false);
        }).catch((err: any) => console.log(err));
    }, []);

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className='flex flex-col m-auto w-[720px] rounded-md'>
            <InputField onSearchTermChange={setSearchTerm} />

            <div className='w-full rounded-md'>
                {filteredMatches.length > 0
                    ? filteredMatches.map((m) => (
                        <Row key={m.fixture.id} {...m} />
                    ))
                    : 'there is no live matches'
                }
            </div>
        </div>
    )
}

export default Live;