import mocks from '../../../../../config/test/mocks';
import testServer from '../../../../../config/test/apollo-test-server';

describe('getTodosByBoard', () => {
  it('should return a board', async () => {
    const response = (await testServer.executeOperation({
      query: `#graphql
            query GetTodosByBoard($board: Int!) { 
                getTodosByBoard(board: $board) { 
                    id
                    board
                    title
                    description
                    isDone
                }
            }`,
      variables: {
        board: mocks.Int()
      }
    })) as any;

    expect(response.body.singleResult.errors).not.toBeDefined();
    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getTodosByBoard[0]).toMatchObject({
      id: mocks.Int(),
      board: mocks.Int(),
      title: mocks.String(),
      description: mocks.String(),
      isDone: mocks.Boolean()
    });
  });
});
