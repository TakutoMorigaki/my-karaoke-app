import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Add from './pages/Add';
import List from './pages/List';
import ProtectedRoute from './components/ProtectedRoute';
import SongDetail from './components/SongDetail';

function App() {
  
  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
          </Route>
          <Route path='/song/:title/:artist' element={<ProtectedRoute />}>
            <Route index element={<SongDetail />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
