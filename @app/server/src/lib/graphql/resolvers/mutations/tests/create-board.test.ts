import mocks from '../../../../../config/test/mocks';
import testServer from '../../../../../config/test/apollo-test-server';

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
