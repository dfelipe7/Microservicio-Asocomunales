import { Asocomunal } from 'src/asocomunal/accesoDatos/entities/asocomunal.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Jac {
  @PrimaryGeneratedColumn()
  id: number; // id local de la JAC en MS1

  @Column()
  nombre: string;

  @Column()
  estado: boolean;

  @Column()
  asocomunalId: number; // apunta directamente a la asocomunal local
  @ManyToOne(() => Asocomunal, (a) => a.jacs)
  @JoinColumn({ name: 'asocomunalId' })
  asocomunal: Asocomunal;

  @Column({ unique: true })
  externalId: number; // id de la JAC en MS2
}