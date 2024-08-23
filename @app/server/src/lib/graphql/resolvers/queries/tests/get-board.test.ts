import mocks from '../../../../utils/mocks';
import testServer from '../../../tests/apollo-test-server';

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
