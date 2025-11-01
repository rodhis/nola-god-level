import { Request, Response } from 'express'
import analyticsService from '../services/analyticsService'

/**
 * AnalyticsController - Handles HTTP requests for analytics endpoints
 */
export class AnalyticsController {
    async getOverview(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                storeId: req.query.storeId ? parseInt(req.query.storeId as string) : undefined,
                channelId: req.query.channelId ? parseInt(req.query.channelId as string) : undefined,
            }

            const metrics = await analyticsService.getOverviewMetrics(filters)
            res.json(metrics)
        } catch (error) {
            console.error('Error in getOverview:', error)
            res.status(500).json({ error: 'Erro ao buscar métricas gerais' })
        }
    }

    async getTopProducts(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                storeId: req.query.storeId ? parseInt(req.query.storeId as string) : undefined,
                channelId: req.query.channelId ? parseInt(req.query.channelId as string) : undefined,
            }
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10

            const products = await analyticsService.getTopProducts(filters, limit)
            res.json(products)
        } catch (error) {
            console.error('Error in getTopProducts:', error)
            res.status(500).json({ error: 'Erro ao buscar produtos mais vendidos' })
        }
    }

    async getSalesByChannel(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
            }

            const channels = await analyticsService.getSalesByChannel(filters)
            res.json(channels)
        } catch (error) {
            console.error('Error in getSalesByChannel:', error)
            res.status(500).json({ error: 'Erro ao buscar vendas por canal' })
        }
    }

    async getSalesTimeSeries(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                storeId: req.query.storeId ? parseInt(req.query.storeId as string) : undefined,
                channelId: req.query.channelId ? parseInt(req.query.channelId as string) : undefined,
            }

            const timeSeries = await analyticsService.getSalesTimeSeries(filters)
            res.json(timeSeries)
        } catch (error) {
            console.error('Error in getSalesTimeSeries:', error)
            res.status(500).json({ error: 'Erro ao buscar série temporal de vendas' })
        }
    }

    async getSalesByHour(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                storeId: req.query.storeId ? parseInt(req.query.storeId as string) : undefined,
                channelId: req.query.channelId ? parseInt(req.query.channelId as string) : undefined,
            }

            const hourlyData = await analyticsService.getSalesByHour(filters)
            res.json(hourlyData)
        } catch (error) {
            console.error('Error in getSalesByHour:', error)
            res.status(500).json({ error: 'Erro ao buscar vendas por hora' })
        }
    }

    async getSalesByWeekday(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                storeId: req.query.storeId ? parseInt(req.query.storeId as string) : undefined,
                channelId: req.query.channelId ? parseInt(req.query.channelId as string) : undefined,
            }

            const weekdayData = await analyticsService.getSalesByWeekday(filters)
            res.json(weekdayData)
        } catch (error) {
            console.error('Error in getSalesByWeekday:', error)
            res.status(500).json({ error: 'Erro ao buscar vendas por dia da semana' })
        }
    }

    async getTopStores(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
            }
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10

            const stores = await analyticsService.getTopStores(filters, limit)
            res.json(stores)
        } catch (error) {
            console.error('Error in getTopStores:', error)
            res.status(500).json({ error: 'Erro ao buscar lojas com maior faturamento' })
        }
    }

    async getTopCustomizations(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                storeId: req.query.storeId ? parseInt(req.query.storeId as string) : undefined,
                channelId: req.query.channelId ? parseInt(req.query.channelId as string) : undefined,
            }
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10

            const customizations = await analyticsService.getTopCustomizations(filters, limit)
            res.json(customizations)
        } catch (error) {
            console.error('Error in getTopCustomizations:', error)
            res.status(500).json({ error: 'Erro ao buscar customizações mais populares' })
        }
    }
}

export default new AnalyticsController()
