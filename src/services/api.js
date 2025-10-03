import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const gravarPartida = async (partida) => {
  const response = await axios.post(`${API_URL}/Gravar`, partida);
  return response.data;
};

export const historicoPartidas = async () => {
  const response = await axios.get(`${API_URL}/HistoricoPartidas`);
  return response.data;
};

export const melhoresEstrategias = async () => {
  const response = await axios.get(`${API_URL}/MelhoresEstrategias`);
  return response.data;
};

export const ultimosVencedores = async () => {
  const response = await axios.get(`${API_URL}/UltimosVencedores`);
  return response.data;
};

export const fetchRanking = async () => {
  try {
    const res = await axios.get(`${API_URL}/RankingVencedores`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Erro ao buscar ranking:", err);
    return [];
  }
};

export const gravarLog = async (log) => {
  const response = await axios.post(`${API_URL}/Logs`, log);
  return response.data;
};