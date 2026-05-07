import { GetJogos } from '#/repository/GetJogos'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Clock, MapPin } from 'lucide-react'

interface Match {
    Time1: string
    Time2: string
    placar1: string
    placar2: string
    data: string
    horario: string
    url: string
    Brasao1: string
    Brasao2: string
}

interface MatchesResponse {
    jogos: Match[]
}

export const Route = createFileRoute('/jogos/$timeId')({
    loader: async ({ params }) => {
        const data = (await GetJogos(params.timeId)) as MatchesResponse
        return data
    },
    component: Jogos,
})

function Jogos() {
    const data = Route.useLoaderData()
    const getStatusBadge = (placar1: string, placar2: string) => {
        const score1 = parseInt(placar1)
        const score2 = parseInt(placar2)

        if (score1 > score2) return 'Vitória'
        if (score1 < score2) return 'Perca'
        return 'Empate'
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('pt-BR', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Jogos
                    </h1>
                    <p className="text-slate-600">
                        {data.jogos.length} jogos encontrados
                    </p>
                </div>

                <div className="space-y-4">
                    {data.jogos.map((match, index) => {
                        const status = getStatusBadge(
                            match.placar1,
                            match.placar2,
                        )

                        return (
                            <Card
                                key={index}
                                className="hover:shadow-md transition-shadow duration-200"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Badge
                                                variant="outline"
                                                className="mb-2"
                                            >
                                                {status}
                                            </Badge>
                                            <CardDescription className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {formatDate(match.data)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {match.horario}
                                                </span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center justify-between gap-6">
                                        <div className="flex items-center gap-3 flex-1">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage
                                                    src={match.Brasao1}
                                                    alt={match.Time1}
                                                />
                                                <AvatarFallback>
                                                    {match.Time1.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="font-medium text-sm truncate">
                                                    {match.Time1}
                                                </p>
                                            </div>
                                            <p className="text-3xl font-bold ml-auto">
                                                {match.placar1}
                                            </p>
                                        </div>

                                        <div>-</div>

                                        <div className="flex items-center gap-3 flex-1 justify-end">
                                            <p className="text-3xl font-bold">
                                                {match.placar2}
                                            </p>
                                            <div className="min-w-0 text-right">
                                                <p className="font-medium text-sm truncate">
                                                    {match.Time2}
                                                </p>
                                            </div>
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage
                                                    src={match.Brasao2}
                                                    alt={match.Time2}
                                                />
                                                <AvatarFallback>
                                                    {match.Time2.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {data.jogos.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-slate-600">Nenhum jogo encontrado</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
