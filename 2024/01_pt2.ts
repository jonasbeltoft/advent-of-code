var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('01.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var left: number[] = [], right: number[] = [];

s.trim().split('\n').forEach(list => {
	let a = list.trim().split('   ')
	left.push(parseInt(a[0]))
	right.push(parseInt(a[1]))
})



let result = left.map((val) => {
	let amount = right.filter((val2) => val2 === val).length
	return amount * val
}).reduce((a, b) => a + b)

console.log(result)
