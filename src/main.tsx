import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { GridProvider } from './contexts/GridContext.tsx';
import { StreamProvider } from './contexts/StreamsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <GridProvider>
      <StreamProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StreamProvider>
    </GridProvider>
  </ThemeProvider>
)
