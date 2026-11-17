
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Autor } from './autores/entities/autor.entity.js';
import { Obra } from './obras/entities/obra.entity.js';
import { Exemplar } from './exemplares/entities/exemplar.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [Autor, Obra, Exemplar],
  migrations: ['src/migrations/*.ts'],

  synchronize: false,
  logging: true,
});
