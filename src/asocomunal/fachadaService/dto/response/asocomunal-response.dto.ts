import { MunicipioResponseDto } from 'src/municipio/dto/response/municipio-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { JacResponseDto } from 'src/jac/dto/jac-response.dto';
export class AsocomunalResponseDto {

  
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  estado: boolean;

  @Expose()
  presidente?: string;

  @Expose()
  telefono?: string;

  @Expose()
  correo?: string;

  @Expose()
  @Type(() => MunicipioResponseDto)
  municipio: MunicipioResponseDto;

  @Expose()
  @Type(() => JacResponseDto)
  jacs: JacResponseDto[];

    @Exclude() // 👈 Esto ocultará el ID repetido en el JSON
    municipioId: number;

 
}