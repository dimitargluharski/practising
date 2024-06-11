import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import { Team } from "../Team/Team";
import { Time } from "../Time/Time";
import { Result } from "../Result/Result";

interface MatchCardProps {
  matchData: any; // @TODO: change any type
  handleToggleSlideoutComponent: () => void;
}

export const MatchCardComponent = ({ matchData, handleToggleSlideoutComponent }: MatchCardProps): JSX.Element => {
  const { teams: { home, away }, goals, fixture: { status: { elapsed } } } = matchData;

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex items-center hover:cursor-pointer overflow-hidden shadow rounded-md p-2 gap-x-2 m-1 ${theme === 'light' ? 'rounded-md text-white bg-slate-800' : 'bg-slate-200 text-black'}`} onClick={handleToggleSlideoutComponent}>
      <Time time={elapsed} />
      <Result goals={goals} />

      <div className="truncate">
        <Team name={home.name} logo={home.logo} />
        <Team name={away.name} logo={away.logo} />
      </div>
    </div>
  )
}

export const MatchCard = React.memo(MatchCardComponent);