const fs = require('fs');
const input = fs.readFileSync('day10-input.txt', 'utf-8').split`\n`.map(v => v.replace(/\r/, ''))

const cyclesPerInstruction = {
	noop: 1,
	addx: 2
}

const counters = {
	X: 1,
	cycles: 0
}

const interestingSignalStrengths = [20, 60, 100, 140, 180, 220]

const resultPart1 = input.reduce((sum, row) => {
	const [instruction, value] = row.split` `
	for (let i = 0; i < cyclesPerInstruction[instruction]; i++) {
		counters.cycles++
		if (interestingSignalStrengths.includes(counters.cycles)) {
			sum += counters.X * counters.cycles;
		}
	}
	if (value) counters.X += +value
	return sum
}, 0)

console.log('...............'.length);
console.log(resultPart1)