# E00.4 - Desfazer alteracoes

## 1. Criacao da alteracao local

Comando:

Add-Content README.md "Linha temporaria para testar o desfazer"

O arquivo README.md recebeu uma linha temporaria.

## 2. Verificacao da alteracao local

Comando:

git diff -- README.md

Saida:

diff --git a/README.md b/README.md
index efa1540..3c1ac0a 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
 # DPW - Exercicios do M00
+Linha temporaria para testar o desfazer

A saida mostrou que existia uma alteracao local ainda nao commitada.

## 3. Desfazendo a alteracao local

Comando:

git restore README.md

O comando restaurou o README.md para a ultima versao commitada.

Confirmacao:

git status --short

Saida:

Nenhuma saida.

Comando:

git diff -- README.md

Saida:

Nenhuma saida.

Isso confirmou que a alteracao local foi descartada sem criar um novo commit.

## 4. Reflog das operacoes

Comando:

git reflog -n 8

Saida:

9618f92 (HEAD -> master) HEAD@{0}: revert: Revert "docs: adiciona evidencia de desfazer"
2ab5e4b (origin/master) HEAD@{1}: commit: docs: adiciona evidencia de diagnostico
820b261 HEAD@{2}: commit: docs: adiciona evidencia de desfazer
2d465ff HEAD@{3}: commit: docs: adiciona evidencia de conflito
98f130f HEAD@{4}: commit (merge): merge: resolve conflito de titulo
a518eca (feat/titulo-a) HEAD@{5}: merge feat/titulo-a: Fast-forward
176d337 HEAD@{6}: checkout: moving from feat/titulo-b to master
f4ce33b (feat/titulo-b) HEAD@{7}: commit: docs: altera titulo na branch B

O reflog registra as operacoes recentes realizadas no repositorio.

## 5. Revert de um commit publicado

O commit que adicionou a evidencia anterior foi:

820b261 docs: adiciona evidencia de desfazer

Para desfazer esse commit sem apagar seu historico, foi utilizado:

git revert 820b261

O Git abriu o editor para confirmar a mensagem:

Revert "docs: adiciona evidencia de desfazer"

Depois da confirmacao, foi criado o commit:

9618f92 Revert "docs: adiciona evidencia de desfazer"

Esse commit desfaz as alteracoes introduzidas pelo commit 820b261, mantendo o historico do repositorio.

## 6. Confirmacao do revert

Comando:

git status

Saida:

On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

Comando:

git log --oneline --decorate -5

Saida:

9618f92 (HEAD -> master) Revert "docs: adiciona evidencia de desfazer"
2ab5e4b (origin/master) docs: adiciona evidencia de diagnostico
820b261 docs: adiciona evidencia de desfazer
2d465ff docs: adiciona evidencia de conflito
98f130f merge: resolve conflito de titulo

A confirmacao mostra que o commit de revert foi criado e que a arvore de trabalho esta limpa.

## 7. Diferenca entre restore e revert

O comando git restore foi utilizado para descartar uma alteracao local que ainda nao havia sido commitada.

O comando git revert foi utilizado posteriormente para desfazer um commit que ja fazia parte do historico.

A diferenca principal e que git restore descarta uma alteracao local, enquanto git revert cria um novo commit que desfaz as alteracoes de um commit anterior.

## 8. Conclusao

O exercicio demonstrou duas formas de desfazer alteracoes no Git.

Primeiro, uma alteracao local foi criada e removida com git restore.

Depois, um commit existente foi desfeito com git revert, gerando o commit 9618f92.

O reflog tambem foi utilizado para registrar as operacoes realizadas durante o exercicio.
Teste do caso 4
