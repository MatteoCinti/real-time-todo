import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NAV_ID } from '~/lib/constants';
import Nav from '.';

const logoutMock = vi.fn();
vi.mock('~/hooks', () => ({
  useAuth: () => ({
    logout: logoutMock
  })
}));

describe('The nav menu', () => {
  beforeEach(() => {
    render(<Nav />);
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
