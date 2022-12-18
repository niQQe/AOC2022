const fs = require('fs');
const input = fs.readFileSync('day9-input.txt', 'utf-8').split`\n`.map(v => v.split` `.map(v => +v ? +v : v))

let headPosition = [0, 0]
let tailPosition = [0, 0]

const isNotAdjacent = (headY, headX) => {
	const [tailY, tailX] = tailPosition
	const tail = `${tailY},${tailX}`
	const right = `${headY},${headX + 1}` !== tail
	const rightDown = `${headY + 1},${headX + 1}` !== tail
	const rightUp = `${headY - 1},${headX + 1}` !== tail
	const left = `${headY},${headX - 1}` !== tail
	const leftUp = `${headY - 1},${headX - 1}` !== tail
	const leftDown = `${headY + 1},${headX - 1}` !== tail
	const down = `${headY + 1},${headX}` !== tail
	const up = `${headY - 1},${headX}` !== tail
	const overLapping = `${headY},${headX}` !== tail
	return [right, left, down, up, rightDown, rightUp, leftDown, leftUp, overLapping].every(r => r)
};

const resultPart1 = input.reduce((result, move) => {
	const [dir, steps] = move
	const [hy, hx] = headPosition
	switch (dir) {
		case 'R': {
			for (let step = 1; step <= steps; step++) {
				headPosition[1]++
				if (!isNotAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition[0] = headPosition[0]
				tailPosition[1] = headPosition[1] - 1
				result.add(`${hy},${headPosition[1] - 1}`)
			}
			break;
		}
		case 'U': {
			for (let step = 1; step <= steps; step++) {
				headPosition[0]--
				if (!isNotAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition[1] = headPosition[1]
				tailPosition[0] = headPosition[0] + 1
				result.add(`${headPosition[0] + 1},${hx}`)
			}
			break;
		}
		case 'D': {
			for (let step = 1; step <= steps; step++) {
				headPosition[0]++
				if (!isNotAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition[1] = headPosition[1]
				tailPosition[0] = headPosition[0] - 1
				result.add(`${headPosition[0] - 1},${hx}`)
			}
			break;
		}
		case 'L': {
			for (let step = 1; step <= steps; step++) {
				headPosition[1]--
				if (!isNotAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition[0] = headPosition[0]
				tailPosition[1] = headPosition[1] + 1
				result.add(`${hy},${headPosition[1] + 1}`)
			}
			break;
		}
	}
	result.add('0,0')
	return result
}, new Set()).size

console.log(resultPart1);