import { useState, useEffect } from 'react'
import { Store, Channel } from '../interfaces'
import { filtersApi } from '../services/api'
import './FilterBar.css'

interface FilterBarProps {
    onFilterChange: (filters: { startDate?: string; endDate?: string; storeId?: number; channelId?: number }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
    const [stores, setStores] = useState<Store[]>([])
    const [channels, setChannels] = useState<Channel[]>([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [storeId, setStoreId] = useState<number | undefined>()
    const [channelId, setChannelId] = useState<number | undefined>()

    useEffect(() => {
        loadFilterOptions()
    }, [])

    useEffect(() => {
        onFilterChange({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            storeId,
            channelId,
        })
    }, [startDate, endDate, storeId, channelId])

    const loadFilterOptions = async () => {
        try {
            const [storesData, channelsData, dateRange] = await Promise.all([
                filtersApi.getStores(),
                filtersApi.getChannels(),
                filtersApi.getDateRange(),
            ])

            setStores(storesData)
            setChannels(channelsData)

            // Set default date range to last 30 days
            if (dateRange.max_date) {
                const maxDate = new Date(dateRange.max_date)
                const minDate = new Date(maxDate)
                minDate.setDate(minDate.getDate() - 30)

                setEndDate(maxDate.toISOString().split('T')[0])
                setStartDate(minDate.toISOString().split('T')[0])
            }
        } catch (error) {
            console.error('Error loading filter options:', error)
        }
    }

    const handleReset = () => {
        setStartDate('')
        setEndDate('')
        setStoreId(undefined)
        setChannelId(undefined)
    }

    return (
        <div className="filter-bar">
            <h2>Filtros</h2>

            <div className="filter-group">
                <label>Data Inicial</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="filter-group">
                <label>Data Final</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="filter-group">
                <label>Loja</label>
                <select value={storeId || ''} onChange={(e) => setStoreId(e.target.value ? parseInt(e.target.value) : undefined)}>
                    <option value="">Todas as lojas</option>
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.name} - {store.city}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Canal</label>
                <select
                    value={channelId || ''}
                    onChange={(e) => setChannelId(e.target.value ? parseInt(e.target.value) : undefined)}
                >
                    <option value="">Todos os canais</option>
                    {channels.map((channel) => (
                        <option key={channel.id} value={channel.id}>
                            {channel.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleReset} className="reset-button">
                Limpar Filtros
            </button>
        </div>
    )
}
