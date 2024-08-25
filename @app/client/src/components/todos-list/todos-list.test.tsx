import { render, screen, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';

import { TestProviders, todos, useGetTodos, useBoardData } from '~/test';

import TodosList from '.';

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

describe('TodosList', () => {
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
    const renderedBoards = screen.getAllByRole('listitem');
    expect(renderedBoards).toHaveLength(todos.length + 1);
  });
});
