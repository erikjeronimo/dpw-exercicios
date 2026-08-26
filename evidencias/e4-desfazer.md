# E00.4 - Desfazer sem panico

## Objetivo

Praticar formas seguras de desfazer alteracoes no Git, entendendo a diferenca entre working tree, staging area e historico de commits.

## Casos realizados

| Caso | Situacao | Comando utilizado | Resultado |
|---|---|---|---|
| 1 | Alteracao feita no arquivo, mas ainda nao commitada | `git restore` | A alteracao foi descartada e o arquivo voltou ao estado do ultimo commit. |
| 2 | Arquivo adicionado ao staging por engano | `git restore --staged` | O arquivo foi retirado do staging sem apagar a alteracao. |
| 3 | Mensagem do ultimo commit estava incorreta | `git commit --amend` | A mensagem do ultimo commit foi corrigida sem criar um novo commit. |
| 4 | Desfazer o ultimo commit mantendo as alteracoes | `git reset --soft HEAD~1` | O commit foi removido do historico, mas as alteracoes permaneceram no staging. |
| 5 | Desfazer um commit ja registrado no historico | `git revert` | Foi criado um novo commit que desfaz as alteracoes do commit anterior. |

## Caso 1 - git restore

Foi realizada uma alteracao local no arquivo `README.md` sem realizar commit.
A alteracao foi verificada utilizando:

```powershell
git diff -- README.md
```
Apos a verificacao, foi utilizado:
git restore README.md
O comando descartou a alteracao local e restaurou o arquivo para a versao registrada no ultimo commit.
A confirmacao foi realizada com:
git status --short
Nao houve nenhuma saida, confirmando que a alteracao local foi desfeita.

## Caso 2 - git restore --staged

Um arquivo foi adicionado ao staging por engano.
Foi utilizado:
git restore --staged <arquivo>
O comando removeu o arquivo da staging area, mas manteve a alteracao no working tree.
Esse comportamento demonstra a diferenca entre retirar uma alteracao do staging e apagar a alteracao do arquivo.

## Caso 3 - git commit --amend

Foi criado um commit com uma mensagem incorreta para demonstrar a correcao da mensagem do ultimo commit.
Comando utilizado:
git commit --allow-empty -m "mensagem errada"

Resultado:
10beb8f (HEAD -> master) mensagem errada
Em seguida, foi utilizada a opcao --amend para corrigir a mensagem:
git commit --amend --allow-empty -m "docs: registra teste do caso 3"

O commit passou a ser:
decd8c8 (HEAD -> master) docs: registra teste do caso 3
A operacao ficou registrada no reflog:
decd8c8 HEAD@{0}: commit (amend): docs: registra teste do caso 3
10beb8f HEAD@{1}: commit: mensagem errada
Isso demonstra que o commit original foi substituido pela versao corrigida, sem a criacao de um novo commit adicional apenas para corrigir a mensagem.

## Caso 4 - git reset --soft

Foi criado um commit de teste para demonstrar o funcionamento do git reset --soft.

Commit criado:
f547b4b docs: teste do caso 4

Em seguida foi executado:
git reset --soft HEAD~1
Depois do reset, o commit deixou de aparecer como o commit atual da branch, mas as alteracoes permaneceram no staging.

A confirmacao foi feita utilizando:
git status

Resultado:
Changes to be committed:

        modified:   evidencias/e4-desfazer.md

O reflog tambem registrou a operacao:
9618f92 HEAD@{0}: reset: moving to HEAD~1
f547b4b HEAD@{1}: commit: docs: teste do caso 4
Isso comprova que o reset --soft moveu o HEAD para o commit anterior sem descartar as alteracoes.

## Caso 5 - git revert

Foi criado um commit de teste para demonstrar a reversao de um commit ja registrado no historico.
Comando utilizado:
git commit -m "docs: adiciona teste do caso 5"

Commit criado:
c3e11e7 docs: adiciona teste do caso 5

Em seguida foi utilizado:
git revert HEAD

O Git abriu o editor de mensagem e foi mantida a mensagem padrao:
Revert "docs: adiciona teste do caso 5"

O commit de revert criado foi:
6973c89 Revert "docs: adiciona teste do caso 5"

A operacao ficou registrada no reflog:
6973c89 HEAD@{0}: revert: Revert "docs: adiciona teste do caso 5"
c3e11e7 HEAD@{1}: commit: docs: adiciona teste do caso 5
O commit original continua no historico e o Git criou um novo commit para desfazer suas alteracoes.
Git reflog -10

Comando utilizado:
git reflog -n 10

Saida registrada durante a realizacao do exercicio:
6973c89 (HEAD -> master) HEAD@{0}: revert: Revert "docs: adiciona teste do caso 5"
c3e11e7 HEAD@{1}: commit: docs: adiciona teste do caso 5
2ab5e4b (origin/master) HEAD@{2}: reset: moving to HEAD~1
9618f92 HEAD@{3}: reset: moving to HEAD~1
f547b4b HEAD@{4}: commit: docs: teste do caso 4
9618f92 HEAD@{5}: reset: moving to HEAD~1
ce1789f HEAD@{6}: reset: moving to HEAD~1
decd8c8 HEAD@{7}: commit (amend): docs: registra teste do caso 3
10beb8f HEAD@{8}: commit: mensagem errada
ce1789f HEAD@{9}: commit: docs: atualiza evidencia de desfazer

O reflog demonstra as principais operacoes realizadas nos casos 3, 4 e 5, incluindo commit (amend), reset e revert.
Os casos 1 e 2 alteram o working tree e a staging area, por isso nao aparecem como operacoes de movimentacao do HEAD no reflog.
## Diferenca entre reset e revert

O git reset altera a referencia da branch e pode remover um commit da sequencia atual. No caso --soft, as alteracoes continuam no staging.
O git revert nao remove o commit original. Ele cria um novo commit que desfaz as alteracoes do commit anterior.
Por isso, quando um commit ja foi enviado para um repositorio remoto ou compartilhado com outras pessoas, o git revert e mais seguro, pois evita reescrever o historico compartilhado.

Link permanente do revert
Commit de revert do Caso 5:

https://github.com/erikjeronimo/dpw-exercicios/commit/6973c89

## Conclusao

Os cinco casos demonstraram diferentes formas de desfazer alteracoes no Git.
O git restore foi utilizado para descartar alteracoes locais, enquanto o git restore --staged foi utilizado para retirar uma alteracao do staging sem apaga-la.
O git commit --amend permitiu corrigir a mensagem do ultimo commit. O git reset --soft HEAD~1 removeu o ultimo commit mantendo suas alteracoes no staging.
Por fim, o git revert criou um novo commit para desfazer uma alteracao ja registrada no historico.

A atividade demonstrou a importancia de diferenciar working tree, staging area e historico de commits para escolher a operacao adequada em cada situacao.
