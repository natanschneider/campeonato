import { GetJogos } from "#/repository/GetJogos";
import { createFileRoute } from "@tanstack/react-router";
import JogosPage from "@/pages/JogosPage";

interface Match {
	Time1: string;
	Time2: string;
	placar1: string;
	placar2: string;
	data: string;
	horario: string;
	url: string;
	Brasao1: string;
	Brasao2: string;
}

interface MatchesResponse {
	jogos: Match[];
}

export const Route = createFileRoute("/jogos/$timeId")({
	validateSearch: (search: Record<string, unknown>) => ({
		year: typeof search.year === "string" ? search.year : "2025",
		championshipId:
			typeof search.championshipId === "string" ? search.championshipId : "30",
	}),
	loaderDeps: ({ search }) => ({
		year: search.year,
		championshipId: search.championshipId,
	}),
	loader: async ({ params, deps }) => {
		const data = (await GetJogos(
			params.timeId,
			deps.year,
			deps.championshipId,
		)) as MatchesResponse;
		return data;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <JogosPage data={data} />;
}
