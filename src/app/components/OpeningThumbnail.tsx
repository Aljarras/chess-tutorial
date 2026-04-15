import { useMemo } from "react";
import { Chess } from "chess.js";
import type { Opening } from "../data/openings";

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

interface OpeningThumbnailProps {
  opening: Opening;
  className?: string;
}

const PIECE_IMAGES: Record<string, string> = {
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

export function OpeningThumbnail({ opening, className = "" }: OpeningThumbnailProps) {
  const position = useMemo(() => {
    const finalScenario = opening.practiceScenarios[opening.practiceScenarios.length - 1];

    if (!finalScenario?.initialFen) {
      return new Chess().board();
    }

    const game = new Chess(finalScenario.initialFen);

    try {
      game.move({
        from: finalScenario.correctMove.from,
        to: finalScenario.correctMove.to,
        promotion: "q",
      });

      if (finalScenario.opponentResponse) {
        game.move({
          from: finalScenario.opponentResponse.from,
          to: finalScenario.opponentResponse.to,
          promotion: "q",
        });
      }
    } catch {
      // If the scenario move cannot be applied, fall back to the starting position.
    }

    return game.board();
  }, [opening]);

  const shouldFlipBoard = opening.id === "scandinavian";
  const displayPosition = shouldFlipBoard ? [...position].reverse().map((rank) => [...rank].reverse()) : position;

  return (
    <div
      className={`w-full max-w-[280px] aspect-square border-2 border-[#7a9a86] rounded-[4px] overflow-hidden ${className}`}
      role="img"
      aria-label={`${opening.name} final setup thumbnail`}
    >
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
        {displayPosition.map((rank, rankIndex) =>
          rank.map((piece, fileIndex) => {
            const isLight = (rankIndex + fileIndex) % 2 === 0;
            const bgColor = isLight ? "bg-[#8cbb9e]" : "bg-[#4d775d]";
            const pieceImage = piece
              ? PIECE_IMAGES[`${piece.color}${piece.type.toUpperCase()}`]
              : null;

            return (
              <div key={`${rankIndex}-${fileIndex}`} className={`${bgColor} relative flex items-center justify-center`}>
                {pieceImage && (
                  <img
                    src={pieceImage}
                    alt=""
                    className="w-[92%] h-[92%] object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}