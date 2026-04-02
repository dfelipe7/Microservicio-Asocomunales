import { MunicipioResponseDto } from 'src/municipio/dto/response/municipio-response.dto';
import { Exclude, Type } from 'class-transformer';
export class AsocomunalResponseDto {

   id: number;
    nombre: string;
    estado: boolean;

    @Type(() => MunicipioResponseDto)
    municipio: MunicipioResponseDto;

    @Exclude() // 👈 Esto ocultará el ID repetido en el JSON
    municipioId: number;
}