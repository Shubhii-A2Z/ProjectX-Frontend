import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { SignInContainer } from './components/organisms/auth/SignInContainer';
import { SignUpContainer } from './components/organisms/auth/SignUpContainer';
import { Toaster } from './components/ui/toast';
import { Auth } from './pages/auth/Auth';
import { Home } from './pages/home/Home';
import { NotFound } from './pages/notFound/NotFound';
// import { Payment } from './pages/payment/Payments';
import { Pricing } from './pages/pricing/Pricing';

const queryClient=new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth/signup' element={<Auth><SignUpContainer /></Auth>} />
        <Route path='/auth/login' element={<Auth><SignInContainer /></Auth>} />
        <Route path="/pricing" element={<Pricing />} />
        {/* <Route path='/makepayment' element={<Payment />} /> */}
        <Route path='/*' element={<NotFound/>} />
      </Routes>
      <Toaster/>
    </QueryClientProvider>
  );
}

export default App;
