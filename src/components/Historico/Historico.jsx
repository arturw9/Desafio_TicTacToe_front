import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { historicoPartidas } from '../../services/api';
import './Historico.css';
import { useNavigate } from "react-router-dom";

const Historico = forwardRef((props, ref) => {
  const [historico, setHistorico] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const navigate = useNavigate();

  const carregarHistorico = () => {
    historicoPartidas().then(data => setHistorico(data));
  };

  useImperativeHandle(ref, () => ({
    carregarHistorico
  }));

  useEffect(() => {
    carregarHistorico();
  }, []);

  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const historicoPagina = historico.slice(indexPrimeiroItem, indexUltimoItem);

  const totalPaginas = Math.ceil(historico.length / itensPorPagina);

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <div className="history-container">
      <h2 className="history-title">📜 Histórico de Partidas</h2>
      <button className="button-back" onClick={() => navigate("/")}>🔙 Voltar</button>

      <ul className="history-list">
        {historicoPagina.map((p, idx) => {
          const nomes = p.jogadores.map(j => j.nome).join(' vs ');
          const resultado = p.vencedor || p.jogadores.find(j => j.status === 0)?.nome || 'Empate';
          const dataHora = new Date(p.dataHoraPartida).toLocaleString();

          return (
            <li key={idx} className="history-item-card">
              <p><strong>👥 Jogadores:</strong> {nomes}</p>
              <p><strong>🎯 Resultado:</strong> {resultado}</p>
              <p><strong>🗓️ Data:</strong> {dataHora}</p>
            </li>
          );
        })}
      </ul>

      {historico.length > itensPorPagina && (
        <div className="history-pagination">
          <button 
            onClick={paginaAnterior} 
            disabled={paginaAtual === 1} 
            className={`btn-pagination ${paginaAtual === 1 ? "disabled" : ""}`}
          >
            ◀️ Anterior
          </button>
          <span className="page-info">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button 
            onClick={proximaPagina} 
            disabled={paginaAtual === totalPaginas} 
            className={`btn-pagination ${paginaAtual === totalPaginas ? "disabled" : ""}`}
          >
            Próximo ▶️
          </button>
        </div>
      )}
    </div>
  );
});

export default Historico;