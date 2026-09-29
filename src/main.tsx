import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import { CreateWorkspaceContextProvider } from './contexts/CreateWorkspaceContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <AuthContextProvider>
          <CreateWorkspaceContextProvider>
              <App />
          </CreateWorkspaceContextProvider>
      </AuthContextProvider>
  </BrowserRouter>
);