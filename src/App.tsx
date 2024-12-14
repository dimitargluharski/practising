import { useEffect, useState } from "react";
import { getAllGames } from "./services/football";
import { IoMdGlobe } from "react-icons/io";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaFlagCheckered } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllGames().then((res) => setData(res)).catch((err) => console.log('err', err));
  }, []);

  // TODO: Write proper types
  const countriesCount = data.map((c) => c.league.country);
  const filterUniqueCountries = [...new Set(countriesCount)];

  const countFinishedGames = data.filter((g) => 'Match Finished' === g.fixture.status.long);
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

  const countPlayingGames = data.filter((g) => playingStatuses.includes(g.fixture.status.long));

  return (
    <div className="flex flex-col mx-auto w-[1024px]">
      {/* header */}
      <div className="flex p-4 shadow-sm">
        <div className="grid grid-cols-2">
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

      {/* render matches and filters */}
      <div className="p-4">
        {data.map((g, index) => (
          <div key={index}>
            {g.teams.home.name} - {g.teams.away.name}
          </div>
        ))}
      </div>
    </div >
  );
};

export default App;