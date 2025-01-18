import { useContext } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";

import { showPathname } from "../utils/show-pathname";
import { DataContext } from "../context/DataContext";
import { Tab } from "./DashboardPage/Tab/Tab";

export const DashboardPage = () => {
  const data = useContext(DataContext);

  const urlAddress = location
  const pageName = showPathname(urlAddress);

  // total games
  const totalGames = data?.data;

  // finished games
  const finishedGameStatuses = [
    'Match Finished',
    "Match Suspended",
    "Match Interrupted"
  ];
  const finishedGames = data?.data.filter((game) => finishedGameStatuses.includes(game.fixture.status.long));

  // games in play
  const gamesInPlayStatuses = [
    "First Half",
    "Kick Off",
    "Halftime",
    "Second Half",
    "2nd Half Started",
    "Extra Time",
    "Break Time",
    "Penalty In Progress",
  ];
  const gamesInPlay = data?.data.filter((game) => gamesInPlayStatuses.includes(game.fixture.status.long));

  // sort countries
  const mapAllCountries = data?.data.map((country) => country.league.country);
  const setUniqueCountries = [...new Set(mapAllCountries)];
  const sortUniqueCountries = setUniqueCountries.sort((a, b) => a.localeCompare(b));

  // not started yet
  const gamesNotStarted = data?.data.filter((game) => game.fixture.status.long === 'Not Started');
  console.log(gamesNotStarted)

  return (
    <div className="w-full">
      <header className="flex flex-col">
        <div className="text-3xl">
          {pageName}
        </div>

        <div className="w-full bg-slate-300 p-5">
          <div className="w-full grid grid-cols-5 gap-5">
            <Tab className="bg-slate-100 flex items-center p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FaPeopleGroup className="w-10 h-10" />

                <div className="flex flex-col">
                  <div className="text-2xl font-bold">
                    {totalGames?.length}
                  </div>
                  <div className="text-gray-400">
                    games
                  </div>
                </div>
              </div>
            </Tab>

            <Tab className="bg-slate-100 flex items-center p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FaGlobeAmericas className="w-10 h-10" />

                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {sortUniqueCountries.length}
                  </span>
                  <span className="text-gray-400">
                    countries
                  </span>
                </div>
              </div>
            </Tab>

            <Tab className="bg-slate-100 flex items-center p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FaFlagCheckered className="w-10 h-10" />

                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {finishedGames?.length}
                  </span>
                  <span className="text-gray-400">
                    finished
                  </span>
                </div>
              </div>
            </Tab>

            <Tab className="bg-slate-100 flex items-center p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FaPlay className="w-10 h-10" />

                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {gamesInPlay?.length}
                  </span>
                  <span className="text-gray-400">
                    inplay
                  </span>
                </div>
              </div>
            </Tab>

            <Tab className="bg-slate-100 flex items-center p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FiClock className="w-10 h-10" />

                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {gamesNotStarted?.length}
                  </span>
                  <span className="text-gray-400">
                    not started
                  </span>
                </div>
              </div>

            </Tab>
          </div>
        </div>
      </header>
    </div>
  )
}