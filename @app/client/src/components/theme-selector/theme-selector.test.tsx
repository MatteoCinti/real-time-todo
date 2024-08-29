import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { THEME_SWITCH } from '~/lib/constants';
import { TestProviders } from '~/test';
import ThemeSelector from '.';

const setTheme = vi.fn();
vi.mock('~/hooks', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // @ts-ignore
    ...actual,
    useTheme: () => ({
      theme: 'light',
      setTheme
    })
  };
});

describe('ThemeSelector Component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <TestProviders>
          <ThemeSelector />
        </TestProviders>
      );
    });
  });

  it('should render', async ({ expect }) => {
    const ThemeSwitch = screen.getByTestId(THEME_SWITCH);
    expect(ThemeSwitch).toBeTruthy();
  });
  it('should change theme on click', async ({ expect }) => {
    const ThemeSwitch = screen.getByTestId(THEME_SWITCH);

    await waitFor(async () => {
      await act(() => {
        fireEvent.click(ThemeSwitch);
        expect(setTheme).toHaveBeenCalledOnce();
      });
    });
    expect(ThemeSwitch).toBeTruthy();
  });
});
