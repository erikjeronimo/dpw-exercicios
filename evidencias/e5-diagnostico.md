# E00.5 - Diagnostico do repositorio

## 1. Estado da branch e da arvore de trabalho

Comando:

git status --short --branch

Saida:

## master...origin/master [ahead 7]

A branch master esta 7 commits a frente da branch remota origin/master.

Nao existem arquivos modificados ou nao rastreados.

## 2. Branches locais e rastreamento remoto

Comando:

git branch -vv

Saida:

feat/titulo-a a518eca docs: altera titulo na branch A
feat/titulo-b f4ce33b docs: altera titulo na branch B
master        820b261 [origin/master: ahead 7] docs: adiciona evidencia de desfazer

As branches feat/titulo-a e feat/titulo-b continuam registradas localmente.

A branch master esta vinculada a origin/master e possui 7 commits a mais que a branch remota.

## 3. Historico recente

Comando:

git log --oneline --decorate --graph --all -10

Saida:

* 820b261 (HEAD -> master) docs: adiciona evidencia de desfazer
* 2d465ff docs: adiciona evidencia de conflito
*   98f130f merge: resolve conflito de titulo
|\
| * f4ce33b (feat/titulo-b) docs: altera titulo na branch B
* | a518eca (feat/titulo-a) docs: altera titulo na branch A
|/
* 176d337 docs: adiciona evidencia de arqueologia
* 8d429a9 docs: adiciona evidencias dos exercicios
* 7bbb94e (origin/master) fix: corrigindo variaveis do ambiente
* 66cc098 chore: configura projeto inicial

O historico mostra o merge entre as branches feat/titulo-a e feat/titulo-b.

## 4. Verificacao de alteracoes

Comando:

git diff HEAD

Saida:

Nenhuma saida.

Isso confirma que nao existem alteracoes locais em relacao ao ultimo commit.

## 5. Conclusao

O repositorio esta em um estado limpo.

A branch master possui 7 commits locais que ainda nao foram enviados para origin/master.

As branches utilizadas no exercicio continuam disponiveis e o historico registra o merge realizado.

O comando git diff HEAD confirmou que nao existem alteracoes pendentes.
