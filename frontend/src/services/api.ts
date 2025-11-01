import {
    Filters,
    OverviewMetrics,
    Product,
    Channel,
    Store,
    TimeSeriesData,
    HourlyData,
    WeekdayData,
    Customization,
} from '../interfaces'

/**
 * API Service - Handles all HTTP requests to the backend
 * Routes are proxied through Vite dev server to /api
 */

export const analyticsApi = {
    async getOverview(filters: Filters): Promise<OverviewMetrics> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        if (filters.storeId) params.append('storeId', filters.storeId.toString())
        if (filters.channelId) params.append('channelId', filters.channelId.toString())

        const response = await fetch(`/api/analytics/overview?${params}`)
        if (!response.ok) throw new Error('Failed to fetch overview')
        return response.json()
    },

    async getTopProducts(filters: Filters, limit = 10): Promise<Product[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        if (filters.storeId) params.append('storeId', filters.storeId.toString())
        if (filters.channelId) params.append('channelId', filters.channelId.toString())
        params.append('limit', limit.toString())

        const response = await fetch(`/api/analytics/products/top?${params}`)
        if (!response.ok) throw new Error('Failed to fetch top products')
        return response.json()
    },

    async getSalesByChannel(filters: Filters): Promise<Channel[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)

        const response = await fetch(`/api/analytics/channels?${params}`)
        if (!response.ok) throw new Error('Failed to fetch sales by channel')
        return response.json()
    },

    async getSalesTimeSeries(filters: Filters): Promise<TimeSeriesData[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        if (filters.storeId) params.append('storeId', filters.storeId.toString())
        if (filters.channelId) params.append('channelId', filters.channelId.toString())

        const response = await fetch(`/api/analytics/time-series?${params}`)
        if (!response.ok) throw new Error('Failed to fetch time series')
        return response.json()
    },

    async getSalesByHour(filters: Filters): Promise<HourlyData[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        if (filters.storeId) params.append('storeId', filters.storeId.toString())
        if (filters.channelId) params.append('channelId', filters.channelId.toString())

        const response = await fetch(`/api/analytics/sales-by-hour?${params}`)
        if (!response.ok) throw new Error('Failed to fetch sales by hour')
        return response.json()
    },

    async getSalesByWeekday(filters: Filters): Promise<WeekdayData[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        if (filters.storeId) params.append('storeId', filters.storeId.toString())
        if (filters.channelId) params.append('channelId', filters.channelId.toString())

        const response = await fetch(`/api/analytics/sales-by-weekday?${params}`)
        if (!response.ok) throw new Error('Failed to fetch sales by weekday')
        return response.json()
    },

    async getTopStores(filters: Filters, limit = 10): Promise<Store[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        params.append('limit', limit.toString())

        const response = await fetch(`/api/analytics/stores/top?${params}`)
        if (!response.ok) throw new Error('Failed to fetch top stores')
        return response.json()
    },

    async getTopCustomizations(filters: Filters, limit = 10): Promise<Customization[]> {
        const params = new URLSearchParams()
        if (filters.startDate) params.append('startDate', filters.startDate)
        if (filters.endDate) params.append('endDate', filters.endDate)
        if (filters.storeId) params.append('storeId', filters.storeId.toString())
        if (filters.channelId) params.append('channelId', filters.channelId.toString())
        params.append('limit', limit.toString())

        const response = await fetch(`/api/analytics/customizations/top?${params}`)
        if (!response.ok) throw new Error('Failed to fetch top customizations')
        return response.json()
    },
}

export const filtersApi = {
    async getStores(): Promise<Store[]> {
        const response = await fetch(`/api/filters/stores`)
        if (!response.ok) throw new Error('Failed to fetch stores')
        return response.json()
    },

    async getChannels(): Promise<Channel[]> {
        const response = await fetch(`/api/filters/channels`)
        if (!response.ok) throw new Error('Failed to fetch channels')
        return response.json()
    },

    async getDateRange(): Promise<{ min_date: string; max_date: string }> {
        const response = await fetch(`/api/filters/date-range`)
        if (!response.ok) throw new Error('Failed to fetch date range')
        return response.json()
    },
}
