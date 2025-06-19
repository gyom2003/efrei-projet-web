import { Module } from '@nestjs/common';
import { MessageController } from './message/message.controller';

@Module({
  controllers: [MessageController],
})
export class AppModule {}
