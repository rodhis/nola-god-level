import { Router } from 'express'
import analyticsController from '../controllers/analyticsController'

const router = Router()

router.get('/overview', analyticsController.getOverview)
router.get('/overview-comparison', analyticsController.getOverviewWithComparison)
router.get('/products/top', analyticsController.getTopProducts)
router.get('/channels', analyticsController.getSalesByChannel)
router.get('/time-series', analyticsController.getSalesTimeSeries)
router.get('/sales-by-hour', analyticsController.getSalesByHour)
router.get('/sales-by-weekday', analyticsController.getSalesByWeekday)
router.get('/stores/top', analyticsController.getTopStores)
router.get('/stores/compare', analyticsController.compareStores)
router.get('/customizations/top', analyticsController.getTopCustomizations)

export default router
