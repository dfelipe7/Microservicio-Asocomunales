import { ApiProperty } from '@nestjs/swagger';

export class CreateMunicipioDto {
  @ApiProperty({
    example: 'Popayán',
    description: 'Nombre del municipio',
  })
  nombre!: string;
}
