import { Route, Routes } from 'react-router-dom';

import Live from './pages/Live/Live';
import MatchDetails from './pages/MatchDetails/MatchDetails';
import Stream from './components/Stream/Stream';
import Navbar from './components/Navbar';
// import Highlight from './components/Highlights/Highlight';

function App() {
  return (
    <div className="bg-slate-200 w-full h-full flex">
      <div className="fixed top-0 left-0 w-[250px] h-screen bg-slate-300 z-10">
        <Navbar />
      </div>

      <div className="flex-1 p-2 ml-[250px] h-screen mx-auto">
        <Routes>
          <Route path='/' element={<Live />} />
          <Route path='/videos' element={<Stream />} />
          <Route path="/match-details/:matchId" element={<MatchDetails />} />
          <Route path='*' element={<div>404...</div>} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
