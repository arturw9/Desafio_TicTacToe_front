import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRanking } from "../../services/api";
import "./Ranking.css";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRanking().then(setRanking);
  }, []);

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">🏆 Ranking de Vencedores</h2>
      <div className="ranking-buttons">
        <button className="button-back" onClick={() => navigate("/")}>
          🔙 Voltar
        </button>
        <button className="button-back" onClick={() => navigate("/grafico")}>
          📊 Ver Gráfico
        </button>
      </div>

      {ranking.length > 0 ? (
        <ul className="ranking-list">
          {ranking.map((jogador, index) => (
            <li key={index} className={`ranking-item rank-${index + 1}`}>
              <span className="rank-position">{index + 1}º</span>
              <span className="player-name">{jogador.nome}</span>
              <span className="player-victories">
                {jogador.vitoria} vitória{jogador.vitoria !== 1 && "s"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-winner">Nenhum vencedor encontrado.</p>
      )}   
    </div>
  );
};

export default Ranking;