
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Autor } from '../../autores/entities/autor.entity.js';
import { Exemplar } from '../../exemplares/entities/exemplar.entity.js';

@Entity('obras')
export class Obra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'integer' })
  anoPublicacao: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  isbn: string | null;

  @ManyToOne(() => Autor, (autor) => autor.obras, {
    nullable: false,
  })
  @JoinColumn({ name: 'autorId' })
  autor: Relation<Autor>;

  @OneToMany(() => Exemplar, (exemplar) => exemplar.obra)
  exemplares: Relation<Exemplar[]>;
}
