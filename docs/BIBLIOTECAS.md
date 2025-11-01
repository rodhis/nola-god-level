# 📚 Bibliotecas e Dependências Utilizadas

## Backend Dependencies

### Dependências de Produção

#### express (^4.18.2)

**O que é**: Framework web minimalista para Node.js
**Por que usar**:

-   Padrão da indústria para APIs REST em Node.js
-   Middleware system flexível e extensível
-   Roteamento simples e intuitivo
-   Excelente documentação e comunidade
-   Performance adequada para aplicações de médio/grande porte

**Alternativas consideradas**:

-   Fastify: Mais performático, mas menos maduro
-   NestJS: Overhead desnecessário para este escopo
-   Koa: Menos popular, ecossistema menor

#### pg (^8.11.3)

**O que é**: Cliente PostgreSQL nativo para Node.js (node-postgres)
**Por que usar**:

-   Driver oficial e mais performático para PostgreSQL
-   Connection pooling nativo para otimizar uso de recursos
-   Suporte completo a prepared statements (previne SQL injection)
-   Async/await friendly
-   Baixo overhead, zero abstrações desnecessárias

**Alternativas consideradas**:

-   Prisma: ORM completo, mas overhead e complexidade excessivos
-   TypeORM: ORM pesado, migrations complexas
-   Knex.js: Query builder, mas adiciona camada desnecessária

**Uso no projeto**:

```typescript
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'nola_restaurant',
    max: 20, // Connection pool size
})
```

#### cors (^2.8.5)

**O que é**: Middleware Express para habilitar CORS (Cross-Origin Resource Sharing)
**Por que usar**:

-   Frontend (porta 3000) precisa acessar backend (porta 3001)
-   Solução padrão e simples para permitir requisições cross-origin
-   Configurável para segurança em produção

**Uso no projeto**:

```typescript
app.use(cors()) // Permite todas as origens (dev)
// Produção: cors({ origin: 'https://seu-dominio.com' })
```

#### dotenv (^16.3.1)

**O que é**: Carrega variáveis de ambiente de arquivo .env
**Por que usar**:

-   Separação de configuração do código (12-factor app)
-   Facilita diferentes ambientes (dev, staging, prod)
-   Segurança: credenciais não vão para o repositório
-   Padrão da indústria

**Uso no projeto**:

```typescript
dotenv.config()
const dbHost = process.env.DB_HOST
```

### Dependências de Desenvolvimento

#### typescript (^5.3.3)

**O que é**: Superset de JavaScript com tipagem estática
**Por que usar**:

-   Type safety reduz bugs em produção
-   Melhor IntelliSense e autocomplete no editor
-   Refatoração mais segura
-   Documentação inline via tipos
-   Integração perfeita com Express e PostgreSQL

#### @types/\* (várias)

**O que é**: Definições de tipos TypeScript para bibliotecas JavaScript
**Por que usar**:

-   Permite TypeScript entender APIs de bibliotecas JS
-   Melhora DX (Developer Experience)
-   Catch de erros em tempo de desenvolvimento

**Pacotes**:

-   `@types/express`: Tipos para Express
-   `@types/node`: Tipos para Node.js APIs
-   `@types/pg`: Tipos para node-postgres
-   `@types/cors`: Tipos para CORS

#### tsx (^4.7.0)

**O que é**: TypeScript executor e watcher
**Por que usar**:

-   Executa TypeScript diretamente sem compilação prévia
-   Hot reload em desenvolvimento
-   Alternativa moderna ao ts-node
-   Mais rápido e leve

**Uso no projeto**:

```json
"scripts": {
  "dev": "tsx watch src/index.ts"
}
```

---

## Frontend Dependencies

### Dependências de Produção

#### react (^18.2.0) + react-dom (^18.2.0)

**O que é**: Biblioteca para construir interfaces de usuário
**Por que usar**:

-   Padrão da indústria para SPAs
-   Componentização e reutilização de código
-   Virtual DOM para performance
-   Hooks para gerenciamento de estado
-   Ecossistema gigantesco
-   Fácil de aprender e manter

**Alternativas consideradas**:

-   Vue.js: Menos popular no mercado
-   Angular: Complexidade excessiva
-   Svelte: Menos maduro, ecossistema menor

#### recharts (^2.10.3)

**O que é**: Biblioteca de gráficos para React
**Por que usar**:

-   Componentes declarativos (fit perfeito com React)
-   Responsivo out-of-the-box
-   Suporte a diversos tipos de gráficos (line, bar, pie, area)
-   Customização via props
-   Tooltips e legends nativos
-   Performance adequada para dashboards

**Alternativas consideradas**:

-   Chart.js: Imperativo, não react-friendly
-   D3.js: Curva de aprendizado alta, overkill
-   Victory: Mais pesado, menos popular
-   Nivo: Ótimo, mas mais complexo

**Uso no projeto**:

```tsx
<LineChart data={timeSeries}>
    <XAxis dataKey="date" />
    <YAxis />
    <Line dataKey="revenue" stroke="#0088FE" />
</LineChart>
```

### Dependências de Desenvolvimento

#### vite (^5.0.8)

**O que é**: Build tool e dev server de nova geração
**Por que usar**:

-   Extremamente rápido (usa esbuild)
-   Hot Module Replacement (HMR) instantâneo
-   Build otimizado para produção
-   Configuração zero para React + TypeScript
-   Substitui Webpack com melhor DX

**Comparação**:

-   Webpack: Lento, configuração complexa
-   Create React App: Abandonado, lento
-   Vite: Moderno, rápido, simples

**Uso no projeto**:

```typescript
// vite.config.ts
export default defineConfig({
    plugins: [react()],
    server: { port: 3000 },
})
```

#### @vitejs/plugin-react (^4.2.1)

**O que é**: Plugin oficial Vite para React
**Por que usar**:

-   Fast Refresh (hot reload) para React
-   JSX/TSX transformation
-   Otimizações específicas do React

#### typescript (^5.3.3)

**O que é**: Mesma funcionalidade do backend
**Por que usar**: Mesmos benefícios de type safety e DX

#### @types/react + @types/react-dom

**O que é**: Definições de tipos para React
**Por que usar**: Type safety para componentes, props, hooks

---

## Bibliotecas NÃO Utilizadas (e Por Quê)

### Axios

**Não usado**: fetch nativo é suficiente

-   Fetch API é nativa no navegador moderno
-   Menos bundle size
-   Sem dependência externa
-   Async/await friendly

### Redux / Zustand / Recoil

**Não usado**: useState + useEffect são suficientes

-   Complexidade desnecessária para este escopo
-   State local é adequado
-   Facilita manutenção
-   Se necessário futuramente, fácil de adicionar

### Styled-Components / Emotion

**Não usado**: CSS puro é mais simples

-   Zero runtime overhead
-   Melhor performance
-   Mais controle e previsibilidade
-   Facilita debug
-   Menor bundle size

### Lodash

**Não usado**: Métodos nativos do JavaScript são suficientes

-   Array.map, filter, reduce são nativos
-   Menor bundle size
-   Performance similar

### Moment.js

**Não usado**: Date nativo + toLocaleString

-   Moment está deprecated
-   Date API nativa melhorou muito
-   Intl.DateTimeFormat para formatação
-   10x menor em bundle size

### ESLint / Prettier (ainda)

**Não incluído no MVP**: Foco em funcionalidade

-   Seria adicionado em produção
-   Recomendado para times maiores
-   Configuração padrão: Airbnb ou Standard

---

## Justificativa Geral da Stack

### Critérios de Seleção

1. **Simplicidade**: Fácil de entender e manter
2. **Performance**: Adequado para 500k+ registros
3. **DX**: Boa experiência de desenvolvimento
4. **Comunidade**: Suporte e documentação
5. **Maturidade**: Bibliotecas estáveis e testadas
6. **Bundle Size**: Mínimo possível para frontend

### Princípios Seguidos

-   **KISS** (Keep It Simple, Stupid)
-   **YAGNI** (You Aren't Gonna Need It)
-   **Convention over Configuration**
-   **Progressive Enhancement**: Começa simples, adiciona complexidade quando necessário

### Considerações de Produção

**Se o projeto crescer, considerar adicionar**:

-   **React Query**: Cache e sincronização de dados
-   **Zod**: Validação de dados runtime
-   **MSW**: Mock Service Worker para testes
-   **Vitest**: Testes unitários rápidos
-   **Playwright**: Testes E2E

---

**Conclusão**: Cada biblioteca foi escolhida por resolver um problema específico sem adicionar complexidade desnecessária. A stack é moderna, performática e fácil de manter.
