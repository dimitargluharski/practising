import { useContext } from 'react';

import ContextProvider from './contexts/ThemeContext';
import { ThemeContext } from './contexts/ThemeContext';
import InputField from './components/InputField/InputField';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

import { useLocation } from 'react-router-dom';

function App() {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const handleSearchTermChange = (searchTerm: string) => {
    console.log(searchTerm);
  }

  return (
    <div className='flex'>
      <ContextProvider>
        <Sidebar />
        <div className='w-full'>
          <div className='flex justify-center bg-slate-500 shadow-md'>
            <InputField onSearchTermChange={handleSearchTermChange} />
          </div>

          <div className='p-4 italic text-gray-400 font-bold text-3xl uppercase'>
            {location.pathname}
          </div>

          <Routes>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/live-matches" />
          </Routes>
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
