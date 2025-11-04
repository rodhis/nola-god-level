import { useState, useEffect } from 'react'
import { FilterBar } from './FilterBar'
import { MetricCard } from './MetricCard'
import { Chart } from './Chart'
import { StoreComparison } from './StoreComparison'
import { ExportButton } from './ExportButton'
import { analyticsApi } from '../services/api'
import { exportProductsCSV, exportCompleteReportCSV } from '../utils/exportUtils'
import { Filters, OverviewMetrics, Product, Channel, Store, TimeSeriesData, HourlyData, WeekdayData } from '../interfaces'
import './Dashboard.css'

const WEEKDAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function Dashboard() {
    const [filters, setFilters] = useState<Filters>({})
    const [loading, setLoading] = useState(false)
    const [overview, setOverview] = useState<OverviewMetrics | null>(null)
    const [comparison, setComparison] = useState<{
        total_revenue_change: number
        total_sales_change: number
        avg_ticket_change: number
        avg_production_time_change: number
    } | null>(null)
    const [comparisonPeriod, setComparisonPeriod] = useState<{
        current: { startDate: string; endDate: string }
        previous: { startDate: string; endDate: string }
    } | null>(null)
    const [topProducts, setTopProducts] = useState<Product[]>([])
    const [channels, setChannels] = useState<Channel[]>([])
    const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([])
    const [hourlyData, setHourlyData] = useState<HourlyData[]>([])
    const [weekdayData, setWeekdayData] = useState<WeekdayData[]>([])
    const [comparedStores, setComparedStores] = useState<Store[]>([])
    const [showStoreComparison, setShowStoreComparison] = useState(false)

    useEffect(() => {
        loadDashboardData()
    }, [filters])

    const loadDashboardData = async () => {
        setLoading(true)
        try {
            const [overviewDataWithComparison, productsData, channelsData, timeSeriesData, hourlyDataRes, weekdayDataRes] =
                await Promise.all([
                    analyticsApi.getOverviewWithComparison(filters),
                    analyticsApi.getTopProducts(filters, 10),
                    analyticsApi.getSalesByChannel(filters),
                    analyticsApi.getSalesTimeSeries(filters),
                    analyticsApi.getSalesByHour(filters),
                    analyticsApi.getSalesByWeekday(filters),
                ])

            setOverview(overviewDataWithComparison.current)
            setComparison(overviewDataWithComparison.comparison)
            setComparisonPeriod(overviewDataWithComparison.period)
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

    const formatPercentage = (value: number) => {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    const getComparisonPeriodText = () => {
        if (!comparisonPeriod) return null
        return `${formatDate(comparisonPeriod.previous.startDate)} a ${formatDate(comparisonPeriod.previous.endDate)}`
    }

    const getTrend = (changeValue: number | undefined) => {
        if (changeValue === undefined || changeValue === null) return undefined
        return {
            value: formatPercentage(changeValue),
            isPositive: changeValue >= 0,
        }
    }

    const handleCompareStores = async (storeIds: number[]) => {
        try {
            setLoading(true)
            const stores = await analyticsApi.compareStores(filters, storeIds)
            setComparedStores(stores)
            setShowStoreComparison(true)
        } catch (error) {
            console.error('Error comparing stores:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseComparison = () => {
        setShowStoreComparison(false)
        setComparedStores([])
    }

    const handleExportProducts = () => {
        exportProductsCSV(topProducts)
    }

    const handleExportCompleteReport = () => {
        if (overview) {
            exportCompleteReportCSV(overview, topProducts, channels, comparisonPeriod?.current)
        }
    }

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
                <div className="header-content">
                    <div>
                        <h1>📊 Dashboard da Cozinha de Dona Maria</h1>
                        <p>Análise de dados operacionais e vendas</p>
                    </div>
                    {!showStoreComparison && overview && (
                        <ExportButton
                            onClick={handleExportCompleteReport}
                            label="Exportar Relatório Completo"
                            variant="primary"
                        />
                    )}
                </div>
            </header>

            <div className="dashboard-container">
                <aside className="sidebar">
                    <FilterBar onFilterChange={setFilters} onCompareStores={handleCompareStores} />
                </aside>

                <main className="dashboard-content">
                    {loading && <div className="loading">Carregando dados...</div>}

                    {/* Store Comparison View */}
                    {showStoreComparison && comparedStores.length > 0 && (
                        <StoreComparison stores={comparedStores} onClose={handleCloseComparison} />
                    )}

                    {!loading && overview && !showStoreComparison && (
                        <>
                            {/* Comparison Period Indicator */}
                            {comparisonPeriod && comparison && (
                                <div className="comparison-period-banner">
                                    <span className="comparison-icon">📊</span>
                                    <span className="comparison-text">
                                        Comparando com o período: <strong>{getComparisonPeriodText()}</strong>
                                    </span>
                                </div>
                            )}

                            {/* Overview Metrics */}
                            <section className="metrics-grid">
                                <MetricCard
                                    title="Faturamento Total"
                                    value={formatCurrency(parseFloat(overview.total_revenue.toString()))}
                                    subtitle={`${formatNumber(overview.completed_sales)} vendas completadas`}
                                    trend={getTrend(comparison?.total_revenue_change)}
                                />
                                <MetricCard
                                    title="Ticket Médio"
                                    value={formatCurrency(parseFloat(overview.avg_ticket.toString()))}
                                    subtitle="Por venda completa"
                                    trend={getTrend(comparison?.avg_ticket_change)}
                                />
                                <MetricCard
                                    title="Total de Vendas"
                                    value={formatNumber(overview.total_sales)}
                                    subtitle={`${overview.cancelled_sales} canceladas`}
                                    trend={getTrend(comparison?.total_sales_change)}
                                />
                                <MetricCard
                                    title="Tempo Médio de Preparo"
                                    value={formatTime(parseFloat(overview.avg_production_time.toString()))}
                                    subtitle={
                                        overview.avg_delivery_time
                                            ? `Entrega: ${formatTime(parseFloat(overview.avg_delivery_time.toString()))}`
                                            : undefined
                                    }
                                    trend={getTrend(comparison?.avg_production_time_change)}
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
                                    <div className="table-header">
                                        <h2>Produtos Mais Vendidos</h2>
                                        <ExportButton onClick={handleExportProducts} label="Exportar" />
                                    </div>
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
