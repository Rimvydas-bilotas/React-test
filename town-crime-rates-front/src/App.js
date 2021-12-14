import './App.css';
import Header from './components/header/header';
import Home from './pages/home/home';
import Register from './pages/register/register.jsx';
import Login from './pages/login/login.jsx';
import Towns from './pages/towns/towns.jsx';
import { Routes, Route } from 'react-router';

function App() {

  return (
    
      <div>
        <header className="App-header">
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/towns" element={<Towns />} />
        </Routes>
      </div>
  
  );
}

export default App;