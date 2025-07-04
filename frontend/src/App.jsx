import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Add from './pages/Add';
import List from './pages/List';
import ProtectedRoute from './components/ProtectedRoute';
import SongDetail from './components/SongDetail';
import EditSong from './pages/EditSong';

function App() {
  
  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/song/:title/:artist' element={<SongDetail />} />
            <Route path='/edit/:title/:artist' element={<EditSong />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
