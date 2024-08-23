import { testServer } from '../../../../../config/test';
import mocks from '../../../../../config/test/mocks';

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
