import { useContext } from 'react';

import ContextProvider from './contexts/ThemeContext';
import { ThemeContext } from './contexts/ThemeContext';
import InputField from './components/InputField/InputField';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';


function App() {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);

  const handleSearchTermChange = (searchTerm: string) => {
    console.log(searchTerm);
  }

  return (
    <div className='flex'>
      <ContextProvider>
        <Sidebar />
        <div className='w-full'>
          <div className='flex justify-center bg-slate-500 mb-5'>
            <InputField onSearchTermChange={handleSearchTermChange} />
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
