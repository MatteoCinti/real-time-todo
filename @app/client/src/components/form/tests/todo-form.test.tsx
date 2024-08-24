/* eslint-disable */

import { beforeEach, describe, it } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { TestProviders } from '~/test';
import { errorMessages } from '../config/todo-form.config';
import { todoFormFields } from '../config';
import TodoForm from '../todo-form';

describe('todo-form', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <TestProviders>
          <TodoForm />
        </TestProviders>
      )
    );
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
      const inputsByLabel = screen.getByLabelText(field.label!);
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
});
