import React, { useState } from "react";

const Chessboard = ({ board, boardTheme, onMove, color, turn }) => {
  const [draggedPiece, setDraggedPiece] = useState(null);

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

  const handleTouchStart = (e, row, col) => {
    e.preventDefault();
    handleDragStart(row, col);
  };

  const handleTouchEnd = (e, row, col) => {
    e.preventDefault();
    handleDrop(row, col);
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
              onTouchEnd={(e) => handleTouchEnd(e, row, col)}
            >
              {piece && (
                <img
                  src={`/Pieces/${pieceCode}.png`}
                  alt={pieceCode}
                  draggable
                  onDragStart={() => handleDragStart(row, col)}
                  onTouchStart={(e) => handleTouchStart(e, row, col)}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chessboard;
