import { PartialType } from '@nestjs/swagger';
import { CreateAsocomunalDto } from './create-asocomunal.dto';

/**
 * DTO para la actualización de una asocomunal.
 * 
 * Hereda todas las propiedades de `CreateAsocomunalDto` y permite modificarlas.
 */

export class UpdateAsocomunalDto extends PartialType(CreateAsocomunalDto) { }
