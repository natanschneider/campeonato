import { useNavigate, useRouterState } from '@tanstack/react-router'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Championship {
    name: string
    id: number
}

const championships: Championship[] = [
    { name: 'Campeonato Brasileiro', id: 30 },
    { name: 'Campeonato Alemão', id: 12 },
    { name: 'Amistosos', id: 13 },
    { name: 'Campeonato Baiano', id: 28 },
    { name: 'Campeonato Carioca', id: 34 },
    { name: 'Campeonato Cearense', id: 36 },
    { name: 'Copa América', id: 39 },
    { name: 'Copa da Alemanha', id: 41 },
    { name: 'Copa da França', id: 42 },
    { name: 'Copa da Inglaterra', id: 43 },
    { name: 'Copa da Itália', id: 44 },
    { name: 'Copa do Brasil', id: 48 },
    { name: 'Copa do Nordeste', id: 55 },
    { name: 'Copa do Rei', id: 56 },
    { name: 'Copa São Paulo de Jr', id: 58 },
    { name: 'Copa Sul-Americana', id: 59 },
    { name: 'Eliminatória Sul-Americana', id: 68 },
    { name: 'Campeonato Espanhol', id: 72 },
    { name: 'Eurocopa', id: 74 },
    { name: 'Campeonato Francês', id: 76 },
    { name: 'Campeonato Gaúcho', id: 77 },
    { name: 'Campeonato Inglês', id: 79 },
    { name: 'Campeonato Italiano', id: 81 },
    { name: 'Copa Libertadores', id: 82 },
    { name: 'Liga dos Campeões da UEFA', id: 83 },
    { name: 'Liga Europa', id: 84 },
    { name: 'Campeonato Mineiro', id: 86 },
    { name: 'Mundial de Clubes', id: 87 },
    { name: 'Campeonato Paranaense', id: 103 },
    { name: 'Campeonato Paulista', id: 104 },
    { name: 'Camp. Paulista Série A-2', id: 105 },
    { name: 'Campeonato Pernambucano', id: 107 },
    { name: 'Recopa Sul-Americana', id: 110 },
    { name: 'Camp. Brasileiro - Série B', id: 112 },
    { name: 'Camp. Brasileiro - Série C', id: 113 },
    { name: 'Camp. Brasileiro - Série D', id: 114 },
    { name: 'Supercopa da Espanha', id: 117 },
    { name: 'Supercopa da Europa', id: 118 },
    { name: 'Supercopa da Inglaterra', id: 119 },
    { name: 'Supercopa da Itália', id: 120 },
]

export function ChampionshipSelect() {
    const navigate = useNavigate()
    const selectedId = useRouterState({
        select: (state) => {
            const championshipId = state.location.search.championshipId
            return typeof championshipId === 'string' ? championshipId : '30'
        },
    })

    const handleChampionshipChange = (value: string) => {
        navigate({
            search: (previous) => ({
                ...previous,
                championshipId: value,
            }),
        })
    }

    return (
        <Select value={selectedId} onValueChange={handleChampionshipChange}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um campeonato" />
            </SelectTrigger>
            <SelectContent className="max-h-75">
                {championships.map((championship) => (
                    <SelectItem
                        key={championship.id}
                        value={String(championship.id)}
                    >
                        {championship.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
