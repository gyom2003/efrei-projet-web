import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(private readonly messageService: MessageService) {}

  @EventPattern('message_send')
  async receptionMessage(@Payload() data: any) {
    this.logger.log(`Message reçu : ${JSON.stringify(data)}`);
    await this.messageService.create(data);
  }
}
