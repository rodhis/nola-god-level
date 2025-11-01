# 🏗️ Decisões Arquiteturais - Nola Analytics

## Visão Geral da Arquitetura

A solução foi arquitetada como uma aplicação web moderna e performática, dividida em três camadas principais:

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TS)                     │
│              Visualização e Interação do Usuário             │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST API
┌───────────────────────────▼─────────────────────────────────┐
│                   Backend (Node + Express + TS)              │
│              Lógica de Negócio e Agregação                   │
└───────────────────────────┬─────────────────────────────────┘
                            │ SQL Queries
┌───────────────────────────▼─────────────────────────────────┐
│                    PostgreSQL Database                       │
│              500k+ vendas com dados relacionais              │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnológica

### Frontend

-   **React 18**: Framework principal para UI componentizada
-   **TypeScript**: Type safety e melhor DX (Developer Experience)
-   **Vite**: Build tool moderna e extremamente rápida
-   **Recharts**: Biblioteca de gráficos responsiva e customizável
-   **CSS Puro**: Simplicidade, performance, sem overhead de bibliotecas

**Por que não Tailwind/Styled-Components?**

-   CSS puro oferece controle total e zero overhead de runtime
-   Não adiciona complexidade desnecessária ao projeto inicial
-   Facilita compreensão para qualquer desenvolvedor
-   Performance otimizada sem processamento adicional

### Backend

-   **Node.js + Express**: Stack consolidada, excelente para APIs REST
-   **TypeScript**: Consistência de tipos com o frontend
-   **pg (node-postgres)**: Driver PostgreSQL nativo e performático com connection pooling
-   **dotenv**: Gerenciamento seguro de variáveis de ambiente

**Por que Express?**

-   Simplicidade e familiaridade para a maioria dos desenvolvedores
-   Excelente ecossistema de middlewares
-   Performance adequada para o escopo do projeto
-   Facilita testes e manutenção

### Database

-   **PostgreSQL 15**: Banco relacional robusto e otimizado para analytics

**Por que PostgreSQL?**

-   Excelente performance em queries analíticas complexas
-   Suporte nativo a agregações, window functions, e CTEs
-   Indexação eficiente para queries de intervalo de datas
-   ACID compliant para consistência de dados

## Decisões de Design

### 1. Arquitetura em Camadas (Layered Architecture)

```
Controllers → Services → Database
```

**Benefícios:**

-   Separação clara de responsabilidades
-   Facilita testes unitários
-   Código reutilizável e manutenível
-   Fácil de escalar e refatorar

**Controllers**: Gerenciam requisições HTTP, validação de entrada, respostas
**Services**: Lógica de negócio e queries ao banco
**Database Config**: Connection pooling e gerenciamento de conexões

### 2. API RESTful

Endpoints organizados por domínio:

-   `/api/analytics/*` - Métricas e análises
-   `/api/filters/*` - Dados para filtros (lojas, canais, datas)

**Por que REST?**

-   Simplicidade e familiaridade
-   Stateless, escalável
-   Fácil de documentar e testar
-   Adequado para operações CRUD e queries

**Alternativas consideradas:**

-   **GraphQL**: Overhead desnecessário para este escopo
-   **gRPC**: Complexidade excessiva para web app

### 3. Connection Pooling

Configuração do pool PostgreSQL:

```typescript
max: 20,                      // Máximo de conexões
idleTimeoutMillis: 30000,     // Timeout de conexões ociosas
connectionTimeoutMillis: 2000 // Timeout de criação de conexão
```

**Benefícios:**

-   Reduz latência ao reutilizar conexões
-   Gerencia recursos eficientemente
-   Previne sobrecarga do banco

### 4. Query Optimization

**Estratégias aplicadas:**

-   Agregações no banco (SUM, AVG, COUNT) ao invés de no backend
-   Queries parametrizadas para prevenir SQL injection
-   Filtros dinâmicos com WHERE clauses condicionais
-   Índices implícitos em foreign keys e timestamps

**Exemplo de query otimizada:**

```sql
SELECT
  COUNT(*) as total_sales,
  SUM(CASE WHEN sale_status_desc = 'COMPLETED' THEN total_amount ELSE 0 END) as revenue
FROM sales
WHERE created_at >= $1 AND created_at <= $2
```

### 5. Frontend State Management

**Abordagem escolhida**: React Hooks (useState, useEffect)

**Por que não Redux/Zustand?**

-   Complexidade desnecessária para o escopo atual
-   State local é suficiente para este dashboard
-   Reduz curva de aprendizado
-   Facilita manutenção

**Se o projeto crescer:**

-   Considerar React Query para cache de dados
-   Implementar Zustand para state global

### 6. Filtragem e Análise

**Filtros implementados:**

-   Data inicial/final (date range)
-   Loja específica
-   Canal de venda

**Por que esses filtros?**

-   Respondem às principais perguntas da persona "Maria"
-   Cobrem 80% dos casos de uso reais
-   Balance entre flexibilidade e simplicidade

### 7. Visualizações de Dados

**Componentes de visualização:**

-   **MetricCards**: KPIs principais (faturamento, ticket médio, etc.)
-   **Line Charts**: Série temporal de vendas
-   **Bar Charts**: Distribuição por hora/dia da semana
-   **Pie Charts**: Distribuição por canal
-   **Tables**: Top produtos detalhados

**Por que Recharts?**

-   Declarativo e componentizado (fit perfeito com React)
-   Responsivo out-of-the-box
-   Boa documentação e customização
-   Leve e performático

### 8. Tratamento de Erros

**Backend:**

```typescript
try {
    // Query logic
} catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Mensagem amigável em português' })
}
```

**Frontend:**

```typescript
try {
    const data = await api.fetch()
} catch (error) {
    console.error('Error:', error)
    // UI mostra loading state ou mensagem de erro
}
```

## Performance e Escalabilidade

### Otimizações Implementadas

1. **Database Connection Pool**: Reutilização de conexões
2. **Queries Agregadas**: Cálculos no banco ao invés do backend
3. **Async/Await**: Operações não-bloqueantes
4. **Parallel Fetching**: Promise.all para múltiplas queries

### Benchmarks Esperados

-   Queries simples: < 100ms
-   Queries com agregações: < 500ms
-   Dashboard completo: < 2s (primeira carga)

### Escalabilidade Futura

**Horizontal Scaling:**

-   Backend pode rodar múltiplas instâncias com load balancer
-   PostgreSQL pode usar read replicas para queries analíticas
-   Frontend é estático, pode ser servido via CDN

**Caching Strategy (futuro):**

-   Redis para cache de queries frequentes
-   Cache de filtros (lojas, canais) que mudam raramente
-   ETL para data warehouse se volume crescer 10x

## Trade-offs e Limitações

### Trade-offs Conscientes

1. **CSS Puro vs Tailwind**

    - ✅ Sem overhead de runtime
    - ❌ Mais verbose, necessário criar utilities manualmente

2. **REST vs GraphQL**

    - ✅ Simplicidade, fácil debug
    - ❌ Overfetching em alguns casos (aceitável para este escopo)

3. **React puro vs Next.js**

    - ✅ Menor complexidade, mais controle
    - ❌ Sem SSR/SSG (não necessário para dashboard interno)

4. **Monolito vs Microserviços**
    - ✅ Desenvolvimento rápido, deploy simples
    - ❌ Acoplamento (mas adequado para MVP)

### Limitações Atuais

1. **Sem autenticação/autorização**: Conforme especificado, mock básico seria suficiente
2. **Sem real-time updates**: Usuário precisa refresh ou aplicar filtros
3. **Cache limitado**: Apenas cache do navegador
4. **Sem testes automatizados**: Foco em MVP funcional

## Próximos Passos (Roadmap)

### Curto Prazo

-   [ ] Adicionar testes unitários (Jest) e integração
-   [ ] Implementar cache com Redis
-   [ ] Adicionar mais visualizações (mapas de calor, cohorts)
-   [ ] Sistema de alertas (anomalias, metas)

### Médio Prazo

-   [ ] Autenticação e autorização completa
-   [ ] Dashboards customizáveis (drag-and-drop)
-   [ ] Export de relatórios (PDF, Excel)
-   [ ] Integração com sistemas externos (ERP, POS)

### Longo Prazo

-   [ ] Machine Learning para previsões
-   [ ] Data warehouse separado para analytics
-   [ ] Mobile app
-   [ ] Multi-tenancy para múltiplos restaurantes

## Conclusão

A arquitetura escolhida prioriza:

-   **Simplicidade**: Fácil entender e manter
-   **Performance**: Queries otimizadas, < 1s para maioria das operações
-   **Escalabilidade**: Preparado para crescer horizontal e verticalmente
-   **Developer Experience**: TypeScript, estrutura clara, boas práticas

Todas as decisões foram tomadas considerando o problema real da persona "Maria": **empoderar donos de restaurantes a explorarem seus dados de forma simples e eficaz**.
