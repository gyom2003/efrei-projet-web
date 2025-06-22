import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  conversationId: string;

  @Field()
  content: string;

  @Field()
  authorId: string;

  @Field(() => Float)
  timestamp: number;
}
