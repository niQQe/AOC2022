const fs = require('fs');

const input = fs.readFileSync('day8-input.txt', 'utf8').split`\n`.map(v => v.split``).map(r => r.filter(v => v != '\r')).map(v => v.map(v => +v))

const checkLeft = (i, j) => {
	const trees = []
	let scenicScore = 0
	for (let k = j - 1; ; k--) {
		trees.push(input[i][k]);
		if (k == 0) break
	}
	for (let k = j - 1; ; k--) {
		if (input[i][k] >= input[i][j]) {
			scenicScore++
			break
		} else {
			scenicScore++
		}
		if (k == 0) break
	}
	return {
		isCovered: trees.every(n => n < input[i][j]),
		scenicScore: scenicScore
	}
};

const checkUp = (i, j) => {
	const trees = []
	let scenicScore = 0
	for (let k = i - 1; ; k--) {
		trees.push(input[k][j]);
		if (k == 0) break
	}
	for (let k = i - 1; ; k--) {
		if (input[k][j] >= input[i][j]) {
			scenicScore++
			break
		} else {
			scenicScore++
		}
		if (k == 0) break
	}
	return {
		isCovered: trees.every(n => n < input[i][j]),
		scenicScore: scenicScore
	}
};

const checkRight = (i, j) => {
	const trees = []
	let scenicScore = 0
	for (let k = j + 1; k < input[i].length; k++) {
		trees.push(input[i][k]);
	}
	for (let k = j + 1; k < input[i].length; k++) {
		if (input[i][k] >= input[i][j]) {
			scenicScore++
			break
		} else {
			scenicScore++
		}
	}
	return {
		isCovered: trees.every(n => n < input[i][j]),
		scenicScore: scenicScore
	}
};

const checkDown = (i, j) => {
	const trees = []
	let scenicScore = 0
	for (let k = i + 1; k < input.length; k++) {
		trees.push(input[k][j]);
	}
	for (let k = i + 1; k < input.length; k++) {
		if (input[k][j] >= input[i][j]) {
			scenicScore++
			break
		} else {
			scenicScore++
		}
	}
	return {
		isCovered: trees.every(n => n < input[i][j]),
		scenicScore: scenicScore
	}
};

const getResult = () => {
	let treesNotCovered = 0
	let scenicScore = []
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			if (i != 0 && i != input.length - 1) {
				if (j != 0 && j != input[i].length - 1) {
					const isCovered = [checkLeft(i, j).isCovered, checkRight(i, j).isCovered, checkUp(i, j).isCovered, checkDown(i, j).isCovered].every(v => !v)
					scenicScore.push([checkLeft(i, j).scenicScore, checkRight(i, j).scenicScore, checkUp(i, j).scenicScore, checkDown(i, j).scenicScore].flat().reduce((a, b) => a * b))
					if (!isCovered) treesNotCovered++
				}
			}
		}
	}
	return {
		resultPart1: treesNotCovered + (input.length * 4) - 4,
		resultPart2: scenicScore.sort((a, b) => b - a)[0]
	}
}

const { resultPart1, resultPart2 } = getResult()

console.log(resultPart1, resultPart2);
