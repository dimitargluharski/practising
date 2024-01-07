import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

import Panel from '../../components/Panel/Panel.js';
import * as APIfootball from '../../services/football.js'
import { Fixture } from '../../types/MatchProps.js';


const MatchDetails = () => {
    const [match, setMatch] = useState<Fixture[]>([]);
    const { matchId } = useParams();

    useEffect(() => {
        APIfootball.getFixtureDetails(matchId).then((data: Fixture[]) => {
            setMatch(data);
        }).catch(err => console.log(err));
    }, [matchId])

    console.log(match);

    return (
        <div>
            <div>
                <Link to="/" className='p-2 mt-2 mx-2 flex items-center shadow-md rounded-md font-semibold bg-slate-300'>
                    <IoMdArrowRoundBack />
                    <span>Go Back</span>
                </Link>
            </div>
            <Panel title='details'>
                {match[0]?.fixture?.venue?.name !== null ? match[0]?.fixture?.venue?.name : 'N/A'}
                {/* league name */}
            </Panel>

            <Panel title='standinds'>
                klasirane
            </Panel>
        </div>
    )
}

export default MatchDetails;