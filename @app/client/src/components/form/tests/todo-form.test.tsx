/* eslint-disable */

import { beforeEach, describe, it } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

import TodoForm from '../todo-form';
import { todoFormFields } from '../config';
import { errorMessages } from '../config/todo-form.config';

// The two tests marked with concurrent will be started in parallel
describe('todo-form', () => {
  beforeEach(() => {
    render(<TodoForm />);
  });
  it('should render on the page', ({ expect }) => {
    const form = screen.getByTestId('todo-form');
    expect(form).toBeTruthy();
  });
  it('should render a submit button', ({ expect }) => {
    const submit = screen.getByRole('button', { name: 'Create' });
    expect(submit).toBeTruthy();
  });
  it('should render all sections in the config file', ({ expect }) => {
    todoFormFields.forEach((field) => {
      const inputsByLabel = screen.getByLabelText(field.label);
      expect(inputsByLabel).toBeTruthy();
    });
  });
  it('~ text area should accept a text input', ({ expect }) => {
    const input = screen.getByLabelText('Title') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'typed text' } });
    });
    expect(input.value).toBe('typed text');
  });
  it('~ should display error when validation is not passed on formSubmit', async ({
    expect
  }) => {
    const submit = screen.getByRole('button', { name: 'Create' });

    await act(async () => {
      await fireEvent(
        submit,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    const titleError = screen.getByText(errorMessages.title);
    const descriptionError = screen.getByText(errorMessages.description);
    expect(titleError).toBeTruthy();
    expect(descriptionError).toBeTruthy();
  });
});
