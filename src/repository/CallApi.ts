import axios from 'axios';
import { createServerFn } from '@tanstack/react-start';

const CallApi = createServerFn({ method: 'GET', strict: false }).handler(async () => {
    const response = await axios.get('http://jsuol.com.br/c/monaco/utils/gestor/commons.js?&file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/2025/30/dados.json');

    return response.data;
});

export default CallApi;
