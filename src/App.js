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
    startGame();
  }, []);
  const startGame = async () => {
    try {
      const res = await fetch(`${API}/game/start`, { method: "POST" });
      const data = await res.json();
      setGameId(data.gameId);
      setBoard(data.board);
      setTurn(data.turn);
      setMessage("Game started, white moves first");
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Failed to start game. Please try again.");
    }
  };

  const handleMove = async (from, to) => {
    try {
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
        setTurn(data.turn);
        setColor(data.turn);

        if (data.gameOver) {
          setMessage(data.winner ? `${data.winner} wins!` : "Game over!");
        } else if (data.check) {
          setMessage(`${data.turn} is in check!`);
        } else {
          setMessage("");
        }
      }
    } catch (error) {
      console.error("Move error:", error);
      setMessage("Something went wrong during the move.");
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
