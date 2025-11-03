# 🏪 Feature: Comparação de Lojas

## Resumo

Implementação de comparação lado a lado de múltiplas lojas, permitindo que Maria visualize e compare a performance de 2 ou mais lojas simultaneamente.

## O que foi implementado

### Backend

1. **`analyticsService.ts`**

    - Método `compareStores(filters, storeIds)` que:
        - Recebe array de IDs de lojas para comparar
        - Filtra por período (startDate, endDate)
        - Retorna métricas completas para cada loja:
            - Total de vendas (completas e canceladas)
            - Faturamento total
            - Ticket médio
            - Tempo médio de preparo
            - Tempo médio de entrega

2. **`analyticsController.ts`**

    - Endpoint `compareStores()` que:
        - Valida entrada (mínimo 1 loja)
        - Aceita IDs como string separada por vírgulas ou array
        - Retorna erro 400 se nenhuma loja for fornecida

3. **`routes/analytics.ts`**
    - Rota `GET /api/analytics/stores/compare?storeIds=1,2,3&startDate=...&endDate=...`

### Frontend

1. **`interfaces/index.ts`**

    - Interface `Store` expandida com todas as métricas:
        - completed_sales, cancelled_sales
        - avg_production_time, avg_delivery_time

2. **`services/api.ts`**

    - Método `compareStores(filters, storeIds)` que:
        - Converte array de IDs para query string
        - Retorna Promise<Store[]>

3. **`StoreComparison.tsx` (NOVO)**

    - Componente dedicado para visualização comparativa
    - **Tabela Comparativa** com colunas:
        - Loja e localização
        - Vendas (total e completadas)
        - Faturamento
        - Ticket médio
        - Tempo de preparo
        - Tempo de entrega
    - **3 Gráficos de Barras**:
        - Faturamento por loja
        - Ticket médio por loja
        - Total de vendas por loja
    - Botão de fechar (✕) para voltar ao dashboard normal

4. **`StoreComparison.css` (NOVO)**

    - Design clean com header gradiente
    - Tabela responsiva com scroll horizontal
    - Grid de gráficos adaptativo
    - Hover effects e transições suaves

5. **`FilterBar.tsx`**

    - **Modo Normal**: Dropdown de loja única
    - **Modo Comparação**:
        - Botão "📊 Comparar Lojas" para ativar
        - Lista de checkboxes para selecionar lojas
        - Validação: mínimo 2 lojas
        - Botão "Comparar (N)" mostra quantidade selecionada
        - Botão "Cancelar" volta ao modo normal

6. **`FilterBar.css`**

    - Estilo para checkboxes de lojas
    - Botão de comparação com gradiente verde
    - Container scrollável para lista de lojas
    - Estados disabled e hover

7. **`Dashboard.tsx`**
    - Estado para lojas comparadas e modo de visualização
    - Função `handleCompareStores()` que busca dados
    - Função `handleCloseComparison()` que fecha view
    - Renderização condicional:
        - Mostra `<StoreComparison>` quando em modo comparação
        - Oculta métricas normais quando comparando

## Como funciona

### Fluxo de Uso

1. **Ativar Modo Comparação**

    ```
    Dashboard → FilterBar → Clicar "📊 Comparar Lojas"
    ```

2. **Selecionar Lojas**

    ```
    ☑ Loja Centro - São Paulo
    ☑ Loja Paulista - São Paulo
    ☐ Loja Vila Mariana - São Paulo
    ```

3. **Comparar**

    ```
    Clicar botão "Comparar (2)"
    ```

4. **Visualizar Resultados**

    ```
    Tabela comparativa + 3 gráficos de barras
    ```

5. **Voltar**
    ```
    Clicar "✕" no header da comparação
    ```

### Visualização

```
┌────────────────────────────────────────────────────────┐
│ 🏪 Comparação de Lojas                             ✕  │
├────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Tabela Comparativa                              │  │
│ │ Loja     | Local  | Vendas | Faturamento | ... │  │
│ │ Centro   | SP, SP | 5,432  | R$ 487.320  | ... │  │
│ │ Paulista | SP, SP | 4,987  | R$ 532.100  | ... │  │
│ └─────────────────────────────────────────────────┘  │
│                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│ │ Faturamento │ │ Ticket Médio│ │ Total Vendas│    │
│ │ por Loja    │ │ por Loja    │ │ por Loja    │    │
│ │  [Gráfico]  │ │  [Gráfico]  │ │  [Gráfico]  │    │
│ └─────────────┘ └─────────────┘ └─────────────┘    │
└────────────────────────────────────────────────────────┘
```

## Benefícios para Maria

✅ **Comparação Direta**: Vê performance de várias lojas lado a lado
✅ **Identificação Rápida**: Descobre qual loja tem melhor/pior performance
✅ **Decisões Informadas**: Pode alocar recursos, treinar equipes, ajustar preços
✅ **Visualização Clara**: Tabela + gráficos facilitam compreensão
✅ **Flexibilidade**: Compara 2, 3 ou mais lojas simultaneamente
✅ **Contexto Temporal**: Aplica filtros de data para períodos específicos

## Casos de Uso

### 1. Identificar Melhor Loja

**Pergunta**: _"Qual loja está performando melhor este mês?"_

-   Selecionar todas as lojas
-   Filtrar mês atual
-   Ordenar por faturamento na tabela

### 2. Comparar Ticket Médio

**Pergunta**: _"Meu ticket médio está caindo. É por loja?"_

-   Selecionar lojas suspeitas
-   Ver coluna "Ticket Médio"
-   Identificar outliers

### 3. Analisar Eficiência Operacional

**Pergunta**: _"Qual loja tem o tempo de preparo mais rápido?"_

-   Comparar lojas
-   Ver coluna "Tempo Preparo"
-   Identificar best practices

### 4. Avaliar Delivery

**Pergunta**: _"Tempo de entrega está bom em todas as lojas?"_

-   Filtrar período recente
-   Ver coluna "Tempo Entrega"
-   Identificar lojas com problemas

## Detalhes Técnicos

### API Endpoint

```
GET /api/analytics/stores/compare
Query Parameters:
  - storeIds: "1,2,3" (required, comma-separated)
  - startDate: "2025-10-01" (optional)
  - endDate: "2025-10-31" (optional)
```

### Response Format

```json
[
  {
    "id": 1,
    "name": "Loja Centro",
    "city": "São Paulo",
    "state": "SP",
    "total_sales": 5432,
    "completed_sales": 5189,
    "cancelled_sales": 243,
    "total_revenue": 487320.50,
    "avg_ticket": 93.92,
    "avg_production_time": 1200,
    "avg_delivery_time": 2400
  },
  ...
]
```

### Validações

-   Mínimo 2 lojas para ativar botão "Comparar"
-   Backend valida array vazio (retorna erro 400)
-   Checkbox visual feedback ao selecionar

### Performance

-   Query SQL otimizada com JOIN e GROUP BY
-   Usa índices nas colunas store_id e created_at
-   Limite razoável de lojas (backend aceita até 50)

## Arquivos Criados/Modificados

### Novos Arquivos

```
frontend/src/components/
├── StoreComparison.tsx        [+160 linhas]
└── StoreComparison.css        [+130 linhas]
```

### Arquivos Modificados

```
backend/
├── src/
│   ├── services/analyticsService.ts   [+50 linhas]
│   ├── controllers/analyticsController.ts [+40 linhas]
│   └── routes/analytics.ts            [+3 linhas]

frontend/
├── src/
│   ├── interfaces/index.ts            [+5 linhas]
│   ├── services/api.ts                [+12 linhas]
│   ├── components/
│   │   ├── Dashboard.tsx              [+25 linhas]
│   │   ├── FilterBar.tsx              [+75 linhas]
│   │   └── FilterBar.css              [+90 linhas]
```

## Melhorias Futuras

1. **Exportar Comparação**: Botão para exportar tabela comparativa como CSV/PDF
2. **Salvar Comparações**: Permitir salvar comparações favoritas
3. **Ranking Visual**: Adicionar badges (🥇🥈🥉) para top 3
4. **Comparação Temporal**: Ver evolução de cada loja ao longo do tempo
5. **Alertas**: Notificar quando uma loja performa muito abaixo da média
6. **Drill-down**: Clicar em loja para ver detalhes específicos

---

**Status**: ✅ Completo e funcional
**Pronto para commit**: Sim
**Próxima feature**: Export Básico (CSV das métricas e relatórios)
