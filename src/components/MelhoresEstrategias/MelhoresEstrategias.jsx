import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import "./MelhoresEstrategias.css";
import { melhoresEstrategias } from '../../services/api';
import { useNavigate } from "react-router-dom";

const MelhoresEstrategias = forwardRef((props, ref) => {
  const [estrategias, setEstrategias] = useState([]);
  const navigate = useNavigate();

  const carregarMelhoresEstrategias = () => {
    melhoresEstrategias().then(data => setEstrategias(data));
  };

  useImperativeHandle(ref, () => ({
    carregarMelhoresEstrategias
  }));

  useEffect(() => {
    carregarMelhoresEstrategias();
  }, []);

  return (
    <div className="container">
      <h1>Melhores Movimentos</h1>
      <button className="button-back" onClick={() => navigate("/")}>🔙 Voltar</button>
      
      <div className="estrategias-list">
        {estrategias.map((item, index) => (
          <div key={index} className="tabuleiro-wrapper">
            <div className="tabuleiro">
              {[...Array(9)].map((_, i) => {
                const posicaoIndex = (item.movimentos || []).indexOf(i.toString());
                return (
                  <div 
                    key={i} 
                    className="celula"
                    style={{
                      backgroundColor: posicaoIndex === 0 ? "#4caf50" : // primeira jogada verde
                                       posicaoIndex === 1 ? "#2196f3" : // segunda azul
                                       posicaoIndex === 2 ? "#ff9800" : "#eee" // terceira laranja
                    }}
                  >
                    {posicaoIndex >= 0 ? "X" : ""}
                  </div>
                );
              })}
            </div>
            <div className="quantidade">Utilizada {item.quantidade} vez(es)</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MelhoresEstrategias;