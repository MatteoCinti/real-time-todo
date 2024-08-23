import { testServer } from '../../../../../config/test';
import mocks from '../../../../../config/test/mocks';

describe('createTodo', () => {
  it('createTodo should create a todo', async () => {
    const response = (await testServer.executeOperation({
      query: `#graphql
            mutation CreateTodo($title: String!, $description: String!, $board: Int!) {
                createTodo(title: $title, description: $description, board: $board) {
                    id
                    title
                    board
                    description
                    isDone
                }
            }`,
      variables: {
        title: mocks.String(),
        author: mocks.String(),
        description: mocks.String(),
        board: mocks.Int()
      }
    })) as any;

    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.createTodo).toBeDefined();
    expect(response.body.singleResult.data.createTodo).toMatchObject({
      id: mocks.Int(),
      board: mocks.Int(),
      title: mocks.String(),
      isDone: mocks.Boolean(),
      description: mocks.String()
    });
  });
});
