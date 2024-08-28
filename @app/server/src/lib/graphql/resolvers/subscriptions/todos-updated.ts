import { withFilter } from 'graphql-subscriptions';

import { SubscriptionTodosUpdatedArgs } from '../../__generated__/resolvers-types';
import { pubsub } from '../../../pubsub';

async function todosUpdated(_: unknown, args: SubscriptionTodosUpdatedArgs) {
  return {
    [Symbol.asyncIterator]: withFilter(
      () => pubsub.asyncIterator('TODOS_UPDATED'),
      (payload, __, ___) => payload.board === args.board
    )
  };
}

export default todosUpdated;
