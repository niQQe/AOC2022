const fs = require('fs');
const input = fs.readFileSync('day10-input.txt', 'utf-8').split`\n`.map(v => v.replace(/\r/, ''))

const cyclesPerInstruction = {
	noop: 1,
	addx: 2
}

const resultPart1 = () => {
	let currentCycle = 0
	let currentRegister = 1
	const cyclesOfInterest = [20, 60, 100, 140, 180, 220]

	return input.reduce((sum, row) => {
		const [instruction, value] = row.split` `
		for (let cycle = 0; cycle < cyclesPerInstruction[instruction]; cycle++) {
			currentCycle++
			if (cyclesOfInterest.includes(currentCycle)) {
				sum += currentRegister * currentCycle;
			}
		}
		if (value) currentRegister += +value
		return sum
	}, 0)
};

const resultPart2 = () => {
	let currentSprite = '###.....................................'
	let currentCycle = 0
	let currentLineChars = ''
	let currentRegister = 1
	const cyclesOfInterest = [40, 80, 120, 160, 200, 240]

	return input.reduce((acc, row) => {
		const [instruction, value] = row.split` `
		for (let cycle = 0; cycle < cyclesPerInstruction[instruction]; cycle++) {
			currentLineChars += currentSprite[currentCycle]
			currentCycle++
			if (cyclesOfInterest.includes(currentCycle)) {
				currentCycle = 0
				currentLineChars = ''
				acc.push(currentLineChars)
			}
		}
		if (value) currentRegister += +value

		const newSprite = currentSprite.split``
		for (const [index, _] of newSprite.entries()) {
			if (index < currentRegister - 1 || index >= currentRegister + 2) newSprite[index] = '.'
			else newSprite[index] = '#'
		}

		currentSprite = newSprite.join``

		return acc
	}, [])
}

console.log(resultPart1());
console.log(resultPart2());


