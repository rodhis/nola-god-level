# 🚀 Setup e Testes - Nola Analytics

## 📋 Pré-requisitos

-   Docker e Docker Compose instalados
-   Ports disponíveis: 3000 (frontend), 3001 (backend), 5432 (postgres)

## ⚡ Quick Start

```bash
# 1. Clone e entre no diretório
git clone <repository-url>
cd nola-god-level

# 2. Inicie todos os serviços
docker-compose up -d

# 3. Aguarde inicialização (~10 segundos)
sleep 10

# 4. Acesse o dashboard
open http://localhost:3000
```

**Pronto!** O dashboard está rodando com 500k+ vendas.

### URLs dos Serviços

| Serviço      | URL                          | Descrição           |
| ------------ | ---------------------------- | ------------------- |
| Frontend     | http://localhost:3000        | Dashboard principal |
| Backend      | http://localhost:3001        | API REST            |
| Database     | localhost:5432               | PostgreSQL          |
| Health Check | http://localhost:3001/health | Status da API       |

## 🧪 Testando a Aplicação

### 1. Verificar Serviços

```bash
# Verificar containers rodando
docker-compose ps

# Deve mostrar 3 serviços: postgres, backend, frontend
```

### 2. Testar Backend (API)

```bash
# Health check
curl http://localhost:3001/health
# Esperado: {"status":"ok","timestamp":"..."}

# Métricas gerais
curl http://localhost:3001/api/analytics/overview
# Esperado: JSON com total_sales, total_revenue, avg_ticket, etc.

# Top 5 produtos
curl "http://localhost:3001/api/analytics/products/top?limit=5"
# Esperado: Array com 5 produtos mais vendidos

# Com filtros (loja 1, Janeiro 2024)
curl "http://localhost:3001/api/analytics/overview?startDate=2024-01-01&endDate=2024-01-31&storeId=1"
```

### 3. Testar Frontend

1. Abra http://localhost:3000
2. Verifique se aparecem:
    - ✅ 4 cards de métricas principais
    - ✅ Gráficos de série temporal
    - ✅ Tabela de produtos
3. Teste filtros:
    - Selecione período diferente
    - Selecione loja específica
    - Aplique filtros e veja dados atualizarem

### 4. Testar Features Principais

#### Comparação Temporal

1. Selecione um período (ex: 01/10 a 31/10)
2. Verifique banner mostrando período de comparação
3. Cards devem mostrar % de mudança (↑ +15% ou ↓ -5%)

#### Comparação de Lojas

1. Clique em "📊 Comparar Lojas"
2. Selecione 2+ lojas com checkboxes
3. Clique "Comparar"
4. Verifique tabela e gráficos lado a lado

#### Export CSV

1. Na tabela de produtos, clique "📥 Exportar CSV"
2. Arquivo deve baixar com timestamp
3. Abra no Excel - deve mostrar dados corretamente

## 💻 Desenvolvimento Local (sem Docker)

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar .env
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nola_restaurant
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001
EOF

# Modo desenvolvimento (hot reload)
npm run dev

# Verificar tipos
npm run typecheck
```

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Modo desenvolvimento (hot reload)
npm run dev

# Build de produção
npm run build

# Verificar tipos
npm run typecheck
```

### Database (standalone)

```bash
# Subir apenas PostgreSQL
docker-compose up postgres -d

# Gerar dados (se ainda não gerou)
docker-compose exec backend npm run generate-data
```

## 🔍 Troubleshooting

### Porta já em uso

```bash
# Verificar o que está usando a porta
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL

# Matar processo ou mudar porta no docker-compose.yml
```

### Dados não aparecem

```bash
# Verificar se banco tem dados
docker-compose exec postgres psql -U postgres -d nola_restaurant -c "SELECT COUNT(*) FROM sales;"

# Se retornar 0, gerar dados:
docker-compose exec backend npm run generate-data
```

### Erro de conexão com banco

```bash
# Verificar logs do backend
docker-compose logs backend

# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Reiniciar serviços
docker-compose restart backend
```

### Frontend não atualiza

```bash
# Limpar cache e rebuild
docker-compose down
docker-compose up -d --build frontend
```

### Recomeçar do zero

```bash
# Parar tudo e remover volumes
docker-compose down -v

# Subir novamente
docker-compose up -d

# Gerar dados novamente
docker-compose exec backend npm run generate-data
```

## 📊 Validação Completa

### Checklist de Testes

-   [ ] `docker-compose up` funciona sem erros
-   [ ] Health check retorna status ok
-   [ ] Frontend carrega em http://localhost:3000
-   [ ] Dashboard mostra 4 cards de métricas
-   [ ] Gráficos renderizam corretamente
-   [ ] Filtros funcionam (data, loja, canal)
-   [ ] Comparação temporal mostra banner e %
-   [ ] Comparação de lojas funciona (2+ lojas)
-   [ ] Export CSV funciona e abre no Excel
-   [ ] Tabela de produtos mostra top 10
-   [ ] Gráficos são interativos (hover mostra tooltip)
-   [ ] Layout é responsivo (testar resize)

### Performance Esperada

-   ⚡ Health check: < 10ms
-   ⚡ Overview query: 100-300ms
-   ⚡ Top products: 200-400ms
-   ⚡ Dashboard completo (primeira carga): < 2s
-   ⚡ Filtros aplicados: < 1s

## 🔧 Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild específico
docker-compose up -d --no-deps --build backend
docker-compose up -d --no-deps --build frontend

# Entrar no container
docker-compose exec backend sh
docker-compose exec frontend sh

# Verificar banco de dados
docker-compose exec postgres psql -U postgres -d nola_restaurant

# Parar tudo
docker-compose down

# Limpar volumes (ATENÇÃO: apaga dados)
docker-compose down -v
```

## 🎯 Endpoints da API

### Analytics

| Endpoint                             | Método | Descrição                        |
| ------------------------------------ | ------ | -------------------------------- |
| `/api/analytics/overview`            | GET    | Métricas gerais                  |
| `/api/analytics/overview-comparison` | GET    | Métricas com comparação temporal |
| `/api/analytics/products/top`        | GET    | Top N produtos                   |
| `/api/analytics/channels`            | GET    | Vendas por canal                 |
| `/api/analytics/time-series`         | GET    | Série temporal diária            |
| `/api/analytics/sales-by-hour`       | GET    | Vendas por hora                  |
| `/api/analytics/sales-by-weekday`    | GET    | Vendas por dia da semana         |
| `/api/analytics/stores/top`          | GET    | Top N lojas                      |
| `/api/analytics/stores/compare`      | GET    | Comparar múltiplas lojas         |
| `/api/analytics/customizations/top`  | GET    | Customizações populares          |

### Filtros

| Endpoint                  | Método | Descrição                 |
| ------------------------- | ------ | ------------------------- |
| `/api/filters/stores`     | GET    | Lista de lojas            |
| `/api/filters/channels`   | GET    | Lista de canais           |
| `/api/filters/date-range` | GET    | Range de datas disponível |

**Query Parameters** (todos endpoints de analytics):

-   `startDate` - YYYY-MM-DD
-   `endDate` - YYYY-MM-DD
-   `storeId` - número
-   `channelId` - número
-   `limit` - número (para endpoints top)

---

**Dúvidas?** Veja [ARQUITETURA.md](./ARQUITETURA.md) para decisões técnicas ou [FEATURES.md](./FEATURES.md) para detalhes de funcionalidades.
