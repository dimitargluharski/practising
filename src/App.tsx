import { useContext, useState } from "react";
import { IoMdGlobe } from "react-icons/io";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaFlagCheckered } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";

import moment from "moment";
import { CalendarComponent } from "./components/Calendar/Calendar";
import { DataContext, DataContextProps } from "./context/DataContext";

const App = () => {
  const [query, setQuery] = useState<string>("");
  // @ts-ignore
  const { data, handleChangeCalendarDay, calendarDate } = useContext<DataContextProps | undefined>(DataContext);


  // @ts-ignore
  const countriesCount = data.map((c) => c.league.country);
  const filterUniqueCountries = [...new Set(countriesCount)];

  // @ts-ignore
  const countFinishedGames = data.filter(
    // @ts-ignore
    (g) => "Match Finished" === g.fixture.status.long
  );

  // @ts-ignore
  const notStartedGames = data.filter(
    // @ts-ignore
    (g) => "Not Started" === g.fixture.status.long
  );

  const playingStatuses = [
    "First Half",
    "Kick Off",
    "Halftime",
    "Second Half",
    "2nd Half Started",
    "Extra Time",
    "Break Time",
    "Penalty In Progress",
    "Match Suspended",
    "Match Interrupted",
  ];

  // @ts-ignore
  const countPlayingGames = data.filter((g) =>
    // @ts-ignore
    playingStatuses.includes(g.fixture.status.long)
  );

  const handleInputChangeHandler = (event: any) => {
    const { value } = event.target;

    setQuery(value);
  };

  const filteredPlayingGames = countPlayingGames.filter(
    (g: any) =>
      // @ts-ignore
      g.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      g.teams.away.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFinishedGames = countFinishedGames.filter(
    (g: any) =>
      // @ts-ignore
      g.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      g.teams.away.name.toLowerCase().includes(query.toLowerCase())
  );

  // @ts-ignore
  const filteredAllData = data.filter(
    (g: any) =>
      // @ts-ignore
      g.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      g.teams.away.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col gap-5">
      <div>
        <input
          type="text"
          className="w-full p-2 shadow-lg focus:shadow-lg rounded-sm"
          placeholder="Search..."
          onChange={handleInputChangeHandler}
          value={query}
        />
      </div>

      <div>
        <div className="flex gap-5">
          <div className="grid grid-cols-3 gap-5 w-2/3">
            <div className="flex items-center p-6 shadow-lg rounded-lg bg-white border border-gray-200">
              <PiSoccerBallFill className="w-7 h-7 mr-3 text-blue-500" />
              <span className="text-xl font-bold">{data.length} games</span>
            </div>

            <div className="flex items-center p-6 shadow-lg rounded-lg bg-white border border-gray-200">
              <IoMdGlobe className="w-7 h-7 mr-3 text-green-500" />
              <span className="text-xl font-bold">
                {filterUniqueCountries.length} countries
              </span>
            </div>

            <div className="flex items-center p-6 shadow-lg rounded-lg bg-white border border-gray-200">
              <FaFlagCheckered className="w-7 h-7 mr-3 text-red-500" />
              <span className="text-xl font-bold">
                {countFinishedGames.length} finished
              </span>
            </div>

            <div className="flex items-center p-6 shadow-lg rounded-lg bg-white border border-gray-200">
              <LuClock className="w-7 h-7 mr-3 text-yellow-500" />
              <span className="text-xl font-bold">
                {notStartedGames.length} not started
              </span>
            </div>

            <div className="flex items-center p-6 shadow-lg rounded-lg bg-white border border-gray-200">
              <FaPlay className="w-7 h-7 mr-3 text-purple-500" />
              <span className="text-xl font-bold">
                {countPlayingGames.length} games in play
              </span>
            </div>
          </div>

          <div className="bg-slate-300 p-2 rounded-lg border border-gray-300 w-1/3 flex items-center justify-center">
            <CalendarComponent
              calendarDate={calendarDate}
              handleChangeCalendarDay={handleChangeCalendarDay}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-5 mt-4">
          <section className="shadow-md rounded-md p-2">
            <div className="font-bold uppercase">All</div>
            {filteredAllData.length > 0 ? (
              // @ts-ignore
              filteredAllData.map((g, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* @ts-ignore */}
                  <div>
                    {/* @ts-ignore */}
                    {moment.utc(g.fixture.date).local().format("HH:mm")}
                  </div>

                  <div className="w-5 h-5">
                    {/* @ts-ignore */}
                    <img
                      className="h-5 w-5"
                      // @ts-ignore
                      src={g.league.flag}
                      // @ts-ignore
                      alt={g.league.flag}
                      // @ts-ignore
                      title={g.league.country}
                    />
                  </div>

                  <div>
                    {/* @ts-ignore */}
                    {g.teams.home.name} - {g.teams.away.name}
                  </div>
                </div>
              ))
            ) : (
              <div>No results found.</div>
            )}
          </section>

          <section className="shadow-md rounded-md p-2">
            <div className="flex items-center">
              <div className="h-2 w-2 animate-pulse ease-in 300ms bg-red-500 rounded mr-1"></div>
              <span className="text-red-500 font-bold uppercase">Live</span>
            </div>

            {filteredPlayingGames.length > 0 ? (
              // @ts-ignore
              filteredPlayingGames.map((g, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div>
                    {/* @ts-ignore */}
                    {g.fixture.status.elapsed}
                  </div>

                  <div className="h-5 w-5">
                    {/* @ts-ignore */}
                    <img
                      className="w-5 h-5"
                      // @ts-ignore
                      src={g.league.flag}
                      // @ts-ignore
                      alt={g.league.flag}
                      // @ts-ignore
                      title={g.league.country}
                    />
                  </div>

                  <div>
                    {/* @ts-ignore */}
                    {g.teams.home.name} {g.goals.home}
                  </div>
                  <span>-</span>
                  <div>
                    {/* @ts-ignore */}
                    {g.goals.away} {g.teams.away.name}
                  </div>
                </div>
              ))
            ) : (
              <div>No results found.</div>
            )}
          </section>

          <section className="shadow-md rounded-md p-2">
            <div className="text-gray-500 font-bold uppercase">Finished</div>
            {filteredFinishedGames.length > 0 ? (
              // @ts-ignore
              filteredFinishedGames.map((g, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5">
                    {/* @ts-ignore */}
                    <img
                      className="h-5 w-5"
                      // @ts-ignore
                      src={g.league.flag}
                      // @ts-ignore
                      alt={g.league.flag}
                      // @ts-ignore
                      title={g.league.country}
                    />
                  </div>

                  <div>
                    {/* @ts-ignore */}
                    {g.teams.home.name} {g.goals.home} - {g.goals.away}{" "}
                    {/* @ts-ignore */}
                    {g.teams.away.name}
                  </div>
                </div>
              ))
            ) : (
              <div>No results found.</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
