import { render, screen, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';

import { CREATE_BOARD_FORM } from '~/lib/constants';
import { boards, TestProviders } from '~/test';
import BoardList, { componentTitle } from '.';

vi.mock('~/lib/react-query', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    // @ts-ignore
    ...actual,
    useUser: () => ({
      data: {
        boards
      },
      isLoading: false,
      isError: false,
      isFetching: false
    })
  };
});

vi.mock('~/hooks', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-ignore
    ...actual,
    useAuth: () => ({
      guest: false,
      auth: true
    })
  };
});

describe('Index Component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <TestProviders>
          <BoardList />
        </TestProviders>
      );
    });
  });
  it('should render a title', async ({ expect }) => {
    const title = screen.getByText(componentTitle);
    expect(title).toBeTruthy();
  });

  it('should render a form', async ({ expect }) => {
    const form = screen.getByTestId(CREATE_BOARD_FORM);
    expect(form).toBeTruthy();
  });

  it('should render a list of boards', async ({ expect }) => {
    const renderedBoards = screen.getAllByRole('listitem');
    expect(renderedBoards).toHaveLength(boards.length + 1);
  });
});
