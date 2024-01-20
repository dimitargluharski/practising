import { Route, Routes } from 'react-router-dom';

// import Home from './pages/Home/Home';
import TV from './pages/TV/TV';
import Live from './pages/Live/Live';
import Videos from './pages/Videos/Videos';
// import Navbar from './components/Navbar';
import MatchDetails from './pages/MatchDetails/MatchDetails';
import Highlight from './components/Highlights/Highlight';

function App() {
  return (
    <div className='bg-slate-950 w-full h-full flex'>
      <div className='w-[1024px] h-[100vh] flex justify-center m-auto'>
        <div className='flex flex-col w-2/3 m-auto bg-slate-500 p-2 mt-16 mr-2 rounded-md'>
          <Routes>
            <Route path='/' element={<Live />} />
            <Route path='/tv' element={<TV />} />
            <Route path="/match-details/:matchId" element={<MatchDetails />} />
            {/* <Route path='/videos' element={<Videos />} /> */}
          </Routes>
        </div>

        <div className='bg-slate-500 w-1/2 flex flex-col m-auto p-2 mt-16 rounded-md'>
          <Highlight />
        </div>
      </div>
    </div>
  )
}

export default App;