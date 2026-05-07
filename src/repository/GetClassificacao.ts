import CallApi from "./CallApi";

export default async function GetClassificacao() {
    const api = await CallApi();

    const fase = api["ordem-fases"][0];

    const classificacao = api.fases[fase].classificacao.grupo["Único"];
    const equipes = api.equipes;
    const pontos = api.fases[fase].classificacao.equipe;

    const arrJogos = api.fases[fase].jogos.id;

    const arr: Array<Record<string, any>> = [];
    let pos = 0;

    const RodadaAtual = Number(api.fases[fase].rodada.atual);
    const numRodadas = RodadaAtual - 5;

    for (const value of classificacao) {
        const equipe = equipes[value] ?? {};
        const ponto = pontos[value] ?? {};

        arr[pos] = {
            id: equipe.id,
            nome: equipe["nome-comum"],
            Pts: ponto?.pg?.total,
            PJ: ponto?.j?.total,
            VIT: ponto?.v?.total,
            E: ponto?.e?.total,
            DER: ponto?.d?.total,
            GP: ponto?.gp?.total,
            GC: ponto?.gc?.total,
            SG: ponto?.sg?.total,
            Jogos: [] as string[],
            brasao: equipe.brasao,
        };

        for (let x = RodadaAtual; x >= numRodadas; x--) {
            const idJogos: Array<any> = api.fases[fase].jogos["rodada"][x] ?? [];
            for (const val of idJogos) {
                const jogo = arrJogos[val] ?? {};
                const id_time1 = Number(jogo.time1);
                const id_time2 = Number(jogo.time2);

                const placar1Raw = jogo.placar1;
                const placar2Raw = jogo.placar2;

                if (placar1Raw != null && placar2Raw != null) {
                    const placar1 = Number(placar1Raw);
                    const placar2 = Number(placar2Raw);

                    if (id_time1 === Number(value)) {
                        if (placar1 > placar2) arr[pos].Jogos.push("V");
                        else if (placar1 < placar2) arr[pos].Jogos.push("D");
                        else arr[pos].Jogos.push("E");
                    } else if (id_time2 === Number(value)) {
                        if (placar1 < placar2) arr[pos].Jogos.push("V");
                        else if (placar1 > placar2) arr[pos].Jogos.push("D");
                        else arr[pos].Jogos.push("E");
                    }

                    if (arr[pos].Jogos.length > 5) {
                        arr[pos].Jogos.splice(5);
                    }
                }
            }
        }

        pos++;
    }

    return arr;
}
