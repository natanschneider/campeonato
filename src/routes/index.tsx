import { createFileRoute } from "@tanstack/react-router";
import GetClassificacao from "@/repository/GetClassificacao";
import type { Classificacao } from "@/types/Classificacao";
import TeamsTable from "@/pages/TeamsTable";

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>) => ({
		year: typeof search.year === "string" ? search.year : "2025",
		championshipId:
			typeof search.championshipId === "string" ? search.championshipId : "30",
	}),
	loaderDeps: ({ search }) => ({
		year: search.year,
		championshipId: search.championshipId,
	}),
	loader: async ({ deps }) => {
		const data = (await GetClassificacao(
			deps.year,
			deps.championshipId,
		)) as Classificacao;
		return { data };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	return <TeamsTable data={data} />;
}
