import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { JacService } from '../../jac.service';
import { JacEventDto } from './dtos/jac-event.dto';

@Controller()
export class JacConsumer {
  constructor(private readonly jacService: JacService) {}

  @EventPattern('jac.events')
  async handleJacEvent(data: JacEventDto) {
      console.log('Mensaje recibido de MS2:', data);

    await this.jacService.handleEvent(data);
  }
}