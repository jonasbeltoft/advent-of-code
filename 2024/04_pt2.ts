// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('04.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var chars: string[][] = []

s.trim().split('\n').forEach((line, i) => {
	chars[i] = line.trim().split('')
})

var result = 0

var masks = [
	[
		["M", "", "S"],
		["", "A", ""],
		["M", "", "S"]
	],
	[
		["S", "", "S"],
		["", "A", ""],
		["M", "", "M"]
	],
	[
		["M", "", "M"],
		["", "A", ""],
		["S", "", "S"]
	],
	[
		["S", "", "M"],
		["", "A", ""],
		["S", "", "M"]
	]
]

for (let y = 0; y < chars.length; y++) {
	for (let x = 0; x < chars[y].length; x++) {
		if (chars[y][x] === 'A') {
			if (apply_mask(x, y)) result++
		}
	}
}

console.log(result)

function apply_mask(x: number, y: number): boolean {
	if (x === 0 || y === 0 || y === chars.length - 1 || x === chars[y].length - 1) return false

	for (let mask of masks) {
		if (mask[0][0] === chars[y - 1][x - 1] && mask[0][2] === chars[y - 1][x + 1] &&
			mask[2][0] === chars[y + 1][x - 1] && mask[2][2] === chars[y + 1][x + 1]) {
			return true
		}
	}
	return false
}