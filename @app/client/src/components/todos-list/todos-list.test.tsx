import { render, screen, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';

import {
  TestProviders,
  todos,
  useGetTodos,
  useBoardData,
  mockResizeObserver
} from '~/test';

import TodosList from '.';
import { todoTitleField } from '../form/config';

describe('TodosList', () => {
  beforeAll(() => {
    mockResizeObserver();
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
    vi.mock('~/lib/react-query', async (importOriginal) => {
      const actual = await importOriginal();

      return {
        // @ts-ignore
        ...actual,
        useBoardData: () => useBoardData(),
        useGetTodos: () => useGetTodos()
      };
    });
  });

  beforeEach(async () => {
    await waitFor(() => {
      render(
        <TestProviders>
          <TodosList />
        </TestProviders>
      );
    });
  });

  it('renders todos list items', ({ expect }) => {
    const todosList = screen.getAllByRole('listitem');
    expect(todosList).toHaveLength(todos.length + 1);
  });
  it('todo list item should be disabled at render', ({ expect }) => {
    const titleField = screen.getByLabelText(
      todoTitleField.label!
    ) as HTMLInputElement;
    // when disabled attribute = false
    expect(titleField.readOnly).toBe(true);
  });
});
