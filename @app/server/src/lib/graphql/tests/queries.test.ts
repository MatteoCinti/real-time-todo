import testServer from './apollo-test-server';
import { mocks } from '..';

describe('Apollo Server', () => {
  it('should be defined', () => {
    expect(testServer).toBeDefined();
  });
  it('getTodos should return a list of todos', async () => {
    const response = (await testServer.executeOperation({
      query: 'query getTodos { getTodos { title description id isDone board}}'
    })) as any;

    expect(response.body.kind).toBe('single');
    expect(response.body.singleResult.data.getTodos.length).toBeGreaterThan(1);
    expect(response.body.singleResult.data.getTodos[0]).toMatchObject({
      id: mocks.Int(),
      board: mocks.Int(),
      title: mocks.String(),
      isDone: mocks.Boolean(),
      description: mocks.String()
    });
  });
});
