import { PartialType } from '@nestjs/swagger';
import { CreateAsocomunalDto } from './create-asocomunal.dto';

export class UpdateAsocomunalDto extends PartialType(CreateAsocomunalDto) {}
