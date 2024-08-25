import { beforeEach, describe, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { CREATE_TODO_FORM } from '~/lib/constants';
import { TestProviders } from '~/test';
import { titleField } from '../config';
import TodoForm from '../create-todo-form';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    // @ts-ignore
    ...actual,
    useParams: () => ({
      board: 1
    })
  };
});

const mutate = vi.fn();
vi.mock('~/lib/react-query', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    // @ts-ignore
    ...actual,
    useCreateTodo: () => ({
      mutate
    })
  };
});

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
    const form = screen.getByTestId(CREATE_TODO_FORM);
    expect(form).toBeTruthy();
  });
  it('should render a submit button', ({ expect }) => {
    const submit = screen.getByRole('button');
    expect(submit).toBeTruthy();
  });
  it('should display add a todo field', ({ expect }) => {
    const titleInput = screen.getByLabelText(titleField.label!);
    expect(titleInput).toBeTruthy();
  });
  it('~ text area should accept a text input', ({ expect }) => {
    const titleInput = screen.getByLabelText(
      titleField.label!
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'typed text' } });
    });
    expect(titleInput.value).toBe('typed text');
  });
  it('~ should not submit if no text in text area', async ({ expect }) => {
    const submit = screen.getByRole('button');

    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(mutate).not.toBeCalled();
  });
  it('~ should submit if input is valid', async ({ expect }) => {
    const submit = screen.getByRole('button');
    const titleInput = screen.getByLabelText(
      titleField.label!
    ) as HTMLInputElement;

    await act(async () => {
      await fireEvent.change(titleInput, { target: { value: 'typed text' } });
      await fireEvent.click(submit);
    });

    expect(mutate).toBeCalled();
  });
});
