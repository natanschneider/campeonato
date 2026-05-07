import axios from 'axios';

export default async function CallApi() {
    const response = await axios.get('http://jsuol.com.br/c/monaco/utils/gestor/commons.js?&file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/2025/30/dados.json');

    return response.data;
}
