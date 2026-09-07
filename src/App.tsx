import './App.css';

import { Route, Routes } from 'react-router-dom';

import { SigninCard } from './components/organisms/auth/SignInCard';
import { SignupCard } from './components/organisms/auth/SignUpCard';
import { Auth } from './pages/auth/auth';
import { Home } from './pages/home/Home';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth/signup' element={<Auth><SignupCard /></Auth>} />
      <Route path='/auth/login' element={<Auth><SigninCard /></Auth>} />
    </Routes>
  );
}

export default App;
