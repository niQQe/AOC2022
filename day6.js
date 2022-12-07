const fs = require('fs');
const input = fs.readFileSync('day6-input.txt', 'utf8')

const getResult = (range) => {
	let count = 0
	for (const [index, _] of input.split``.entries()) {
		if (new Set(...[input.slice(index, index + range)]).size === range) {
			count += range
			break
		} else {
			count++
		}
	}
	return count
}

const resultPart1 = getResult(4);
const resultPart2 = getResult(14);

console.log(resultPart1);
console.log(resultPart2);


