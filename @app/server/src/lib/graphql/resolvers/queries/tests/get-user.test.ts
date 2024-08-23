import mocks from '../../../../../config/test/mocks';
import { testServer, userToken } from '../../../../../config/test';

describe('getUser', () => {
  it('should return a user', async () => {
    const response = (await testServer.executeOperation(
      {
        query: `#graphql
            query GetUser { 
                getUser { 
                    username 
                    firstName
                    id 
                }
            }`
      },
      { contextValue: { token: `Bearer ${userToken}` } }
    )) as any;

    expect(response.body.singleResult.errors).not.toBeDefined();
    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getUser).toMatchObject({
      id: mocks.Int(),
      username: mocks.String(),
      firstName: mocks.String()
    });
  });
  it('should return an error if no token is provided', async () => {
    const response = (await testServer.executeOperation({
      query: `#graphql
            query GetUser { 
                getUser { 
                    username 
                    firstName
                    id 
                }
            }`
    })) as any;

    expect(response.body.singleResult.errors).toBeDefined();
  });
});
