import { withFilter } from 'graphql-subscriptions';

import { SubscriptionTodoCreatedArgs } from '../../__generated__/resolvers-types';
import { pubsub } from '../../../pubsub';

async function todoCreated(_: unknown, args: SubscriptionTodoCreatedArgs) {
  return {
    [Symbol.asyncIterator]: withFilter(
      () => pubsub.asyncIterator('TODO_CREATED'),
      (payload, __, ___) => {
        return payload.todoCreated.board === args.board;
      }
    )
  };
}

export default todoCreated;
