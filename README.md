🎮 Desafio TicTacToe

📌 Projeto completo Front-end + Back-end, desenvolvido com React.js, .NET Core e PostgreSQL (via Entity Framework Core).
As boas práticas de S.O.L.I.D e Clean Code foram aplicadas para garantir organização, escalabilidade e manutenibilidade.

👉 Imagens das telas em funcionamento estão disponíveis na pasta /telas.

🚀 Tecnologias Utilizadas

Front-end: React.js

Back-end: ASP.NET Core (.NET)

Banco de Dados: PostgreSQL + Entity Framework Core

Testes Unitários: xUnit + EF InMemory

Documentação da API: Swagger

📂 Estrutura do Projeto
📌 Front-end (React.js)

/api → Arquivo responsável pelas chamadas de endpoints da API.

.env → Define a URL base da API.

/routes → Arquivo com as rotas do projeto (navegação entre telas e passagem de dados).

/components → Cada tela/component possui sua pasta, contendo o arquivo React (.jsx) e seu respectivo CSS.

📌 Principais Telas

AcessoInicial → Tela inicial para entrada dos nomes dos jogadores.

Grafico → Exibe gráfico de vitórias por jogador.

Historico → Lista com o histórico de partidas.

MelhoresEstrategias → Mostra as estratégias mais utilizadas pelos vencedores.

Partida → Tela principal onde ocorre o jogo da velha.

Quadrado → Representa cada célula do tabuleiro.

Ranking → Exibe os melhores jogadores (maior número de vitórias).

📖 Funcionalidades

✅ Dois jogadores jogam alternadamente
✅ Registro de histórico de partidas (nomes, vencedor/empate, data e hora)
✅ Persistência de vencedores via API
✅ Gráfico de vitórias por jogador (Torres)
✅ Entrada de nomes personalizados para os jogadores
✅ Destaque visual para o jogador atual durante a partida
✅ Tela de ranking e listagem dos últimos vencedores
✅ Registro de logs das jogadas realizadas
✅ Exibição das estratégias mais vencedoras

⚙️ Como Rodar o Projeto

Configure corretamente o arquivo .env com a URL da API.

Instale as dependências:

npm install


Inicie o projeto:

npm start
