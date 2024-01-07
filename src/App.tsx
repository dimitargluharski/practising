import { Route, Routes } from 'react-router-dom';

// import Home from './pages/Home/Home';
import TV from './pages/TV/TV';
import Live from './pages/Live/Live';
import Videos from './pages/Videos/Videos';
// import Navbar from './components/Navbar';
import MatchDetails from './pages/MatchDetails/MatchDetails';

function App() {
  return (
    <div className='bg-slate-950 w-full h-full fixed'>
      <div className='w-[720px] m-auto bg-slate-500 p-2 mt-5 rounded-md'>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<Live />} />
          <Route path='/tv' element={<TV />} />
          <Route path="/match-details/:matchId" element={<MatchDetails />} />
          <Route path='/videos' element={<Videos />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;