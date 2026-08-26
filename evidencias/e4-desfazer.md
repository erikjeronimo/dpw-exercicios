# E00.4 - Desfazer alteracao local

## 1. Criacao da alteracao temporaria

Comando:

Add-Content README.md "Linha temporaria para testar o desfazer"

Apos executar o comando, o arquivo README.md recebeu uma linha temporaria.

## 2. Verificacao da alteracao

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

O comando git diff mostrou a linha adicionada ao arquivo.

## 3. Desfazendo a alteracao

Comando:

git restore README.md

O comando restaurou o README.md para a ultima versao commitada.

## 4. Confirmacao

Comando:

git status --short

Saida:

Nenhuma saida.

Comando:

git diff -- README.md

Saida:

Nenhuma saida.

Isso confirma que a alteracao temporaria foi completamente desfeita e que o repositorio voltou ao estado limpo.

## 5. Conclusao

O comando git restore README.md foi utilizado para descartar uma alteracao local que ainda nao havia sido commitada.

Nenhum novo commit foi criado para essa alteracao.
