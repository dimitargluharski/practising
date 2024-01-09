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

                let homeScore = 0;
                let awayScore = 0;

                // Combine home and away events into a single array
                const allEvents = [...m.events];

                // Sort events by elapsed time
                allEvents.sort((a, b) => a.time.elapsed - b.time.elapsed);

                return (
                    <div key={m.id} className="flex flex-col md:flex-row justify-between space-x-4">
                        <div className="w-full md:w-1/2">
                            <h2>{homeTeamName} Events</h2>
                            {allEvents.map((event: Event) => {
                                if (event.team.name === homeTeamName) {
                                    if (event.type === 'Goal') homeScore++;
                                    return (
                                        <div key={event.time.elapsed} className="mb-2 flex items-center">
                                            {event.type === 'Goal' && <IoFootballSharp className="mr-2" />}
                                            {event.type === 'Card' && <GiCardPlay className="mr-2" />}
                                            <p className="m-0">
                                                {event.time.elapsed}' - {getEventDetail(event)} by {event.player.name ? event.player.name : 'unknown player'}
                                                {event.assist && event.assist.name && <span className="text-gray-500"> (Assist: {event.assist.name})</span>}
                                                {/* {event.type === 'Goal' && <strong className="ml-2">({homeScore}-{awayScore})</strong>} */}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>

                        <div className="w-full md:w-1/2">
                            <h2>{awayTeamName} Events</h2>
                            {allEvents.map((event: Event) => {
                                if (event.team.name === awayTeamName) {
                                    if (event.type === 'Goal') awayScore++;
                                    return (
                                        <div key={event.time.elapsed} className="mb-2 flex items-center">
                                            {event.type === 'Goal' && <IoFootballSharp className="mr-2" />}
                                            {event.type === 'Card' && <GiCardPlay className="mr-2" />}
                                            <p className="m-0">
                                                {event.time.elapsed}' - {getEventDetail(event)} by {event.player.name ? event.player.name : 'unknown player'}
                                                {event.assist && event.assist.name && <span className="text-gray-500"> (Assist: {event.assist.name})</span>}
                                                {/* {event.type === 'Goal' && <strong className="ml-2">({homeScore}-{awayScore})</strong>} */}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MatchEvents;