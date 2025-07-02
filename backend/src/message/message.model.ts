import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => Float)
  timestamp: number;

  @Field(() => User)
  author: User;

  @Field(() => Conversation)
  conversation: Conversation;
}
