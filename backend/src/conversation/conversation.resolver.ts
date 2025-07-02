import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private conversationService: ConversationService) {}

  @Query(() => [Conversation])
  conversations() {
    return this.conversationService.findAll();
  }

  @Query(() => Conversation, { nullable: true })
  conversation(@Args('id') id: string) {
    return this.conversationService.findOne(id);
  }

  @Mutation(() => Conversation)
  createConversation(@Args({ name: 'participantIds', type: () => [String] }) participantIds: string[]) {
    return this.conversationService.create(participantIds);
  }

  @Query(() => [Conversation])
    conversationsForUser(@Args('userId') userId: string) {
    return this.conversationService.findByUserId(userId);
  }

}
