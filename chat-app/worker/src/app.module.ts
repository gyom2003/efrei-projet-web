import { Module } from '@nestjs/common';
import { MessageController } from './message/message.controller';
import { PrismaModule } from './prisma/prisma.module';
import { MessageService } from './message/message.service';

@Module({
  imports: [PrismaModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class AppModule {}
