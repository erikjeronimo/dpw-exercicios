
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ObrasService } from './obras.service.js';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}

  @Get()
  listar(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.obrasService.listar(
      Math.max(1, Number(page) || 1),
      Math.min(100, Math.max(1, Number(limit) || 10)),
    );
  }

  // E06.1 - Executa as oito consultas Repository.
  @Get('relatorios/consultas')
  executarConsultasRepository() {
    return this.obrasService.executarConsultasRepository();
  }

  // E06.2 - Demonstra o problema N+1.
  @Get('relatorios/nmaisum')
  testarNmaisUm() {
    return this.obrasService.testarNmaisUm();
  }

  // E06.2 - Demonstra a consulta corrigida.
  @Get('relatorios/corrigida')
  testarConsultaCorrigida() {
    return this.obrasService.testarConsultaCorrigida();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.obrasService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dados: {
    titulo: string;
    anoPublicacao: number;
    isbn?: string | null;
    autorId: number;
  }) {
    return this.obrasService.criar(dados);
  }

  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: {
      titulo?: string;
      anoPublicacao?: number;
      isbn?: string | null;
      autorId?: number;
    },
  ) {
    return this.obrasService.atualizar(id, dados);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.obrasService.remover(id);
  }
}
