import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

// @TODO: change any type
export const MatchCard = ({ matchData }: any) => {
  const { teams: { home, away }, goals, fixture: { status: { elapsed } } } = matchData;

  const {theme} = useContext(ThemeContext);

  return (
    <div className={`flex items-center shadow rounded-md p-2 gap-x-2 m-1 ${theme === 'light' ? 'rounded-md text-white bg-slate-800' : 'bg-slate-200 text-black'}`}>
      <MatchStatus time={elapsed} />
      <Result goals={goals} />

      <div>
        <HomeTeam name={home.name} logo={home.logo} />
        <AwayTeam name={away.name} logo={away.logo} />
      </div>
    </div>
  )
}

const HomeTeam = ({ name, logo }: any) => {
  return (
    <div className="flex items-center gap-x-2">
      <Logo logo={logo} />
      {name}
    </div>
  )
}

const AwayTeam = ({ name, logo }: any) => {
  return (
    <div className="flex items-center gap-x-2">
      <Logo logo={logo} />
      {name}
    </div>
  )
}

const Logo = ({ logo }: any) => {
  return (
    <div className="h-4 w-4">
      <img src={logo} alt={logo} className="w-full h-full" />
    </div>
  )
}

const Result = ({ goals }: any) => {
  return (
    <div className="flex flex-col">
      <div>
        {goals.home}
      </div>
      <div>
        {goals.away}
      </div>
    </div>
  )
}

const MatchStatus = ({ time }: any) => {
  return (
    <div>
      {time}'
    </div>
  )
}