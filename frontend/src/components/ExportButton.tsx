import './ExportButton.css'

interface ExportButtonProps {
    onClick: () => void
    label?: string
    disabled?: boolean
    variant?: 'primary' | 'secondary'
}

export function ExportButton({ onClick, label = 'Exportar CSV', disabled = false, variant = 'secondary' }: ExportButtonProps) {
    return (
        <button className={`export-button export-button-${variant}`} onClick={onClick} disabled={disabled} title={label}>
            <span className="export-icon">📥</span>
            <span className="export-label">{label}</span>
        </button>
    )
}
