import axios from 'axios';
import { createServerFn } from '@tanstack/react-start';

const DEFAULT_YEAR = '2025';
const DEFAULT_CHAMPIONSHIP_ID = '30';

const CallApi = createServerFn({ method: 'GET', strict: false }).handler(
    async ({ data }) => {
        const year =
            typeof data?.year === 'string' && /^\d{4}$/.test(data.year)
                ? data.year
                : DEFAULT_YEAR;
        const championshipId =
            typeof data?.championshipId === 'string' &&
            /^\d+$/.test(data.championshipId)
                ? data.championshipId
                : DEFAULT_CHAMPIONSHIP_ID;

        const response = await axios.get(
            `http://jsuol.com.br/c/monaco/utils/gestor/commons.js?&file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/${year}/${championshipId}/dados.json`,
        );

        return response.data;
    },
);

export default CallApi;
