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


const App = () => {
  const [matches, setMatches] = useState<[]>([]);
  const {theme, handleChangeTheme, darkIconTheme, lightIconTheme} = useContext(ThemeContext);
  const {focusMode, grid, gridMode, handleChangeGridLayout} = useContext(GridContext);
  const [refreshList, setRefreshList] = useState([]);
  const [text, setText] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    footballApi.getLiveMatches()
      .then(data => setMatches(data)).catch((error) => console.log('error', error))
  }, [refreshList]);

  const handleRefreshList = () => {
    console.log('refresh');
    setRefreshList(matches);
  }
  
  const handleChangeText = (event: any) => {
    setText(event.target.value);
  }

  return (
    <div className={`${theme === 'light' ? 'bg-slate-600' : 'bg-slate-300'} flex flex-col w-full min-h-screen`}>
      <header className={`flex justify-center items-center p-2 ${theme === 'light' ? 'bg-slate-900' : 'bg-slate-400'} relative`}>
        <InputText handleChangeText={handleChangeText} value={text} />
  
        <div className={`${theme === 'light' ? 'bg-yellow-500' : 'bg-slate-500'} flex items-center rounded-md absolute right-5`}>
          <button onClick={handleChangeTheme} className='text-white text-2xl p-1' title='Change theme'>
            {theme === 'light' ? darkIconTheme : lightIconTheme}
          </button>
  
          {location.pathname === "/" && <button className='text-white text-2xl p-1' onClick={handleRefreshList} title='Refresh'>
            <MdRefresh />
          </button>}
  
          {location.pathname === "/" && <button className='text-white text-2xl p-1' onClick={handleChangeGridLayout} title='Change grid'>
            {grid === 'grid' ? gridMode : focusMode}
          </button>}
  
        </div>
      </header>
  
      <body className='flex justify-center'>
        <Routes>
          <Route path='/' element={<Home query={text} />} />
          <Route path='/match-details/:matchId' Component={MatchDetails} />
        </Routes>
      </body>
    </div>
  );
};

export default App;