import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import analyticsRouter from './routes/analytics'
import filtersRouter from './routes/filters'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Configure CORS origins
const allowedOrigins: (string | RegExp)[] = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
]

// Add frontend URL from environment variable if provided
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL)
}

// Add Vercel preview regex if using Vercel
if (process.env.VERCEL_PREVIEW_ENABLED === 'true') {
    allowedOrigins.push(/\.vercel\.app$/)
}

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
)
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/analytics', analyticsRouter)
app.use('/api/filters', filtersRouter)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📊 Analytics API available at http://localhost:${PORT}/api/analytics`)
})
