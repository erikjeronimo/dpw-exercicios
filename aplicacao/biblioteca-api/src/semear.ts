
import { AppDataSource } from './data-source.js';
import { Autor } from './autores/entities/autor.entity.js';
import { Obra } from './obras/entities/obra.entity.js';
import {
  Exemplar,
  StatusExemplar,
} from './exemplares/entities/exemplar.entity.js';

async function semear() {
  await AppDataSource.initialize();

  try {
    const autorRepository = AppDataSource.getRepository(Autor);
    const obraRepository = AppDataSource.getRepository(Obra);
    const exemplarRepository = AppDataSource.getRepository(Exemplar);

    const totalAutores = await autorRepository.count();
    const totalObras = await obraRepository.count();
    const totalExemplares = await exemplarRepository.count();

    if (totalAutores > 0 || totalObras > 0 || totalExemplares > 0) {
      console.log('O banco já possui dados. Nenhuma inserção foi realizada.');
      console.log({
        autores: totalAutores,
        obras: totalObras,
        exemplares: totalExemplares,
      });
      return;
    }

    await AppDataSource.transaction(async (manager) => {
      const autores = [
        'Machado de Assis',
        'Machado - Autor de Teste',
        'José de Alencar',
        'Clarice Lispector',
        'Graciliano Ramos',
        'Rachel de Queiroz',
        'Jorge Amado',
        'Cecília Meireles',
        'Carlos Drummond de Andrade',
        'Monteiro Lobato',
        'Euclides da Cunha',
        'Ariano Suassuna',
      ].map((nome) => manager.create(Autor, { nome }));

      const autoresSalvos = await manager.save(Autor, autores);

      const obras = Array.from({ length: 200 }, (_, index) => {
        const numero = index + 1;

        const titulo =
          index < 20
            ? `Contos do Sertão ${numero}`
            : `Obra de Exemplo ${numero}`;

        const anoPublicacao =
          index < 20 ? 1880 + index : 1900 + (index % 126);

        const isbn = numero % 5 === 0
          ? null
          : `978000000${String(numero).padStart(4, '0')}`;

        return manager.create(Obra, {
          titulo,
          anoPublicacao,
          isbn,
          autor: autoresSalvos[index % autoresSalvos.length],
        });
      });

      const obrasSalvas = await manager.save(Obra, obras);

      const status = [
        StatusExemplar.DISPONIVEL,
        StatusExemplar.DESGASTADO,
        StatusExemplar.DESCARTADO,
      ];

      const exemplares = obrasSalvas.map((obra, index) =>
        manager.create(Exemplar, {
          status: status[index % status.length],
          obra,
        }),
      );

      await manager.save(Exemplar, exemplares);
    });

    console.log('Semeadura concluída com sucesso!');
    console.log({
      autores: await autorRepository.count(),
      obras: await obraRepository.count(),
      exemplares: await exemplarRepository.count(),
    });
  } finally {
    await AppDataSource.destroy();
  }
}

semear().catch((erro: unknown) => {
  console.error('Erro durante a semeadura:', erro);
  process.exitCode = 1;
});
