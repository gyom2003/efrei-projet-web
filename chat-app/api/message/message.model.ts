import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  conversationId: string;

  @Field()
  content: string;

  @Field()
  authorId: string;

  @Field(() => Float)
  timestamp: number;
}
