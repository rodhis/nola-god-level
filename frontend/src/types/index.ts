export interface OverviewMetrics {
    total_sales: number
    completed_sales: number
    cancelled_sales: number
    total_revenue: number
    avg_ticket: number
    avg_production_time: number
    avg_delivery_time: number
}

export interface Product {
    id: number
    name: string
    category: string
    total_quantity: number
    total_revenue: number
    times_sold: number
}

export interface Channel {
    id: number
    name: string
    type: string
    total_sales: number
    total_revenue: number
    avg_ticket: number
}

export interface Store {
    id: number
    name: string
    city: string
    state: string
    total_sales?: number
    total_revenue?: number
    avg_ticket?: number
}

export interface TimeSeriesData {
    date: string
    sales_count: number
    revenue: number
    avg_ticket: number
}

export interface HourlyData {
    hour: number
    sales_count: number
    revenue: number
}

export interface WeekdayData {
    day_of_week: number
    sales_count: number
    revenue: number
    avg_ticket: number
}

export interface Customization {
    id: number
    name: string
    times_added: number
    revenue_generated: number
}

export interface Filters {
    startDate?: string
    endDate?: string
    storeId?: number
    channelId?: number
}
