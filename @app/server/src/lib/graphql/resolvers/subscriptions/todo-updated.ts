import { withFilter } from 'graphql-subscriptions';

import { SubscriptionTodoUpdatedArgs } from '../../__generated__/resolvers-types';
import { pubsub } from '../../../pubsub';

async function todoUpdated(_: unknown, args: SubscriptionTodoUpdatedArgs) {
  return {
    [Symbol.asyncIterator]: withFilter(
      () => pubsub.asyncIterator('TODO_UPDATED'),
      (payload, __, ___) => {
        console.log('🚀 ~ todoUpdated ~ payload:', payload);
        return payload.todoUpdated.board === args.board;
      }
    )
  };
}

export default todoUpdated;
