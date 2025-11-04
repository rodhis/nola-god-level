# 🍔 Nola Analytics - Plataforma de Analytics para Restaurantes

> Solução completa de analytics para donos de restaurantes explorarem dados de vendas de forma simples e visual.

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**🌐 [Ver Demo Live](https://nola-analytics.vercel.app) | 📚 [Documentação Completa](./docs/)**

[Funcionalidades](#-funcionalidades) • [Quick Start](#-quick-start) • [Tecnologias](#-tecnologias) • [API](#-api-endpoints) • [Documentação](#-documentação)

</div>

---

> **Nota**: Este README foi criado para o repositório do desafio. O README original do challenge está disponível em [README_NOLA.md](./README_NOLA.md).

---

## 📖 Índice

-   [O Problema](#-o-problema)
-   [A Solução](#-a-solução)
-   [Funcionalidades](#-funcionalidades)
-   [Demo](#-demo)
-   [Quick Start](#-quick-start)
-   [Estrutura do Projeto](#-estrutura-do-projeto)
-   [Tecnologias](#-tecnologias)
-   [API Endpoints](#-api-endpoints)
-   [Documentação](#-documentação)
-   [Desenvolvimento](#-desenvolvimento)
-   [Deploy](#-deploy)
-   [Performance](#-performance)

---

## 🎯 O Problema

Donos de redes de restaurantes como **Dona Maria**, proprietária da rede **"Cozinha de Dona Maria"**, gerenciam operações complexas através de múltiplos canais:

-   🏪 Venda presencial no balcão
-   📱 iFood, Rappi, Uber Eats
-   💬 WhatsApp
-   🖥️ App próprio

Eles têm **dados valiosos de 500k+ vendas**, mas não conseguem responder perguntas críticas sobre suas operações:

-   ❓ _"Qual produto vende mais na quinta à noite no iFood?"_
-   ❓ _"Meu ticket médio está caindo. É por canal ou por loja?"_
-   ❓ _"Quais produtos têm menor margem e devo repensar o preço?"_
-   ❓ _"Meu tempo de entrega piorou. Em quais dias/horários?"_
-   ❓ _"Quais clientes compraram 3+ vezes mas não voltam há 30 dias?"_

**Dashboards fixos** mostram apenas visões pré-definidas. **Power BI** é complexo demais. **Eles precisam de analytics específico para restaurantes.**

---

## ✨ A Solução

**Nola Analytics** é uma plataforma web moderna que permite donos de redes de restaurantes como a **"Cozinha de Dona Maria"**:

✅ **Visualizar métricas relevantes** - Faturamento, produtos mais vendidos, horários de pico  
✅ **Criar análises personalizadas** - Filtros simples por período, loja e canal  
✅ **Comparar períodos** - Identificar tendências e sazonalidades  
✅ **Extrair insights acionáveis** - Decisões baseadas em dados reais

**Tudo isso sem precisar de:**

-   🚫 Conhecimento técnico ou SQL
-   🚫 Time de dados dedicado
-   🚫 Depender de desenvolvedores

---

## 🎨 Funcionalidades

> 📖 **Documentação completa de features**: [docs/FEATURES.md](./docs/FEATURES.md)

### � Features Principais

#### 1. �📊 Comparação Temporal

-   Compara métricas atuais com período anterior equivalente
-   Banner visual mostrando período de comparação
-   Indicadores de tendência (↑ +15.3% ou ↓ -2.1%)
-   Métricas: Faturamento, Ticket Médio, Total Vendas, Tempo Preparo

#### 2. 🏪 Comparação de Lojas

-   Analisa 2+ lojas lado a lado
-   Modo comparação com checkboxes para seleção
-   Tabela comparativa completa
-   3 gráficos de barras (Faturamento, Ticket, Vendas)

#### 3. 📥 Export de Dados (CSV)

-   Exporta produtos mais vendidos
-   Exporta comparação de lojas
-   Exporta relatório completo do dashboard
-   Compatível com Excel (UTF-8 com BOM)

### 📊 Dashboard Completo

#### Métricas Principais (KPIs)

-   💰 **Faturamento Total** - Receita do período com comparação
-   🎫 **Ticket Médio** - Valor médio por venda com tendência
-   📈 **Total de Vendas** - Quantidade com % de mudança
-   ⏱️ **Tempos Operacionais** - Preparo e entrega com comparação

#### Visualizações Interativas

1. **📈 Série Temporal**

    - Evolução diária de vendas e faturamento
    - Identifica tendências e anomalias

2. **🥧 Distribuição por Canal**

    - % de faturamento por canal (iFood, Rappi, presencial)
    - Gráfico de pizza interativo

3. **🕐 Horários de Pico**

    - Vendas por hora do dia (0-23h)
    - Otimize equipe e estoque

4. **📅 Análise Semanal**

    - Faturamento por dia da semana
    - Planeje promoções e ações

5. **🏆 Top Produtos**
    - Ranking detalhado com categoria, quantidade e faturamento
    - Identifique best-sellers

### 🔍 Sistema de Filtros

Combine múltiplos filtros para análises personalizadas da rede:

-   **📅 Período** - Selecione data inicial e final
-   **🏪 Loja** - Analise lojas específicas ou todas as unidades
-   **📱 Canal** - Presencial, delivery, apps
-   **🔗 Combinado** - Aplique múltiplos filtros simultaneamente

> **Exemplo**: "Vendas do iFood na unidade Centro da Cozinha de Dona Maria entre 01/01 e 31/01"

---

## 🎥 Demo

### 🌐 Demo Online

**✨ Acesse a aplicação em produção:**

-   **Frontend:** https://nola-analytics.vercel.app
-   **Backend API:** https://nola-analytics.onrender.com
-   **Health Check:** https://nola-analytics.onrender.com/health

> ⚠️ **Nota**: Primeira requisição pode demorar ~30s (cold start do plano gratuito do Render)

### 📊 Stack de Deploy

-   **Frontend:** Vercel (Deploy automático via GitHub)
-   **Backend:** Render (Deploy automático via GitHub)
-   **Database:** Neon PostgreSQL (Serverless, 500k+ registros)

### Interface Principal

```
┌─────────────────────────────────────────────────────────────────────┐
│  📊 Dashboard da Cozinha de Dona Maria                               │
│  Análise de dados operacionais e vendas                             │
├──────────────────┬──────────────────┬──────────────┬────────────────┤
│  💰 Faturamento  │  🎫 Ticket Médio │ 📊 Total     │ ⏱️ Preparo     │
│   R$ 1.234.567   │    R$ 67,80      │  18.234      │   18 min       │
└──────────────────┴──────────────────┴──────────────┴────────────────┘

   📈 Faturamento ao Longo do Tempo
   ┌────────────────────────────────────────────────────────────┐
   │                                                ┌────┐       │
   │                                        ┌───┐   │    │       │
   │                            ┌───┐       │   │   │    │       │
   │                    ┌───┐   │   │   ┌───┤   ├───┤    │       │
   │            ┌───┐   │   │   │   │   │   │   │   │    │       │
   └────────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴────┴───────┘
            Jan    Fev    Mar    Abr    Mai    Jun    Jul

   🥧 Canais                │   🕐 Horários de Pico
   [Pizza Chart]            │   [Bar Chart]
```

**🔗 Acesse**: [http://localhost:3000](http://localhost:3000) após iniciar

---

## 🚀 Quick Start

```bash
# 1. Clone e entre no diretório
git clone https://github.com/rodhis/nola-god-level.git
cd nola-god-level

# 2. Inicie todos os serviços
docker-compose up -d

# 3. Acesse o dashboard
open http://localhost:3000
```

**🎯 Demo Online**: https://nola-analytics.vercel.app

**📚 Setup detalhado**: Ver [docs/SETUP.md](./docs/SETUP.md) para instruções completas, testes e troubleshooting.

---

## 📁 Estrutura do Projeto

```
nola-god-level/
│
├── backend/                    # API Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts     # PostgreSQL connection pool
│   │   ├── controllers/
│   │   │   └── analyticsController.ts
│   │   ├── routes/
│   │   │   ├── analytics.ts    # 8 endpoints de analytics
│   │   │   └── filters.ts      # 3 endpoints de filtros
│   │   ├── services/
│   │   │   └── analyticsService.ts  # Lógica de negócio
│   │   └── index.ts            # Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── frontend/                   # App React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx   # Componente principal
│   │   │   ├── FilterBar.tsx   # Filtros interativos
│   │   │   ├── MetricCard.tsx  # Cards de KPIs
│   │   │   ├── Chart.tsx       # Gráficos reutilizáveis
│   │   │   └── *.css           # Estilos (CSS puro)
│   │   ├── services/
│   │   │   └── api.ts          # Cliente HTTP
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── documentacao/               # Documentação completa
│   ├── ARQUITETURA.md          # Decisões técnicas
│   ├── BIBLIOTECAS.md          # Explicação de dependências
│   ├── GUIA_TESTE.md           # Como testar
│   ├── INSTALACAO.md           # Setup detalhado
│   ├── RESUMO_PROJETO.md       # Overview executivo
│   ├── STATUS_COMPLETO.md      # Checklist completo
│   └── VISAO_GERAL.md          # Visão geral do projeto
│
├── docker-compose.yml          # Orquestração de serviços
├── database-schema.sql         # Schema PostgreSQL
├── generate_data.py            # Gerador de dados
└── README.md                   # Este arquivo
```

---

## 🛠️ Tecnologias

### Backend

| Tecnologia     | Versão | Uso                                |
| -------------- | ------ | ---------------------------------- |
| **Node.js**    | 20     | Runtime JavaScript                 |
| **Express**    | 4.18   | Framework web                      |
| **TypeScript** | 5.3    | Type safety                        |
| **PostgreSQL** | 15     | Banco de dados                     |
| **pg**         | 8.11   | Cliente PostgreSQL (driver nativo) |

**Por quê?**

-   ⚡ Performance: Connection pooling, queries otimizadas
-   🔒 Segurança: Prepared statements, validação de entrada, variáveis de ambiente
-   🧹 Código limpo: Arquitetura em camadas, código auto-documentado, TypeScript type-safe

### Frontend

| Tecnologia     | Versão | Uso                     |
| -------------- | ------ | ----------------------- |
| **React**      | 18.2   | UI Framework            |
| **TypeScript** | 5.3    | Type safety             |
| **Vite**       | 5.0    | Build tool ultra-rápida |
| **Recharts**   | 2.10   | Biblioteca de gráficos  |
| **CSS Puro**   | -      | Estilos sem overhead    |

**Por quê?**

-   🎨 UX moderna: Componentes reativos e responsivos
-   📊 Visualização: Gráficos interativos com Recharts
-   ⚡ Performance: CSS puro, sem runtime overhead
-   🔧 DX: Vite com HMR instantâneo

### Database

-   **PostgreSQL 15**: ACID, performance em analytics, window functions
-   **Schema otimizado**: 500k+ vendas com relacionamentos complexos
-   **Queries otimizadas**: < 500ms para agregações

---

## 📡 API Endpoints

**Base URL**: `http://localhost:3001/api`

### Analytics (10 endpoints)

| Método | Endpoint                         | Descrição                           | Status |
| ------ | -------------------------------- | ----------------------------------- | ------ |
| GET    | `/analytics/overview`            | Métricas gerais do dashboard        | ✅     |
| GET    | `/analytics/overview-comparison` | 🆕 Métricas com comparação temporal | ✅     |
| GET    | `/analytics/products/top`        | Top N produtos mais vendidos        | ✅     |
| GET    | `/analytics/channels`            | Vendas agregadas por canal          | ✅     |
| GET    | `/analytics/time-series`         | Série temporal diária de vendas     | ✅     |
| GET    | `/analytics/sales-by-hour`       | Distribuição por hora do dia        | ✅     |
| GET    | `/analytics/sales-by-weekday`    | Distribuição por dia da semana      | ✅     |
| GET    | `/analytics/stores/top`          | Top N lojas por faturamento         | ✅     |
| GET    | `/analytics/stores/compare`      | 🆕 Comparação de múltiplas lojas    | ✅     |
| GET    | `/analytics/customizations/top`  | Customizações mais populares        | ✅     |

### Filtros (3 endpoints)

| Método | Endpoint              | Descrição                     |
| ------ | --------------------- | ----------------------------- |
| GET    | `/filters/stores`     | Lista de todas as lojas       |
| GET    | `/filters/channels`   | Lista de todos os canais      |
| GET    | `/filters/date-range` | Intervalo de datas disponível |

### Query Parameters (Filtros)

Todos os endpoints de analytics suportam:

-   `startDate` - Data inicial (YYYY-MM-DD)
-   `endDate` - Data final (YYYY-MM-DD)
-   `storeId` - ID da loja
-   `channelId` - ID do canal
-   `limit` - Limite de resultados (top N)

**Exemplo**:

```bash
GET /api/analytics/products/top?startDate=2024-01-01&endDate=2024-01-31&storeId=5&limit=10
```

### Testando a API

```bash
# Health check
curl http://localhost:3001/health

# Métricas gerais
curl http://localhost:3001/api/analytics/overview

# Top 5 produtos
curl "http://localhost:3001/api/analytics/products/top?limit=5"

# Com filtros
curl "http://localhost:3001/api/analytics/overview?startDate=2024-01-01&endDate=2024-01-31&storeId=1"
```

---

## 📚 Documentação

Documentação completa disponível na pasta [`/docs`](./docs/):

| Arquivo                                 | Descrição                                                    |
| --------------------------------------- | ------------------------------------------------------------ |
| [ARQUITETURA.md](./docs/ARQUITETURA.md) | Decisões arquiteturais, trade-offs e justificativas técnicas |
| [FEATURES.md](./docs/FEATURES.md)       | Documentação detalhada das 3 features principais             |
| [BIBLIOTECAS.md](./docs/BIBLIOTECAS.md) | Explicação de cada dependência e alternativas consideradas   |
| [SETUP.md](./docs/SETUP.md)             | Guia completo de instalação, testes e troubleshooting        |

---

---

## 💻 Desenvolvimento

### Setup Local Rápido

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (novo terminal)
cd frontend && npm install && npm run dev

# Database
docker-compose up postgres -d
```

### 🔒 Configuração de CORS

### 🔒 Configuração

**CORS configurável via ambiente** (sem hardcoding):
- ✅ Reutilizável por outros projetos
- ✅ Suporta múltiplos ambientes
- ✅ Suporta preview deployments

**SSL automático** em produção para banco de dados.

Ver [docs/ARQUITETURA.md](./docs/ARQUITETURA.md) para detalhes técnicos.

**Para instruções detalhadas**: Ver [docs/SETUP.md](./docs/SETUP.md)

---

## 🚢 Deploy

### ✅ Aplicação em Produção

## 🚢 Deploy

### ✅ Aplicação em Produção

-   **🌐 Frontend:** https://nola-analytics.vercel.app
-   **🔧 Backend API:** https://nola-analytics.onrender.com
-   **💾 Database:** Neon PostgreSQL (500k+ registros)

### 📖 Guia de Deploy

**Passo a passo completo**: [docs/DEPLOY_RAPIDO.md](./docs/DEPLOY_RAPIDO.md)

Deploy em 25-30 minutos incluindo:
- Backend no Render
- Frontend no Vercel  
- Configuração de variáveis de ambiente
- Troubleshooting

### 🔧 Variáveis de Ambiente

#### Backend
```bash
DB_HOST=<neon-host>
DB_NAME=nola_analytics
DB_USER=neondb_owner
DB_PASSWORD=<password>
PORT=10000
NODE_ENV=production
FRONTEND_URL=<vercel-url>
VERCEL_PREVIEW_ENABLED=true
```

#### Frontend
```bash
VITE_API_URL=<render-backend-url>
```

Ver [docs/DEPLOY_RAPIDO.md](./docs/DEPLOY_RAPIDO.md) para detalhes completos.

---

## 📊 Performance

### Benchmarks

-   ✅ Queries simples: **< 100ms**
-   ✅ Queries com agregações: **< 500ms**
-   ✅ Dashboard completo (primeira carga): **< 2s**
-   ✅ Connection pool: **20 conexões simultâneas**
-   ✅ 500k+ registros sem degradação

### Otimizações Implementadas

-   Connection pooling PostgreSQL (20 conexões simultâneas)
-   Agregações no banco (não no backend)
-   Queries parametrizadas com prepared statements (previne SQL injection)
-   Validação de entrada com parseIntSafe() (previne NaN)
-   Código auto-documentado com TypeScript types
-   Frontend com CSS puro (zero overhead)
-   Vite com tree-shaking e code splitting

---

## 📄 Licença

Este projeto foi desenvolvido para o **Nola God Level Coder Challenge 2025**.
