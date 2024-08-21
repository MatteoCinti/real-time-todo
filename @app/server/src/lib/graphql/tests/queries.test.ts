import testServer from './apollo-test-server';
import { mocks } from '..';

describe('Apollo Server', () => {
  it('should be defined', () => {
    expect(testServer).toBeDefined();
  });

  describe('getTodos ', () => {
    it('should return a list of todos', async () => {
      const response = (await testServer.executeOperation({
        query: `#graphql 
            query GetTodos { 
                getTodos { title description id isDone board}
            }`
      })) as any;

      expect(response.body.kind).toBe('single');
      expect(response.body.singleResult.data.getTodos.length).toBeGreaterThan(
        1
      );
      expect(response.body.singleResult.data.getTodos[0]).toMatchObject({
        id: mocks.Int(),
        board: mocks.Int(),
        title: mocks.String(),
        isDone: mocks.Boolean(),
        description: mocks.String()
      });
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const response = (await testServer.executeOperation({
        query: `#graphql
            query GetUser($username: String!, $password: String!) { 
                getUser(username: $username, password: $password) { 
                    username 
                    firstName
                    id 
                }
            }`,
        variables: {
          username: mocks.String(),
          password: mocks.String()
        }
      })) as any;

      expect(response.body.singleResult.errors).not.toBeDefined();
      expect(response.body.kind).toBe('single');
      expect(response.body.singleResult.data.getUser).toMatchObject({
        username: mocks.String(),
        id: mocks.Int(),
        firstName: mocks.String()
      });
    });
  });
});
