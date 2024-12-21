import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Routing } from './Routing';
import { AppRoutes } from '@/types/appRoutes';

describe('Routing tests', () => {
  it('renders Main page when path is /', () => {
    render(
      <MemoryRouter initialEntries={[AppRoutes.Main]}>
        <Routing />
      </MemoryRouter>
    );

    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });

  it('renders editor page when path is /projects/:id', () => {
    render(
      <MemoryRouter initialEntries={[`/${AppRoutes.CurrentProject}`]}>
        <Routing />
      </MemoryRouter>
    );
    expect(screen.getByText(/Основная часть/i)).toBeInTheDocument();
  });
});
