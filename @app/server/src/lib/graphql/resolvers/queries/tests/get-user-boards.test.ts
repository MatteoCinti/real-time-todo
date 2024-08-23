import mocks from '../../../../utils/mocks';
import testServer from '../../../tests/apollo-test-server';

describe('getUserBoards', () => {
  it('should return an array of boards', async () => {
    const response = (await testServer.executeOperation({
      query: `#graphql
            query GetUserBoards($owner: Int!) { 
                getUserBoards(owner: $owner, ) { 
                    id
                    owner
                    title
                }
            }`,
      variables: {
        owner: mocks.Int()
      }
    })) as any;

    expect(response.body.singleResult.errors).not.toBeDefined();
    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getUserBoards[0]).toMatchObject({
      id: mocks.Int(),
      owner: mocks.Int(),
      title: mocks.String()
    });
  });
});
