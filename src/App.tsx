import { useEffect, useState } from "react";
import { getAllGames } from "./services/football";
import { IoMdGlobe } from "react-icons/io";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaFlagCheckered } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  // TODO: Write proper types
  // @ts-ignore
  const countriesCount = data.map((c) => c.league.country);
  const filterUniqueCountries = [...new Set(countriesCount)];

  // @ts-ignore
  const countFinishedGames = data.filter((g) => 'Match Finished' === g.fixture.status.long);

  // @ts-ignore
  const notStartedGames = data.filter((g) => 'Not Started' === g.fixture.status.long);

  const playingStatuses = [
    'First Half',
    'Kick Off',
    'Halftime',
    'Second Half',
    '2nd Half Started',
    'Extra Time',
    'Break Time',
    'Penalty In Progress',
    'Match Suspended',
    'Match Interrupted'
  ];

  // @ts-ignore
  const countPlayingGames = data.filter((g) => playingStatuses.includes(g.fixture.status.long));

  const handleInputChangeHandler = (event: any) => {
    const { value } = event.target;

    setQuery(value);
  };

  const filteredPlayingGames = countPlayingGames.filter(
    (g) =>
      // @ts-ignore
      g.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      g.teams.away.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFinishedGames = countFinishedGames.filter(
    (g) =>
      // @ts-ignore
      g.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      g.teams.away.name.toLowerCase().includes(query.toLowerCase())
  );

  // @ts-ignore
  const filteredAllData = data.filter((g) => g.teams.home.name.toLowerCase().includes(query.toLowerCase()) || g.teams.away.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    getAllGames(formattedDate).then((res) => setData(res)).catch((err) => console.log('err', err));
  }, []);

  return (
    <div className="grid grid-col-6">
      <div className="p-4">
        <div className="grid grid-cols-5">
          <div className="flex items-center p-4 shadow-lg rounded-md">
            <PiSoccerBallFill className="w-5 h-5" />
            {data.length} games today
          </div>

          <div className="flex items-center p-4 shadow-lg rounded-md">
            <IoMdGlobe className="w-5 h-5" />
            {filterUniqueCountries.length} countries
          </div>

          <div className="flex items-center p-4 shadow-lg rounded-md">
            <FaFlagCheckered className="w-5 h-5" />
            {countFinishedGames.length} finished
          </div>

          <div className="flex items-center p-4 shadow-lg rounded-md">
            <LuClock className="w-5 h-5" />
            {notStartedGames.length} not started
          </div>

          <div className="flex items-center p-4 shadow-lg rounded-md">
            <FaPlay className="w-5 h-5 " />
            {countPlayingGames.length} games in play
          </div>
        </div>

        <div>
          {/* calendar */}
        </div>
      </div>

      {/* search input field */}
      <div className="p-4">
        <input type="text" className="w-full p-2 shadow-lg focus:shadow-lg rounded-sm" placeholder="Search..." onChange={handleInputChangeHandler} value={query} />
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-5 mt-4">
          <section className="shadow-md rounded-md p-2">
            <div>All</div>
            {filteredAllData.length > 0 ? filteredAllData.map((g, index) => (
              <div key={index}>
                {/* @ts-ignore */}
                {g.teams.home.name} - {g.teams.away.name}
              </div>
            )) : (
              <div>
                No results found.
              </div>
            )}
          </section>

          <section className="shadow-md rounded-md p-2">
            <div className="flex items-center">
              <div className="h-2 w-2 animate-pulse ease-in 300ms bg-red-500 rounded mr-1"></div>
              <span className="text-red-500 font-bold uppercase">
                Live
              </span>
            </div>

            {filteredPlayingGames.length > 0 ? filteredPlayingGames.map((g, index) => (
              <div key={index} className="flex">
                <div className="mr-5">
                  {/* @ts-ignore */}
                  {g.fixture.status.elapsed}
                </div>

                <div className="flex justify-center">
                  <div>
                    {/* @ts-ignore */}
                    {g.teams.home.name} {g.goals.home}
                  </div>
                  <span>
                    -
                  </span>
                  <div>
                    {/* @ts-ignore */}
                    {g.goals.away} {g.teams.away.name}
                  </div>
                </div>

              </div>
            )) : (
              <div>
                No results found.
              </div>
            )}
          </section>

          <section className="shadow-md rounded-md p-2">
            <div>Finished</div>
            {filteredFinishedGames.length > 0 ? filteredFinishedGames.map((g, index) => (
              <div key={index}>
                {/* @ts-ignore */}
                {g.teams.home.name} - {g.teams.away.name}
              </div>
            )) : (
              <div>
                No results found.
              </div>
            )}
          </section>
        </div>
      </div>
    </div >
  );
};

export default App;