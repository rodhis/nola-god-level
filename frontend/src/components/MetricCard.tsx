import './MetricCard.css'

interface MetricCardProps {
    title: string
    value: string | number
    subtitle?: string
    trend?: {
        value: string
        isPositive: boolean
    }
}

export function MetricCard({ title, value, subtitle, trend }: MetricCardProps) {
    return (
        <div className="metric-card">
            <h3 className="metric-title">{title}</h3>
            <div className="metric-value">{value}</div>
            {subtitle && <div className="metric-subtitle">{subtitle}</div>}
            {trend && (
                <div className={`metric-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                    {trend.isPositive ? '↑' : '↓'} {trend.value}
                </div>
            )}
        </div>
    )
}
