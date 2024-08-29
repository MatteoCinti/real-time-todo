import { beforeEach, describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { LOGIN_FORM } from '~/lib/constants';
import { TestProviders } from '~/test';
import Login from '..';

const navigate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-ignore
    ...actual,
    useNavigate: () => navigate,
    useLocation: () => ({
      pathname: '/login'
    })
  };
});

describe('Login page', () => {
  beforeEach(async () => {
    await waitFor(async () =>
      render(
        <TestProviders>
          <Login />
        </TestProviders>
      )
    );
  });

  afterEach(async () => {
    await vi.resetAllMocks();
  });

  it('should render the login form for /login', async ({ expect }) => {
    const form = screen.getByTestId(LOGIN_FORM);
    expect(form).toBeTruthy();
  });
});
