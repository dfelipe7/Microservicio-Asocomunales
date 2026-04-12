export class AsocomunalEventDto {
  id: number;
  nombre: string;
  municipioId: number;
  municipioNombre: string;
  estado: boolean;
  action: 'created' | 'updated' | 'deleted';
}
