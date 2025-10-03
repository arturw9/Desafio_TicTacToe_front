import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const GraficoDetalhes = ({ data }) => {
  const getBarColor = (index) => {
    if (index === 0) return "#FFD700"; // Ouro
    if (index === 1) return "#C0C0C0"; // Prata
    if (index === 2) return "#CD7F32"; // Bronze
    return "#2196f3"; // Azul padrão
  };

  const chartData = data.map((jogador) => ({
    ...jogador,
    vitoria: Math.max(jogador.vitoria, 1),
  }));

  return (
    <div className="chart-container">
      <h3>📊 Gráfico de vitórias por jogador</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis allowDecimals={false} tickCount={6} />
          <Tooltip />
          <Bar dataKey="vitoria">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoDetalhes;
