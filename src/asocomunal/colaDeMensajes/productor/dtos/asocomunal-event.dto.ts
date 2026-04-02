export class AsocomunalEventDto {
  id: number;
  nombre: string;
  municipioId: number;
  estado: boolean;
  action: 'created' | 'updated' | 'deleted';
}