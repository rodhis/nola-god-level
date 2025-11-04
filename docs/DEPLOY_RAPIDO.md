# 🚀 Deploy Rápido - Nola Analytics

## ✅ Status Atual

-   [x] Banco de dados no Neon configurado e populado
-   [ ] Backend no Render
-   [ ] Frontend no Vercel

---

## 📦 Parte 1: Deploy Backend (Render.com) - 15 minutos

### Passo 1: Criar Conta no Render

1. Acesse https://render.com
2. Clique em "Get Started" → Continue com GitHub
3. Autorize o Render

### Passo 2: Criar Web Service

1. Clique em "New +" → **"Web Service"** (NÃO escolha Static Site)
2. Conecte seu repositório GitHub `nola-god-level`
3. O Render detectará que você usa Docker. Configure:
    - **Name:** `nola-backend` (ou deixe como está)
    - **Language:** Mude de "Docker" para **"Node"**
    - **Region:** Oregon (US West) - mais próximo
    - **Branch:** `main`
    - **Root Directory:** Digite `backend` (muito importante!)
    - **Build Command:** `npm install && npm run build`
    - **Start Command:** `npm start`

> 📝 **Campos que você está vendo:**
>
> -   **Source Code:** rodhis/nola-god-level (já preenchido)
> -   **Name:** nola-god-level → mude para `nola-backend`
> -   **Language:** Docker → **MUDE PARA Node**
> -   **Branch:** main (já preenchido)
> -   **Region:** Oregon (US West) (já preenchido)
> -   **Root Directory:** Está vazio → **PREENCHA COM: `backend`**

4. **Role para baixo** para ver mais campos (continuação da configuração)

### Passo 2.5: Continuar Configuração (após rolar a tela)

Você verá campos adicionais. Configure assim:

-   **Build Command:** (pode estar vazio ou com valor padrão)
    -   Apague o que estiver e digite: `npm install && npm run build`
-   **Start Command:** (pode estar vazio ou com valor padrão)
    -   Apague o que estiver e digite: `npm start`

### Passo 3: Configurar Variáveis de Ambiente

Role até "Environment Variables" e adicione:

```bash
DB_HOST=ep-summer-feather-ad15xii4-pooler.c-2.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=nola_analytics
DB_USER=neondb_owner
DB_PASSWORD=npg_5cDouVRfAZx1
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://sua-url-do-vercel.vercel.app
VERCEL_PREVIEW_ENABLED=true
```

⚠️ **IMPORTANTE:**

-   Render usa porta 10000 por padrão
-   `FRONTEND_URL` deve ser preenchido após deploy do frontend (Passo 4 da Parte 2)
-   `VERCEL_PREVIEW_ENABLED=true` permite que previews do Vercel funcionem

### Passo 4: Selecionar Plano Gratuito

1. Role até "Instance Type"
2. Selecione **Free** (0,1 CPU, 512 MB RAM)
3. ⚠️ **Atenção:** Serviço hiberna após 15 min de inatividade (cold start ~30s)
4. Clique em "Create Web Service"

### Passo 5: Aguardar Deploy

1. Render iniciará o build automaticamente
2. Aguarde 3-5 minutos
3. Quando aparecer "Live", copie a URL
4. **Copie a URL** (ex: `https://nola-backend.onrender.com`)
5. Teste: `https://sua-url.onrender.com/health`

---

## 🎨 Parte 2: Deploy Frontend (Vercel) - 10 minutos

### Passo 1: Preparar Repositório

Execute no terminal:

```bash
cd /home/rodhis/code/nola-god-level
git add .
git commit -m "feat: prepare for deployment"
git push origin main
```

### Passo 2: Importar no Vercel

1. Acesse https://vercel.com
2. Clique em "Add New" → "Project"
3. Importe `nola-god-level` do GitHub
4. Configure:
    - **Framework Preset:** Vite
    - **Root Directory:** `frontend`
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`

### Passo 3: Configurar Variáveis de Ambiente

Clique em "Environment Variables" e adicione:

```bash
VITE_API_URL=https://sua-url-do-render.onrender.com
```

**⚠️ IMPORTANTE:** Substitua pela URL real do Render (Passo 5 da Parte 1)

### Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde 2-3 minutos
3. Vercel mostrará a URL do projeto
4. Acesse e teste!

---

## 🔧 Parte 3: Configurar CORS no Backend

Depois que o frontend estiver no ar, atualize a variável de ambiente do backend:

1. Vá ao dashboard do **Render**
2. Clique no seu serviço de backend
3. Vá em **Environment**
4. Edite a variável `FRONTEND_URL` e coloque a URL do Vercel:
    ```
    FRONTEND_URL=https://nola-analytics.vercel.app
    ```
5. Clique em **Save Changes**
6. O Render fará redeploy automaticamente

⚠️ **Nota sobre Render:** Redeploy pode demorar 3-5 minutos no plano gratuito.

---

## ✅ Verificação Final

### Testar Backend:

```bash
curl https://sua-url.onrender.com/health
curl https://sua-url.onrender.com/api/analytics/overview
```

⚠️ **Primeira requisição pode demorar ~30s** (cold start do plano gratuito)

### Testar Frontend:

1. Abra a URL do Vercel
2. Dashboard deve carregar com dados
3. Filtros devem funcionar
4. Gráficos devem renderizar

---

## 🎬 Próximo Passo: Gravar Vídeo!

Com tudo no ar, você está pronto para gravar o vídeo seguindo o **ROTEIRO_VIDEO.md**!

---

## 🆘 Troubleshooting Rápido

### Backend não inicia no Render:

-   Verifique logs: Render Dashboard → Logs (em tempo real)
-   Confirme se as variáveis de ambiente estão corretas
-   Verifique se PORT=10000
-   Teste conexão com Neon

### Backend demora muito para responder:

-   **Normal no plano gratuito!** Cold start pode levar 30-60s
-   Após primeira requisição, fica rápido por ~15 minutos
-   Para produção real, considere upgrade ($7/mês)

### Frontend não conecta ao backend:

-   Verifique se `VITE_API_URL` está correto
-   Abra DevTools → Network → veja se as requests estão indo para a URL certa
-   Verifique CORS no backend
-   **Aguarde cold start:** primeira carga pode demorar

### Erro 500 nas APIs:

-   Provavelmente é conexão com banco
-   Verifique se as credenciais do Neon estão corretas
-   Teste conexão: `psql "postgresql://..."`
-   Veja logs no Render Dashboard

---

**Tempo total estimado:** 25-30 minutos (+ cold starts)

Boa sorte! 🚀
