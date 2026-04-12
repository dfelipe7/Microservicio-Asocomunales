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

  // Relación con Jac
  //Un Municipio puede tener muchas JAC
  /*
        OneToMany significa que un municipio puede tener muchas JACs.
        jac => jac.municipio indica que en la entidad Jac hay un campo municipio que guarda la clave foránea.
        De nuevo, en el lado One (Municipio) no se crea la columna de clave foránea, solo sirve para navegación.
    
    */
}
