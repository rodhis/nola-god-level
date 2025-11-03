import { Router } from 'express'
import analyticsController from '../controllers/analyticsController'

const router = Router()

/**
 * Analytics Routes
 * All endpoints support query parameters: startDate, endDate, storeId, channelId
 */

// GET /api/analytics/overview - General metrics
router.get('/overview', analyticsController.getOverview)

// GET /api/analytics/overview-comparison - General metrics with comparison to previous period
router.get('/overview-comparison', analyticsController.getOverviewWithComparison)

// GET /api/analytics/products/top - Top selling products
router.get('/products/top', analyticsController.getTopProducts)

// GET /api/analytics/channels - Sales by channel
router.get('/channels', analyticsController.getSalesByChannel)

// GET /api/analytics/time-series - Daily sales data
router.get('/time-series', analyticsController.getSalesTimeSeries)

// GET /api/analytics/sales-by-hour - Sales distribution by hour
router.get('/sales-by-hour', analyticsController.getSalesByHour)

// GET /api/analytics/sales-by-weekday - Sales distribution by weekday
router.get('/sales-by-weekday', analyticsController.getSalesByWeekday)

// GET /api/analytics/stores/top - Top performing stores
router.get('/stores/top', analyticsController.getTopStores)

// GET /api/analytics/stores/compare - Compare multiple stores
router.get('/stores/compare', analyticsController.compareStores)

// GET /api/analytics/customizations/top - Most popular customizations
router.get('/customizations/top', analyticsController.getTopCustomizations)

export default router
