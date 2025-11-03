import pool from '../config/database'

export interface DateRange {
    startDate?: string
    endDate?: string
}

export interface Filters extends DateRange {
    storeId?: number
    channelId?: number
}

/**
 * AnalyticsService - Core business logic for analytics queries
 * Handles all database queries with optimizations for performance
 */
export class AnalyticsService {
    /**
     * Get overview metrics: total revenue, sales count, average ticket, cancelled rate
     */
    async getOverviewMetrics(filters: Filters) {
        const { startDate, endDate, storeId, channelId } = filters

        const conditions = ['1=1']
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`created_at <= $${paramCount++}`)
            params.push(endDate)
        }
        if (storeId) {
            conditions.push(`store_id = $${paramCount++}`)
            params.push(storeId)
        }
        if (channelId) {
            conditions.push(`channel_id = $${paramCount++}`)
            params.push(channelId)
        }

        const query = `
      SELECT 
        COUNT(*) as total_sales,
        COUNT(CASE WHEN sale_status_desc = 'COMPLETED' THEN 1 END) as completed_sales,
        COUNT(CASE WHEN sale_status_desc = 'CANCELLED' THEN 1 END) as cancelled_sales,
        COALESCE(SUM(CASE WHEN sale_status_desc = 'COMPLETED' THEN total_amount ELSE 0 END), 0) as total_revenue,
        COALESCE(AVG(CASE WHEN sale_status_desc = 'COMPLETED' THEN total_amount END), 0) as avg_ticket,
        COALESCE(AVG(CASE WHEN sale_status_desc = 'COMPLETED' THEN production_seconds END), 0) as avg_production_time,
        COALESCE(AVG(CASE WHEN sale_status_desc = 'COMPLETED' AND delivery_seconds IS NOT NULL THEN delivery_seconds END), 0) as avg_delivery_time
      FROM sales
      WHERE ${conditions.join(' AND ')}
    `

        const result = await pool.query(query, params)
        return result.rows[0]
    }

    /**
     * Get top selling products with revenue and quantity
     */
    async getTopProducts(filters: Filters, limit: number = 10) {
        const { startDate, endDate, storeId, channelId } = filters

        const conditions = ["s.sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`s.created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`s.created_at <= $${paramCount++}`)
            params.push(endDate)
        }
        if (storeId) {
            conditions.push(`s.store_id = $${paramCount++}`)
            params.push(storeId)
        }
        if (channelId) {
            conditions.push(`s.channel_id = $${paramCount++}`)
            params.push(channelId)
        }

        params.push(limit)

        const query = `
      SELECT 
        p.id,
        p.name,
        c.name as category,
        SUM(ps.quantity) as total_quantity,
        SUM(ps.total_price) as total_revenue,
        COUNT(DISTINCT ps.sale_id) as times_sold
      FROM product_sales ps
      JOIN products p ON p.id = ps.product_id
      LEFT JOIN categories c ON c.id = p.category_id
      JOIN sales s ON s.id = ps.sale_id
      WHERE ${conditions.join(' AND ')}
      GROUP BY p.id, p.name, c.name
      ORDER BY total_revenue DESC
      LIMIT $${paramCount}
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get sales distribution by channel
     */
    async getSalesByChannel(filters: DateRange) {
        const { startDate, endDate } = filters

        const conditions = ["s.sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`s.created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`s.created_at <= $${paramCount++}`)
            params.push(endDate)
        }

        const query = `
      SELECT 
        ch.id,
        ch.name,
        ch.type,
        COUNT(*) as total_sales,
        SUM(s.total_amount) as total_revenue,
        AVG(s.total_amount) as avg_ticket
      FROM sales s
      JOIN channels ch ON ch.id = s.channel_id
      WHERE ${conditions.join(' AND ')}
      GROUP BY ch.id, ch.name, ch.type
      ORDER BY total_revenue DESC
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get sales time series (daily aggregation)
     */
    async getSalesTimeSeries(filters: Filters) {
        const { startDate, endDate, storeId, channelId } = filters

        const conditions = ["sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`created_at <= $${paramCount++}`)
            params.push(endDate)
        }
        if (storeId) {
            conditions.push(`store_id = $${paramCount++}`)
            params.push(storeId)
        }
        if (channelId) {
            conditions.push(`channel_id = $${paramCount++}`)
            params.push(channelId)
        }

        const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as sales_count,
        SUM(total_amount) as revenue,
        AVG(total_amount) as avg_ticket
      FROM sales
      WHERE ${conditions.join(' AND ')}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get sales by hour of day
     */
    async getSalesByHour(filters: Filters) {
        const { startDate, endDate, storeId, channelId } = filters

        const conditions = ["sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`created_at <= $${paramCount++}`)
            params.push(endDate)
        }
        if (storeId) {
            conditions.push(`store_id = $${paramCount++}`)
            params.push(storeId)
        }
        if (channelId) {
            conditions.push(`channel_id = $${paramCount++}`)
            params.push(channelId)
        }

        const query = `
      SELECT 
        EXTRACT(HOUR FROM created_at) as hour,
        COUNT(*) as sales_count,
        SUM(total_amount) as revenue
      FROM sales
      WHERE ${conditions.join(' AND ')}
      GROUP BY EXTRACT(HOUR FROM created_at)
      ORDER BY hour ASC
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get sales by day of week
     */
    async getSalesByWeekday(filters: Filters) {
        const { startDate, endDate, storeId, channelId } = filters

        const conditions = ["sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`created_at <= $${paramCount++}`)
            params.push(endDate)
        }
        if (storeId) {
            conditions.push(`store_id = $${paramCount++}`)
            params.push(storeId)
        }
        if (channelId) {
            conditions.push(`channel_id = $${paramCount++}`)
            params.push(channelId)
        }

        const query = `
      SELECT 
        EXTRACT(DOW FROM created_at) as day_of_week,
        COUNT(*) as sales_count,
        SUM(total_amount) as revenue,
        AVG(total_amount) as avg_ticket
      FROM sales
      WHERE ${conditions.join(' AND ')}
      GROUP BY EXTRACT(DOW FROM created_at)
      ORDER BY day_of_week ASC
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get top stores by revenue
     */
    async getTopStores(filters: DateRange, limit: number = 10) {
        const { startDate, endDate } = filters

        const conditions = ["s.sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`s.created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`s.created_at <= $${paramCount++}`)
            params.push(endDate)
        }

        params.push(limit)

        const query = `
      SELECT 
        st.id,
        st.name,
        st.city,
        st.state,
        COUNT(*) as total_sales,
        SUM(s.total_amount) as total_revenue,
        AVG(s.total_amount) as avg_ticket
      FROM sales s
      JOIN stores st ON st.id = s.store_id
      WHERE ${conditions.join(' AND ')}
      GROUP BY st.id, st.name, st.city, st.state
      ORDER BY total_revenue DESC
      LIMIT $${paramCount}
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get top customizations/items added to products
     */
    async getTopCustomizations(filters: Filters, limit: number = 10) {
        const { startDate, endDate, storeId, channelId } = filters

        const conditions = ["s.sale_status_desc = 'COMPLETED'"]
        const params: (string | number)[] = []
        let paramCount = 1

        if (startDate) {
            conditions.push(`s.created_at >= $${paramCount++}`)
            params.push(startDate)
        }
        if (endDate) {
            conditions.push(`s.created_at <= $${paramCount++}`)
            params.push(endDate)
        }
        if (storeId) {
            conditions.push(`s.store_id = $${paramCount++}`)
            params.push(storeId)
        }
        if (channelId) {
            conditions.push(`s.channel_id = $${paramCount++}`)
            params.push(channelId)
        }

        params.push(limit)

        const query = `
      SELECT 
        i.id,
        i.name,
        COUNT(*) as times_added,
        SUM(ips.additional_price) as revenue_generated
      FROM item_product_sales ips
      JOIN items i ON i.id = ips.item_id
      JOIN product_sales ps ON ps.id = ips.product_sale_id
      JOIN sales s ON s.id = ps.sale_id
      WHERE ${conditions.join(' AND ')}
      GROUP BY i.id, i.name
      ORDER BY times_added DESC
      LIMIT $${paramCount}
    `

        const result = await pool.query(query, params)
        return result.rows
    }

    /**
     * Get overview metrics with comparison to previous period
     * Automatically calculates the previous period based on the current date range
     */
    async getOverviewMetricsWithComparison(filters: Filters) {
        const currentMetrics = await this.getOverviewMetrics(filters)

        // Calculate previous period
        if (!filters.startDate || !filters.endDate) {
            // If no date range specified, return current metrics only
            return {
                current: currentMetrics,
                previous: null,
                comparison: null,
            }
        }

        const startDate = new Date(filters.startDate)
        const endDate = new Date(filters.endDate)
        const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

        const previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - daysDiff)

        const previousEndDate = new Date(endDate)
        previousEndDate.setDate(previousEndDate.getDate() - daysDiff)

        const previousFilters = {
            ...filters,
            startDate: previousStartDate.toISOString().split('T')[0],
            endDate: previousEndDate.toISOString().split('T')[0],
        }

        const previousMetrics = await this.getOverviewMetrics(previousFilters)

        // Calculate percentage changes
        const calculateChange = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? 100 : 0
            return ((current - previous) / previous) * 100
        }

        const comparison = {
            total_revenue_change: calculateChange(
                parseFloat(currentMetrics.total_revenue),
                parseFloat(previousMetrics.total_revenue)
            ),
            total_sales_change: calculateChange(
                parseInt(currentMetrics.total_sales),
                parseInt(previousMetrics.total_sales)
            ),
            avg_ticket_change: calculateChange(
                parseFloat(currentMetrics.avg_ticket),
                parseFloat(previousMetrics.avg_ticket)
            ),
            avg_production_time_change: calculateChange(
                parseFloat(currentMetrics.avg_production_time),
                parseFloat(previousMetrics.avg_production_time)
            ),
        }

        return {
            current: currentMetrics,
            previous: previousMetrics,
            comparison,
            period: {
                current: {
                    startDate: filters.startDate,
                    endDate: filters.endDate,
                },
                previous: {
                    startDate: previousStartDate.toISOString().split('T')[0],
                    endDate: previousEndDate.toISOString().split('T')[0],
                },
            },
        }
    }
}

export default new AnalyticsService()
