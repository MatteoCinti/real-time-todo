import { beforeEach, describe, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';

import { TestProviders } from '~/test';
import Login from '.';

describe('Login page', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <TestProviders>
          <Login />
        </TestProviders>
      )
    );
  });

  it('should render the login form', ({ expect }) => {
    const form = screen.getByTestId('login-form');
    expect(form).toBeTruthy();
  });
});
