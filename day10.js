const fs = require('fs');
const input = fs.readFileSync('day10-input.txt', 'utf-8').split`\n`.map(v => v.replace(/\r/, ''))

const cyclesPerInstruction = {
	noop: 1,
	addx: 2
}

const resultPart1 = () => {
	let currentCycle = 0
	let registerValue = 1
	const cyclesOfInterest = [20, 60, 100, 140, 180, 220]

	return input.reduce((sum, row) => {
		const [instruction, value] = row.split` `
		for (let cycle = 0; cycle < cyclesPerInstruction[instruction]; cycle++) {
			currentCycle++
			if (cyclesOfInterest.includes(currentCycle)) {
				sum += registerValue * currentCycle;
			}
		}
		if (value) registerValue += +value
		return sum
	}, 0)
};

const resultPart2 = () => {
	let currentSprite = '###.....................................'
	let currentCycle = 0
	let registerValue = 1
	let lineChars = ''
	const cyclesOfInterest = [40, 80, 120, 160, 200, 240]

	return input.reduce((acc, row) => {
		const [instruction, value] = row.split` `
		for (let cycle = 0; cycle < cyclesPerInstruction[instruction]; cycle++) {
			lineChars += currentSprite[currentCycle]
			currentCycle++
			if (cyclesOfInterest.includes(currentCycle)) {
				currentCycle = 0
				acc.push(lineChars)
				lineChars = ''
			}
		}
		if (value) registerValue += +value

		const newSprite = currentSprite.split``
		for (const [index, _] of newSprite.entries()) {
			if (index < registerValue - 1 || index >= registerValue + 2) newSprite[index] = '.'
			else newSprite[index] = '#'
		}

		currentSprite = newSprite.join``

		return acc
	}, [])

}

console.log(resultPart1());
console.log(resultPart2());


