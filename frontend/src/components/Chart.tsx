import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import './Chart.css'

interface ChartProps {
    data: any[]
    type: 'line' | 'bar' | 'pie'
    dataKey: string
    xAxisKey?: string
    title: string
    yAxisLabel?: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D']

export function Chart({ data, type, dataKey, xAxisKey, title, yAxisLabel }: ChartProps) {
    const renderChart = () => {
        if (type === 'line') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisKey} />
                        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                        <Tooltip
                            formatter={(value: any) => {
                                if (typeof value === 'number') {
                                    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                                }
                                return value
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={dataKey} stroke="#0088FE" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            )
        }

        if (type === 'bar') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xAxisKey} />
                        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                        <Tooltip
                            formatter={(value: any) => {
                                if (typeof value === 'number') {
                                    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                                }
                                return value
                            }}
                        />
                        <Legend />
                        <Bar dataKey={dataKey} fill="#0088FE" />
                    </BarChart>
                </ResponsiveContainer>
            )
        }

        return (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        nameKey={xAxisKey}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => entry[xAxisKey || 'name']}
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: any) => {
                            if (typeof value === 'number') {
                                return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            }
                            return value
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        )
    }

    return (
        <div className="chart-container">
            <h3 className="chart-title">{title}</h3>
            {renderChart()}
        </div>
    )
}
