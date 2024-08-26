import { withFilter } from 'graphql-subscriptions';

import { SubscriptionTodoDeletedArgs } from '../../__generated__/resolvers-types';
import { pubsub } from '../../../pubsub';

async function todoDeleted(_: unknown, args: SubscriptionTodoDeletedArgs) {
  return {
    [Symbol.asyncIterator]: withFilter(
      () => pubsub.asyncIterator('TODO_DELETED'),
      (payload, __, ___) => payload.todoDeleted.board === args.board
    )
  };
}

export default todoDeleted;
