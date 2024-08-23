import mocks from '../../../../../config/test/mocks';
import { testServer, userToken } from '../../../../../config/test';

describe('getUserBoards', () => {
  it('should return an array of boards', async () => {
    const response = (await testServer.executeOperation(
      {
        query: `#graphql
            query GetUserBoards { 
                getUserBoards{ 
                    id
                    owner
                    title
                }
            }`
      },
      { contextValue: { token: `Bearer ${userToken}` } }
    )) as any;

    expect(response.body.singleResult.errors).not.toBeDefined();
    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getUserBoards[0]).toMatchObject({
      id: mocks.Int(),
      owner: mocks.Int(),
      title: mocks.String()
    });
  });
});
