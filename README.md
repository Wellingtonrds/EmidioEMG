# Assistente Wit — instalação e publicação

## Publicar na Vercel

1. Extraia este ZIP. Envie os arquivos extraídos para um repositório no GitHub, incluindo `package-lock.json`, `backend/`, `api/` e `vercel.json`.
2. Na Vercel, escolha **Add New → Project** e importe o repositório.
3. Selecione **Vite**, com Root Directory na pasta que contém `package.json`.
4. Use Node.js **24.x**, Install Command **npm ci**, Build Command **npm run build** e Output Directory **dist**.
5. Para ativar a IA, adicione `GEMINI_API_KEY` em Environment Variables. Opcionalmente configure `GEMINI_MODEL`; o padrão é `gemini-2.5-flash`. A chave fica apenas no servidor.
6. Clique em Deploy. Se alterar variáveis depois, faça um novo deploy.

A API usa uma função em `api/index.ts`; o frontend é gerado em `dist`. Não envie apenas a pasta `dist`, pois ela não contém o backend. O ZIP é para extração; importe o código pelo repositório ou use a CLI da Vercel na pasta extraída.

Sem chave, os gatilhos funcionam por correspondência local; respostas por IA e transcrição de áudio dependem da configuração do Gemini, das permissões e da cota da conta. Vídeos enviados pelo usuário ficam no navegador/dispositivo; não existe armazenamento compartilhado no servidor. Requisições grandes de áudio continuam sujeitas ao limite da plataforma.

## Rodar no computador

```sh
npm ci
```

Copie `.env.example` para `.env` e configure sua chave, se quiser usar IA.

```sh
npm run dev
```

Para rodar a versão de produção:

```sh
npm run build
```

Linux/macOS: `NODE_ENV=production npm start`.
PowerShell: `$env:NODE_ENV="production"; npm start`.

## Correções realizadas

- Regenerado o lockfile: faltavam dependências opcionais, causando erro EUSAGE no `npm ci`.
- Separada a API do servidor local para a função não importar o bootstrap do Vite.
- Corrigido `npm start` para executar TypeScript com `tsx`.
- Adicionada verificação TypeScript ao build e fixada a versão principal do Node.
- Ajustado o destino das rotas de API para `/api/index`.
- Adicionadas validações de gatilhos e entradas ausentes, resposta JSON para API inexistente e suporte a resultado nulo no schema do Gemini.
- Modelo de texto configurável, com padrão igual ao modelo de transcrição já usado pelo projeto.

O deploy real e as chamadas com uma chave Gemini não são executados nesta revisão.
