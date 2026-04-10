export interface Opening {
  id: string;
  name: string;
  bestFor: string;
  description: string;
  steps: OpeningStep[];
  practiceScenarios: PracticeScenario[];
  testScenarios: TestScenario[];
}

export interface OpeningStep {
  stepNumber: number;
  title: string;
  description: string;
  notation: string;
}

export interface PracticeScenario {
  id: string;
  description: string;
  attackedPiece: string;
  attackingPiece: string;
  correctMove: { from: string; to: string };
  opponentResponse?: { from: string; to: string }; // Opponent's response after user's move
  highlightSquares: string[];
  hint: string;
  initialFen?: string;
}

export interface TestScenario {
  id: string;
  question: string;
  description: string;
  correctMove: { from: string; to: string };
  feedback: string;
  initialFen?: string;
}

export const openings: Opening[] = [
  {
    id: "scandinavian",
    name: "Scandinavian Defense",
    bestFor: "Black",
    description:
      "The Scandinavian Defense is a solid opening for Black that immediately challenges White's center pawn. After 1.e4 d5, Black aims to disrupt White's central control from the very first move.",
    steps: [
      {
        stepNumber: 1,
        title: "Black plays d5",
        description:
          "Push the d-pawn two squares forward to d5, immediately challenging White's e4 pawn.",
        notation: "1...d5",
      },
      {
        stepNumber: 2,
        title: "White captures exd5",
        description:
          "White typically captures the d5 pawn with the e4 pawn.",
        notation: "2.exd5",
      },
      {
        stepNumber: 3,
        title: "Black recaptures with Queen",
        description:
          "Black recaptures on d5 with the Queen, bringing it into play early.",
        notation: "2...Qxd5",
      },
      {
        stepNumber: 4,
        title: "Develop pieces",
        description:
          "Continue developing knights and bishops while keeping the Queen safe from attacks.",
        notation: "3.Nc3 Qa5",
      },
    ],
    practiceScenarios: [
      {
        id: "scand-practice-1",
        description: "Your d-pawn is ready to challenge White's center",
        attackedPiece: "e4 pawn",
        attackingPiece: "d-pawn",
        correctMove: { from: "d7", to: "d5" },
        opponentResponse: { from: "e4", to: "d5" }, // White captures
        highlightSquares: ["d6", "d5"],
        hint: "Use pawn e2 to control the center",
        initialFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      },
      {
        id: "scand-practice-2",
        description: "White captured your pawn. Recapture with your Queen",
        attackedPiece: "center",
        attackingPiece: "Queen",
        correctMove: { from: "d8", to: "d5" },
        opponentResponse: { from: "b1", to: "c3" }, // White develops knight
        highlightSquares: ["d5"],
        hint: "Bring your Queen out to recapture on d5",
        initialFen: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2",
      },
      {
        id: "scand-practice-3",
        description: "White is attacking your Queen with their knight. Move it to safety and check the king",
        attackedPiece: "Queen",
        attackingPiece: "Queen",
        correctMove: { from: "d5", to: "e5" },
        opponentResponse: undefined, // No response needed - this is the last move
        highlightSquares: ["e5"],
        hint: "Move your Queen to e5 to check the king along the open e-file",
        initialFen: "rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3",
      },
    ],
    testScenarios: [
      {
        id: "scand-test-1",
        question: "What would your next move be?",
        description:
          "White has captured your d5 pawn. You need to recapture.",
        correctMove: { from: "d8", to: "d5" },
        feedback:
          "Correct! Recapturing with the Queen is the key move in the Scandinavian Defense.",
        initialFen: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2",
      },
    ],
  },
  {
    id: "london",
    name: "London System",
    bestFor: "White (works for both)",
    description:
      "The London System is a solid and reliable opening that can be played by both White and Black. It focuses on controlling the center with pawns and developing the dark-squared bishop to f4.",
    steps: [
      {
        stepNumber: 1,
        title: "White plays d4",
        description:
          "Start by pushing the d-pawn two squares to establish central control.",
        notation: "1.d4",
      },
      {
        stepNumber: 2,
        title: "Develop the dark-squared bishop",
        description:
          "Bring out the bishop to f4, the characteristic move of the London System.",
        notation: "2.Bf4",
      },
      {
        stepNumber: 3,
        title: "Play e3 for support",
        description:
          "Advance the e-pawn one square to support the center and prepare to develop the light-squared bishop.",
        notation: "3.e3",
      },
      {
        stepNumber: 4,
        title: "Develop knight to f3",
        description:
          "Bring the knight to f3 to control the center and prepare castling.",
        notation: "4.Nf3",
      },
    ],
    practiceScenarios: [
      {
        id: "london-practice-1",
        description: "Start by establishing central control with your d-pawn",
        attackedPiece: "center",
        attackingPiece: "d-pawn",
        correctMove: { from: "d2", to: "d4" },
        opponentResponse: { from: "d7", to: "d5" }, // Black mirrors
        highlightSquares: ["d3", "d4"],
        hint: "Move your d-pawn two squares forward to d4",
        initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
      {
        id: "london-practice-2",
        description: "Your bishop needs to develop to its London square",
        attackedPiece: "center",
        attackingPiece: "dark-squared bishop",
        correctMove: { from: "c1", to: "f4" },
        opponentResponse: { from: "g8", to: "f6" }, // Black develops knight
        highlightSquares: ["f4", "e3", "g5", "h2"],
        hint: "Move your dark-squared bishop to f4",
        initialFen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      },
      {
        id: "london-practice-3",
        description: "Defend the center with your g-knight",
        attackedPiece: "center",
        attackingPiece: "knight",
        correctMove: { from: "g1", to: "f3" },
        opponentResponse: { from: "c8", to: "f5" }, // Black develops bishop
        highlightSquares: ["f3", "h3"],
        hint: "Move your knight from g1 to f3",
        initialFen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3",
      },
      {
        id: "london-practice-4",
        description: "Develop your pawn to control the center",
        attackedPiece: "center",
        attackingPiece: "e-pawn",
        correctMove: { from: "e2", to: "e3" },
        opponentResponse: undefined, // No response for last move
        highlightSquares: ["e3", "e4"],
        hint: "Move your e-pawn to e3",
        initialFen: "rn1qkb1r/ppp1pppp/5n2/3p1b2/3P1B2/5N2/PPP1PPPP/RN1QKB1R w KQkq - 4 5",
      },
    ],
    testScenarios: [
      {
        id: "london-test-1",
        question: "What would your next move be?",
        description:
          "You've played d4. Now you need to develop your characteristic London bishop.",
        correctMove: { from: "c1", to: "f4" },
        feedback:
          "Excellent! Bf4 is the signature move of the London System, putting pressure on the center.",
        initialFen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      },
      {
        id: "london-test-2",
        question: "What would your next move be?",
        description:
          "You also must capture the centre. Where would you move your g-knight to do so?",
        correctMove: { from: "g1", to: "f3" },
        feedback:
          "Perfect! Nf3 develops your knight and helps control the center, a key principle in the London System.",
        initialFen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3",
      },
    ],
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    bestFor: "White",
    description:
      "The Queen's Gambit is one of the oldest and most respected openings in chess. White offers a pawn sacrifice to gain control of the center and develop pieces quickly.",
    steps: [
      {
        stepNumber: 1,
        title: "White plays d4",
        description: "Begin by pushing the d-pawn two squares forward.",
        notation: "1.d4",
      },
      {
        stepNumber: 2,
        title: "Black responds d5",
        description: "Black typically mirrors with d5 to contest the center.",
        notation: "1...d5",
      },
      {
        stepNumber: 3,
        title: "White plays c4 (the gambit)",
        description:
          "Offer the c-pawn to challenge Black's central d5 pawn. This is the Queen's Gambit.",
        notation: "2.c4",
      },
      {
        stepNumber: 4,
        title: "Continue development",
        description:
          "Develop knights and bishops while maintaining central pressure.",
        notation: "3.Nc3 Nf6 4.Nf3",
      },
    ],
    practiceScenarios: [
      {
        id: "qg-practice-1",
        description: "Make your first move to initiate the Queen's Gambit using your d pawn",
        attackedPiece: "center",
        attackingPiece: "d-pawn",
        correctMove: { from: "d2", to: "d4" },
        opponentResponse: { from: "d7", to: "d5" }, // Black responds d5
        highlightSquares: ["d3", "d4"],
        hint: "Move your d-pawn to control the center",
      },
      {
        id: "qg-practice-2",
        description: "Black responded with d5. Now offer your gambit pawn",
        attackedPiece: "center",
        attackingPiece: "c-pawn",
        correctMove: { from: "c2", to: "c4" },
        opponentResponse: { from: "d5", to: "c4" }, // Black accepts gambit
        highlightSquares: ["c3", "c4"],
        hint: "Move your c-pawn to c4 to offer the gambit",
        initialFen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      },
      {
        id: "qg-practice-3",
        description: "Develop your knight to block the pawn and advance your position",
        attackedPiece: "center",
        attackingPiece: "knight",
        correctMove: { from: "b1", to: "c3" },
        opponentResponse: undefined, // No response for last move
        highlightSquares: ["c3", "a3"],
        hint: "Move your knight from b1 to c3",
        initialFen: "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
      },
    ],
    testScenarios: [
      {
        id: "qg-test-1",
        question: "What would your next move be?",
        description:
          "You've played d4 and Black responded d5. Time for the gambit move.",
        correctMove: { from: "c2", to: "c4" },
        feedback:
          "Perfect! Playing c4 offers the Queen's Gambit, pressuring Black's center.",
        initialFen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      },
      {
        id: "qg-test-2",
        question: "What would your next move be?",
        description:
          "In this scenario, black has accepted the queen's gambit and captured the c4 square. What do you do next?",
        correctMove: { from: "g1", to: "f3" },
        feedback:
          "Excellent! Developing the knight to f3 is the best move, continuing piece development. Ideally, white would continue to push and capture the black D pawn.",
        initialFen: "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
      },
    ],
  },
];