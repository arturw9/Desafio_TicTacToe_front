import {useState, useRef } from 'react';
import AcessoInicial from './components/AcessoInicial/AcessoInicial';
import Partida from './components/Partida/Partida';
import Ranking from './components/Ranking/Ranking';

const App = () => {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const [showBoard, setShowBoard] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const historyRef = useRef();

  const startGame = (p1, p2) => {
    setPlayers({ player1: p1, player2: p2 });
    setShowBoard(true);
    setShowRanking(false);
  };

  const voltarTelaJogadores = () => {
    setShowBoard(false);
    setPlayers({ player1: '', player2: '' });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

      {!showBoard && !showRanking && (
        <>
          <AcessoInicial onStart={startGame} />
          <button
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#2196f3',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => setShowRanking(true)}
          >
            📊 Ver Ranking
          </button>
        </>
      )}

      {showBoard && (
        <Partida
          player1={players.player1}
          player2={players.player2}
          onGameEnd={() => historyRef.current?.carregarHistorico()}
          onBack={voltarTelaJogadores}
        />
      )}

      {showRanking && <Ranking onBack={() => setShowRanking(false)} />}

    </div>
  );
};

export default App;
