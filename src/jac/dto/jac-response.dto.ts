import { Exclude, Expose } from "class-transformer";

export class JacResponseDto {

    @Expose() // Esto asegura que el campo se incluya en la transformación
    nombre: string;
    @Expose()
    estado: boolean
    @Exclude() // Esto ocultará el ID en el JSON
    id: number;
    @Exclude() // Esto ocultará el ID de la asocomunal en el JSON
    asocomunalId: number;   

    @Exclude() // Esto ocultará el ID externo en el JSON
    externalId: number;


}