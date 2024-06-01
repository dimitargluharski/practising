import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { GridProvider } from './contexts/GridContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GridProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GridProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
