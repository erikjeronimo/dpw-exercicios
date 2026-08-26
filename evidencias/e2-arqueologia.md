# E00.2 - Arqueologia de historico

Repositorio analisado: `nestjs/nest`

## 1. Quantos commits o repositorio tem?

Comando:

```powershell
git rev-list --count HEAD
```

Saida:

```text
21659
```

O repositorio possui 21.659 commits.

## 2. Qual foi o primeiro commit, e em que data?

Comando:

```powershell
git log --reverse --format="%H %ad %s" --date=iso-strict | Select-Object -First 1
```

Saida:

```text
f7c8d10fb20943bc7102c73d5ecbe49e6c0b5ea1 2017-01-08T15:09:41+01:00 Initial commit
```

O primeiro commit foi realizado em 8 de janeiro de 2017.

## 3. Quem mais modificou `packages/core/injector/injector.ts`?

Comando:

```powershell
git shortlog -sn -- packages/core/injector/injector.ts
```

Saida:

```text
90  Kamil Myśliwiec
12  Jay McDoniel
6   Kamil Mysliwiec
4   Jean-Baptiste Pionnier
4   Livio Brunner
3   Micael Levi (lab)
2   Jiri Hajek
2   Micael Levi L. Cavalcante
2   mag123c
1   Elies Lou
1   Lee Donghyun
1   Livio
1   Lutz
1   Nathan Knight
```

Quem mais modificou o arquivo foi Kamil Myśliwiec, com 90 commits.

## 4. O que mudou no ultimo commit que tocou esse arquivo?

Comando:

```powershell
git --no-pager log -1 --format="%H %ad %s" --date=iso-strict -- packages/core/injector/injector.ts
```

Saida:

```text
45485b54210e06a517c1ebf86b42b1ea99fc3fe2 2026-08-25T12:48:22+02:00 fix(core): circular durableproviders issue #17562
```

O ultimo commit alterou o tratamento de `instanceHost.donePromise`. Quando essa promessa nao existe, o codigo agora chama `loadProvider(...)` diretamente. A alteracao corrige o tratamento de providers duraveis em situacoes envolvendo dependencias circulares.

## 5. Quantos commits foram feitos nos ultimos 90 dias?

Comando:

```powershell
git --no-pager rev-list --count --since="90 days ago" HEAD
```

Saida:

```text
694
```

Foram realizados 694 commits nos ultimos 90 dias.
