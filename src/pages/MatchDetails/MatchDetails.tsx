import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineStadium } from "react-icons/md";
import { GiWhistle } from "react-icons/gi";
import { MdOutlineCalendarMonth } from "react-icons/md";

import Panel from '../../components/Panel/Panel.js';
// @ts-ignore
import * as APIfootball from '../../services/football.js'
import { Fixture } from '../../types/MatchProps.js';
import MatchEvents from '../../components/MatchEvents/MatchEvents.js';
import LineupGrid from '../../components/LineupGrid/LineupGrid.js';
import Prediction from '../../components/Prediction/Prediction.js';
import Weather from '../../components/Weather/Weather.js';


const MatchDetails = () => {
    const [match, setMatch] = useState<Fixture[]>([]);
    const { matchId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        APIfootball.getFixtureDetails(matchId).then((data: Fixture[]) => {
            setMatch(data);
            setIsLoading(false);
            // @ts-ignore
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }, [matchId])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // console.log(match)

    return (
        <div>
            <div>
                <Link to="/" className='p-2 mt-2 mx-2 flex items-center shadow-md rounded-md font-semibold bg-slate-300'>
                    <IoMdArrowRoundBack />
                    <span>Go Back</span>
                </Link>
            </div>
            <Panel title='details'>

                <div className='flex items-center'>
                    <div className='mr-2'>
                        <MdOutlineStadium />
                    </div>

                    <div className='mr-2'>
                        {match[0]?.fixture?.venue?.name !== null ? match[0]?.fixture?.venue?.name : 'unknown'}
                    </div>

                    <div>
                        {`${match[0]?.fixture?.venue?.city !== null ? `(${match[0]?.fixture?.venue?.city})` : 'unknown'}`}
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='mr-2'>
                        <GiWhistle />
                    </div>
                    {match[0]?.fixture?.referee !== null ? match[0]?.fixture?.referee : 'unknown'}
                </div>

                <div className='flex items-center'>
                    <div className='mr-2'>
                        <MdOutlineCalendarMonth />
                    </div>
                    {match[0]?.league.round} - {match[0]?.league.name}
                </div>

                <div>
                    {/* @ts-ignore */}
                    <Weather city={match[0]?.fixture.venue.city || 'N/A'} />
                </div>
            </Panel>

            <Panel title='match predictions'>
                <Prediction fixture={match[0]?.fixture.id} />
            </Panel>

            <Panel title='match events'>
                <MatchEvents match={match} />
            </Panel>

            <Panel title='lineups'>
                {/* @ts-ignore */}
                <LineupGrid lineups={match[0]?.lineups} />
            </Panel>
        </div>
    )
}

export default MatchDetails;