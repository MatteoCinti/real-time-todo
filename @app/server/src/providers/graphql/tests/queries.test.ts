import testServer from './apollo-test-server';
import { mocks } from '..';

describe('Apollo Server', () => {
  it('should be defined', () => {
    expect(testServer).toBeDefined();
  });
  it('getTodos should return a list of todos', async () => {
    const response = (await testServer.executeOperation({
      query: 'query getTodos { getTodos { title author description id }}'
    })) as any;

    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getTodos.length).toBeGreaterThan(1);
    expect(response.body.singleResult.data.getTodos[0]).toMatchObject({
      author: mocks.String(),
      description: mocks.String(),
      title: mocks.String(),
      id: mocks.ID()
    });
  });
});
