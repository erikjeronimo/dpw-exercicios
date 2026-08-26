## E00.5 - Roteiro de diagnostico

O objetivo deste exercicio foi diagnosticar um problema de dependencia utilizando um roteiro de verificacao, eliminando as hipoteses de forma progressiva.
O cenario utilizado foi:

> "Instalei o pacote, mas o import fala que nao existe."

O diagnostico foi realizado no repositorio `dpw-exercicios`.

### Passo 1 - Verificar o diretorio do projeto

Primeiramente, foi verificado se o terminal estava localizado na pasta correta do projeto.

Comando:
```powershell
Get-Location
```
Resultado:
C:\dev\dpw-exercicios
Em seguida, foram verificados os arquivos existentes no diretorio:
Get-ChildItem

A verificacao confirmou a existencia da pasta evidencias e dos principais arquivos do projeto, incluindo:

.env.example
.gitattributes
.gitignore
package.json
pnpm-lock.yaml
README.md

Conclusao:

O projeto estava sendo executado a partir do diretorio correto. Portanto, a hipotese de o comando estar sendo executado na pasta errada foi eliminada.

## Passo 2 - Verificar as dependencias declaradas

Depois foi verificado quais dependencias estavam registradas no projeto.
Comando:

pnpm list --depth 0

Resultado:
Legend: production dependency, optional only, dev only
dpw-exercicios@1.0.0 C:\dev\dpw-exercicios (PRIVATE)
devDependencies:
prettier@3.9.6
1 package

Conclusao:
A dependencia prettier estava registrada no projeto como devDependency.
Portanto, a hipotese de que o pacote nao estava declarado no package.json foi eliminada.

## Passo 3 - Verificar as dependencias instaladas localmente

Foi verificado se a pasta node_modules existia.
Comando:
Test-Path node_modules

Resultado:
False
Conclusao:
A pasta node_modules nao existia no projeto.
Isso indicou que as dependencias estavam declaradas no projeto, mas nao estavam instaladas localmente.
Nesse momento foi identificada a causa do problema.

## Passo 4 - Reinstalar as dependencias

Depois de identificar a causa, as dependencias foram reinstaladas utilizando o arquivo pnpm-lock.yaml.
Comando:
pnpm install --frozen-lockfile
A instalacao foi concluida utilizando as versoes registradas no lockfile.
Em seguida, foi verificada novamente a existencia da pasta node_modules:
Test-Path node_modules

Resultado:
True
Tambem foi realizada uma nova verificacao das dependencias:
pnpm list --depth 0

Resultado:
Legend: production dependency, optional only, dev only
dpw-exercicios@1.0.0 C:\dev\dpw-exercicios (PRIVATE)
devDependencies:
prettier@3.9.6
1 package

Conclusao:
A pasta node_modules foi recriada e a dependencia prettier voltou a estar instalada localmente.
O parametro --frozen-lockfile foi utilizado para garantir que a instalacao respeitasse as versoes registradas no pnpm-lock.yaml.

## Passo 5 - Confirmar o funcionamento do ambiente

Por fim, foi executado o script de verificacao configurado no projeto.
Comando:
pnpm verificar

Resultado:
$ node --version && pnpm --version
v24.14.0
11.23.0

Conclusao:
O ambiente foi confirmado como funcional.
O problema nao estava no package.json nem na declaracao da dependencia. A causa encontrada foi a ausencia da pasta node_modules, que continha as dependencias instaladas localmente.

Resumo do diagnostico

O roteiro utilizado eliminou as hipoteses na seguinte ordem:
Foi confirmado o diretorio correto do projeto.
Foi verificado que a dependencia prettier estava declarada.
Foi identificado que a pasta node_modules nao existia.
As dependencias foram reinstaladas com pnpm install --frozen-lockfile.
O ambiente foi validado com pnpm verificar.
A causa real encontrada foi a ausencia das dependencias instaladas localmente.

A correcao utilizada foi:
pnpm install --frozen-lockfile
Evidencia completa

A evidencia completa do exercicio, incluindo os comandos utilizados e os resultados do diagnostico, esta disponivel em:
Ver evidencia do E00.5

**Esse conteúdo pode entrar no seu `README.md` sem precisar colocar os SVGs do material do professor.** Ele também deixa explícito que você fez o que o critério exige: **passos progressivos, eliminação de hipóteses, causa encontrada e correção demonstrada**.
