# 🍔 Nola Analytics - Setup e Instruções

## 📋 Pré-requisitos

-   Docker e Docker Compose instalados
-   Node.js 18+ (para desenvolvimento local)
-   Git

## 🚀 Quick Start (Recomendado)

### Opção 1: Docker Compose (Mais Fácil)

1. **Clone o repositório**

```bash
git clone <repository-url>
cd nola-god-level
```

2. **Inicie todos os serviços**

```bash
docker-compose up -d
```

3. **Acesse a aplicação**

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:3001
-   PostgreSQL: localhost:5432
-   PgAdmin (opcional): http://localhost:5050

**Nota**: Na primeira execução, o backend pode levar alguns segundos para conectar ao banco de dados. Se necessário, reinicie o container do backend:

```bash
docker-compose restart backend
```

### Opção 2: Desenvolvimento Local

1. **Inicie apenas o banco de dados**

```bash
docker-compose up postgres -d
```

2. **Configure e inicie o backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

3. **Configure e inicie o frontend** (em outro terminal)

```bash
cd frontend
npm install
npm run dev
```

4. **Acesse a aplicação**

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:3001

## 📊 Gerando Dados

Os dados já foram gerados conforme o QUICKSTART.md. Se precisar regenerar:

```bash
# Com Docker
docker-compose --profile tools run data-generator

# Ou localmente
python generate_data.py
```

## 🏗️ Estrutura do Projeto

```
nola-god-level/
├── backend/              # API Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/       # Configurações (database)
│   │   ├── controllers/  # Controllers HTTP
│   │   ├── routes/       # Definição de rotas
│   │   └── services/     # Lógica de negócio
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/             # App React + TypeScript
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── services/     # API client
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml    # Orquestração de serviços
├── database-schema.sql   # Schema do PostgreSQL
├── ARQUITETURA.md       # Decisões arquiteturais
└── INSTALACAO.md        # Este arquivo
```

## 🔌 API Endpoints

### Analytics

**Base URL**: `http://localhost:3001/api`

#### GET /analytics/overview

Retorna métricas gerais (faturamento, vendas, ticket médio, tempos)

**Query Params**:

-   `startDate` (opcional): Data inicial (YYYY-MM-DD)
-   `endDate` (opcional): Data final (YYYY-MM-DD)
-   `storeId` (opcional): ID da loja
-   `channelId` (opcional): ID do canal

**Exemplo**:

```bash
curl "http://localhost:3001/api/analytics/overview?startDate=2024-01-01&endDate=2024-01-31"
```

#### GET /analytics/products/top

Top produtos mais vendidos

**Query Params**: Mesmos de overview + `limit` (padrão: 10)

#### GET /analytics/channels

Vendas por canal

#### GET /analytics/time-series

Série temporal diária de vendas

#### GET /analytics/sales-by-hour

Distribuição de vendas por hora do dia

#### GET /analytics/sales-by-weekday

Distribuição de vendas por dia da semana

#### GET /analytics/stores/top

Top lojas por faturamento

#### GET /analytics/customizations/top

Customizações/itens mais populares

### Filtros

#### GET /filters/stores

Lista todas as lojas ativas

#### GET /filters/channels

Lista todos os canais de venda

#### GET /filters/date-range

Retorna intervalo de datas disponível nos dados

## 🛠️ Desenvolvimento

### Backend

**Tecnologias**:

-   Node.js + Express
-   TypeScript
-   PostgreSQL (pg driver com connection pooling)

**Comandos úteis**:

```bash
cd backend
npm run dev        # Desenvolvimento com hot-reload (tsx watch)
npm run build      # Build para produção
npm run start      # Executa versão buildada
npm run typecheck  # Verifica tipos TypeScript
```

**Variáveis de Ambiente** (.env):

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nola_restaurant
DB_USER=postgres
DB_PASSWORD=postgres
NODE_ENV=development
```

### Frontend

**Tecnologias**:

-   React 18
-   TypeScript
-   Vite (build tool)
-   Recharts (visualizações)
-   CSS puro

**Comandos úteis**:

```bash
cd frontend
npm run dev        # Desenvolvimento com hot-reload
npm run build      # Build para produção
npm run preview    # Preview da build
npm run typecheck  # Verifica tipos TypeScript
```

**Configuração** (vite.config.ts):

-   Proxy automático para `/api` → `http://localhost:3001`
-   Porta: 3000

## 🔍 Troubleshooting

### Backend não conecta ao banco

**Sintoma**: Erro "ECONNREFUSED localhost:5432"

**Solução**:

```bash
# Verifique se o PostgreSQL está rodando
docker-compose ps

# Reinicie o serviço
docker-compose restart postgres backend
```

### Frontend não carrega dados

**Sintoma**: Tela vazia ou "Carregando dados..."

**Solução**:

1. Verifique se o backend está rodando: http://localhost:3001/health
2. Abra o console do navegador (F12) para ver erros
3. Verifique os logs do backend: `docker-compose logs backend`

### Queries lentas

**Sintoma**: Dashboard demora > 5s para carregar

**Possíveis causas**:

-   Falta de dados: Execute o data generator
-   PostgreSQL sem recursos: Aumente memória do Docker
-   Muitos dados filtrados: Reduza intervalo de datas

**Solução**:

```bash
# Verifique quantidade de dados
docker-compose exec postgres psql -U postgres -d nola_restaurant -c "SELECT COUNT(*) FROM sales;"

# Deve retornar ~500k registros
```

### Build do Docker falha

**Sintoma**: Erro durante `docker-compose up`

**Solução**:

```bash
# Limpe cache e rebuilde
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📦 Deploy em Produção

### Variáveis de Ambiente Recomendadas

**Backend**:

```env
NODE_ENV=production
PORT=3001
DB_HOST=<postgresql-host>
DB_PORT=5432
DB_NAME=nola_restaurant
DB_USER=<secure-user>
DB_PASSWORD=<secure-password>
```

**Frontend**:

```env
VITE_API_URL=https://api.seu-dominio.com
```

### Recomendações

1. **Database**: Use managed PostgreSQL (AWS RDS, Heroku Postgres, etc.)
2. **Backend**: Deploy no Heroku, Railway, ou AWS ECS
3. **Frontend**: Deploy no Vercel, Netlify, ou servir via CDN
4. **SSL/HTTPS**: Obrigatório em produção
5. **Monitoring**: Configure logs e métricas (Sentry, DataDog)

### Exemplo: Deploy no Heroku

```bash
# Backend
cd backend
heroku create nola-analytics-api
heroku addons:create heroku-postgresql:mini
git push heroku main

# Frontend
cd frontend
npm run build
# Deploy dist/ no Vercel ou Netlify
```

## 🧪 Testes

**Status atual**: Não implementados (foco no MVP)

**Próximos passos**:

-   Testes unitários: Jest + Supertest (backend)
-   Testes de componentes: React Testing Library (frontend)
-   Testes E2E: Cypress ou Playwright

## 📚 Documentação Adicional

-   **ARQUITETURA.md**: Decisões técnicas detalhadas
-   **PROBLEMA.md**: Contexto do desafio
-   **AVALIACAO.md**: Critérios de avaliação
-   **DADOS.md**: Estrutura e padrões dos dados

## 🆘 Suporte

-   **Email**: gsilvestre@arcca.io
-   **Discord**: https://discord.gg/pRwmm64Vej
-   **Issues**: <repository-url>/issues

---

**Desenvolvido para o Nola God Level Coder Challenge 2025**
