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

	return input.reduce((sum, line) => {
		const [instruction, value] = line.split` `
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
	let currentLineChars = ''
	let currentCycle = 0
	let currentRegister = 1
	const cyclesOfInterest = [40, 80, 120, 160, 200, 240]

	return input.reduce((monitor, line) => {
		const [instruction, value] = line.split` `
		for (let cycle = 0; cycle < cyclesPerInstruction[instruction]; cycle++) {
			currentLineChars += currentSprite[currentCycle]
			currentCycle++
			if (cyclesOfInterest.includes(currentCycle)) {
				monitor.push(currentLineChars)
				currentCycle = 0
				currentLineChars = ''
			}
		}
		if (value) currentRegister += +value
		const newSprite = currentSprite.split``
		for (const [index, _] of newSprite.entries()) {
			if (index < currentRegister - 1 || index >= currentRegister + 2) newSprite[index] = '.'
			else newSprite[index] = '#'
		}
		currentSprite = newSprite.join``
		return monitor
	}, [])
}

console.log(resultPart1());
console.log(resultPart2());