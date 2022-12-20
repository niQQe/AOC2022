const fs = require('fs');
const input = fs.readFileSync('day11-input.txt', 'utf-8').split`\r\n`.map(v => v.trim()).filter(v => v)

const parsedData = input.reduce((monkeysObject, row, index) => {
	if (row.includes('Starting items:')) {
		const [, n,] = input[index - 1].split` `
		const [, items] = row.split`: `;
		const monkeyKey = n.slice(0, -1)
		monkeysObject.currentKey = monkeyKey
		monkeysObject.monkeys[monkeysObject.currentKey] = {
			items: items.split`,`.map(v => +v),
		}
	}
	if (row.includes('Operation:')) {
		const [, rule] = row.split`: `.map(v => v.slice(6, v.length).replace(/old/, '').trim())
		const [operator, value] = rule.split` `
		monkeysObject.monkeys[monkeysObject.currentKey] = {
			...monkeysObject.monkeys[monkeysObject.currentKey],
			operation: function (item) {
				this.inspectCount++;
				if (operator === '*' && value != 'old') return Math.floor((item * +value) / 3)
				else if (operator === '+' && value != 'old') return Math.floor((item + +value) / 3)
				else return Math.floor((item * item) / 3)
			}
		}
	}
	if (row.includes('Test:')) {
		const divisible = row.split` `.at(-1)
		monkeysObject.monkeys[monkeysObject.currentKey] = {
			...monkeysObject.monkeys[monkeysObject.currentKey],
			test: (item) => {
				return item % +divisible === 0
			}
		}
	}
	if (row.includes('If true:')) {
		const value = row.split``.at(-1)
		monkeysObject.monkeys[monkeysObject.currentKey] = {
			...monkeysObject.monkeys[monkeysObject.currentKey],
			ifTrue: value
		}
	}
	if (row.includes('If false:')) {
		const value = row.split``.at(-1)
		monkeysObject.monkeys[monkeysObject.currentKey] = {
			...monkeysObject.monkeys[monkeysObject.currentKey],
			ifFalse: value
		}
	}
	monkeysObject.monkeys[monkeysObject.currentKey] = {
		...monkeysObject.monkeys[monkeysObject.currentKey],
		startInspect: function () {
			const itemsToBeRemoved = []
			for (const item of this.items) {
				const evaluated = this.operation(item)
				if (this.test(evaluated)) {
					monkeysObject.monkeys[this.ifTrue].items.push(evaluated)
					itemsToBeRemoved.push(item)
				} else {
					monkeysObject.monkeys[this.ifFalse].items.push(evaluated)
					itemsToBeRemoved.push(item)
				}
			}
			this.items = this.items.filter(item => !itemsToBeRemoved.includes(item))
		}
	}
	monkeysObject.monkeys[monkeysObject.currentKey] = {
		...monkeysObject.monkeys[monkeysObject.currentKey],
		inspectCount: 0
	}
	return monkeysObject
}, {
	currentKey: 0,
	monkeys: {},
	levelOfMonkeyBusiness: function () {
		const [first, second] = Object.keys(this.monkeys).reduce((inspects, monkey) => {
			inspects.push(this.monkeys[monkey].inspectCount)
			return inspects
		}, []).sort((b, a) => a - b)
		return first * second
	}
})


const resultPart1 = () => {
	let round = 0
	while (round < 20) {
		for (const key in parsedData.monkeys) {
			parsedData.monkeys[key].startInspect()
		}
		round++
	}

	return parsedData.levelOfMonkeyBusiness()
}

console.log(resultPart1());


