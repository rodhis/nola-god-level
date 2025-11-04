import { Router, Request, Response } from 'express'
import pool from '../config/database'

const router = Router()

router.get('/stores', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
      SELECT id, name, city, state
      FROM stores
      WHERE is_active = true
      ORDER BY name
    `)
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching stores:', error)
        res.status(500).json({ error: 'Erro ao buscar lojas' })
    }
})

router.get('/channels', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
      SELECT id, name, type, description
      FROM channels
      ORDER BY name
    `)
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching channels:', error)
        res.status(500).json({ error: 'Erro ao buscar canais' })
    }
})

router.get('/date-range', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
      SELECT 
        MIN(created_at) as min_date,
        MAX(created_at) as max_date
      FROM sales
    `)
        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching date range:', error)
        res.status(500).json({ error: 'Erro ao buscar intervalo de datas' })
    }
})

export default router
