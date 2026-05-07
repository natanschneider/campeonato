import CallApi from "./CallApi";

type Jogo = {
    time1: string;
    time2: string;
    placar1?: number | string;
    placar2?: number | string;
    data?: string;
    horario?: string;
    'url-posjogo'?: string;
    [key: string]: any;
};

export async function GetJogos(timeParam: string) {
    console.log(timeParam);
    const api = await CallApi();
    const fase = api["ordem-fases"][0];
    const time = timeParam;
    const arrJogos: Jogo[] = api.fases[fase].jogos.id;
    const equipe = api.equipes;
    const jogos: {
        Equipe?: string;
        jogos?: Array<{
            Time1?: string;
            Time2?: string;
            placar1?: number | string;
            placar2?: number | string;
            data?: string;
            horario?: string;
            url?: string;
            Brasao1?: string;
            Brasao2?: string;
        }>;
    } = { jogos: [] };

    let pos = 0;

    for (const value of arrJogos) {
        const time1 = value.time1;
        const time2 = value.time2;

        jogos.Equipe = equipe[time]?.['nome-comum'];

        if (time1 === time || time2 === time) {
            const entry = {
                Time1: equipe[time1]?.['nome-comum'],
                Time2: equipe[time2]?.['nome-comum'],
                placar1: value.placar1,
                placar2: value.placar2,
                data: value.data,
                horario: value.horario,
                url: value['url-posjogo'],
                Brasao1: equipe[time1]?.brasao,
                Brasao2: equipe[time2]?.brasao,
            };

            jogos.jogos![pos++] = entry;
        }
    }

    return jogos;
}