import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Add from './pages/add';

function App() {
  
  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/add' element={<Add />} />
        </Routes>
    </>
  )
}

export default App
