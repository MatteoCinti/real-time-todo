import { vi } from 'vitest';

function mockResizeObserver() {
  const ResizeObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }));

  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
}

export default mockResizeObserver;
