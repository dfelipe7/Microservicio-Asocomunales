import { Expose, Exclude } from "class-transformer";

export class MunicipioResponseDto {
    @Expose()
    id : number;
    @Expose()
    nombre: string;
    


}
