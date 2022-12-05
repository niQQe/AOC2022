const fs = require('fs');

const input = fs.readFileSync('day4-input.txt', 'utf8').split`\n`

/** Part 1 */
const resultPart1 = input.reduce((total, pairs) => {
	const [first, second] = pairs.split`,`
	const [firstStart, firstEnd] = first.split`-`.map(v => +v)
	const [secondStart, secondEnd] = second.split`-`.map(v => +v)
	const isFullyOverLapping = (firstStart <= secondStart && firstEnd >= secondEnd) || (secondStart <= firstStart && secondEnd >= firstEnd)
	if (isFullyOverLapping) total++
	return total
}, 0)
console.log(resultPart1);

/** Part 2 */
const resultPart2 = input.reduce((total, pairs) => {
	const [first, second] = pairs.split`,`
	const [firstStart, firstEnd] = first.split`-`.map(v => +v)
	const [secondStart, secondEnd] = second.split`-`.map(v => +v)
	const notOverLapping = firstStart > secondEnd && firstEnd > secondStart || firstStart < secondEnd && firstEnd < secondStart
	if (notOverLapping) total--;
	return total
}, input.length)
console.log(resultPart2);



