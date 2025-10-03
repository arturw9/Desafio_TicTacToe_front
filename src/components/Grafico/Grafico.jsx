import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRanking } from "../../services/api";
import GraficoDetalhes from "./GraficoDetalhes"; // gráfico separado
import "./../Ranking/Ranking.css";

const Grafico = () => {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRanking().then(setRanking);
  }, []);

  const top10 = ranking.slice(0, 10);

  return (
    <div className="container">
      {top10.length > 0 ? (
        <GraficoDetalhes data={top10} />
      ) : (
        <p>Nenhum jogador encontrado para o gráfico.</p>
      )}

      <button className="button-back" onClick={() => navigate("/")}>
        🔙 Voltar
      </button>
    </div>
  );
};

export default Grafico;