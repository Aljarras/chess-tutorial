// Quick test to verify FEN positions for London System
const { Chess } = require('chess.js');

console.log('=== LONDON SYSTEM FEN TEST ===\n');

// Starting position
const game = new Chess();
console.log('Initial position:');
console.log(game.fen());

// Move 1: d4
game.move('d4');
console.log('\nAfter 1. d4:');
console.log(game.fen());

// Move 1: ...d5
game.move('d5');
console.log('\nAfter 1. d4 d5:');
console.log(game.fen());

// Move 2: Bf4
game.move('Bf4');
console.log('\nAfter 2. Bf4 (Practice 1 complete):');
console.log(game.fen());

// Move 2: ...Nf6
game.move('Nf6');
console.log('\nAfter 2. Bf4 Nf6 (Practice 2 starting position):');
console.log(game.fen());

// Test if Nf3 is legal from this position
const testGame = new Chess(game.fen());
const move = testGame.move('Nf3');
console.log('\nTesting Nf3 from this position:');
console.log('Move result:', move);
console.log('After 3. Nf3:');
console.log(testGame.fen());

// Move 3: ...c6
testGame.move('c6');
console.log('\nAfter 3. Nf3 c6 (Practice 3 starting position):');
console.log(testGame.fen());

// Test if e3 is legal
const move2 = testGame.move('e3');
console.log('\nTesting e3 from this position:');
console.log('Move result:', move2);
console.log('After 4. e3:');
console.log(testGame.fen());
