import { IoFootballSharp } from "react-icons/io5";
import { GiCardPlay } from "react-icons/gi";
import { Fixture, Event } from "../../types/MatchProps";
import { getEventDetail } from '../../utils/eventUtils.ts';

interface MatchEventsProps {
    match: Fixture[];
}

// @TODO: Separate in Home/Away Team Events Component!
const MatchEvents = ({ match }: MatchEventsProps) => {
    return (
        <div>
            {match.map((m: Fixture) => {
                const homeTeamName = m.teams.home.name;
                const awayTeamName = m.teams.away.name;

                const homeEvents = m.events.filter(event => event.team.name === homeTeamName);
                const awayEvents = m.events.filter(event => event.team.name === awayTeamName);

                let homeScore = 0;
                let awayScore = 0;

                return (
                    <div key={m.id} className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <h2>{homeTeamName} Events</h2>
                            {homeEvents.map((event: Event) => {
                                if (event.type === 'Goal') homeScore++;
                                return (
                                    <div key={event.time.elapsed} className="mb-2 flex items-center">
                                        {event.type === 'Goal' && <IoFootballSharp className="mr-2" />}
                                        {event.type === 'Card' && <GiCardPlay className="mr-2" />}
                                        <p className="m-0">
                                            {event.time.elapsed}' - {getEventDetail(event)} by {event.player.name}
                                            {event.assist && event.assist.name && <span className="text-gray-500"> (Assist: {event.assist.name})</span>}
                                            {event.type === 'Goal' && <strong className="ml-2">({homeScore}-{awayScore})</strong>}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="w-1/2">
                            <h2>{awayTeamName} Events</h2>
                            {awayEvents.map((event: Event) => {
                                if (event.type === 'Goal') awayScore++;
                                return (
                                    <div key={event.time.elapsed} className="mb-2 flex items-center">
                                        {event.type === 'Goal' && <IoFootballSharp className="mr-2" />}
                                        {event.type === 'Card' && <GiCardPlay className="mr-2" />}
                                        <p className="m-0">
                                            {event.time.elapsed}' - {getEventDetail(event)} by {event.player.name}
                                            {event.assist && event.assist.name && <span className="text-gray-500"> (Assist: {event.assist.name})</span>}
                                            {event.type === 'Goal' && <strong className="ml-2">({homeScore}-{awayScore})</strong>}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default MatchEvents;