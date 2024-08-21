import testServer from './apollo-test-server';
import { mocks } from '..';

describe('Apollo Server', () => {
  it('should be defined', () => {
    expect(testServer).toBeDefined();
  });

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

  describe('createUser', () => {
    it('createUser should create a user', async () => {
      const response = (await testServer.executeOperation({
        query: `#graphql
            mutation CreateUser($username: String!, $password: String!, $firstName: String!) {
                createUser(username: $username, password: $password, firstName: $firstName) {
                    id
                    username
                    firstName
                }
            }`,
        variables: {
          id: mocks.Int(),
          username: mocks.String(),
          password: mocks.String(),
          firstName: mocks.String()
        }
      })) as any;

      expect(response.body.singleResult.errors).not.toBeDefined();
      expect(response.body.kind).toBe('single');
      expect(response.body.singleResult.data.createUser).toMatchObject({
        id: mocks.Int(),
        username: mocks.String(),
        firstName: mocks.String()
      });
    });
  });
  describe('createBoard', () => {
    it('create board create a new board', async () => {
      const response = (await testServer.executeOperation({
        query: `#graphql
            mutation CreateBoard($owner: Int!, $title: String!) {
                createBoard(owner: $owner, title: $title) {
                    id
                    owner
                    title
                }
            }`,
        variables: {
          owner: mocks.Int(),
          title: mocks.String()
        }
      })) as any;

      expect(response.body.singleResult.errors).not.toBeDefined();
      expect(response.body.kind).toBe('single');
      expect(response.body.singleResult.data.createBoard).toMatchObject({
        id: mocks.Int(),
        owner: mocks.Int(),
        title: mocks.String()
      });
    });
  });
});
