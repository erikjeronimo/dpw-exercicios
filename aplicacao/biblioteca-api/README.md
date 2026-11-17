# Biblioteca API

API de gerenciamento de uma biblioteca, desenvolvida como atividade individual da disciplina de Desenvolvimento de Projetos Web.

O projeto utiliza NestJS, TypeORM e PostgreSQL para realizar operações CRUD, consultas com Repository, paginação e análise do problema N+1.

## Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker
- pnpm

## Funcionalidades

- Cadastro, consulta, atualização e remoção de obras.
- Relacionamento entre autores, obras e exemplares.
- Persistência de dados com PostgreSQL.
- Migrations para criação das tabelas.
- Semeadura do banco com dados de teste.
- Paginação utilizando `findAndCount()`.
- Consultas com Repository.
- Análise e correção do problema N+1.
- Exibição das consultas SQL com `logging: true`.

## Configuração do ambiente

### 1. Instalar dependências

Na pasta `aplicacao/biblioteca-api`, execute:

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `aplicacao/biblioteca-api`, utilizando `.env.example` como referência.

Configure os dados de conexão com o PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=dpw_biblioteca
```

A senha deve permanecer apenas no arquivo `.env`, que não é enviado ao GitHub.

### 3. Preparar o banco de dados

Crie o banco PostgreSQL `dpw_biblioteca` e mantenha o serviço disponível.

### 4. Executar a migration

```bash
node --import=tsx ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts
```

Para consultar o estado das migrations:

```bash
node --import=tsx ./node_modules/typeorm/cli.js migration:show -d src/data-source.ts
```

### 5. Semear o banco

```bash
node --import=tsx src/semear.ts
```

O script cadastra dados de teste para autores, obras e exemplares.

**Atenção:** execute a semeadura apenas quando necessário, pois ela insere dados no banco.

## Executar a aplicação

Modo de desenvolvimento:

```bash
pnpm run start:dev
```

Compilação:

```bash
pnpm run build
```

Execução em produção:

```bash
pnpm run start:prod
```

A API utiliza a porta 3000 por padrão.

## Principais rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/obras` | Lista obras com paginação |
| GET | `/obras/:id` | Consulta uma obra |
| POST | `/obras` | Cadastra uma obra |
| PATCH | `/obras/:id` | Atualiza uma obra |
| DELETE | `/obras/:id` | Remove uma obra |
| GET | `/obras/relatorios/consultas` | Executa as oito consultas Repository |
| GET | `/obras/relatorios/nmaisum` | Demonstra o problema N+1 |
| GET | `/obras/relatorios/corrigida` | Demonstra a consulta corrigida |

Exemplo de paginação:

```http
GET /obras?page=1&limit=5
```

## Testes

```bash
pnpm run test
pnpm run test:e2e
```

## Documentação da atividade

Os detalhes das entidades, migration, semeadura, consultas Repository, SQL gerado e comparação de desempenho do problema N+1 estão em:

`docs/consultas.md`

## Banco de dados

A aplicação utiliza `synchronize: false` e migrations para controlar a estrutura do banco. O logging do TypeORM está habilitado para permitir a análise das consultas SQL.

---

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento de Projetos Web.