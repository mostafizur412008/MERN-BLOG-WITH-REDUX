
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';

function App() {
  return (
    <>
      <Header /> {/* Render the Header component outside of Routes */}
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/my-blogs' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
