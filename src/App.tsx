import '@/App.css';
import { Routing } from '@/components/Routing';
import { AuthStatus } from './components/AuthStatus';

function App() {
  return (
    <>
      <AuthStatus />
      <Routing />
    </>
  );
}

export default App;
