import { useCallback, useEffect, useState } from "react";
import { getAllGames } from "./services/football";
import { IoMdGlobe } from "react-icons/io";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaFlagCheckered, FaHeart } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Swal from 'sweetalert2'
import { IoIosClose } from "react-icons/io";
import { format } from "date-fns";

import moment from "moment";
import { CalendarComponent } from "./components/Calendar/Calendar";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [favourites, setFavourites] = useState<object[]>([]);
  const [likedMatches, setLikedMatches] = useState<{ [key: string]: boolean }>({});

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const [query, setQuery] = useState<string>("");
  const [calendarDate, setCalendarDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

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
  const filteredAllData = data.filter(
    (g) =>
      // @ts-ignore
      g.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      g.teams.away.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChangeCalendarDay = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    setCalendarDate(formattedDate);
  };

  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleAddFavouriteMatch = (g: any) => {
    const matchId = g.fixture.id;

    const matchInformation = {
      date: g.date,
      matchStatus: g.fixture.status.elapsed,
      teams: g.teams,
      goals: g.goals,
    };

    // @ts-ignore
    if (!favourites.some((match) => matchId === match.teams.home.id)) {
      const updatedFavourites = [...favourites, matchInformation];
      setFavourites(updatedFavourites);
      saveToLocalStorage("favourites", updatedFavourites);
    }

    setLikedMatches((prev) => {
      const updatedLikes = { ...prev, [matchId]: true };
      saveToLocalStorage("likedMatches", updatedLikes);

      return updatedLikes;
    });

    Swal.fire({
      text: "Match has been added to your favourites!",
      position: "bottom-right",
      toast: true,
      timer: 2500,
      icon: "success",
      showConfirmButton: false,
    });
  };

  const handleRemoveFavouriteMatch = (arg: any) => {
    const filteredItem = favourites.filter((item) => item !== arg);

    setFavourites(filteredItem);
    saveToLocalStorage("favourites", filteredItem);

    Swal.fire({
      text: 'Match has been removed!',
      position: "bottom-right",
      backdrop: false,
      toast: true,
      timer: 2500,
      icon: 'error',
      animation: false,
      showConfirmButton: false,
    });
  };

  const handleToggleLike = (matchId: string) => {
    setLikedMatches((prev) => {
      const updatedLikes = { ...prev, [matchId]: !prev[matchId] };
      localStorage.setItem("likedMatches", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const isMatchLiked = (matchId: string) => likedMatches[matchId];

  const fetchGames = useCallback(() => {
    getAllGames(calendarDate)
      .then((res) => setData(res))
      .catch((err) => console.error("Error fetching games:", err));
  }, [calendarDate]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    // Load likedMatches and favourites from localStorage on component mount
    const storedFavourites = localStorage.getItem('favourites');
    const storedLikedMatches = localStorage.getItem('likedMatches');

    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }

    if (storedLikedMatches) {
      setLikedMatches(JSON.parse(storedLikedMatches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
    localStorage.setItem('likedMatches', JSON.stringify(likedMatches));
  }, [favourites, likedMatches]);



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

      {/* search input field */}
      <div className="p-4">
        <input type="text" className="w-full p-2 shadow-lg focus:shadow-lg rounded-sm" placeholder="Search..." onChange={handleInputChangeHandler} value={query} />
      </div>

      {/* adds favourite matches */}
      <div className="p-4 shadow-lg rounded-sm w-full">
        {favourites.length === 0
          ? `You don't have any favourite matches yet.`
          : `${favourites.length} matches in the list.`}

        <div className="flex flex-wrap gap-5">
          {favourites.length > 0 ? favourites.map((match, index) => (
            <div key={index} className="flex items-center gap-1 border border-slate-500 rounded-xl relative p-2">
              <div className="absolute -top-3 -right-3 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleRemoveFavouriteMatch(match)}>
                <IoIosClose className="w-5 h-5" />
              </div>
              <div>
                {/* @ts-ignore */}
                {match?.matchStatus === null ? match?.date : match?.matchStatus}
              </div>
              <div className="flex flex-col">
                <span>
                  {/* @ts-ignore */}
                  {match.goals.home}
                </span>
                <span>
                  {/* @ts-ignore */}
                  {match.goals.away}
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">

                  {/* @ts-ignore */}
                  <img className="w-5 h-5" src={match.teams.home.logo} alt="" />
                  {/* @ts-ignore */}
                  {match.teams.home.name}
                </div>

                <div className="flex items-center gap-1">
                  {/* @ts-ignore */}
                  <img className="w-5 h-5" src={match.teams.away.logo} alt="" />
                  {/* @ts-ignore */}
                  {match.teams.away.name}
                </div>
              </div>
            </div>
          )) : <>
            <p>No matches added yet.</p></>}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-5 mt-4">
          <section className="shadow-md rounded-md p-2">
            <div className="font-bold uppercase">All</div>
            {filteredAllData.length > 0 ? filteredAllData.map((g, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="cursor-pointer" onClick={() => {
                  handleToggleLike(g);
                  handleAddFavouriteMatch(g)
                }}>
                  {/* @ts-ignore */}
                  {isMatchLiked[g.fixture.id] ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="gray" />
                  )}
                </div>

                {/* @ts-ignore */}
                <div>
      <div>
        <div className="grid grid-cols-3 gap-5 mt-4">
          <section className="shadow-md rounded-md p-2">
            <div className="font-bold uppercase">All</div>
            {filteredAllData.length > 0 ? (
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
