import React, { useState, useEffect } from "react";
import Chessboard from "./Components/ChessBoard";
import ThemePanel from "./Components/ThemePanel";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [theme, setTheme] = useState("classic");
  const [gameId, setGameId] = useState(null);
  const [color, setColor] = useState("white");
  const [board, setBoard] = useState([]);
  const [turn, setTurn] = useState("white");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const startGame = async () => {
      const res = await fetch(`${API}/game/start`, { method: "POST" });
      const { gameId, board, turn } = await res.json();
      setGameId(gameId);
      setBoard(board);
      setTurn(turn);
      setMessage("Game started white moves first");
    };
    startGame();
  }, []);

  const handleMove = async (from, to) => {
    const res = await fetch(`${API}/game/${gameId}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, color }),
    });

    const data = await res.json();
    if (data.error) {
      setMessage(data.error);
    } else {
      setBoard(data.board);
      console.log(board);
      setTurn(data.turn);
      setColor(data.turn);
      setMessage(
        data.gameOver
          ? data.winner
            ? `${data.winner} wins!`
            : "Game over!"
          : ""
      );
    }
  };

  return (
    <div className="App">
      <div className="board">
        {" "}
        {board.length > 0 && (
          <Chessboard
            board={board}
            boardTheme={theme}
            onMove={handleMove}
            color={color}
            turn={turn}
          />
        )}
      </div>
      <div className="settings">
        {" "}
        <ThemePanel setTheme={setTheme} />
        {gameId && (
          <div className="turn">
            <p>Turn: {turn}</p>
          </div>
        )}
        {message && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
