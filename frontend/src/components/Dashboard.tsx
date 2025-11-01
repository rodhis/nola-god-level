import { useState, useEffect } from 'react'
import { FilterBar } from './FilterBar'
import { MetricCard } from './MetricCard'
import { Chart } from './Chart'
import { analyticsApi } from '../services/api'
import { Filters, OverviewMetrics, Product, Channel, TimeSeriesData, HourlyData, WeekdayData } from '../types'
import './Dashboard.css'

const WEEKDAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function Dashboard() {
    const [filters, setFilters] = useState<Filters>({})
    const [loading, setLoading] = useState(false)
    const [overview, setOverview] = useState<OverviewMetrics | null>(null)
    const [topProducts, setTopProducts] = useState<Product[]>([])
    const [channels, setChannels] = useState<Channel[]>([])
    const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([])
    const [hourlyData, setHourlyData] = useState<HourlyData[]>([])
    const [weekdayData, setWeekdayData] = useState<WeekdayData[]>([])

    useEffect(() => {
        loadDashboardData()
    }, [filters])

    const loadDashboardData = async () => {
        setLoading(true)
        try {
            const [overviewData, productsData, channelsData, timeSeriesData, hourlyDataRes, weekdayDataRes] = await Promise.all([
                analyticsApi.getOverview(filters),
                analyticsApi.getTopProducts(filters, 10),
                analyticsApi.getSalesByChannel(filters),
                analyticsApi.getSalesTimeSeries(filters),
                analyticsApi.getSalesByHour(filters),
                analyticsApi.getSalesByWeekday(filters),
            ])

            setOverview(overviewData)
            setTopProducts(productsData)
            setChannels(channelsData)
            setTimeSeries(timeSeriesData)
            setHourlyData(hourlyDataRes)
            setWeekdayData(weekdayDataRes)
        } catch (error) {
            console.error('Error loading dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(value)
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        return `${minutes} min`
    }

    // Process data for charts
    const timeSeriesChartData = timeSeries.map((d) => ({
        ...d,
        date: new Date(d.date).toLocaleDateString('pt-BR'),
        revenue: parseFloat(d.revenue.toString()),
    }))

    const hourlyChartData = hourlyData.map((d) => ({
        hour: `${d.hour}h`,
        sales_count: d.sales_count,
    }))

    const weekdayChartData = weekdayData.map((d) => ({
        day: WEEKDAY_NAMES[parseInt(d.day_of_week.toString())],
        revenue: parseFloat(d.revenue.toString()),
    }))

    const channelsChartData = channels.map((c) => ({
        name: c.name,
        revenue: parseFloat(c.total_revenue.toString()),
    }))

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>📊 Analytics Restaurante</h1>
                <p>Análise de dados operacionais e vendas</p>
            </header>

            <div className="dashboard-container">
                <aside className="sidebar">
                    <FilterBar onFilterChange={setFilters} />
                </aside>

                <main className="dashboard-content">
                    {loading && <div className="loading">Carregando dados...</div>}

                    {!loading && overview && (
                        <>
                            {/* Overview Metrics */}
                            <section className="metrics-grid">
                                <MetricCard
                                    title="Faturamento Total"
                                    value={formatCurrency(parseFloat(overview.total_revenue.toString()))}
                                    subtitle={`${formatNumber(overview.completed_sales)} vendas completadas`}
                                />
                                <MetricCard
                                    title="Ticket Médio"
                                    value={formatCurrency(parseFloat(overview.avg_ticket.toString()))}
                                    subtitle="Por venda completa"
                                />
                                <MetricCard
                                    title="Total de Vendas"
                                    value={formatNumber(overview.total_sales)}
                                    subtitle={`${overview.cancelled_sales} canceladas`}
                                />
                                <MetricCard
                                    title="Tempo Médio de Preparo"
                                    value={formatTime(parseFloat(overview.avg_production_time.toString()))}
                                    subtitle={
                                        overview.avg_delivery_time
                                            ? `Entrega: ${formatTime(parseFloat(overview.avg_delivery_time.toString()))}`
                                            : undefined
                                    }
                                />
                            </section>

                            {/* Time Series Chart */}
                            {timeSeries.length > 0 && (
                                <section className="chart-section">
                                    <Chart
                                        data={timeSeriesChartData}
                                        type="line"
                                        dataKey="revenue"
                                        xAxisKey="date"
                                        title="Faturamento ao Longo do Tempo"
                                        yAxisLabel="Faturamento (R$)"
                                    />
                                </section>
                            )}

                            {/* Channels Distribution */}
                            {channels.length > 0 && (
                                <section className="chart-section">
                                    <Chart
                                        data={channelsChartData}
                                        type="pie"
                                        dataKey="revenue"
                                        xAxisKey="name"
                                        title="Distribuição de Faturamento por Canal"
                                    />
                                </section>
                            )}

                            {/* Sales by Hour */}
                            {hourlyData.length > 0 && (
                                <section className="chart-section">
                                    <Chart
                                        data={hourlyChartData}
                                        type="bar"
                                        dataKey="sales_count"
                                        xAxisKey="hour"
                                        title="Vendas por Hora do Dia"
                                        yAxisLabel="Quantidade de Vendas"
                                    />
                                </section>
                            )}

                            {/* Sales by Weekday */}
                            {weekdayData.length > 0 && (
                                <section className="chart-section">
                                    <Chart
                                        data={weekdayChartData}
                                        type="bar"
                                        dataKey="revenue"
                                        xAxisKey="day"
                                        title="Faturamento por Dia da Semana"
                                        yAxisLabel="Faturamento (R$)"
                                    />
                                </section>
                            )}

                            {/* Top Products Table */}
                            {topProducts.length > 0 && (
                                <section className="table-section">
                                    <h2>Produtos Mais Vendidos</h2>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Produto</th>
                                                <th>Categoria</th>
                                                <th>Quantidade</th>
                                                <th>Faturamento</th>
                                                <th>Vezes Vendido</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topProducts.map((product) => (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.category || 'N/A'}</td>
                                                    <td>{formatNumber(product.total_quantity)}</td>
                                                    <td>{formatCurrency(parseFloat(product.total_revenue.toString()))}</td>
                                                    <td>{formatNumber(product.times_sold)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </section>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}
