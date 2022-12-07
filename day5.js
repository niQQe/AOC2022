const fs = require('fs');

const input = fs.readFileSync('day5-input.txt', 'utf-8').split`\n`.map(r => r.replace(/\r|\n/, ''))

const parsedData = () => {
	const parsedIndexes = input[8].replace(/' '/g, ',').split``.map((char, i) => {
		if (char != ' ') char = i;
		return char
	}).filter(el => +el);

	const arrayPlaceholder = [...Array(parsedIndexes.length).keys()].reduce((acc, _) => {
		acc.push([])
		return acc
	}, [])

	const filledIndexArray = arrayPlaceholder.reduce((acc) => {
		return acc.reduce((result, _, i) => {
			result[i].push(parsedIndexes[i])
			return result
		}, acc)
	}, arrayPlaceholder)

	const moves = input.slice(parsedIndexes.length + 1, input.length).map(r => r.split` `.filter(n => +n).map((n, i) => i > 0 ? n - 1 : +n).join`-`);
	const matrix = filledIndexArray.map((row) => row.map((n, i) => input[i][n])).map(row => row.filter(r => r !== ' '))

	return {
		moves, matrix
	}
};

const makeMoves = (part, moves, matrix) => {
	for (const move of moves) {
		const [amount, moveFrom, moveTo] = move.split`-`.map(n => +n)
		const from = matrix[moveFrom];
		const to = matrix[moveTo];
		if (part === 1) {
			for (i = 0; i < amount; i++) {
				to.unshift(from[i])
				matrix[moveFrom] = from.slice(i + 1, from.length);
			}
		} else {
			const ordered = []
			for (i = 0; i < amount; i++) {
				ordered.push(from[i])
				matrix[moveFrom] = from.slice(i + 1, from.length);
			}
			if (to) to.unshift(...ordered)
		}
	}
	return matrix
}

const getCratesOnTop = (finalStackOrder) => {
	return finalStackOrder.reduce((acc, [first]) => {
		acc += first
		return acc
	}, '')
};

const getResult = (part) => {
	const { moves, matrix } = parsedData()
	const finalStackOrder = makeMoves(part, moves, matrix)
	return getCratesOnTop(finalStackOrder)
}

console.log(getResult(1));
console.log(getResult(2));




