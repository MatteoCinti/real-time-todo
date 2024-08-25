import { act, fireEvent, screen } from '@testing-library/react';

export const fillLoginForm = async () => {
  const submit = screen.getByRole('button', { name: 'Login' });
  const password = screen.getByLabelText('Password') as HTMLInputElement;
  const username = screen.getByLabelText('Username') as HTMLInputElement;

  await act(async () => {
    await fireEvent.change(password, { target: { value: 'password' } });
    await fireEvent.change(username, { target: { value: 'username' } });

    await fireEvent(
      submit,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
  });

  return { submit, password, username };
};
