import { useContext } from 'react';

import ContextProvider from './contexts/ThemeContext';
import { ThemeContext } from './contexts/ThemeContext';
import InputField from './components/InputField/InputField';

function App() {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);

  const handleSearchTermChange = (searchTerm: string) => {
    console.log(searchTerm);
  }

  return (
    <ContextProvider>
      <div>
        <div className='flex justify-center'>
          <InputField onSearchTermChange={handleSearchTermChange} />
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;
