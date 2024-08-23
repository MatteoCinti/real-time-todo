import mocks from '../../../../../config/test/mocks';
import { testServer } from '../../../../../config/test';

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
