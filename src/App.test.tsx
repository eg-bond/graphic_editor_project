import { render, screen } from '@testing-library/react';
import '@/App.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

describe('Index page tests', () => {
  it('Has  title:', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const infoTitle = screen.getByText(/Vite/i);
    expect(infoTitle).toBeVisible();
  });
});
