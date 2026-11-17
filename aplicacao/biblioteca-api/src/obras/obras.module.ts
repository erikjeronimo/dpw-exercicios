
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Obra } from './entities/obra.entity.js';
import { Autor } from '../autores/entities/autor.entity.js';
import { Exemplar } from '../exemplares/entities/exemplar.entity.js';

import { ObrasService } from './obras.service.js';
import { ObrasController } from './obras.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Obra, Autor, Exemplar]),
  ],
  controllers: [ObrasController],
  providers: [ObrasService],
  exports: [ObrasService],
})
export class ObrasModule {}
