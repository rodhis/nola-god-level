import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import analyticsRouter from './routes/analytics'
import filtersRouter from './routes/filters'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors()) // Enable CORS for frontend communication
app.use(express.json()) // Parse JSON request bodies

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
