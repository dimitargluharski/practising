import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import Dashboard from './pages/Dashboard/Dashboard';
import MatchDetails from './pages/MatchDetails/MatchDetails';

import ContextProvider from './contexts/ThemeContext';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);

  return (
    <ContextProvider>
      <div className='w-full h-full bg-slate-100'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path="/match-details/:matchId" element={<MatchDetails />} />
          <Route path='*' element={<div>404...</div>} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
