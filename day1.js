const fs = require('fs');

const input = fs.readFileSync('day1-input.txt', 'utf8')
	.split`\r\n`
	.map(r => { if (!r.length) r = 'x'; return r })
	.join` `
	.split`x`
	.map(r => r.split` `.map(n => +n).reduce((a, b) => a + b))

// Part 1
console.log(Math.max(...input));

// Part 2
console.log(input.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b));
