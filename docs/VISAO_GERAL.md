# 📊 Nola Analytics - Plataforma de Analytics para Restaurantes

> Solução completa para donos de restaurantes explorarem seus dados de vendas de forma simples e visual

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

## 🎯 O Problema

Donos de redes de restaurantes como **"Dona Maria"**, proprietária da rede **"Cozinha de Dona Maria"**, gerenciam operações complexas através de múltiplos canais (presencial, iFood, Rappi, app próprio). Eles têm **dados valiosos**, mas não conseguem extrair **insights acionáveis** para tomar decisões de negócio.

**Perguntas que Maria não consegue responder facilmente sobre sua rede:**

-   "Qual produto vende mais na quinta à noite no iFood?"
-   "Meu ticket médio está caindo. É por canal ou por loja?"
-   "Quais produtos têm menor margem?"
-   "Meu tempo de entrega piorou. Em quais dias/horários?"

## ✨ A Solução

Uma plataforma web moderna que permite donos de restaurantes:

-   ✅ Visualizar métricas relevantes (faturamento, produtos mais vendidos, horários de pico)
-   ✅ Criar análises personalizadas com filtros simples
-   ✅ Comparar períodos e identificar tendências
-   ✅ Extrair valor de dados complexos de forma intuitiva

**Sem precisar de conhecimento técnico. Sem depender de desenvolvedores.**

## 🚀 Quick Start

### Pré-requisitos

-   Docker e Docker Compose
-   Dados já gerados (conforme QUICKSTART.md)

### Iniciar Aplicação

```bash
# Clone o repositório
git clone <repository-url>
cd nola-god-level

# Inicie todos os serviços
docker-compose up -d

# Aguarde ~10 segundos para inicialização
sleep 10

# Acesse o dashboard
open http://localhost:3000
```

**Pronto!** O dashboard está rodando com 500k+ vendas prontas para análise.

### URLs

-   🎨 **Frontend**: http://localhost:3000
-   🔌 **Backend API**: http://localhost:3001
-   🐘 **PostgreSQL**: localhost:5432

## 🏗️ Arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                   Frontend (React)                       │
│              - Dashboard com visualizações               │
│              - Filtros interativos                       │
│              - Gráficos responsivos                      │
└───────────────────────┬──────────────────────────────────┘
                        │ HTTP REST API
┌───────────────────────▼──────────────────────────────────┐
│                Backend (Node + Express)                  │
│              - Endpoints RESTful                         │
│              - Lógica de agregação                       │
│              - Filtros dinâmicos                         │
└───────────────────────┬──────────────────────────────────┘
                        │ SQL Queries
┌───────────────────────▼──────────────────────────────────┐
│              PostgreSQL Database                         │
│              - 500k+ vendas                              │
│              - Schema otimizado para analytics           │
└──────────────────────────────────────────────────────────┘
```

## 🛠️ Stack Tecnológica

### Backend

-   **Node.js + Express**: API REST simples e performática
-   **TypeScript**: Type safety e melhor DX
-   **pg (node-postgres)**: Cliente PostgreSQL com connection pooling
-   **dotenv**: Gerenciamento de variáveis de ambiente

### Frontend

-   **React 18**: UI componentizada e reativa
-   **TypeScript**: Consistência de tipos
-   **Vite**: Build tool moderna e rápida
-   **Recharts**: Gráficos interativos e responsivos
-   **CSS puro**: Performance e controle total

### Database

-   **PostgreSQL 15**: Banco relacional otimizado para analytics

**Por que essas escolhas?** Ver [ARQUITETURA.md](./ARQUITETURA.md) e [BIBLIOTECAS.md](./BIBLIOTECAS.md)

## 📊 Funcionalidades

> 📖 **Ver detalhes completos**: [FEATURES.md](./FEATURES.md)

### 🚀 Features Principais

1. **📊 Comparação Temporal**

    - Compara métricas com período anterior equivalente
    - Indicadores visuais de tendência (↑ +15.3% ou ↓ -2.1%)
    - Banner mostrando período de comparação

2. **🏪 Comparação de Lojas**

    - Analisa 2+ lojas lado a lado
    - Tabela comparativa + 3 gráficos
    - Checkboxes para seleção de lojas

3. **📥 Export de Dados (CSV)**
    - Exporta produtos, lojas, relatórios completos
    - Compatível com Excel (UTF-8 com BOM)
    - Timestamps automáticos nos nomes

### Métricas Principais (KPIs)

-   Faturamento total com comparação
-   Ticket médio com tendência
-   Número de vendas com % de mudança
-   Tempo médio de preparo com comparação
-   Tempo médio de entrega

### Visualizações

1. **Série Temporal**: Evolução diária de vendas e faturamento
2. **Distribuição por Canal**: % de faturamento por canal (iFood, Rappi, presencial)
3. **Horários de Pico**: Vendas por hora do dia
4. **Análise Semanal**: Faturamento por dia da semana
5. **Top Produtos**: Ranking com quantidade e faturamento (com export)
6. **Comparação de Lojas**: Tabela + gráficos comparativos

### Filtros Disponíveis

-   **Período**: Data inicial e final
-   **Loja**: Análise de loja específica ou múltiplas
-   **Canal**: Filtro por canal de venda
-   **Combinado**: Múltiplos filtros simultaneamente
-   **Modo Comparação**: Seleção de lojas com checkboxes

## 📖 Documentação

| Documento                                  | Descrição                                  |
| ------------------------------------------ | ------------------------------------------ |
| [VISAO_GERAL.md](./VISAO_GERAL.md)         | Este documento - Visão geral do projeto    |
| [ARQUITETURA.md](./ARQUITETURA.md)         | Decisões arquiteturais e trade-offs        |
| [FEATURES.md](./FEATURES.md)               | 🆕 Documentação completa de features       |
| [BIBLIOTECAS.md](./BIBLIOTECAS.md)         | Explicação detalhada de cada dependência   |
| [INSTALACAO.md](./INSTALACAO.md)           | Instruções completas de setup              |
| [GUIA_TESTE.md](./GUIA_TESTE.md)           | Como testar a aplicação                    |
| [RESUMO_PROJETO.md](./RESUMO_PROJETO.md)   | Resumo executivo do que foi construído     |
| [STATUS_COMPLETO.md](./STATUS_COMPLETO.md) | Checklist de funcionalidades implementadas |

## 🚀 Desenvolvimento Local

### Backend

```bash
cd backend
npm install
# Crie um arquivo .env com as credenciais do banco
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Ver [INSTALACAO.md](./INSTALACAO.md) para instruções detalhadas.

## 📡 API Endpoints

**Base URL**: `http://localhost:3001/api`

### Analytics

-   `GET /analytics/overview` - Métricas gerais
-   `GET /analytics/products/top` - Top produtos
-   `GET /analytics/channels` - Vendas por canal
-   `GET /analytics/time-series` - Série temporal diária
-   `GET /analytics/sales-by-hour` - Por hora do dia
-   `GET /analytics/sales-by-weekday` - Por dia da semana
-   `GET /analytics/stores/top` - Top lojas
-   `GET /analytics/customizations/top` - Customizações populares

### Filtros

-   `GET /filters/stores` - Lista de lojas
-   `GET /filters/channels` - Lista de canais
-   `GET /filters/date-range` - Intervalo de datas disponível

**Todos os endpoints suportam query params**: `startDate`, `endDate`, `storeId`, `channelId`

## 🎯 Perguntas que o Sistema Responde

✅ **"Qual o meu faturamento total no último mês?"**
✅ **"Qual produto vende mais?"**
✅ **"Qual canal traz mais receita?"**
✅ **"Em que horário tenho mais vendas?"**
✅ **"Qual loja tem melhor performance?"**
✅ **"Meu ticket médio está subindo ou caindo?"**
✅ **"Quais dias da semana são mais movimentados?"**
✅ **"Qual o tempo médio de preparo/entrega?"**

## 🏆 Destaques Técnicos

### Performance

-   Queries otimizadas: < 500ms para 500k+ registros
-   Connection pooling para eficiência
-   Agregações no banco (não no backend)
-   Dashboard completo carrega em < 2s

### Código Limpo

-   Arquitetura em camadas (Controllers → Services → Database)
-   TypeScript em toda a stack
-   Código bem estruturado e documentado
-   Nomes descritivos em inglês

### UX/UI

-   Interface moderna e intuitiva
-   Responsivo (desktop, tablet, mobile)
-   Feedback visual durante loading
-   Gráficos interativos com tooltips

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para o **Nola God Level Coder Challenge 2025**.

## 👥 Contato

-   **Email**: gsilvestre@arcca.io
-   **Discord**: https://discord.gg/pRwmm64Vej

---

<div align="center">

**Desenvolvido com ❤️ para o Nola God Level Challenge**

_Empoderando donos de restaurantes através de dados_

</div>
