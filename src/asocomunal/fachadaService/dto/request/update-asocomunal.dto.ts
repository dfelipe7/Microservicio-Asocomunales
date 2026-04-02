import { PartialType } from '@nestjs/mapped-types';
import { CreateAsocomunalDto } from './create-asocomunal.dto';

export class UpdateAsocomunalDto extends PartialType(CreateAsocomunalDto) {
}
