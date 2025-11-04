# 🚀 Guia de Deploy - Nola Analytics

Este guia mostra como fazer deploy da aplicação Nola Analytics usando serviços gratuitos.

## 📋 Pré-requisitos

-   Conta no GitHub com o repositório clonado
-   Banco de dados PostgreSQL (recomendado: Neon, Supabase ou Railway)
-   Dados já populados no banco (500k+ registros)

---

## 📦 Parte 1: Deploy do Backend (Render.com)

### Passo 1: Criar Conta no Render

1. Acesse https://render.com
2. Clique em "Get Started" → Continue com GitHub
3. Autorize o Render a acessar seus repositórios

### Passo 2: Criar Web Service

1. No dashboard, clique em "New +" → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure o serviço:
    - **Name:** `seu-app-backend` (nome único)
    - **Language:** **Node**
    - **Region:** Escolha a região mais próxima
    - **Branch:** `main`
    - **Root Directory:** `backend`
    - **Build Command:** `npm install && npm run build`
    - **Start Command:** `npm start`

### Passo 3: Configurar Variáveis de Ambiente

Adicione as seguintes variáveis em "Environment Variables":

```bash
# Database (use suas credenciais do Neon/Supabase/Railway)
DB_HOST=seu-host-do-banco.neon.tech
DB_PORT=5432
DB_NAME=nola_analytics
DB_USER=seu-usuario
DB_PASSWORD=sua-senha

# Server
PORT=10000
NODE_ENV=production

# CORS (preencher depois do deploy do frontend)
FRONTEND_URL=https://seu-app.vercel.app
VERCEL_PREVIEW_ENABLED=true
```

**📝 Notas:**

-   Render usa porta 10000 por padrão
-   `NODE_ENV=production` ativa SSL automático para conexão com banco
-   `FRONTEND_URL` deve ser atualizada após o deploy do frontend (Parte 2)
-   `VERCEL_PREVIEW_ENABLED=true` permite preview deployments

### Passo 4: Selecionar Plano

1. Selecione o plano **Free** (0,1 CPU, 512 MB RAM)
2. Clique em "Create Web Service"

**⚠️ Limitações do plano gratuito:**

-   Serviço hiberna após 15 min de inatividade
-   Cold start de ~30-60s na primeira requisição
-   Suficiente para demonstração e testes

### Passo 5: Aguardar Deploy

1. O Render iniciará o build automaticamente (3-5 minutos)
2. Aguarde até o status ficar "Live"
3. **Copie a URL do serviço** (ex: `https://seu-app.onrender.com`)
4. Teste o health check: `https://seu-app.onrender.com/health`

---

## 🎨 Parte 2: Deploy do Frontend (Vercel)

### Passo 1: Importar Projeto no Vercel

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New" → "Project"
4. Selecione seu repositório
5. Configure o projeto:
    - **Framework Preset:** Vite
    - **Root Directory:** `frontend`
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`

### Passo 2: Configurar Variáveis de Ambiente

Em "Environment Variables", adicione:

```bash
VITE_API_URL=https://seu-app.onrender.com
```

**⚠️ IMPORTANTE:** Use a URL do backend obtida na Parte 1, Passo 5

### Passo 3: Deploy

1. Clique em "Deploy"
2. Aguarde o build (2-3 minutos)
3. **Copie a URL do projeto** (ex: `https://seu-app.vercel.app`)

---

## 🔧 Parte 3: Atualizar CORS no Backend

Com a URL do frontend pronta, atualize a configuração do backend:

1. Acesse o dashboard do **Render**
2. Clique no seu serviço de backend
3. Vá em **Environment** → **Environment Variables**
4. Edite `FRONTEND_URL` e coloque a URL do Vercel
5. Clique em **Save Changes**
6. Aguarde o redeploy automático (~3-5 minutos)

---

## ✅ Verificação

### Testar Backend

```bash
# Health check
curl https://seu-app.onrender.com/health

# API de analytics
curl https://seu-app.onrender.com/api/analytics/overview
```

**⚠️ Nota:** Primeira requisição pode demorar ~30s (cold start)

### Testar Frontend

1. Acesse a URL do Vercel
2. Verifique se o dashboard carrega com dados
3. Teste os filtros por período e loja
4. Verifique se os gráficos renderizam

---

## 🆘 Troubleshooting

### Backend não inicia

-   **Logs:** Render Dashboard → Logs (tempo real)
-   Verifique se todas as variáveis de ambiente estão corretas
-   Confirme as credenciais do banco de dados
-   Verifique se `PORT=10000`

### Erro CORS no frontend

-   Confirme se `FRONTEND_URL` está configurada no Render
-   URL deve ser exata (sem barra no final)
-   Aguarde o redeploy do backend após mudança
-   Limpe cache do navegador

### Erro 500 nas APIs

-   Verifique conexão com banco de dados
-   Confirme que o banco tem dados populados
-   Veja logs no Render Dashboard
-   Teste conexão SSL: banco deve aceitar `sslmode=require`

### Frontend não carrega dados

-   Confirme se `VITE_API_URL` aponta para o backend correto
-   Abra DevTools → Network para ver requisições
-   Aguarde cold start do backend (~30s primeira vez)
-   Verifique se backend retorna 200 nos endpoints

---

## 🌐 Deploy Alternativo

### Opções de Hosting

**Frontend:**

-   Netlify
-   Cloudflare Pages
-   GitHub Pages

**Backend:**

-   Railway
-   Heroku
-   Fly.io
-   DigitalOcean App Platform

**Database:**

-   Supabase (PostgreSQL)
-   Railway (PostgreSQL)
-   AWS RDS Free Tier
-   ElephantSQL

### Configuração Docker (VPS)

Se preferir usar Docker em VPS própria:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nola-god-level.git
cd nola-god-level

# Configure variáveis de ambiente
cp backend/.env.example backend/.env
# Edite backend/.env com suas credenciais

# Inicie com Docker Compose
docker-compose up -d

# Verifique
curl http://localhost:3001/health
```

---

**Tempo estimado total:** 25-35 minutos

**Stack de produção:**

-   ✅ Frontend: Vercel (CDN global)
-   ✅ Backend: Render (deploy automático)
-   ✅ Database: Neon/Supabase (PostgreSQL serverless)
-   ✅ SSL/HTTPS: Automático
-   ✅ CI/CD: Deploy automático via GitHub
