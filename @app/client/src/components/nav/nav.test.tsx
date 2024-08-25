import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TestProviders } from '~/test';
import { NAV_ID } from '~/lib/constants';
import Nav from '.';

const logoutMock = vi.fn();

vi.mock('~/hooks', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    // @ts-ignore
    ...actual,
    useAuth: () => ({
      logout: logoutMock
    })
  };
});

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    // @ts-ignore
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('The nav menu', () => {
  beforeEach(async () => {
    await waitFor(() =>
      render(
        <TestProviders>
          <Nav />
        </TestProviders>
      )
    );
  });
  it('should render', () => {
    const nav = screen.getByTestId(NAV_ID);
    expect(nav).toBeTruthy();
  });
  it('should have a logout button', () => {
    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeTruthy();
  });
  it('should call the logout function when the button is clicked', async () => {
    const button = screen.getByRole('button', { name: /logout/i });
    await act(() => fireEvent.click(button));

    expect(logoutMock).toHaveBeenCalledOnce();
  });
});
