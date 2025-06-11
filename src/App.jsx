import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');

  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
