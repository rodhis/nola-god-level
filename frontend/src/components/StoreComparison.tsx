import { Store } from '../interfaces'
import { Chart } from './Chart'
import { ExportButton } from './ExportButton'
import { exportStoresCSV } from '../utils/exportUtils'
import './StoreComparison.css'

interface StoreComparisonProps {
    stores: Store[]
    onClose?: () => void
}

export function StoreComparison({ stores, onClose }: StoreComparisonProps) {
    const formatCurrency = (value: number | undefined) => {
        if (!value) return 'R$ 0,00'
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    const formatNumber = (value: number | undefined) => {
        if (!value) return '0'
        return new Intl.NumberFormat('pt-BR').format(value)
    }

    const formatTime = (seconds: number | undefined) => {
        if (!seconds) return '0 min'
        const minutes = Math.floor(seconds / 60)
        return `${minutes} min`
    }

    const handleExport = () => {
        exportStoresCSV(stores)
    }

    // Prepare data for charts
    const revenueChartData = stores.map((store) => ({
        name: store.name,
        revenue: parseFloat((store.total_revenue || 0).toString()),
    }))

    const ticketChartData = stores.map((store) => ({
        name: store.name,
        ticket: parseFloat((store.avg_ticket || 0).toString()),
    }))

    const salesChartData = stores.map((store) => ({
        name: store.name,
        sales: store.total_sales || 0,
    }))

    return (
        <div className="store-comparison">
            <div className="store-comparison-header">
                <h2>🏪 Comparação de Lojas</h2>
                <div className="header-actions">
                    <ExportButton onClick={handleExport} label="Exportar" variant="secondary" />
                    {onClose && (
                        <button className="close-button" onClick={onClose}>
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Comparison Table */}
            <div className="comparison-table-container">
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Loja</th>
                            <th>Localização</th>
                            <th>Vendas</th>
                            <th>Faturamento</th>
                            <th>Ticket Médio</th>
                            <th>Tempo Preparo</th>
                            <th>Tempo Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store) => (
                            <tr key={store.id}>
                                <td className="store-name">{store.name}</td>
                                <td className="store-location">
                                    {store.city}, {store.state}
                                </td>
                                <td>
                                    <div className="metric-cell">
                                        <div className="metric-main">{formatNumber(store.total_sales)}</div>
                                        <div className="metric-sub">
                                            {formatNumber(store.completed_sales)} completadas
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="metric-cell">
                                        <div className="metric-main">
                                            {formatCurrency(store.total_revenue)}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="metric-cell">
                                        <div className="metric-main">{formatCurrency(store.avg_ticket)}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="metric-cell">
                                        <div className="metric-main">
                                            {formatTime(store.avg_production_time)}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="metric-cell">
                                        <div className="metric-main">
                                            {store.avg_delivery_time && store.avg_delivery_time > 0
                                                ? formatTime(store.avg_delivery_time)
                                                : 'N/A'}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Charts */}
            <div className="comparison-charts">
                <div className="comparison-chart">
                    <Chart
                        data={revenueChartData}
                        type="bar"
                        dataKey="revenue"
                        xAxisKey="name"
                        title="Faturamento por Loja"
                        yAxisLabel="Faturamento (R$)"
                    />
                </div>

                <div className="comparison-chart">
                    <Chart
                        data={ticketChartData}
                        type="bar"
                        dataKey="ticket"
                        xAxisKey="name"
                        title="Ticket Médio por Loja"
                        yAxisLabel="Ticket Médio (R$)"
                    />
                </div>

                <div className="comparison-chart">
                    <Chart
                        data={salesChartData}
                        type="bar"
                        dataKey="sales"
                        xAxisKey="name"
                        title="Total de Vendas por Loja"
                        yAxisLabel="Quantidade de Vendas"
                    />
                </div>
            </div>
        </div>
    )
}
