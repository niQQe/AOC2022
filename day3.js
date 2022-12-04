const fs = require('fs');

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const input = fs.readFileSync('day3-input.txt', 'utf8').split`\n`

/** Part 1 */
const sumPart1 = input.map(r => {
	return [r.slice(0, r.length / 2), r.slice(r.length / 2, r.length)]
}).reduce((sum, rucksack) => {
	const [firstCompartment, secondCompartment] = rucksack
	for (const item of firstCompartment) {
		if (secondCompartment.includes(item)) {
			return sum += alphabet.indexOf(item) + 1
		}
	}
}, 0)

console.log(sumPart1);