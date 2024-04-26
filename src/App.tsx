import { useContext } from 'react';

import ContextProvider from './contexts/ThemeContext';
import { ThemeContext } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);

  return (
    <div className='flex'>
      <ContextProvider>
        <Sidebar />
      </ContextProvider>
    </div>
  );
}

export default App;
