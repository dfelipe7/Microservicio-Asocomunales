import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class JacResponseDto {
  @Expose()
  @ApiProperty({
    example: 'JAC Barrio Centro',
    description: 'Nombre de la Junta de Acción Comunal',
  })
  nombre!: string;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Estado de la JAC',
  })
  estado!: boolean;

  @Exclude()
  id!: number;

  @Exclude()
  asocomunalId!: number;

  @Exclude()
  externalId!: number;
}
