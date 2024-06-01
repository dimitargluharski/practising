import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

import { Team } from "../Team/Team";
import { Time } from "../Time/Time";
import { Result } from "../Result/Result";

// @TODO: change any type
export const MatchCard = ({ matchData }: any) => {
  // fixture.venue.name
  const { teams: { home, away }, goals, fixture: { id, status: { elapsed } } } = matchData;

  const { theme } = useContext(ThemeContext);

  return (
    <Link to={`match-details/${id}`} className={`flex items-center shadow rounded-md p-2 gap-x-2 m-1 ${theme === 'light' ? 'rounded-md text-white bg-slate-800' : 'bg-slate-200 text-black'}`}>
      <Time time={elapsed} />
      <Result goals={goals} />

      <div>
        <Team name={home.name} logo={home.logo} />
        <Team name={away.name} logo={away.logo} />
      </div>
    </Link>
  )
}
