import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAsocomunalDto {
  @ApiProperty({
    example: 'Asocomunal Norte',
    description: 'Nombre de la asocomunal',
  })
  nombre!: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado de la asocomunal',
  })
  estado?: boolean;

  @ApiPropertyOptional({
    example: 3,
    description: 'ID del municipio al que pertenece',
  })
  municipioId?: number;

  @ApiPropertyOptional({
    example: 'Carlos Pérez',
    description: 'Nombre del presidente de la asocomunal',
  })
  presidente?: string | null;

  @ApiPropertyOptional({
    example: '3124567890',
    description: 'Teléfono de contacto',
  })
  telefono?: string | null;

  @ApiPropertyOptional({
    example: 'asocomunal@gmail.com',
    description: 'Correo electrónico',
  })
  correo?: string | null;
}
