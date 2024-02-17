import { Fixture } from "../../types/MatchProps";
import Date from "../Date/Date";
import TeamLogo from "../TeamLogo/TeamLogo";
import TeamName from "../TeamName/TeamName";

import { FaChevronRight } from "react-icons/fa";

const Row = ({ fixture, teams, goals }: Fixture) => {
    return (
        <div className="flex items-center shadow-lg relative rounded-md p-2 my-1 w-full bg-slate-600 text-white hover:bg-slate-900 transition-all ease-linear">
            <div className="mx-5">
                <Date date={fixture.date} status={fixture.status} />
            </div>

            <div className="flex flex-col mr-2">
                <div>{goals.home}</div>
                <div>{goals.away}</div>
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

            <div className="absolute right-5">
                <FaChevronRight />
            </div>
        </div>
    );
}

export default Row;