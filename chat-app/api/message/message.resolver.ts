import { Resolver, Query, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';



@ObjectType()
export class Message {
  @Field()
  conversationId: string;

  @Field()
  content: string;

  constructor(conversationId: string, content: string) {
    this.conversationId = conversationId;
    this.content = content;
  }
}

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly rabbitmqService: RabbitMQService) {}

  @Query(() => String)
  hello() {
    return 'API GraphQL fonctionne !';
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
  ): Promise<Message> {
    const payload = { conversationId, content, authorId: 'mock-user' };
    await this.rabbitmqService.sendMessage('message_send', payload);
    return new Message(conversationId, content);
  }
}
