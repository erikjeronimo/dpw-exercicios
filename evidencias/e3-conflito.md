# E00.3 - Conflito de merge, provocado sozinho

## 1. Saida do git merge que acusou o conflito
Comando:
git merge feat/titulo-b

Saida:
Auto-merging README.md
CONFLICT (add/add): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.

## 2. Conteudo do README.md durante o conflito
Conteudo antes da resolucao:
<<<<<<< HEAD
# DPW - Exercicios do M00
=======
# DPW - Caderno de Exercicios
>>>>>>> feat/titulo-b
O Git colocou marcadores para mostrar as duas versoes que entraram em conflito.

## 3. Grafo do historico
Comando:
git log --oneline --decorate --graph --all -5

Saida:
*   98f130f (HEAD -> master) merge: resolve conflito de titulo
|\
| * f4ce33b (feat/titulo-b) docs: altera titulo na branch B
* | a518eca (feat/titulo-a) docs: altera titulo na branch A
|/
* 176d337 docs: adiciona evidencia de arqueologia
* 8d429a9 docs: adiciona evidencias dos exercicios
O grafo mostra as duas branches convergindo no commit de merge 98f130f.

## 4. Prova de que o commit de merge possui dois pais
Comando:
git show --format=%P -s 98f130f

Saida:
a518ecaafdfb76a1c9564e30cd7d3bf90a222ca6 f4ce33b7ea8a356dbc70b19d6d26bd9e041dd63c
O commit de merge possui dois pais, um vindo da branch feat/titulo-a e outro vindo da branch feat/titulo-b.

## 5. Resolucao do conflito
Apos analisar as duas versoes, o README.md foi resolvido para:
# DPW - Exercicios do M00
Depois o arquivo foi adicionado ao stage e o merge foi finalizado com:
git add README.md
git commit -m "merge: resolve conflito de titulo"

Commit de merge:
98f130f merge: resolve conflito de titulo

## 6. Por que o Git nao conseguiu resolver sozinho?
As duas branches partiram do mesmo ponto, mas criaram o arquivo README.md de formas diferentes.
As duas versoes alteraram a mesma parte do arquivo.
Por isso, o Git nao conseguiu determinar automaticamente qual versao deveria permanecer e solicitou a resolucao manual do conflito.