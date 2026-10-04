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

        try {
            const response = await axios.get(
                `http://jsuol.com.br/c/monaco/utils/gestor/commons.js?&file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/${year}/${championshipId}/dados.json`,
            );

            if (!response.data) {
                throw new Error(
                    `Dados nao encontrados`,
                );
            }

            if (
                !Array.isArray(response.data['ordem-fases']) ||
                response.data['ordem-fases'].length === 0
            ) {
                throw new Error(
                    `Dados nao encontrados`,
                );
            }

            return response.data;
        } catch (error) {
            if (
                error instanceof Error &&
                (error.message.startsWith('Dados nao encontrados') ||
                    error.message.startsWith('Dados nao encontrados'))
            ) {
                throw error;
            }

            if (axios.isAxiosError(error) && error.response?.status === 404) {
                throw new Error(
                    `Dados nao encontrados`,
                    { cause: error },
                );
            }

            throw new Error('Unable to retrieve championship data.', { cause: error });
        }
    },
);

export default CallApi;
