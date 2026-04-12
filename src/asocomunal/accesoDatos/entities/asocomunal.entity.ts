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

  @Column({ nullable: true })
  municipioId!: number;

  @ManyToOne(() => Municipio, (m) => m.asocomunales)
  @JoinColumn({ name: 'municipioId' })
  municipio!: Municipio;

  @OneToMany(() => Jac, (jac) => jac.asocomunal)
  jacs!: Jac[];
}
