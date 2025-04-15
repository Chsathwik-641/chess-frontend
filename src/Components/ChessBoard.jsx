import React, { useRef, useState } from "react";

const Chessboard = ({ board, boardTheme, onMove, color, turn }) => {
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [touchPiece, setTouchPiece] = useState(null);

  const boardRef = useRef(null);

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
    const touch = e.touches[0];
    const boardRefe = boardRef.current;
    const rect = boardRefe.getBoundingClientRect();

    const squareSize = rect.width / 8;
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const colF = Math.floor(x / squareSize);
    const rowF = Math.floor(y / squareSize);
    const piece = board[row][col];
    if (!piece || piece.color !== turn[0]) return;
    setTouchPiece({ rowF, colF });
  };

  const handleTouchEnd = (e, row, col) => {
    if (!touchPiece) return;
    onMove({ row, col }, { row: touchPiece.rowF, col: touchPiece.colF });
    setTouchPiece(null);
  };

  if (!Array.isArray(board)) return <div>Invalid board</div>;

  return (
    <div
      className={`chessboard ${color === "black" ? "black-view" : ""}`}
      ref={boardRef}
    >
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
              onTouchMove={(e) => handleTouchStart(e, row, col)}
            >
              {piece && (
                <div
                  draggable
                  onDragStart={() => handleDragStart(row, col)}
                  onTouchStart={(e) => handleTouchStart(e, row, col)}
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
