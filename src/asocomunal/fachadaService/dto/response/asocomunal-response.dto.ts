import { MunicipioResponseDto } from 'src/municipio/dto/response/municipio-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { JacResponseDto } from 'src/jac/dto/jac-response.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la respuesta de una asocomunal.
 * 
 * Este DTO define la estructura de los datos que se devuelven al consultar una asocomunal.
 * Incluye información básica, relación con el municipio y las JAC asociadas.
 */

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

  /**
   * Relación con el municipio.
   * 
   * @Type indica que se debe transformar a `MunicipioResponseDto`.
   * @ApiProperty documenta la propiedad en Swagger.
   */
  @Expose()
  @Type(() => MunicipioResponseDto)
  @ApiProperty({ type: () => MunicipioResponseDto })
  municipio!: MunicipioResponseDto;

  /**
   * Relación con las JAC.
   * 
   * @Type indica que se debe transformar a `JacResponseDto`.
   * @ApiProperty documenta la propiedad en Swagger.
   */
  @Expose()
  @Type(() => JacResponseDto)
  @ApiProperty({ type: () => [JacResponseDto] })
  jacs!: JacResponseDto[];

  @Exclude()
  municipioId!: number;
}
