export class JacEventDto {
  id: number;
  nombre: string;
  estado: boolean;
  asocomunalId: number;
  action: 'created' | 'updated' | 'deleted';
}
