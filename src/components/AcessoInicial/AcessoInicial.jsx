import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './AcessoInicial.css';

const AcessoInicial = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (player1 && player2) {
      navigate("/partida", { state: { player1, player2 } });
    } else {
      alert("Preencha os dois nomes!");
    }
  };

  return (
    <div className="player-input-container">
      <h1 className="title">🎮 Jogo da Velha</h1>

      <div className="inputs">
        <input
          className="player-input"
          placeholder="Jogador 1"
          value={player1}
          onChange={e => setPlayer1(e.target.value)}
        />
        <input
          className="player-input"
          placeholder="Jogador 2"
          value={player2}
          onChange={e => setPlayer2(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleStart}>
        Iniciar Partida
      </button>

      <div className="buttons-secondary">
        <button className="btn btn-secondary" onClick={() => navigate("/historico")}>
          Histórico
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/ranking")}>
          Ranking
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/grafico")}>
          Gráfico de Vitórias
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/melhores-estrategias")}>
          Melhores estratégias usadas
        </button>
      </div>
    </div>
  );
};

export default AcessoInicial;