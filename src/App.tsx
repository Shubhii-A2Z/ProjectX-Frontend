import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { SigninCard } from './components/organisms/auth/SignInCard';
import { SignUpContainer } from './components/organisms/auth/SignUpContainer';
import { Auth } from './pages/auth/Auth';
import { Home } from './pages/home/Home';
import { NotFound } from './pages/notFound/NotFound';

const queryClient=new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth/signup' element={<Auth><SignUpContainer /></Auth>} />
        <Route path='/auth/login' element={<Auth><SigninCard /></Auth>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
