// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('12.txt', 'utf8')
} catch (err) {
	console.error(err)
}


var map: string[][] = s.trim().split('\n').map(x => x.trim().split(''))

// [y, x] : fence_count
var used = new Map<string, number>()
let price = 0

for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (used.has("" + y + "," + x)) {
			continue
		}
		let region = expand_region(y, x, map[y][x])
		let score = calculate_region(region)

		price += region.length * score
	}
}

console.log(price)

function calculate_region(region: number[][]): number {
	let score = 0
	for (let i = 0; i < region.length; i++) {
		let [y, x] = region[i]
		score += used.get(("" + y + "," + x))!
	}
	return score
}

function expand_region(y: number, x: number, type: string): number[][] {
	if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
		return []
	}
	if (map[y][x] !== type) {
		return []
	}
	if (used.has("" + y + "," + x)) {
		return []
	}
	// calculate fence count for this position
	let fence_count = 0
	if (y === 0 || map[y - 1][x] !== type) {
		fence_count++
	}
	if (y === map.length - 1 || map[y + 1][x] !== type) {
		fence_count++
	}
	if (x === 0 || map[y][x - 1] !== type) {
		fence_count++
	}
	if (x === map[y].length - 1 || map[y][x + 1] !== type) {
		fence_count++
	}
	used.set("" + y + "," + x, fence_count)
	let region: number[][] = [[y, x]]
	if (y > 0 && map[y - 1][x] === type && !used.has("" + (y - 1) + "," + x)) {
		region = region.concat(expand_region(y - 1, x, type))
	}
	if (y < map.length - 1 && map[y + 1][x] === type && !used.has("" + (y + 1) + "," + x)) {
		region = region.concat(expand_region(y + 1, x, type))
	}
	if (x > 0 && map[y][x - 1] === type && !used.has("" + y + "," + (x - 1))) {
		region = region.concat(expand_region(y, x - 1, type))
	}
	if (x < map[y].length - 1 && map[y][x + 1] === type && !used.has("" + y + "," + (x + 1))) {
		region = region.concat(expand_region(y, x + 1, type))
	}

	return region
}