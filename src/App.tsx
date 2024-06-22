import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MdRefresh } from "react-icons/md";

import * as footballApi from '../src/services/football';

import { Home } from './pages/Home/Home';
import { InputText } from './components/InputText/InputText';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import { GridContext } from './contexts/GridContext';
import { MatchDetails } from './pages/MatchDetails/MatchDetails';
import { Streams } from './pages/Live/Streams';

import { Link } from 'react-router-dom'
import { StreamsContext } from './contexts/StreamsContext';

export interface ChangeEventProps {
  event: React.ChangeEvent<HTMLInputElement>;
  value: string
}

const App = () => {
  const [matches, setMatches] = useState<[]>([]);
  const { theme, handleChangeTheme, darkIconTheme, lightIconTheme } = useContext(ThemeContext);
  const { focusMode, grid, gridMode, handleChangeGridLayout } = useContext(GridContext);
  const [refreshList, setRefreshList] = useState([]);
  const [text, setText] = useState('');

  const { upcomingMatches } = useContext(StreamsContext) || { upcomingMatches: [] };

  const location = useLocation();

  useEffect(() => {
    footballApi.getLiveMatches()
      .then(data => setMatches(data)).catch((error) => console.log('error', error))
  }, [refreshList]);

  const handleRefreshList = () => {
    console.log('refresh');
    setRefreshList(matches);
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return (
    <div className={`${theme === 'light' ? 'bg-slate-600' : 'bg-slate-300'} flex flex-col w-full min-h-screen`}>
      <header className={`flex justify-center items-center p-2 ${theme === 'light' ? 'bg-slate-900' : 'bg-slate-400'} relative`}>
        <InputText handleChangeText={handleChangeText} value={text} />

        <div className='absolute top-3 right-[123px]'>
          {upcomingMatches.length > 0 ? <Link to="/live" className='bg-red-500 hover:bg-red-600 animate-pulse flex items-center uppercase rounded-md px-2'>
            <span className='text-white'>Live</span>
          </Link> : null}
        </div>

        <div className={`${theme === 'light' ? 'bg-yellow-500' : 'bg-slate-500'} flex items-center rounded-md absolute right-5`}>
          <button onClick={handleChangeTheme} className='text-white text-2xl p-1' title='Change theme'>
            {theme === 'light' ? darkIconTheme : lightIconTheme}
          </button>

          {location.pathname === "/" && <button className='text-white text-2xl p-1' onClick={handleRefreshList} title='Refresh'>
            <MdRefresh />
          </button>}

          {(location.pathname === "/" || location.pathname === '/live') && <button className='text-white text-2xl p-1' onClick={handleChangeGridLayout} title='Change grid'>
            {grid === 'grid' ? gridMode : focusMode}
          </button>}
        </div>
      </header>

      <main className='flex justify-center'>
        <Routes>
          <Route path='/' element={<Home query={text} />} />
          <Route path='/match-details/:matchId' Component={MatchDetails} />
          <Route path='/live' Component={Streams} />
        </Routes>
      </main>
    </div>
  );
};

export default App;