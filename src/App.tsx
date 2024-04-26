import { useContext } from 'react';

import ContextProvider from './contexts/ThemeContext';
import { ThemeContext } from './contexts/ThemeContext';
import InputField from './components/InputField/InputField';
import { Sidebar } from './components/Sidebar/Sidebar';


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
              <div>
            <div className='flex justify-center'>
          <InputField onSearchTermChange={handleSearchTermChange} />
        </div>
      </div>
      </ContextProvider>
    </div>
  );
}

export default App;
