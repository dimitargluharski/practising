import { Fixture } from '../../types/MatchProps';

const Match = (props: Fixture) => {
    const { teams, goals } = props;
    return (
        <div className='bg-slate-500'>
            {teams.home.name} | {goals.home} - {goals.away} | {teams.away.name}
        </div>
    )
}

export default Match;