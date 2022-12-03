const fs = require('fs');

const SHORTS = {
	A: 'rock',
	B: 'paper',
	C: 'scissors',
	X: 'rock',
	Y: 'paper',
	Z: 'scissors'
}

const POINTS = {
	shape: {
		rock: 1,
		paper: 2,
		scissors: 3
	},
	round: {
		win: 6,
		draw: 3
	}
}

const WEAKNESS = {
	rock: 'paper',
	paper: 'scissors',
	scissors: 'rock',
}

const input = fs.readFileSync('day2-input.txt', 'utf8')
	.replace(/\r/g, '')
	.split`\n`
	.map(game => game.split` `.map(c => c = SHORTS[c]).join` `)


/** Part 1 */
const getScorePart1 = (round) => {
	const [opponentMove, yourMove] = round.split` `
	if (WEAKNESS[opponentMove].includes(yourMove)) return POINTS.shape[yourMove] + POINTS.round.win
	if (opponentMove === yourMove) return POINTS.shape[yourMove] + POINTS.round.draw
	return POINTS.shape[yourMove]
}

const scorePart1 = input.reduce((total, round) => {
	total += getScorePart1(round);
	return total
}, 0)

console.log(scorePart1);

/** Part 2 */
const getScorePart2 = (round) => {
	const [opponentMove, yourMove] = round.split` `
	if (yourMove === 'scissors') return POINTS.shape[WEAKNESS[opponentMove]] + POINTS.round.win
	if (yourMove === 'paper') return POINTS.shape[opponentMove] + POINTS.round.draw
	if (yourMove === 'rock') {
		for (const row of Object.entries(WEAKNESS)) {
			const [shape, shapeWeakness] = row
			if (shapeWeakness.includes(opponentMove)) {
				return POINTS.shape[shape]
			}
		}
	}
}

const scorePart2 = input.reduce((total, round) => {
	total += getScorePart2(round);
	return total
}, 0)

console.log(scorePart2);

