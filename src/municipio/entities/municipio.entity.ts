import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asocomunal } from '../../asocomunal/accesoDatos/entities/asocomunal.entity';

@Entity('municipio')
export class Municipio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ default: true })
  isActive!: boolean;

  // Relación con Asocomunal
  // Un Municipio puede tener muchas Asocomunales
  // OneToMany es solo para poder navegar desde el Municipio hacia todas sus Asocomunales.
  // El lado "One" de la relación no tiene la clave foránea,
  // Un Municipio puede tener muchas Asocomunales
  @OneToMany(() => Asocomunal, (asocomunal) => asocomunal.municipio)
  asocomunales!: Asocomunal[];
}
