
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  LessThan,
  ILike,
  IsNull,
} from 'typeorm';

import { performance } from 'node:perf_hooks';

import { Obra } from './entities/obra.entity.js';
import { Autor } from '../autores/entities/autor.entity.js';

import {
  Exemplar,
  StatusExemplar,
} from '../exemplares/entities/exemplar.entity.js';

interface CriarObraDto {
  titulo: string;
  anoPublicacao: number;
  isbn?: string | null;
  autorId: number;
}

interface AtualizarObraDto {
  titulo?: string;
  anoPublicacao?: number;
  isbn?: string | null;
  autorId?: number;
}

@Injectable()
export class ObrasService {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,

    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,

    @InjectRepository(Exemplar)
    private readonly exemplarRepository: Repository<Exemplar>,
  ) {}

  // Lista obras com paginação e seus autores.
  async listar(page = 1, limit = 10) {
    const [obras, total] = await this.obraRepository.findAndCount({
      relations: { autor: true },
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      dados: obras,
      total,
      pagina: page,
      limite: limit,
      totalPaginas: Math.ceil(total / limit),
    };
  }

  // Busca uma obra e carrega seu autor e seus exemplares.
  async buscarPorId(id: number) {
    const obra = await this.obraRepository.findOne({
      where: { id },
      relations: { autor: true, exemplares: true },
    });

    if (!obra) {
      throw new NotFoundException(
        `Obra com ID ${id} não encontrada.`,
      );
    }

    return obra;
  }

  // Cadastra uma obra vinculada a um autor existente.
  async criar(dados: CriarObraDto) {
    const autor = await this.autorRepository.findOneBy({
      id: dados.autorId,
    });

    if (!autor) {
      throw new NotFoundException(
        `Autor com ID ${dados.autorId} não encontrado.`,
      );
    }

    const obra = this.obraRepository.create({
      titulo: dados.titulo,
      anoPublicacao: dados.anoPublicacao,
      isbn: dados.isbn ?? null,
      autor,
    });

    return this.obraRepository.save(obra);
  }

  // Atualiza os dados de uma obra existente.
  async atualizar(id: number, dados: AtualizarObraDto) {
    const obra = await this.obraRepository.findOneBy({ id });

    if (!obra) {
      throw new NotFoundException(
        `Obra com ID ${id} não encontrada.`,
      );
    }

    if (dados.titulo !== undefined) {
      obra.titulo = dados.titulo;
    }

    if (dados.anoPublicacao !== undefined) {
      obra.anoPublicacao = dados.anoPublicacao;
    }

    if (dados.isbn !== undefined) {
      obra.isbn = dados.isbn;
    }

    if (dados.autorId !== undefined) {
      const autor = await this.autorRepository.findOneBy({
        id: dados.autorId,
      });

      if (!autor) {
        throw new NotFoundException(
          `Autor com ID ${dados.autorId} não encontrado.`,
        );
      }

      obra.autor = autor;
    }

    return this.obraRepository.save(obra);
  }

  // Remove uma obra pelo ID.
  async remover(id: number) {
    const obra = await this.obraRepository.findOneBy({ id });

    if (!obra) {
      throw new NotFoundException(
        `Obra com ID ${id} não encontrada.`,
      );
    }

    await this.obraRepository.delete(id);

    return {
      mensagem: `Obra com ID ${id} removida com sucesso.`,
    };
  }

  // E06.1 - Consulta 1: obras publicadas antes de 1900.
  async consultarObrasAntesDe1900() {
    return this.obraRepository.find({
      where: { anoPublicacao: LessThan(1900) },
      order: { anoPublicacao: 'ASC' },
    });
  }

  // E06.1 - Consulta 2: títulos contendo "sertão".
  async consultarObrasDoSertao() {
    return this.obraRepository.find({
      where: { titulo: ILike('%sertão%') },
    });
  }

  // E06.1 - Consulta 3: obras de um autor com relacionamento.
  async consultarObrasPorAutor(autorId = 1) {
    return this.obraRepository.find({
      where: { autor: { id: autorId } },
      relations: { autor: true },
    });
  }

  // E06.1 - Consulta 4: exemplares desgastados ou descartados.
  async consultarExemplaresPorEstado() {
    return this.exemplarRepository.find({
      where: [
        { status: StatusExemplar.DESGASTADO },
        { status: StatusExemplar.DESCARTADO },
      ],
      relations: { obra: true },
    });
  }

  // E06.1 - Consulta 5: obras sem ISBN.
  async consultarObrasSemIsbn() {
    return this.obraRepository.find({
      where: { isbn: IsNull() },
    });
  }

  // E06.1 - Consulta 6: dez obras mais recentes.
  async consultarDezObrasMaisRecentes() {
    return this.obraRepository.find({
      order: {
        anoPublicacao: 'DESC',
        id: 'DESC',
      },
      take: 10,
    });
  }

  // E06.1 - Consulta 7: autores cujo nome começa com Machado.
  async consultarAutoresMachado() {
    return this.autorRepository.find({
      where: { nome: ILike('Machado%') },
    });
  }

  // E06.1 - Consulta 8: quantidade total de obras.
  async contarObras() {
    return this.obraRepository.count();
  }

  // Executa as oito consultas para demonstrar o SQL no terminal.
  async executarConsultasRepository() {
    const obrasAntesDe1900 =
      await this.consultarObrasAntesDe1900();

    const obrasDoSertao =
      await this.consultarObrasDoSertao();

    const obrasPorAutor =
      await this.consultarObrasPorAutor(1);

    const exemplaresPorEstado =
      await this.consultarExemplaresPorEstado();

    const obrasSemIsbn =
      await this.consultarObrasSemIsbn();

    const dezObrasMaisRecentes =
      await this.consultarDezObrasMaisRecentes();

    const autoresMachado =
      await this.consultarAutoresMachado();

    const totalObras = await this.contarObras();

    return {
      consulta1_obrasAntesDe1900: obrasAntesDe1900,
      consulta2_obrasDoSertao: obrasDoSertao,
      consulta3_obrasPorAutor: obrasPorAutor,
      consulta4_exemplaresPorEstado: exemplaresPorEstado,
      consulta5_obrasSemIsbn: obrasSemIsbn,
      consulta6_dezObrasMaisRecentes: dezObrasMaisRecentes,
      consulta7_autoresMachado: autoresMachado,
      consulta8_totalObras: totalObras,
    };
  }

  // E06.2 - Demonstra o problema N+1.
  async testarNmaisUm() {
    const inicio = performance.now();

    const obras = await this.obraRepository.find({
      relations: { autor: true },
      order: { id: 'ASC' },
      take: 50,
    });

    const dados = [];

    for (const obra of obras) {
      const autor = await this.autorRepository.findOneBy({
        id: obra.autor.id,
      });

      dados.push({
        id: obra.id,
        titulo: obra.titulo,
        autor: autor?.nome ?? null,
      });
    }

    const fim = performance.now();

    return {
      estrategia: 'N+1',
      quantidadeObras: dados.length,
      quantidadeConsultasEsperadas: 52,
      tempoMs: Number((fim - inicio).toFixed(2)),
      dados,
    };
  }

  // E06.2 - Demonstra a consulta corrigida com relacionamento.
  async testarConsultaCorrigida() {
    const inicio = performance.now();

    const obras = await this.obraRepository.find({
      relations: { autor: true },
      order: { id: 'ASC' },
      take: 50,
    });

    const dados = obras.map((obra) => ({
      id: obra.id,
      titulo: obra.titulo,
      autor: obra.autor.nome,
    }));

    const fim = performance.now();

    return {
      estrategia: 'Corrigida',
      quantidadeObras: dados.length,
      quantidadeConsultasEsperadas: 2,
      tempoMs: Number((fim - inicio).toFixed(2)),
      dados,
    };
  }
}
