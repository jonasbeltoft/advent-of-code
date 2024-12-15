// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('10.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var map: string[][] = s.trim().split('\n').map(x => x.trim().split(''))

let sum = 0

// For each 0
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x] !== '0') {
			continue
		}
		// traverse the map
		let val = traverse_map(y, x, 0)
		sum += val.length
	}
}

console.log(sum)

function traverse_map(y: number, x: number, level: number): number[][] {
	let coords: number[][] = []

	if (level === 9) {
		return [
			[y, x]
		]
	}

	// check surroundings

	// check up
	if (y > 0 && parseInt(map[y - 1][x]) === level + 1) {
		coords = coords.concat(traverse_map(y - 1, x, level + 1))
	}
	// check down
	if (y < map.length - 1 && parseInt(map[y + 1][x]) === level + 1) {
		coords = coords.concat(traverse_map(y + 1, x, level + 1))
	}
	// check left
	if (x > 0 && parseInt(map[y][x - 1]) === level + 1) {
		coords = coords.concat(traverse_map(y, x - 1, level + 1))
	}
	// check right
	if (x < map[y].length - 1 && parseInt(map[y][x + 1]) === level + 1) {
		coords = coords.concat(traverse_map(y, x + 1, level + 1))
	}

	return coords
}