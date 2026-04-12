import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MunicipioResponseDto {
  @Expose()
  @ApiProperty({
    example: 3,
    description: 'ID del municipio',
  })
  id!: number;

  @Expose()
  @ApiProperty({
    example: 'Popayán',
    description: 'Nombre del municipio',
  })
  nombre!: string;

  @Exclude()
  isActive?: boolean;
}
