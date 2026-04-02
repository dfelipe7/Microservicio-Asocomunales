import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Municipio } from '../../../municipio/entities/municipio.entity';
@Entity('asocomunales')
export class Asocomunal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @Column({nullable: true})
  municipioId: number;

  
  @ManyToOne(() => Municipio, m => m.asocomunales)
  @JoinColumn({ name: 'municipioId' })
  municipio?: Municipio;
}