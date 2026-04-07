import { PartialType } from '@nestjs/mapped-types';
import { CreateJacDto } from './create-jac.dto';

export class UpdateJacDto extends PartialType(CreateJacDto) {}
