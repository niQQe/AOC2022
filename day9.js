const fs = require('fs');
const input = fs.readFileSync('day9-input.txt', 'utf-8').split`\n`.map(v => v.split` `.map(v => +v ? +v : v))

let headPosition = [0, 0]
let tailPosition = [0, 0]

const isAdjacent = (headY, headX) => {
	const [tailY, tailX] = tailPosition
	const tail = `${tailY},${tailX}`,
		  right = `${headY},${headX + 1}` === tail,
		  rightDown = `${headY + 1},${headX + 1}` === tail,
		  rightUp = `${headY - 1},${headX + 1}` === tail,
		  left = `${headY},${headX - 1}` === tail,
		  leftUp = `${headY - 1},${headX - 1}` === tail,
		  leftDown = `${headY + 1},${headX - 1}` === tail,
		  down = `${headY + 1},${headX}` === tail,
		  up = `${headY - 1},${headX}` === tail,
		  overlapping = `${headY},${headX}` === tail

	return [right, left, down, up, rightDown, rightUp, leftDown, leftUp, overlapping].some(r => r)
};
resultPart1 = input.reduce((result, move) => {
	const [dir, steps] = move
	const [hy, hx] = headPosition
	switch (dir) {
		case 'R': {
			for (let step = 0; step < steps; step++) {
				headPosition[1]++
				if (isAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition = [headPosition[0], headPosition[1] - 1]
				result.add(`${hy},${headPosition[1] - 1}`)
			}
			break;
		}
		case 'U': {
			for (let step = 0; step < steps; step++) {
				headPosition[0]--
				if (isAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition = [headPosition[0] + 1, headPosition[1]]
				result.add(`${headPosition[0] + 1},${hx}`)
			}
			break;
		}
		case 'D': {
			for (let step = 0; step < steps; step++) {
				headPosition[0]++
				if (isAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition = [headPosition[0] - 1, headPosition[1]]
				result.add(`${headPosition[0] - 1},${hx}`)
			}
			break;
		}
		case 'L': {
			for (let step = 0; step < steps; step++) {
				headPosition[1]--
				if (isAdjacent(headPosition[0], headPosition[1])) continue
				tailPosition = [headPosition[0], headPosition[1] + 1]
				result.add(`${hy},${headPosition[1] + 1}`)
			}
			break;
		}
	}
	result.add('0,0')
	return result
}, new Set()).size

console.log(resultPart1);