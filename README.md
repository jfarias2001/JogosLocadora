# Locadora de Jogos - PixelRent

Aplicacao web para gerenciamento de acervo de jogos, com dashboard, listagem, filtros, aluguel/devolucao e tela de configuracoes.

## Tecnologias
- React + Vite
- TypeScript
- Bootstrap via CDN
- CSS externo para personalizacao visual

## Justificativa da Arquitetura
A arquitetura foi dividida por responsabilidade para facilitar manutencao, reutilizacao e leitura do codigo:

- `src/components/layout`: componentes de estrutura global da interface (`Sidebar`, `Header`, `Footer`, `Relatorios`, `Configuracoes`).
- `src/components/jogos`: componentes focados no dominio principal da aplicacao (`ListaJogos`, `CardJogo`).
- `src/components/common`: componentes reutilizaveis em diferentes telas (`BadgeStatus`).
- `src/types`: centralizacao dos tipos e interfaces (`IJogo`, `IDashboard`, `StatusJogo`, `PaginaAtiva`), garantindo seguranca na tipagem de props e estados.
- `src/data`: dados iniciais do sistema (`jogosIniciais`), separando conteudo de logica de interface.
- `src/styles`: estilos globais e personalizacoes (`global.css`), mantendo o visual desacoplado dos componentes.

Essa divisao foi escolhida para:

1. Evitar componentes gigantes com muitas responsabilidades.
2. Permitir evolucao por modulo (layout, jogos, componentes comuns).
3. Facilitar testes e correcoes localizadas.
4. Reforcar o uso de TypeScript como camada de seguranca de dados.

## Decisoes Tecnicas Principais
- Estado central no `App.tsx` para manter consistencia entre listagem e dashboard.
- Atualizacao imediata dos contadores dinamicos ao alugar/devolver.
- Tipagem explicita de interfaces e props para reduzir erros em tempo de desenvolvimento.
- Layout responsivo com grid e semantica HTML5 (`header`, `main`, `section`, `aside`, `address`).

## Como Executar
1. Instalar dependencias:
```bash
npm install
```
2. Rodar em modo desenvolvimento:
```bash
npm run dev
```
3. Build de producao:
```bash
npm run build
```

## Docker (Producao)
Arquivos adicionados para deploy:

- `Dockerfile`
- `nginx.conf`
- `docker-compose.yml`
- `Caddyfile`
- `.dockerignore`

### Rodar local com Docker
```bash
docker compose up -d --build
```

Aplicacao disponivel em:
- `http://localhost`

### Deploy rapido na VPS (com dominio e HTTPS)
1. Instale Docker e Docker Compose Plugin na VPS.
2. No provedor de DNS, crie um registro `A`:
- Host/Nome: `pixel`
- Tipo: `A`
- Valor: `IP_PUBLICO_DA_VPS`
3. Aguarde a propagacao DNS.
4. Suba o projeto para a VPS (git clone ou upload).
5. No diretorio do projeto, execute:
```bash
docker compose up -d --build
```
6. Libere portas `80` e `443` no firewall/security group da VPS.
7. Acesse:
- `https://pixel.paglamp.com.br`

Observacao:
- O Caddy emite e renova o certificado TLS automaticamente.

### Atualizar deploy apos mudancas
```bash
docker compose down
docker compose up -d --build
```

## Hotjar
Depois da aplicacao estar online, adicione o script do Hotjar em `index.html`, dentro de `<head>`, e faça novo deploy.

Observacao:
- O dominio `pixel.paglamp.com.br` com HTTPS e recomendado para coleta do Hotjar em producao.
