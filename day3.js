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

/** Part 2 */
const sumPart2 = input.reduce((groups, _, index, array) => {
	groups.push(array.slice(index > 0 ? index * 3 : index, index > 0 ? index * 3 + 3 : index + 3))
	return groups
}, []).filter(v => v.length).reduce((score, rucksacks) => {
	const [first, second, third] = rucksacks
	for (const item of first.split``) {
		if (second.includes(item) && third.includes(item)) {
			score += alphabet.indexOf(item) + 1
			break
		}
	}
	return score
}, 0)
console.log(sumPart2);

