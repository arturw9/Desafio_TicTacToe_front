import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AcessoInicial from './components/AcessoInicial/AcessoInicial';
import Partida from './components/Partida/Partida';
import Historico from './components/Historico/Historico';
import Ranking from './components/Ranking/Ranking';
import Grafico from './components/Grafico/Grafico';
import MelhoresEstrategias from './components/MelhoresEstrategias/MelhoresEstrategias';

const AppRoutes = () => {
  const [players, setPlayers] = useState({ player1: '', player2: '' });
  const historyRef = useRef();

  const startGame = (p1, p2) => {
    setPlayers({ player1: p1, player2: p2 });
  };

  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route
            path="/"
            element={<AcessoInicial onStart={startGame} />}
          />
          <Route
            path="/partida"
            element={
              <Partida
                player1={players.player1}
                player2={players.player2}
                onGameEnd={() => historyRef.current?.carregarHistorico()}
              />
            }
          />
          <Route
            path="/ranking"
            element={<Ranking />}
          />
    <Route path="/grafico" element={<Grafico />} />
          <Route
            path="/historico"
            element={<Historico />}
          />
          {/* Redireciona qualquer rota desconhecida para a tela inicial */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/melhores-estrategias" element={<MelhoresEstrategias />} />
        </Routes>

        
      </div>
    </Router>
  );
};

export default AppRoutes;
