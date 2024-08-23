import mocks from '../../../../../config/test/mocks';
import testServer from '../../../../../config/test/apollo-test-server';

describe('getUser', () => {
  it('should return a user', async () => {
    const response = (await testServer.executeOperation({
      query: `#graphql
            query GetUser($id: Int!) { 
                getUser(id: $id) { 
                    username 
                    firstName
                    id 
                }
            }`,
      variables: {
        id: mocks.Int()
      }
    })) as any;

    expect(response.body.singleResult.errors).not.toBeDefined();
    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getUser).toMatchObject({
      id: mocks.Int(),
      username: mocks.String(),
      firstName: mocks.String()
    });
  });
});
