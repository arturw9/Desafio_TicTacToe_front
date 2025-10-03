import { useState } from 'react';
import Quadrado from '../Quadrado/Quadrado';
import { gravarPartida, gravarLog } from '../../services/api';
import { useNavigate, useLocation } from "react-router-dom";
import './Partida.css';

const Partida = ({ onGameEnd }) => {
  const location = useLocation();
  const { player1, player2 } = location.state || { player1: "", player2: "" };
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [partidaTerminou, setPartidaTerminou] = useState(false);
  const [logJogadas, setLogJogadas] = useState([]);
  const navigate = useNavigate();

  const handleClick = (index) => {
    if (board[index] || partidaTerminou) return;

    const newBoard = [...board];
    const jogadorAtual = isXNext ? 'X' : 'O';
    newBoard[index] = jogadorAtual;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // registra a jogada
    setLogJogadas(prev => [
      ...prev,
      {
        jogador: jogadorAtual,
        nome: jogadorAtual === 'X' ? player1 : player2,
        posicao: index,
        dataHora: new Date()
      }
    ]);

    const finalWinner = calculateWinner(newBoard);
    const isDraw = !finalWinner && newBoard.every(Boolean);

    if (finalWinner || isDraw) {
      setPartidaTerminou(true);

      const partida = {
        jogadores: 
        [
          { nome: player1, status: isDraw ? 2 : (finalWinner === 'X' ? 0 : 1) },
          { nome: player2, status: isDraw ? 2 : (finalWinner === 'O' ? 0 : 1) }
        ],
  vencedor: isDraw ? "Não houve" : (finalWinner === 'X' ? player1 : player2),
  dataHoraPartida: new Date()
};

      gravarPartida(partida)
        .then(() => {
          if (onGameEnd) onGameEnd();

          // monta o objeto de log completo
          const logCompleto = {
            jogadores: partida.jogadores,
            vencedor: partida.vencedor,
            dataHoraPartida: partida.dataHoraPartida,
            log: [
              ...logJogadas,
              {
                jogador: jogadorAtual,
                nome: jogadorAtual === 'X' ? player1 : player2,
                posicao: index,
                dataHora: new Date()
              }
            ]
          };

          // envia logs
          gravarLog(logCompleto)
            .then(() => console.log('Logs enviados com sucesso'))
            .catch(err => console.error('Erro ao enviar logs', err));
        })
        .finally(() => {
          setTimeout(() => {
            setBoard(Array(9).fill(null));
            setIsXNext(true);
            setPartidaTerminou(false);
            setLogJogadas([]);
          }, 3000);
        });
    }
  };

  const winner = calculateWinner(board);
  const isEmpate = !winner && board.every(Boolean);

  return (
   <div className="board-container">
    <h1 className="title">🎮 Jogo da Velha</h1>
  <div className="players-status">
    <div className={`player ${isXNext ? 'active' : ''}`}>🔵 {player1} (X)</div>
    <div className={`player ${!isXNext ? 'active' : ''}`}>🟡 {player2} (O)</div>
  </div>

  <div className="board">
    {board.map((value, idx) => (
      <Quadrado key={idx} value={value} onClick={() => handleClick(idx)} />
    ))}
  </div>

  {winner && <div className="game-result">Vencedor: {winner === "X" ? player1 : player2}</div>}
  {isEmpate && <div className="game-result">Empate!</div>}

  <div className="button-group">
    <button className="btn-voltar" onClick={() => navigate("/")}>🔙 Voltar</button>
    <button className="btn-ranking" onClick={() => navigate("/ranking")}>📊 Ver Ranking</button>
  </div>
</div>

  );
};

function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Partida;