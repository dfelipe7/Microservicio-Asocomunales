import { MunicipioResponseDto } from 'src/municipio/dto/response/municipio-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { JacResponseDto } from 'src/jac/dto/jac-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AsocomunalResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id!: number;

  @Expose()
  @ApiProperty({ example: 'Asocomunal Norte' })
  nombre!: string;

  @Expose()
  @ApiProperty({ example: true })
  estado!: boolean;

  @Expose()
  @ApiProperty({ example: 'Carlos Pérez', required: false })
  presidente?: string;

  @Expose()
  @ApiProperty({ example: '3124567890', required: false })
  telefono?: string;

  @Expose()
  @ApiProperty({ example: 'asocomunal@gmail.com', required: false })
  correo?: string;

  @Expose()
  @Type(() => MunicipioResponseDto)
  @ApiProperty({ type: () => MunicipioResponseDto })
  municipio!: MunicipioResponseDto;

  @Expose()
  @Type(() => JacResponseDto)
  @ApiProperty({ type: () => [JacResponseDto] })
  jacs!: JacResponseDto[];

  @Exclude()
  municipioId!: number;
}
