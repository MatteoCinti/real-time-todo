import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';

import { CREATE_BOARD_FORM } from '~/lib/constants';
import { TestProviders } from '~/test';

import { boardFormFields, boardTitleField } from '../config';
import BoardForm from '../board-form';

const mutate = vi.fn();
vi.mock('~/lib/react-query', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    // @ts-ignore
    ...actual,
    useCreateBoard: () => ({
      mutate
    })
  };
});

describe('board-form', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <TestProviders>
          <BoardForm />
        </TestProviders>
      )
    );
  });
  it('should render on the page', ({ expect }) => {
    const form = screen.getByTestId(CREATE_BOARD_FORM);
    expect(form).toBeTruthy();
  });
  it('should render a submit button', ({ expect }) => {
    const submit = screen.getByRole('button');
    expect(submit).toBeTruthy();
  });
  it('should render all sections in the config file', ({ expect }) => {
    boardFormFields.forEach((field) => {
      const inputsByLabel = screen.getByLabelText(field.label!);
      expect(inputsByLabel).toBeTruthy();
    });
  });
  it('~ should display a text input for title', ({ expect }) => {
    const input = screen.getByLabelText(
      boardTitleField.label
    ) as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'board title' } });
    });
    expect(input.value).toBe('board title');
  });

  it('~ should not submit if empty inputs', async ({ expect }) => {
    const submit = screen.getByRole('button');

    await act(async () => {
      await fireEvent(
        submit,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(mutate).not.toBeCalled();
  });
  it('~ should submit if valid inputs', async ({ expect }) => {
    const submit = screen.getByRole('button');
    const title = screen.getByLabelText(
      boardTitleField.label
    ) as HTMLInputElement;

    await act(async () => {
      await fireEvent.change(title, { target: { value: 'Board Title' } });
      await fireEvent(
        submit,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
    });

    expect(mutate).toBeCalledWith({
      title: 'Board Title'
    });
  });
});
