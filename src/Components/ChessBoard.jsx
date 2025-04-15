import React, { useState } from "react";

const Chessboard = ({ board, boardTheme, onMove, color, turn }) => {
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [touchPiece, setTouchPiece] = useState(null);

  const handleDragStart = (row, col) => {
    const piece = board[row][col];
    if (!piece || piece.color !== turn[0]) return;
    setDraggedPiece({ row, col, piece });
  };

  const handleDrop = (row, col) => {
    if (!draggedPiece) return;
    onMove({ row: draggedPiece.row, col: draggedPiece.col }, { row, col });
    setDraggedPiece(null);
  };

  const handleTouchStart = (row, col) => {
    const piece = board[row][col];
    if (!piece || piece.color !== turn[0]) return;
    setTouchPiece({ row, col });
  };

  const handleTouchEnd = (row, col) => {
    if (!touchPiece) return;
    onMove({ row: touchPiece.row, col: touchPiece.col }, { row, col });
    setTouchPiece(null);
  };

  if (!Array.isArray(board)) return <div>Invalid board</div>;

  return (
    <div className={`chessboard ${color === "black" ? "black-view" : ""}`}>
      {board.map((rowArr, row) =>
        rowArr.map((piece, col) => {
          const isDark = (row + col) % 2 === 1;
          const squareClass = `square ${
            isDark ? "dark" : "light"
          } ${boardTheme}`;
          const pieceCode = piece ? `${piece.color}${piece.type}` : null;

          return (
            <div
              key={`${row}-${col}`}
              className={squareClass}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(row, col)}
              onTouchEnd={(e) => handleTouchEnd(row, col)}
            >
              {piece && (
                <div
                  draggable
                  onDragStart={() => handleDragStart(row, col)}
                  onTouchStart={(e) => handleTouchStart(row, col)}
                >
                  <img src={`/Pieces/${pieceCode}.png`} alt={pieceCode} />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chessboard;
