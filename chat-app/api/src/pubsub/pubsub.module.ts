// src/pubsub/pubsub.module.ts
import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        return new RedisPubSub({
          connection: {
            host: 'localhost',
            port: 6379,
          },
        });
      },
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
