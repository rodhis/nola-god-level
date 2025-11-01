# 🧪 Guia de Teste Rápido

## Testando a Aplicação Localmente

### 1. Verificar se o Banco de Dados Está Rodando

```bash
# Verificar se PostgreSQL está ativo
docker ps | grep postgres

# Ou
docker-compose ps

# Conectar ao banco e verificar dados
docker-compose exec postgres psql -U postgres -d nola_restaurant -c "SELECT COUNT(*) FROM sales;"
```

**Esperado**: Deve retornar aproximadamente 500.000 registros.

### 2. Testar o Backend

#### Iniciar o Backend

```bash
cd backend
npm run dev
```

**Esperado**:

```
🚀 Server running on http://localhost:3001
📊 Analytics API available at http://localhost:3001/api/analytics
```

#### Testar Endpoints

**Health Check**:

```bash
curl http://localhost:3001/health
```

Esperado: `{"status":"ok","timestamp":"2025-..."}`

**Overview Metrics**:

```bash
curl "http://localhost:3001/api/analytics/overview"
```

Esperado: JSON com `total_sales`, `total_revenue`, `avg_ticket`, etc.

**Top Products**:

```bash
curl "http://localhost:3001/api/analytics/products/top?limit=5"
```

Esperado: Array com 5 produtos mais vendidos

**Com Filtros**:

```bash
curl "http://localhost:3001/api/analytics/overview?startDate=2024-01-01&endDate=2024-01-31&storeId=1"
```

**Listar Lojas**:

```bash
curl "http://localhost:3001/api/filters/stores"
```

**Listar Canais**:

```bash
curl "http://localhost:3001/api/filters/channels"
```

### 3. Testar o Frontend

#### Iniciar o Frontend

```bash
cd frontend
npm run dev
```

**Esperado**:

```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:3000/
```

#### Acessar no Navegador

1. Abra http://localhost:3000
2. Aguarde alguns segundos (primeira carga)
3. Dashboard deve aparecer com:
    - 4 cards de métricas no topo
    - Filtros na sidebar esquerda
    - Gráficos de linha, pizza e barras
    - Tabela de top produtos

#### Testar Filtros

1. **Trocar Período**: Selecione datas diferentes
2. **Filtrar por Loja**: Escolha uma loja específica
3. **Filtrar por Canal**: Escolha um canal (ex: iFood)
4. **Limpar Filtros**: Clique em "Limpar Filtros"

**Esperado**: Dashboard recarrega com novos dados a cada mudança

#### Verificar Gráficos

-   **Hover**: Passar mouse mostra tooltips com valores
-   **Responsividade**: Redimensione a janela, gráficos se adaptam
-   **Loading**: Durante carregamento, mostra "Carregando dados..."

### 4. Testar com Docker Compose

#### Opção 1: Sem Rebuild

```bash
# Se os dados já existem
docker-compose up -d

# Aguarde ~10 segundos para inicialização
sleep 10

# Verifique os logs
docker-compose logs backend
docker-compose logs frontend

# Acesse
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

#### Opção 2: Rebuild Completo

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Monitorar logs em tempo real
docker-compose logs -f
```

### 5. Verificar Problemas Comuns

#### Backend não conecta ao banco

```bash
# Verificar se postgres está healthy
docker-compose ps

# Ver logs do postgres
docker-compose logs postgres

# Reiniciar backend
docker-compose restart backend
```

#### Frontend mostra tela branca

```bash
# Verificar console do navegador (F12)
# Verificar se backend está respondendo
curl http://localhost:3001/health

# Verificar logs do frontend
docker-compose logs frontend
```

#### Queries lentas (> 5s)

```bash
# Verificar quantidade de dados
docker-compose exec postgres psql -U postgres -d nola_restaurant -c "SELECT COUNT(*) FROM sales;"

# Se < 100k registros, regenerar dados
docker-compose --profile tools run data-generator
```

## Testando Funcionalidades Específicas

### Teste 1: Filtro por Data

1. Acesse http://localhost:3000
2. Selecione "Data Inicial": 01/01/2024
3. Selecione "Data Final": 31/01/2024
4. Verifique que os gráficos mostram apenas janeiro

### Teste 2: Filtro por Loja

1. Na sidebar, selecione uma loja específica
2. Verifique que métricas mudam
3. Note que apenas dados daquela loja aparecem

### Teste 3: Filtro Combinado

1. Selecione período + loja + canal
2. Verifique que dashboard reflete os 3 filtros simultaneamente

### Teste 4: Performance

1. Abra DevTools (F12) → Network
2. Aplique um filtro
3. Verifique tempo de resposta das requisições
4. **Esperado**: < 1s para maioria das queries

### Teste 5: Responsividade

1. Redimensione a janela do navegador
2. Teste em larguras: 1920px, 1280px, 768px, 375px
3. Verifique que sidebar vai para o topo em mobile

## Comandos Úteis para Debug

### Verificar Estado dos Containers

```bash
docker-compose ps
docker-compose logs --tail=50 backend
docker-compose logs --tail=50 frontend
```

### Acessar o Banco Diretamente

```bash
docker-compose exec postgres psql -U postgres -d nola_restaurant

# Queries úteis:
SELECT COUNT(*) FROM sales;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM stores;
SELECT MIN(created_at), MAX(created_at) FROM sales;
```

### Rebuild Individual

```bash
# Apenas backend
docker-compose up -d --no-deps --build backend

# Apenas frontend
docker-compose up -d --no-deps --build frontend
```

### Limpar Tudo e Recomeçar

```bash
docker-compose down -v
rm -rf backend/node_modules frontend/node_modules
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
docker-compose up -d
```

## Checklist de Validação

### Backend ✅

-   [ ] Servidor inicia sem erros
-   [ ] /health responde com status ok
-   [ ] /api/analytics/overview retorna métricas
-   [ ] Filtros funcionam corretamente
-   [ ] Queries são rápidas (< 1s)

### Frontend ✅

-   [ ] App carrega em http://localhost:3000
-   [ ] Dashboard mostra 4 cards de métricas
-   [ ] Gráficos renderizam corretamente
-   [ ] Filtros atualizam os dados
-   [ ] Tabela de produtos aparece
-   [ ] Responsivo em diferentes tamanhos

### Integração ✅

-   [ ] Frontend consome API do backend
-   [ ] CORS configurado corretamente
-   [ ] Erros são tratados gracefully
-   [ ] Loading states funcionam

### Docker ✅

-   [ ] docker-compose up funciona
-   [ ] Todos os containers iniciam
-   [ ] Networking entre containers OK
-   [ ] Volumes persistem dados

## Métricas de Sucesso

**Performance**:

-   Dashboard completo carrega em < 2s
-   Queries individuais < 500ms
-   Frontend responsivo < 100ms

**Funcionalidade**:

-   Todos os filtros funcionam
-   Todos os gráficos renderizam
-   Dados são consistentes
-   Formatação correta (moeda, números)

**UX**:

-   Interface intuitiva
-   Sem erros no console
-   Feedback visual durante loading
-   Responsivo em mobile

---

**Se tudo acima funcionar, o projeto está pronto para demonstração! 🎉**
