import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message])
  messages(@Args('conversationId') conversationId: string) {
    return this.messageService.findByConversation(conversationId);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('authorId') authorId: string,
    @Args('content') content: string,
  ) {
    const timestamp = Date.now();
    const message = await this.messageService.create({ conversationId, authorId, content, timestamp });
    await pubSub.publish('messageSent', { messageSent: message });
    return message;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => payload.messageSent.conversation.id === variables.conversationId,
    resolve: payload => payload.messageSent,
  })
  messageSent(@Args('conversationId') conversationId: string) {
    return pubSub.asyncIterableIterator('messageSent');
  }
}
