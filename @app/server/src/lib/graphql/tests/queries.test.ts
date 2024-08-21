import testServer from './apollo-test-server';
import { mocks } from '..';

describe('Apollo Server', () => {
  it('should be defined', () => {
    expect(testServer).toBeDefined();
  });

  describe('login', () => {
    it('should return a user', async () => {
      const response = (await testServer.executeOperation({
        query: `#graphql
            query UserLogin($username: String!, $password: String!) { 
                userLogin(username: $username, password: $password) { 
                    id 
                    username 
                    firstName
                    token
                }
            }`,
        variables: {
          username: mocks.String(),
          password: mocks.String()
        }
      })) as any;

      expect(response.body.singleResult.errors).not.toBeDefined();
      expect(response.body.kind).toBe('single');
      expect(response.body.singleResult.data.userLogin).toMatchObject({
        id: mocks.Int(),
        username: mocks.String(),
        firstName: mocks.String(),
        token: mocks.String()
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
  describe('getBoard', () => {
    it('should return a board', async () => {
      const response = (await testServer.executeOperation({
        query: `#graphql
            query GetBoard($owner: Int!, $id: Int!) { 
                getBoard(owner: $owner, id: $id) { 
                    id
                    owner
                    title
                }
            }`,
        variables: {
          id: mocks.Int(),
          owner: mocks.Int(),
          title: mocks.String()
        }
      })) as any;

      expect(response.body.singleResult.errors).not.toBeDefined();
      expect(response.body.kind).toBe('single');
      expect(response.body.singleResult.data.getBoard).toMatchObject({
        id: mocks.Int(),
        owner: mocks.Int(),
        title: mocks.String()
      });
    });
  });
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
});
