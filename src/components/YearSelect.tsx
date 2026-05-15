import { useNavigate, useRouterState } from '@tanstack/react-router'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function YearSelect() {
    const navigate = useNavigate()
    const selectedYear = useRouterState({
        select: (state) => {
            const year = state.location.search.year
            return typeof year === 'string' ? year : '2025'
        },
    })

    const currentYear = 2026
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i).sort(
        (a, b) => a - b,
    )

    const handleYearChange = (value: string) => {
        navigate({
            search: (previous) => ({
                ...previous,
                year: value,
            }),
        })
    }

    return (
        <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Selecione um ano" />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
