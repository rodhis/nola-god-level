export function convertToCSV(data: any[], headers?: string[]): string {
    if (!data || data.length === 0) {
        return ''
    }

    const csvHeaders = headers || Object.keys(data[0])
    const headerRow = csvHeaders.join(',')

    const dataRows = data.map((row) => {
        return csvHeaders
            .map((header) => {
                const value = row[header]
                if (value === null || value === undefined) {
                    return ''
                }
                const stringValue = String(value)
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`
                }
                return stringValue
            })
            .join(',')
    })

    return [headerRow, ...dataRows].join('\n')
}

export function downloadCSV(csvContent: string, filename: string): void {
    // Add BOM for proper UTF-8 encoding (Excel compatibility)
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
}

export function getFormattedDate(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}${month}${day}_${hours}${minutes}`
}

export function exportProductsCSV(products: any[]): void {
    const headers = ['id', 'name', 'category', 'total_quantity', 'total_revenue', 'times_sold']
    const csvContent = convertToCSV(products, headers)
    const filename = `produtos_mais_vendidos_${getFormattedDate()}.csv`
    downloadCSV(csvContent, filename)
}

export function exportChannelsCSV(channels: any[]): void {
    const headers = ['id', 'name', 'type', 'total_sales', 'total_revenue', 'avg_ticket']
    const csvContent = convertToCSV(channels, headers)
    const filename = `vendas_por_canal_${getFormattedDate()}.csv`
    downloadCSV(csvContent, filename)
}

export function exportStoresCSV(stores: any[]): void {
    const headers = [
        'id',
        'name',
        'city',
        'state',
        'total_sales',
        'completed_sales',
        'cancelled_sales',
        'total_revenue',
        'avg_ticket',
        'avg_production_time',
        'avg_delivery_time',
    ]
    const csvContent = convertToCSV(stores, headers)
    const filename = `comparacao_lojas_${getFormattedDate()}.csv`
    downloadCSV(csvContent, filename)
}

export function exportTimeSeriesCSV(timeSeries: any[]): void {
    const headers = ['date', 'sales_count', 'revenue', 'avg_ticket']
    const csvContent = convertToCSV(timeSeries, headers)
    const filename = `serie_temporal_${getFormattedDate()}.csv`
    downloadCSV(csvContent, filename)
}

export function exportOverviewCSV(overview: any, period?: { startDate: string; endDate: string }): void {
    const data = [
        {
            metric: 'Total de Vendas',
            value: overview.total_sales,
        },
        {
            metric: 'Vendas Completadas',
            value: overview.completed_sales,
        },
        {
            metric: 'Vendas Canceladas',
            value: overview.cancelled_sales,
        },
        {
            metric: 'Faturamento Total (R$)',
            value: overview.total_revenue,
        },
        {
            metric: 'Ticket Médio (R$)',
            value: overview.avg_ticket,
        },
        {
            metric: 'Tempo Médio de Preparo (segundos)',
            value: overview.avg_production_time,
        },
        {
            metric: 'Tempo Médio de Entrega (segundos)',
            value: overview.avg_delivery_time || 'N/A',
        },
    ]

    if (period) {
        data.unshift({
            metric: 'Período',
            value: `${period.startDate} a ${period.endDate}`,
        })
    }

    const csvContent = convertToCSV(data, ['metric', 'value'])
    const filename = `metricas_gerais_${getFormattedDate()}.csv`
    downloadCSV(csvContent, filename)
}

export function exportCompleteReportCSV(
    overview: any,
    products: any[],
    channels: any[],
    period?: { startDate: string; endDate: string }
): void {
    let csvContent = '# RELATÓRIO COMPLETO DO DASHBOARD\n'

    if (period) {
        csvContent += `# Período: ${period.startDate} a ${period.endDate}\n\n`
    }

    // Overview section
    csvContent += '## MÉTRICAS GERAIS\n'
    csvContent += 'Métrica,Valor\n'
    csvContent += `Total de Vendas,${overview.total_sales}\n`
    csvContent += `Vendas Completadas,${overview.completed_sales}\n`
    csvContent += `Vendas Canceladas,${overview.cancelled_sales}\n`
    csvContent += `Faturamento Total (R$),${overview.total_revenue}\n`
    csvContent += `Ticket Médio (R$),${overview.avg_ticket}\n`
    csvContent += `Tempo Médio de Preparo (seg),${overview.avg_production_time}\n`
    csvContent += `Tempo Médio de Entrega (seg),${overview.avg_delivery_time || 'N/A'}\n\n`

    // Products section
    if (products && products.length > 0) {
        csvContent += '## PRODUTOS MAIS VENDIDOS\n'
        csvContent += convertToCSV(products, ['id', 'name', 'category', 'total_quantity', 'total_revenue', 'times_sold'])
        csvContent += '\n\n'
    }

    // Channels section
    if (channels && channels.length > 0) {
        csvContent += '## VENDAS POR CANAL\n'
        csvContent += convertToCSV(channels, ['id', 'name', 'type', 'total_sales', 'total_revenue', 'avg_ticket'])
        csvContent += '\n'
    }

    const filename = `relatorio_completo_${getFormattedDate()}.csv`
    downloadCSV(csvContent, filename)
}
