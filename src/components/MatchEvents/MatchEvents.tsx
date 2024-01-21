import { IoFootballSharp } from "react-icons/io5";
import { GiCardPlay } from "react-icons/gi";
// @ts-ignore
import { Fixture, Event } from "../../types/MatchProps";
import { getEventDetail } from '../../utils/eventUtils.ts';
import { FaArrowsRotate } from "react-icons/fa6";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { ImCancelCircle } from "react-icons/im";

interface MatchEventsProps {
    match: Fixture[];
}

const MatchEvents = ({ match }: MatchEventsProps) => {
    return (
        <div>
            {match.map((m: Fixture) => {
                const homeTeamName = m.teams.home.name;
                const awayTeamName = m.teams.away.name;

                let homeScore = 0;
                let awayScore = 0;
                // @ts-ignore
                const allEvents = [...m.events];

                allEvents.sort((a, b) => a.time.elapsed - b.time.elapsed);

                return (
                    <div key={uuidv4()} className="flex flex-col md:flex-row justify-between space-x-4">
                        <div className="w-full md:w-1/2">
                            <div className="flex justify-center">
                                <h2>{homeTeamName} Events</h2>
                            </div>
                            {allEvents.map((event: Event) => {
                                if (event.team.name === homeTeamName) {
                                    if (event.type === 'Goal') homeScore++;
                                    return (
                                        <div key={uuidv4()} className="mb-2 flex items-center italic">
                                            {event.type === 'Goal' && <IoFootballSharp className="mr-2" />}
                                            {event.type === 'Card' && <GiCardPlay className="mr-2" />}
                                            {event.type === 'subst' && <FaArrowsRotate className="mr-2" />}
                                            {event.type === 'GoalDisallowed' && <><IoFootballSharp className="mr-2" /><ImCancelCircle className="mr-2" /></>}
                                            <p className="m-0">
                                                {event.time.elapsed}' - {event.type === 'subst' ? `${event.assist.name} out, ${event.player.name} in-game` : `${getEventDetail(event)} by ${event.player.name ? event.player.name : 'unknown player'}`}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="flex justify-center">
                                <h2>{awayTeamName} Events</h2>
                            </div>
                            {allEvents.map((event: Event) => {
                                if (event.team.name === awayTeamName) {
                                    if (event.type === 'Goal') awayScore++;
                                    return (
                                        <div key={uuidv4()} className="mb-2 flex items-center italic">
                                            {event.type === 'Goal' && <IoFootballSharp className="mr-2" />}
                                            {event.type === 'Card' && <GiCardPlay className="mr-2" />}
                                            {event.type === 'subst' && <FaArrowsRotate className="mr-2" />}
                                            {event.type === 'GoalDisallowed' && <><IoFootballSharp className="mr-2" /><ImCancelCircle className="mr-2" /></>}
                                            <p className="m-0">
                                                {event.time.elapsed}' - {event.type === 'subst' ? `${event.assist.name} out, ${event.player.name} in-game` : `${getEventDetail(event)} by ${event.player.name ? event.player.name : 'unknown player'}`}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="flex justify-center italic font-bold">
                {match[0]?.goals.home} - {match[0]?.goals.away} ({match[0]?.fixture.status.elapsed}')
            </div>
        </div>
    );
};

export default MatchEvents;