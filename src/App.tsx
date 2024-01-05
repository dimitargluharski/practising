import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import TV from './pages/TV/TV';
import Live from './pages/Live/Live';
import Videos from './pages/Videos/Videos';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='flex'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tv' element={<TV />} />
        <Route path='/live' element={<Live />} />
        <Route path='/videos' element={<Videos />} />
      </Routes>
    </div>
  )
}

export default App;