/* eslint-disable */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, it } from 'vitest';

import { TestProviders } from '~/test';
import LoginForm from '../login-form';
import { errorMessages, loginFormFields } from '../config/login-form.config';

describe('todo-form', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <TestProviders>
          <LoginForm />
        </TestProviders>
      )
    );
  });
  it('should render on the page', ({ expect }) => {
    const form = screen.getByTestId('login-form');
    expect(form).toBeTruthy();
  });
  it('should show Login / Register on the page', ({ expect }) => {
    const pageTitle = screen.queryAllByText('Login / Register');
    expect(pageTitle).toBeTruthy();
  });
  it('should render a submit button', ({ expect }) => {
    const submit = screen.getByRole('button', { name: 'Login' });
    expect(submit).toBeTruthy();
  });
  it('should render all sections in the config file', ({ expect }) => {
    loginFormFields.forEach((field) => {
      const inputsByLabel = screen.getByLabelText(field.label!);
      expect(inputsByLabel).toBeTruthy();
    });
  });
  it('~ should display a text input for username', ({ expect }) => {
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'username' } });
    });
    expect(input.value).toBe('username');
  });
  it('~ should display a password input for password', ({ expect }) => {
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'password' } });
    });
    expect(input.value).toBe('password');
  });

  it('~ should display error when validation is not passed on formSubmit', async ({
    expect
  }) => {
    const submit = screen.getByRole('button', { name: 'Login' });

    await act(async () => {
      await fireEvent(
        submit,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    const titleError = screen.getByText(errorMessages.username);
    const passwordError = screen.getByText(errorMessages.password);
    expect(titleError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });
});
