import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Municipio } from '../../../municipio/entities/municipio.entity';
import { Jac } from 'src/jac/entities/jac.entity';

/**
 * Clase que representa la entidad Asocomunal.
 * 
 * Esta clase es un modelo de datos que representa la tabla 'asocomunales' en la base de datos.
 * Contiene la información de las asocomunales, incluyendo su nombre, estado, presidente, 
 * teléfono, correo y la relación con el municipio al que pertenece.
 */

@Entity('asocomunales')
export class Asocomunal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ default: true })
  estado!: boolean;

  @Column({ type: 'varchar', nullable: true })
  presidente!: string | null;

  @Column({ type: 'varchar', nullable: true })
  telefono!: string | null;

  @Column({ type: 'varchar', nullable: true })
  correo!: string | null;

  /**
   * Relación con el municipio.
   * 
   * @ManyToOne indica que una asocomunal pertenece a un municipio.
   * @JoinColumn especifica la columna que se utiliza para la unión.
   */

  @Column({ nullable: true })
  municipioId!: number;

  @ManyToOne(() => Municipio, (m) => m.asocomunales)
  @JoinColumn({ name: 'municipioId' })
  municipio!: Municipio;

  /**
   * Relación con las JAC.
   * 
   * @OneToMany indica que una asocomunal tiene muchas JAC.
   */

  @OneToMany(() => Jac, (jac) => jac.asocomunal)
  jacs!: Jac[];
}
