const fs = require('fs');

const input = fs.readFileSync('day4-input.txt', 'utf8').split`\n`

/** Part1 */
const resultPart = input.reduce((fullyContains, pairs) => {
	const [first, second] = pairs.split`,`
	const [firstStart, firstEnd] = first.split`-`.map(v => +v)
	const [secondStart, secondEnd] = second.split`-`.map(v => +v)
	if ((firstStart <= secondStart && firstEnd >= secondEnd) || (secondStart <= firstStart && secondEnd >= firstEnd)) {
		fullyContains++
	}
	return fullyContains
}, 0)

console.log(resultPart);



