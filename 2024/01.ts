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

left.sort()
right.sort()

var input: number[][] = []

for (let i = 0; i < left.length; i++) {
	input.push([left[i], right[i]])
}

let result = input.map(([a, b]) => Math.abs(a - b)).reduce((a, b) => a + b)

console.log(result)
