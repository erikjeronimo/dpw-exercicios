# E2 — Persistência com TypeORM, Consultas SQL e Análise de N+1

## 1. Objetivo

Esta atividade tem como objetivo substituir a persistência em memória por um banco de dados PostgreSQL utilizando TypeORM.

Também são trabalhados:

- Mapeamento de entidades e relacionamentos.
- Criação e execução de migrations.
- Injeção de repositórios.
- Operações CRUD.
- Paginação com `findAndCount()`.
- Consultas SQL geradas pelo TypeORM.
- Identificação e correção do problema N+1.

## 2. Preparação do ambiente

Foi criada uma aplicação independente utilizando NestJS e TypeScript.

O projeto foi configurado com as seguintes tecnologias:

| Tecnologia | Utilização |
|---|---|
| NestJS | Estrutura da API |
| TypeScript | Linguagem de programação |
| TypeORM | Mapeamento objeto-relacional |
| PostgreSQL | Banco de dados |
| Docker | Execução do PostgreSQL |
| pnpm | Gerenciamento de dependências |

### 2.1. Dependências utilizadas

Foram instaladas as dependências necessárias para trabalhar com NestJS, TypeORM e PostgreSQL.

Principais pacotes:

- `@nestjs/config`
- `@nestjs/typeorm`
- `typeorm`
- `pg`
- `tsx`

## 3. Configuração do PostgreSQL

Foi criada uma base de dados independente chamada `dpw_biblioteca`.

O PostgreSQL foi executado em um container Docker já existente.

A conexão da aplicação foi configurada por meio de variáveis de ambiente no arquivo `.env`.

Variáveis utilizadas:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=(senha configurada localmente)
DB_DATABASE=dpw_biblioteca
```

A senha foi mantida apenas no arquivo local `.env`, que não deve ser enviado ao GitHub.

### 3.1. Configuração do TypeORM

O TypeORM foi configurado no `app.module.ts` com as seguintes opções:

- Conexão com PostgreSQL.
- Carregamento automático das entidades.
- `synchronize: false`.
- `logging: true`.

A opção `synchronize: false` impede que o TypeORM altere automaticamente a estrutura do banco de dados.

A opção `logging: true` permite visualizar no terminal os comandos SQL executados.

## 4. Teste de conexão

Foi executado o comando:

```powershell
pnpm run build
```

A compilação foi concluída sem erros.

Também foi executada uma consulta para verificar a conexão:

```sql
SELECT version();
```

O PostgreSQL retornou sua versão, confirmando a conexão.

Outra consulta executada:

```sql
SELECT * FROM current_schema();
```

O resultado confirmou o schema utilizado pela aplicação.

## 5. Modelo de dados e migrations

Foram criadas três entidades:

### 5.1. Autor

Representa os autores cadastrados no sistema.

Campos:

- `id`
- `nome`

Relacionamento:

- Um autor pode possuir várias obras.

### 5.2. Obra

Representa as obras cadastradas na biblioteca.

Campos:

- `id`
- `titulo`
- `anoPublicacao`
- `isbn`
- `autorId`

Relacionamentos:

- Cada obra pertence a um autor.
- Uma obra pode possuir vários exemplares.

### 5.3. Exemplar

Representa os exemplares físicos das obras.

Campos:

- `id`
- `status`
- `obraId`

Os status disponíveis são:

- `DISPONIVEL`
- `DESGASTADO`
- `DESCARTADO`

### 5.4. Relacionamentos

Foram utilizados os seguintes relacionamentos do TypeORM:

- `OneToMany`
- `ManyToOne`
- `JoinColumn`

A estrutura permite relacionar autores, obras e exemplares.

### 5.5. Migration inicial

Foi criada a migration `InitialSchema1794874381168`.

A migration realiza:

1. Criação do tipo ENUM dos status dos exemplares.
2. Criação da tabela `autores`.
3. Criação da tabela `obras`.
4. Criação da tabela `exemplares`.
5. Criação das chaves estrangeiras.

A migration foi executada com:

```powershell
node --import=tsx ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts
```

Resultado observado:

```text
Migration InitialSchema1794874381168 has been executed successfully.
COMMIT
```

### 5.6. Verificação das tabelas

Foi utilizado:

```powershell
docker exec ecocampus-postgres psql -U postgres -d dpw_biblioteca -c "\dt"
```

As tabelas encontradas foram:

- autores
- exemplares
- migrations
- obras

Também foi verificado o histórico:

```sql
SELECT * FROM migrations;
```

A migration inicial foi registrada corretamente.

## 6. Semeadura do banco de dados

Foi criado o arquivo `src/semear.ts` para inserir dados iniciais no banco.

O script utiliza os repositórios do TypeORM e uma transação para realizar as inserções.

Foram cadastrados:

| Registro | Quantidade |
|---|---:|
| Autores | 12 |
| Obras | 200 |
| Exemplares | 200 |

### 6.1. Características dos dados

Foram utilizados autores como:

- Machado de Assis
- José de Alencar
- Clarice Lispector
- Graciliano Ramos
- Rachel de Queiroz
- Jorge Amado
- Ariano Suassuna

Também foram criadas obras de teste com diferentes anos de publicação.

Algumas obras possuem ISBN nulo, permitindo testar consultas específicas.

Foram incluídos títulos contendo a palavra Sertão e obras publicadas antes de 1900.

Os exemplares foram distribuídos entre os status disponíveis.

### 6.2. Execução da semeadura

Comando utilizado:

```powershell
node --import=tsx src/semear.ts
```

Resultado observado:

```text
Semeadura concluída com sucesso!
{ autores: 12, obras: 200, exemplares: 200 }
```

### 6.3. Verificação dos registros

Foram realizadas consultas diretamente no PostgreSQL:

```sql
SELECT COUNT(*) FROM autores;
```

Resultado: 12.

```sql
SELECT COUNT(*) FROM obras;
```

Resultado: 200.

```sql
SELECT COUNT(*) FROM exemplares;
```

Resultado: 200.

A semeadura foi concluída corretamente.

## 7. Implementação da API com Repository

Foi implementado o serviço `ObrasService`, utilizando a injeção de repositórios por meio de `@InjectRepository`.

Foram implementadas operações para:

- Listar obras.
- Buscar uma obra por ID.
- Criar uma obra.
- Atualizar uma obra.
- Remover uma obra.

### 7.1. Paginação com findAndCount

A listagem utiliza o método `findAndCount()`.

Foram configurados:

- `skip`: define o deslocamento dos registros.
- `take`: define a quantidade de registros retornados.
- `order`: organiza os registros por ID.
- `relations`: carrega o relacionamento com autor.

A resposta contém os dados, total de registros, página atual, limite e total de páginas.

## 8. Teste real da API e SQL gerado

### 8.1. Listagem paginada de obras

Requisição HTTP:

`GET /obras?page=1&limit=5`

Resultado observado:

| Informação | Resultado |
|---|---:|
| Total de obras | 200 |
| Registros retornados | 5 |
| Página atual | 1 |
| Limite por página | 5 |
| Total de páginas | 40 |

A requisição foi executada com sucesso e os dados foram recuperados do PostgreSQL.

Método utilizado: `findAndCount()`.

Relacionamento carregado: `autor`.

### 8.2. SQL gerado pelo TypeORM

**Consulta 1 — Seleção dos IDs para paginação**

```sql
SELECT DISTINCT "distinctAlias"."Obra_id" AS "ids_Obra_id",
"distinctAlias"."Obra_id"
FROM (
  SELECT "Obra"."id" AS "Obra_id",
  "Obra"."titulo" AS "Obra_titulo",
  "Obra"."anoPublicacao" AS "Obra_anoPublicacao",
  "Obra"."isbn" AS "Obra_isbn",
  "Obra"."autorId" AS "Obra_autorId",
  "Obra__Obra_autor"."id" AS "Obra__Obra_autor_id",
  "Obra__Obra_autor"."nome" AS "Obra__Obra_autor_nome"
  FROM "obras" "Obra"
  INNER JOIN "autores" "Obra__Obra_autor"
  ON "Obra__Obra_autor"."id"="Obra"."autorId"
) "distinctAlias"
ORDER BY "distinctAlias"."Obra_id" ASC, "Obra_id" ASC
LIMIT 5 OFFSET 0;
```

**Consulta 2 — Recuperação das obras e autores**

```sql
SELECT "Obra"."id" AS "Obra_id",
"Obra"."titulo" AS "Obra_titulo",
"Obra"."anoPublicacao" AS "Obra_anoPublicacao",
"Obra"."isbn" AS "Obra_isbn",
"Obra"."autorId" AS "Obra_autorId",
"Obra__Obra_autor"."id" AS "Obra__Obra_autor_id",
"Obra__Obra_autor"."nome" AS "Obra__Obra_autor_nome"
FROM "obras" "Obra"
INNER JOIN "autores" "Obra__Obra_autor"
ON "Obra__Obra_autor"."id"="Obra"."autorId"
WHERE "Obra"."id" IN (1, 2, 3, 4, 5)
ORDER BY "Obra"."id" ASC;
```

**Consulta 3 — Contagem total**

```sql
SELECT COUNT(DISTINCT("Obra"."id")) AS "cnt"
FROM "obras" "Obra"
INNER JOIN "autores" "Obra__Obra_autor"
ON "Obra__Obra_autor"."id"="Obra"."autorId";
```

### 8.3. Análise do resultado

Na execução observada, o TypeORM utilizou três consultas SQL para realizar a paginação com relacionamento:

1. Seleção dos IDs das obras.
2. Recuperação das obras com seus autores.
3. Contagem total de registros.

O resultado confirmou o funcionamento da paginação com `findAndCount()`.

## 9. Atividade E06.1 — Consultas com Repository

Foram implementadas oito consultas utilizando os métodos do Repository do TypeORM.

### 9.1. Obras publicadas antes de 1900

Foi utilizado `LessThan(1900)` para selecionar obras com ano de publicação anterior a 1900.

```typescript
return this.obraRepository.find({
  where: { anoPublicacao: LessThan(1900) },
  order: { anoPublicacao: 'ASC' },
});
```

Resultado observado: 20 registros.

### 9.2. Títulos contendo "sertão"

Foi utilizado `ILike('%sertão%')` para realizar uma busca sem diferenciar letras maiúsculas e minúsculas.

```typescript
return this.obraRepository.find({
  where: { titulo: ILike('%sertão%') },
});
```

Resultado observado: 20 registros.

### 9.3. Obras de um autor com relacionamento

Foi utilizada uma condição pelo ID do autor e carregamento do relacionamento.

```typescript
return this.obraRepository.find({
  where: { autor: { id: autorId } },
  relations: { autor: true },
});
```

Resultado observado: 17 registros.

### 9.4. Exemplares desgastados ou descartados

Foi utilizada uma condição com duas possibilidades de status.

```typescript
return this.exemplarRepository.find({
  where: [
    { status: StatusExemplar.DESGASTADO },
    { status: StatusExemplar.DESCARTADO },
  ],
  relations: { obra: true },
});
```

Resultado observado: 133 registros.

### 9.5. Obras sem ISBN

Foi utilizado `IsNull()` para localizar os registros sem ISBN.

```typescript
return this.obraRepository.find({
  where: { isbn: IsNull() },
});
```

Resultado observado: 40 registros.

### 9.6. Dez obras mais recentes

Foi utilizada ordenação decrescente pelo ano de publicação e pelo ID.

```typescript
return this.obraRepository.find({
  order: {
    anoPublicacao: 'DESC',
    id: 'DESC',
  },
  take: 10,
});
```

Resultado observado: 10 registros.

### 9.7. Autores cujo nome começa com Machado

Foi utilizado `ILike('Machado%')`.

```typescript
return this.autorRepository.find({
  where: { nome: ILike('Machado%') },
});
```

Resultado observado: 2 registros.

### 9.8. Quantidade total de obras

Foi utilizado o método `count()`.

```typescript
return this.obraRepository.count();
```

Resultado observado: 200 obras.

### 9.9. Resumo dos resultados

| Consulta | Resultado |
|---|---:|
| Obras antes de 1900 | 20 |
| Obras com "sertão" no título | 20 |
| Obras do autor selecionado | 17 |
| Exemplares desgastados ou descartados | 133 |
| Obras sem ISBN | 40 |
| Dez obras mais recentes | 10 |
| Autores começando com Machado | 2 |
| Total de obras | 200 |

As oito consultas foram executadas pela rota:

`GET /obras/relatorios/consultas`

Os resultados foram conferidos na resposta da API.

## 10. Atividade E06.2 — Identificação e correção do problema N+1

### 10.1. O que é o problema N+1

O problema N+1 acontece quando uma consulta inicial recupera uma lista de registros e, depois, são realizadas consultas adicionais individualmente para cada registro.

Neste projeto, o teste foi realizado com 50 obras e seus respectivos autores.

Na primeira estratégia, o serviço percorre as obras e consulta o autor individualmente para cada uma delas.

Isso aumenta a quantidade de consultas SQL e o tempo de execução.

### 10.2. Implementação da estratégia N+1

Foi criado o método `testarNmaisUm()` no `ObrasService`.

O método:

1. Recupera 50 obras.
2. Percorre os resultados.
3. Consulta individualmente o autor de cada obra.
4. Mede o tempo de execução.

A busca inicial com relacionamento e paginação gerou duas consultas SQL no log do TypeORM. Depois foram realizadas 50 consultas individuais aos autores.

Total observado: 52 consultas SQL.

### 10.3. Implementação da estratégia corrigida

Foi criado o método `testarConsultaCorrigida()`.

A estratégia utiliza `relations: { autor: true }` para carregar os autores junto com as obras.

Assim, não é necessário executar uma consulta individual para cada autor.

Com a paginação e o relacionamento utilizados neste teste, o TypeORM gerou duas consultas SQL:

1. Seleção dos IDs das obras.
2. Recuperação das obras com seus autores.

Total observado: 2 consultas SQL.

### 10.4. Rotas utilizadas

Para testar as duas estratégias foram criadas as seguintes rotas:

| Método | Rota | Finalidade |
|---|---|---|
| GET | `/obras/relatorios/nmaisum` | Testar a estratégia N+1 |
| GET | `/obras/relatorios/corrigida` | Testar a estratégia corrigida |

As duas rotas retornam a quantidade de obras, a quantidade de consultas esperadas e o tempo medido.

### 10.5. Resultados dos testes

Foram realizadas chamadas às duas rotas utilizando o PowerShell.

Resultado da estratégia N+1:

```text
estrategia quantidadeObras quantidadeConsultasEsperadas tempoMs
N+1                     50                           52  847,08
```

Resultado da estratégia corrigida:

```text
estrategia quantidadeObras quantidadeConsultasEsperadas tempoMs
Corrigida               50                            2   37,65
```

Comparação:

| Indicador | N+1 | Corrigida |
|---|---:|---:|
| Obras analisadas | 50 | 50 |
| Consultas SQL | 52 | 2 |
| Tempo medido | 847,08 ms | 37,65 ms |

### 10.6. Análise dos resultados

A estratégia N+1 realizou 52 consultas SQL para recuperar 50 obras e seus autores.

Na estratégia corrigida, o relacionamento foi carregado diretamente pelo TypeORM, reduzindo a quantidade para duas consultas SQL.

O tempo passou de 847,08 ms para 37,65 ms na execução observada.

Isso representa uma redução aproximada de 95,6% no tempo de execução.

A comparação demonstra que carregar os relacionamentos corretamente pode evitar consultas repetidas e melhorar o desempenho da aplicação.

Os tempos são referentes à execução realizada e podem variar conforme o ambiente e as condições do banco de dados.

### 10.7. Conclusão da atividade

O teste demonstrou na prática o problema N+1 e uma forma de evitá-lo utilizando os recursos do TypeORM.

A utilização de `relations` permitiu recuperar as obras e seus autores sem realizar uma consulta individual para cada registro.

Com isso, foi possível reduzir a quantidade de consultas SQL e o tempo de execução.

## 11. Conclusão geral

A atividade permitiu implementar a persistência de dados utilizando PostgreSQL e TypeORM em uma API NestJS.

Foram realizadas:

- Configuração da conexão com PostgreSQL.
- Criação das entidades e relacionamentos.
- Criação e execução de migration.
- Semeadura do banco com autores, obras e exemplares.
- Implementação de operações CRUD com Repository.
- Paginação com `findAndCount()`.
- Execução das oito consultas da atividade E06.1.
- Visualização dos comandos SQL gerados pelo TypeORM.
- Demonstração e correção do problema N+1.

Os testes demonstraram que a aplicação consegue persistir, consultar e relacionar os dados corretamente.

Também foi possível observar como a utilização adequada dos relacionamentos pode melhorar o desempenho das consultas ao banco de dados.