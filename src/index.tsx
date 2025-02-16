import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
);
