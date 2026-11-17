
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity.js';

export enum StatusExemplar {
  DISPONIVEL = 'DISPONIVEL',
  DESGASTADO = 'DESGASTADO',
  DESCARTADO = 'DESCARTADO',
}

@Entity('exemplares')
export class Exemplar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: StatusExemplar,
    default: StatusExemplar.DISPONIVEL,
  })
  status: StatusExemplar;

  @ManyToOne(() => Obra, (obra) => obra.exemplares, {
    nullable: false,
  })
  @JoinColumn({ name: 'obraId' })
  obra: Relation<Obra>;
}
