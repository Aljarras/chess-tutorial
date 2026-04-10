import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

// Import chess piece images
import whitePawn from "/chess-pieces/white/white-pawn.png";
import whiteKnight from "/chess-pieces/white/white-knight.png";
import whiteBishop from "/chess-pieces/white/white-bishop.png";
import whiteRook from "/chess-pieces/white/white-rook.png";
import whiteQueen from "/chess-pieces/white/white-queen.png";
import whiteKing from "/chess-pieces/white/white-king.png";
import blackPawn from "/chess-pieces/black/black-pawn.png";
import blackKnight from "/chess-pieces/black/black-knight.png";
import blackBishop from "/chess-pieces/black/black-bishop.png";
import blackRook from "/chess-pieces/black/black-rook.png";
import blackQueen from "/chess-pieces/black/black-queen.png";
import blackKing from "/chess-pieces/black/black-king.png";

interface ChessBoardProps {
  highlightedPieces?: string[];
  highlightedSquares?: string[];
  onMove?: (from: string, to: string) => void;
  disabled?: boolean;
  showHints?: boolean;
  enforceTurns?: boolean;
  initialFen?: string;
  resetKey?: number;
  draggableSquares?: string[]; // Only these squares can be dragged
  validateMove?: (from: string, to: string) => boolean; // Validate before making the move
  flipped?: boolean; // Flip the board (black at bottom)
}

// Chess piece images mapping
const PIECE_IMAGES: { [key: string]: string } = {
  wP: whitePawn,
  wN: whiteKnight,
  wB: whiteBishop,
  wR: whiteRook,
  wQ: whiteQueen,
  wK: whiteKing,
  bP: blackPawn,
  bN: blackKnight,
  bB: blackBishop,
  bR: blackRook,
  bQ: blackQueen,
  bK: blackKing,
};

interface SquareProps {
  square: string;
  piece: { type: string; color: string } | null;
  isLight: boolean;
  isHighlightedPiece: boolean;
  isHighlightedSquare: boolean;
  onDrop: (from: string, to: string) => void;
  disabled: boolean;
  currentTurn: string;
  enforceTurns: boolean;
  draggableSquares?: string[]; // Only these squares can be dragged
}

const Square = ({
  square,
  piece,
  isLight,
  isHighlightedPiece,
  isHighlightedSquare,
  onDrop,
  disabled,
  currentTurn,
  enforceTurns,
  draggableSquares,
}: SquareProps) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "piece",
      drop: (item: { square: string }) => {
        onDrop(item.square, square);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [square]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "piece",
      item: { square },
      canDrag: !disabled && 
               piece !== null && 
               (enforceTurns ? piece.color === currentTurn : true) &&
               (draggableSquares ? draggableSquares.includes(square) : true),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [square, piece, disabled, currentTurn, enforceTurns, draggableSquares]
  );

  const bgColor = isLight ? "bg-[#8cbb9e]" : "bg-[#4d775d]";
  const hoverColor = isOver ? "bg-[#6a9876]" : "";

  let borderStyle = "";
  if (isHighlightedPiece) {
    borderStyle = "shadow-[inset_0_0_0_4px_#2e5d40]";
  } else if (isHighlightedSquare) {
    borderStyle = "shadow-[inset_0_0_0_4px_#85997c]";
  }

  const pieceImage = piece
    ? PIECE_IMAGES[`${piece.color}${piece.type.toUpperCase()}`]
    : null;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        aspect-square flex items-center justify-center
        text-4xl md:text-5xl select-none cursor-pointer
        ${bgColor} ${hoverColor} ${borderStyle}
        transition-colors
      `}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {pieceImage && (
        <img 
          src={pieceImage} 
          alt={`${piece?.color === 'w' ? 'White' : 'Black'} ${piece?.type}`}
          className="select-none pointer-events-none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          draggable={false}
        />
      )}
    </div>
  );
};

export function ChessBoard({
  highlightedPieces = [],
  highlightedSquares = [],
  onMove,
  disabled = false,
  showHints = true,
  enforceTurns = true,
  initialFen,
  resetKey,
  draggableSquares,
  validateMove,
  flipped = false,
}: ChessBoardProps) {
  const [game, setGame] = useState(new Chess(initialFen));
  const [position, setPosition] = useState(game.board());

  // Reset board when resetKey changes
  useEffect(() => {
    const newGame = new Chess(initialFen);
    setGame(newGame);
    setPosition(newGame.board());
  }, [resetKey, initialFen]);

  const handleDrop = (from: string, to: string) => {
    if (disabled) return;
    
    // Don't attempt move if source and destination are the same
    if (from === to) return;

    console.log('ChessBoard handleDrop:', { from, to });

    // If validateMove is provided, use ONLY that validation (skip chess.js rules)
    if (validateMove) {
      const isValid = validateMove(from, to);
      console.log('Parent validateMove result:', isValid);
      
      // If valid, update the board visually FIRST
      if (isValid) {
        const gameCopy = new Chess(game.fen());
        
        // Check if trying to capture own piece
        const fromPiece = gameCopy.get(from);
        const toPiece = gameCopy.get(to);
        if (fromPiece && toPiece && fromPiece.color === toPiece.color) {
          console.log('Cannot capture your own piece');
          return; // Don't allow capturing own pieces
        }
        
        try {
          // Try to make the move with chess.js
          const move = gameCopy.move({ from, to, promotion: "q" });
          if (move) {
            console.log('Move accepted by chess.js');
            setGame(gameCopy);
            setPosition(gameCopy.board());
          } else {
            console.log('Chess.js rejected move - illegal move, not updating board');
            // Don't update board for illegal moves
            return;
          }
        } catch (error) {
          console.log('Chess.js threw error - illegal move:', error);
          // Don't force illegal moves
          return;
        }
      }
      
      // Always call onMove AFTER updating board (so parent gets feedback)
      if (onMove) {
        onMove(from, to);
      }
      
      return;
    }

    // No validateMove provided - use standard chess.js validation
    const gameCopy = new Chess(game.fen());
    
    try {
      const move = gameCopy.move({
        from,
        to,
        promotion: "q",
      });

      if (move) {
        console.log('chess.js move succeeded:', move);
        setGame(gameCopy);
        setPosition(gameCopy.board());
        
        if (onMove) {
          onMove(from, to);
        }
      } else {
        console.log('chess.js move returned null - illegal move');
        if (onMove) {
          onMove(from, to);
        }
      }
    } catch (error) {
      console.log("Invalid chess move attempted:", from, "to", to, error);
      if (onMove) {
        onMove(from, to);
      }
    }
  };

  // Detect if we're on a touch device
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const backend = isTouchDevice ? TouchBackend : HTML5Backend;
  const backendOptions = isTouchDevice ? { enableMouseEvents: true } : {};

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  // Flip the board if needed (black at bottom)
  const displayFiles = flipped ? [...files].reverse() : files;
  const displayRanks = flipped ? [...ranks].reverse() : ranks;

  return (
    <DndProvider backend={backend} options={backendOptions}>
      <div className="w-full max-w-md mx-auto">
        <div className="grid grid-cols-8 border-2 border-gray-800 rounded-[5px]">
          {displayRanks.map((rank, rankIndex) =>
            displayFiles.map((file, fileIndex) => {
              const square = `${file}${rank}`;
              const isLight = (rankIndex + fileIndex) % 2 === 0;
              
              // Get the actual position from the board array
              const actualRankIndex = ranks.indexOf(rank);
              const actualFileIndex = files.indexOf(file);
              const piece = position[actualRankIndex][actualFileIndex];

              const isHighlightedPiece = highlightedPieces.includes(square);
              const isHighlightedSquare =
                showHints && highlightedSquares.includes(square);

              return (
                <Square
                  key={square}
                  square={square}
                  piece={piece}
                  isLight={isLight}
                  isHighlightedPiece={isHighlightedPiece}
                  isHighlightedSquare={isHighlightedSquare}
                  onDrop={handleDrop}
                  disabled={disabled}
                  currentTurn={game.turn()}
                  enforceTurns={enforceTurns}
                  draggableSquares={draggableSquares}
                />
              );
            })
          )}
        </div>
      </div>
    </DndProvider>
  );
}