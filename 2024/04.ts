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

for (let y = 0; y < chars.length; y++) {
	for (let x = 0; x < chars[y].length; x++) {
		if (chars[y][x] === 'X') {
			result += check_xmas(x, y)
		}
	}
}

console.log(result)

function check_xmas(x: number, y: number): number {
	return check_target(x, y).length
}

// dir = [x, y] eg. [1, 0] = right
function check_target(_x: number, _y: number, target = 'M', dir: number[] = []): number[][] {
	let matches: number[][] = []
	if (target === '_') return [[_x, _y]]

	if (dir.length === 0) {
		for (let y = _y - 1; y <= _y + 1; y++) {
			for (let x = _x - 1; x <= _x + 1; x++) {
				if (x < 0 || y < 0 || y >= chars.length || x >= chars[y].length) continue
				if (chars[y][x] === target) matches.push(...check_target(x, y, "XMAS_".charAt("XMAS".indexOf(target) + 1), [x - _x, y - _y]))
			}
		}
	} else {
		let x = _x + dir[0]
		let y = _y + dir[1]
		if (x >= 0 && y >= 0 && y < chars.length && x < chars[y].length) {
			if (chars[y][x] === target) matches.push(...check_target(x, y, "XMAS_".charAt("XMAS".indexOf(target) + 1), dir))
		}
	}
	return matches
}
