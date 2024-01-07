import { Fixture } from "../../types/MatchProps";
import Date from "../Date/Date";
import TeamLogo from "../TeamLogo/TeamLogo";
import TeamName from "../TeamName/TeamName";


const Row = ({ fixture, teams }: Fixture) => {
    return (
        <div className="flex items-center shadow-lg rounded-md p-2 my-1 w-full bg-slate-400 hover:scale-105">
            <div className="mx-5">
                <Date date={fixture.date} status={fixture.status} />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center">
                    <TeamLogo logoUrl={teams.home.logo} />
                    <TeamName name={teams.home.name} />
                </div>

                <div className="flex items-center">
                    <TeamLogo logoUrl={teams.away.logo} />
                    <TeamName name={teams.away.name} />
                </div>
            </div>
        </div>
    );
}

export default Row;