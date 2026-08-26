# DPW - Caderno de Exercicios

Repositorio destinado aos exercicios do modulo M00 - Ambiente e Ferramentas.

## Objetivo

Este repositorio apresenta as evidencias dos exercicios realizados durante o modulo, utilizando Git, GitHub e ferramentas de desenvolvimento.

O objetivo e demonstrar, por meio de comandos reais e do historico do repositorio, o dominio das operacoes solicitadas na atividade.

## Tabela de Evidencias

| Exercicio | Descricao | Evidencia |
|---|---|---|
| E00.1 | Ambiente reprodutivel | [Ver evidencia](evidencias/e1-ambiente.md) |
| E00.2 | Arqueologia de historico | [Ver evidencia](evidencias/e2-arqueologia.md) |
| E00.3 | Conflito de merge | [Ver evidencia](evidencias/e3-conflito.md) |
| E00.4 | Desfazer alteracao local | [Ver evidencia](evidencias/e4-desfazer.md) |
| E00.5 | Diagnostico do repositorio | [Ver evidencia](evidencias/e5-diagnostico.md) |

## E00.1 - Ambiente reprodutivel

Demonstracao da configuracao e reproducibilidade do ambiente de desenvolvimento.

A evidencia apresenta os comandos utilizados para preparar o projeto, verificar as dependencias e configurar arquivos relacionados ao ambiente.

[Ver evidencia do E00.1](evidencias/e1-ambiente.md)

## E00.2 - Arqueologia de historico

Analise do historico do repositorio `nestjs/nest`.

Foram utilizados comandos reais para identificar:

- quantidade total de commits;
- primeiro commit do repositorio;
- principais autores de um arquivo;
- ultimo commit que modificou determinado arquivo;
- quantidade de commits realizados nos ultimos 90 dias.

[Ver evidencia do E00.2](evidencias/e2-arqueologia.md)

## E00.3 - Conflito de merge

Foi criado um conflito de merge utilizando duas branches:

- `feat/titulo-a`
- `feat/titulo-b`

O conflito foi provocado pela criacao do mesmo arquivo em branches diferentes.

A resolucao foi realizada manualmente e registrada em um commit de merge com dois pais.

[Ver evidencia do E00.3](evidencias/e3-conflito.md)

## E00.4 - Desfazer alteracao

Foi realizada uma alteracao local no `README.md`.

A modificacao foi identificada utilizando `git diff` e posteriormente descartada utilizando:

```powershell
git restore README.md
```
A alteracao foi desfeita sem a criacao de um novo commit.

Tambem foi utilizado o `git reflog` para registrar e identificar as operacoes realizadas no historico local.

Entre as operacoes registradas estao:

- criacao de commits;
- merge entre branches;
- checkout entre branches;
- revert de um commit;
- atualizacao posterior da evidencia.

O commit de revert foi criado publicamente para demonstrar a operacao de desfazer uma alteracao ja registrada no historico.

[Ver evidencia do E00.4](https://github.com/erikjeronimo/dpw-exercicios/blob/master/evidencias/e4-desfazer.md)

## E00.5 - Diagnostico do repositorio

Foi realizado um diagnostico do estado atual do repositorio utilizando comandos do Git.

Foram verificadas as seguintes informacoes:

- estado da branch atual;
- quantidade de commits locais que ainda nao estavam na branch remota;
- branches locais existentes;
- rastreamento da branch `master` em relacao a `origin/master`;
- historico recente de commits;
- estrutura do merge realizado;
- existencia de alteracoes pendentes na arvore de trabalho.

O diagnostico confirmou que o repositorio estava limpo e que a branch `master` possuia commits locais que ainda precisavam ser publicados no GitHub.

Tambem foi utilizado o comando `git diff HEAD` para confirmar que nao existiam alteracoes pendentes em relacao ao ultimo commit.

[Ver evidencia do E00.5](https://github.com/erikjeronimo/dpw-exercicios/blob/master/evidencias/e5-diagnostico.md)

## Historico do repositorio

O historico do repositorio registra as etapas realizadas durante os exercicios, incluindo criacao de evidencias, criacao e merge de branches, resolucao de conflito, desfazer alteracoes e diagnostico do repositorio.

Alguns dos principais commits realizados foram:

- `176d337` - docs: adiciona evidencia de arqueologia
- `a518eca` - docs: altera titulo na branch A
- `f4ce33b` - docs: altera titulo na branch B
- `98f130f` - merge: resolve conflito de titulo
- `2d465ff` - docs: adiciona evidencia de conflito
- `820b261` - docs: adiciona evidencia de desfazer
- `9618f92` - Revert "docs: adiciona evidencia de desfazer"
- `ce1789f` - docs: atualiza evidencia de desfazer
- `2ab5e4b` - docs: adiciona evidencia de diagnostico

## Branches utilizadas

Durante o exercicio de conflito foram utilizadas duas branches de desenvolvimento:

- `feat/titulo-a`
- `feat/titulo-b`

As duas branches foram utilizadas para provocar um conflito de merge no arquivo `README.md`.

Depois da resolucao, o merge foi registrado no commit:

`98f130f merge: resolve conflito de titulo`

Esse commit possui dois pais, demonstrando que houve uma uniao real entre as duas linhas de historico.

## Publicacao

O repositorio foi enviado para o GitHub utilizando:

```powershell
git push origin master
```
## Conclusao

Os exercicios do modulo M00 foram realizados utilizando comandos reais do Git e registrados no historico do repositorio.

As evidencias foram organizadas em arquivos separados dentro do diretorio `evidencias`.

O repositorio demonstra:

- configuracao e reproducibilidade do ambiente;
- utilizacao de comandos Git;
- analise do historico do repositorio;
- criacao e utilizacao de branches;
- provocacao e resolucao de conflito de merge;
- utilizacao do `git restore` para desfazer alteracoes locais;
- utilizacao do `git reflog` para analisar operacoes realizadas;
- utilizacao do `git revert`;
- diagnostico do estado do repositorio;
- publicacao do projeto no GitHub.

Cada exercicio possui uma evidencia propria, contendo os comandos utilizados, as respectivas saidas e uma explicacao dos resultados obtidos.

O historico do Git foi preservado para demonstrar as operacoes realizadas durante os exercicios.

## Estrutura do projeto

```text
dpw-exercicios/
|
+-- evidencias/
|   +-- e1-ambiente.md
|   +-- e2-arqueologia.md
|   +-- e3-conflito.md
|   +-- e4-desfazer.md
|   +-- e5-diagnostico.md
|
+-- README.md
+-- package.json
+-- pnpm-lock.yaml
+-- .gitignore
````
Autor: Erik Jerônimo da Silva Lima
