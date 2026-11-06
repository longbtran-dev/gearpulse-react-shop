import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import AuthProvider from './AuthProvider';
import useAuth from '../hooks/useAuth';

function AuthConsumer() {
  const { user, isAdmin, loginCustomer, loginAdmin, logout, theme, toggleTheme } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.username : 'Guest'}</div>
      <div data-testid="is-admin">{isAdmin ? 'true' : 'false'}</div>
      <div data-testid="theme">{theme}</div>
      <button onClick={loginCustomer}>Login Customer</button>
      <button onClick={loginAdmin}>Login Admin</button>
      <button onClick={logout}>Logout</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('AuthProvider & useAuth (Lab 3 - Context, Effect & Storage)', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('provides default guest user and light theme', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('Guest');
    expect(screen.getByTestId('is-admin')).toHaveTextContent('false');
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('allows logging in as customer (Aaron) and admin', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await user.click(screen.getByText('Login Customer'));
    expect(screen.getByTestId('user')).toHaveTextContent('Aaron');
    expect(screen.getByTestId('is-admin')).toHaveTextContent('false');

    await user.click(screen.getByText('Login Admin'));
    expect(screen.getByTestId('user')).toHaveTextContent('GearPulse Admin');
    expect(screen.getByTestId('is-admin')).toHaveTextContent('true');

    await user.click(screen.getByText('Logout'));
    expect(screen.getByTestId('user')).toHaveTextContent('Guest');
    expect(screen.getByTestId('is-admin')).toHaveTextContent('false');
  });

  it('toggles theme and updates document data-theme and localStorage', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await user.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('gearpulse-theme')).toBe('dark');
  });
});
