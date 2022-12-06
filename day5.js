const fs = require('fs');

const input = fs.readFileSync('day5-input.txt', 'utf-8').replace(/\r/g, ''.split`\n`)

const resultPart1 = input
	.split`\n`
	.slice(9, input.split`\n`.length)
	.map(v => v.split` `.filter(m => +m))
	.map((n) => {
		const [amount, from, to] = n
		return `${amount}-${+from - 1}-${+to - 1}`
	}).reduce((result, move,) => {
		const [amount, from, to] = move.split`-`
		const _from = result[from];
		const _to = result[to];
		for (i = 0; i < amount; i++) {
			_to.unshift(_from[i])
			result[from] = _from.slice(i + 1, _from.length);
		}
		return result
	}, Object.keys(keyedGroup = input.split`\n`.map(r => {
		const splitted = r.split` `
		if (r.includes('[')) return splitted.join`,`;
	}).filter(r => r).reduce((parsedData, row) => {
		row.split``.map((c, i) => {
			if (c.includes('[')) c = `${i}-${c}`
			return c
		})
			.join``
			.replace(/,+/g, ',')
			.split`,`
			.forEach(indexedSymbol => {
				const [index, symbol] = indexedSymbol.split`-`
				if (index) {
					if (!parsedData[index]) parsedData[index] = []
					parsedData[index].push(symbol)
				}
			})
		return parsedData
	}, {})).reduce((groups, key) => {
		groups.push(keyedGroup[key])
		return groups
	}, [])).reduce((chars, [first]) => {
		chars += first.replace(/[\[\]']+/g, '')
		return chars
	}, '')

console.log(resultPart1);
