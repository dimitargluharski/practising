import { Route, Routes } from 'react-router-dom';

import Live from './pages/Live/Live';
import MatchDetails from './pages/MatchDetails/MatchDetails';
import Stream from './components/Stream/Stream';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar/Calendar';
import Fixtures from './pages/Fixtures/Fixtures';
// import Highlight from './components/Highlights/Highlight';

import ContextProvider from './contexts/ThemeContext';

import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <ContextProvider>
      <div className={`w-full h-full flex ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-300'} `}>
        <div className={`fixed top-0 left-0 w-[250px] h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-300'} z-10`}>
          <Navbar />
        </div>

        <div className="flex-1 p-2 ml-[250px] h-screen mx-auto">
          <Routes>
            <Route path='/' element={<Live />} />
            <Route path='/videos' element={<Stream />} />
            <Route path='/fixtures' element={<Fixtures />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path="/match-details/:matchId" element={<MatchDetails />} />
            <Route path='*' element={<div>404...</div>} />
          </Routes>
        </div>

      </div>
    </ContextProvider>
  );
}

export default App;
