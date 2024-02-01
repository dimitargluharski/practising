import { Route, Routes } from 'react-router-dom';

import Live from './pages/Live/Live';
import MatchDetails from './pages/MatchDetails/MatchDetails';
import Stream from './components/Stream/Stream';
import Navbar from './components/Navbar';
// import Highlight from './components/Highlights/Highlight';

function App() {
  return (
    <div className='bg-slate-200 w-full h-[100%] flex justify-center'>
      <div className='w-[1024px] h-[100vh]'>
        {/* <div className='flex flex-col bg-slate-300 p-2 mr-2 rounded-md'> */}

        <div className='w-full p-2 flex items-center justify-center min-h-screen'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Live />} />
            <Route path='/videos' element={<Stream />} />
            <Route path='*' element={<div>404...</div>} />
            <Route path="/match-details/:matchId" element={<MatchDetails />} />
          </Routes>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default App;