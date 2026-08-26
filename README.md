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
