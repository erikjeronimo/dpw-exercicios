
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity.js';

@Entity('autores')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @OneToMany(() => Obra, (obra) => obra.autor)
  obras: Relation<Obra[]>;
}
