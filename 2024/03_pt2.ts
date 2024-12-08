var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('03.txt', 'utf8')
} catch (err) {
	console.error(err)
}

const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g

var muls = s.trim().match(regex)

var result = 0
var allowed = true

muls!.forEach(mul => {
	if (mul === 'do()') {
		allowed = true
		return
	} else if (mul === "don't()") {
		allowed = false
		return
	}
	if (!allowed) return
	let [a, b] = mul.slice(4, -1).split(',').map(x => parseInt(x))
	result += a * b
})

console.log(result)