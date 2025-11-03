import { Request, Response } from 'express'
import analyticsService from '../services/analyticsService'

/**
 * Helper function to safely parse integer parameters
 */
function parseIntSafe(value: unknown): number | undefined {
    if (typeof value !== 'string') return undefined
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? undefined : parsed
}

/**
 * AnalyticsController - Handles HTTP requests for analytics endpoints
 */
export class AnalyticsController {
    async getOverview(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
            }
            const limit = parseIntSafe(req.query.limit) || 10

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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
            }
            const limit = parseIntSafe(req.query.limit) || 10

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
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
            }
            const limit = parseIntSafe(req.query.limit) || 10

            const customizations = await analyticsService.getTopCustomizations(filters, limit)
            res.json(customizations)
        } catch (error) {
            console.error('Error in getTopCustomizations:', error)
            res.status(500).json({ error: 'Erro ao buscar customizações mais populares' })
        }
    }

    async getOverviewWithComparison(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
                storeId: parseIntSafe(req.query.storeId),
                channelId: parseIntSafe(req.query.channelId),
            }

            const metrics = await analyticsService.getOverviewMetricsWithComparison(filters)
            res.json(metrics)
        } catch (error) {
            console.error('Error in getOverviewWithComparison:', error)
            res.status(500).json({ error: 'Erro ao buscar métricas com comparação' })
        }
    }

    async compareStores(req: Request, res: Response) {
        try {
            const filters = {
                startDate: req.query.startDate as string | undefined,
                endDate: req.query.endDate as string | undefined,
            }

            // Parse store IDs from comma-separated string or array
            let storeIds: number[] = []
            if (req.query.storeIds) {
                if (typeof req.query.storeIds === 'string') {
                    storeIds = req.query.storeIds
                        .split(',')
                        .map(Number)
                        .filter((id) => !isNaN(id))
                } else if (Array.isArray(req.query.storeIds)) {
                    storeIds = req.query.storeIds.map(Number).filter((id) => !isNaN(id))
                }
            }

            if (storeIds.length === 0) {
                res.status(400).json({ error: 'É necessário fornecer pelo menos uma loja para comparação' })
                return
            }

            const comparison = await analyticsService.compareStores(filters, storeIds)
            res.json(comparison)
        } catch (error) {
            console.error('Error in compareStores:', error)
            res.status(500).json({ error: 'Erro ao comparar lojas' })
        }
    }
}

export default new AnalyticsController()
