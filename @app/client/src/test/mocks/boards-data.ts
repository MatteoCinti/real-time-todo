export const boards = [
  { id: '1', title: 'Board 1' },
  { id: '2', title: 'Board 2' },
  { id: '3', title: 'Board 3' }
];

export const useBoardData = () => ({
  data: {
    board: {
      id: 1,
      name: 'Test Board'
    }
  },
  isLoading: false,
  isError: false,
  isFetching: false
});
