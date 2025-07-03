import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Explore3D from './pages/Explore3D'
import Explore2D from './pages/Explore2D'

function App() {
  return (
    <Router>



    
      <nav className='z-1 absolute bottom-[10px] right-[10px]'>
        <div className='flex'>
        <Link to="/explore2d" className='border-r p-[5px]'>Explore 2D</Link>
        <Link to="/explore3d" className='p-[5px]'>Explore 3D</Link>
        </div>
        <div className='flex border-t'>
        <Link className='text-white border-r p-[5px]'>Prev</Link>
        <Link to="/" className=' border-r p-[5px]'>Home</Link>
        <Link className=' p-[5px]'>Next</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore3d" element={<Explore3D />} />
        <Route path="/explore2d" element={<Explore2D />} />
      </Routes>
    </Router>
  )
}

export default App
