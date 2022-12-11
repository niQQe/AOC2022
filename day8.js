const fs = require('fs');

const input = fs.readFileSync('day8-input.txt', 'utf8').split`\n`.map(v => v.split``).map(r => r.filter(v => v != '\r')).map(v => v.map(v => +v))

const checkLeft = (rowId, columnId) => {
	const trees = []
	let scenicScore = 0
	for (let k = columnId - 1; k >= 0; k--) {
		trees.push(input[rowId][k]);
	}
	for (let k = columnId - 1; k >= 0; k--) {
		if (input[rowId][k] >= input[rowId][columnId]) {
			scenicScore++
			break
		}
		scenicScore++
	}
	return {
		neighboursLeft: trees.every(n => n < input[rowId][columnId]),
		leftScenicScore: scenicScore
	}
};

const checkUp = (rowId, columnId) => {
	const trees = []
	let scenicScore = 0
	for (let k = rowId - 1; k >= 0; k--) {
		trees.push(input[k][columnId]);
	}
	for (let k = rowId - 1; k >= 0; k--) {
		if (input[k][columnId] >= input[rowId][columnId]) {
			scenicScore++
			break
		}
		scenicScore++
	}
	return {
		neighboursUp: trees.every(n => n < input[rowId][columnId]),
		upScenicScore: scenicScore
	}
};

const checkRight = (rowId, columnId) => {
	const trees = []
	let scenicScore = 0
	for (let k = columnId + 1; k < input[columnId].length; k++) {
		trees.push(input[rowId][k]);
	}
	for (let k = columnId + 1; k < input[rowId].length; k++) {
		if (input[rowId][k] >= input[rowId][columnId]) {
			scenicScore++
			break
		}
		scenicScore++
	}
	return {
		neighboursRight: trees.every(n => n < input[rowId][columnId]),
		rightScenicScore: scenicScore
	}
};

const checkDown = (rowId, columnId) => {
	const trees = []
	let scenicScore = 0
	for (let k = rowId + 1; k < input.length; k++) {
		trees.push(input[k][columnId]);
	}
	for (let k = rowId + 1; k < input.length; k++) {
		if (input[k][columnId] >= input[rowId][columnId]) {
			scenicScore++
			break
		}
		scenicScore++
	}
	return {
		neighboursDown: trees.every(n => n < input[rowId][columnId]),
		downScenicScore: scenicScore
	}
};

const getResult = () => {
	let treesNotCovered = 0
	let scenicScore = []

	for (const [rowId, row] of input.entries()) {
		for (const [columnId] of row.entries()) {
			if (rowId != 0 && rowId != input.length - 1 && columnId != 0 && columnId != input.length - 1) {
				const { neighboursLeft, leftScenicScore } = checkLeft(rowId, columnId)
				const { neighboursRight, rightScenicScore } = checkRight(rowId, columnId)
				const { neighboursUp, upScenicScore } = checkUp(rowId, columnId)
				const { neighboursDown, downScenicScore } = checkDown(rowId, columnId)
				const isCovered = !neighboursLeft && !neighboursRight && !neighboursUp && !neighboursDown
				if (!isCovered) treesNotCovered++
				scenicScore.push([leftScenicScore, rightScenicScore, upScenicScore, downScenicScore].flat().reduce((a, b) => a * b))
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
