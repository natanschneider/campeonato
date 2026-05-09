import { createFileRoute } from "@tanstack/react-router";
import GetClassificacao from "@/repository/GetClassificacao";
import type { Classificacao } from "@/types/Classificacao";
import TeamsTable from "@/pages/TeamsTable";

export const Route = createFileRoute("/")({
	loader: async () => {
		const data = (await GetClassificacao()) as Classificacao;
		return { data };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	return <TeamsTable data={data} />;
}
