// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('06.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var map: string[][] = s.trim().split('\n').map(x => x.trim().split(''))

var guard: Map<string, number[]> = new Map(
	[		//[y, x]
		['^', [-1, 0]],
		['v', [1, 0]],
		['>', [0, 1]],
		['<', [0, -1]]
	]
)


// [y, x]
var position: number[] = [0, 0]
var direction: string = ''

// Find start
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (guard.has(map[y][x])) {
			position = [y, x]
			direction = map[y][x]
			break
		}
	}
}

// While position is within map
while (true) {
	let [y, x] = position
	let [dy, dx] = guard.get(direction)!

	// mark the tile we're on
	map[y][x] = 'X'

	// check the tile we point to
	if (y + dy < 0 || y + dy >= map.length || x + dx < 0 || x + dx >= map[y].length) {
		break
	}
	let next_tile = map[y + dy][x + dx]

	// if next is a space, move forward
	if (next_tile !== '#') {
		position = [y + dy, x + dx]
	} else if (next_tile === '#') {
		// if it's an obstacle, turn right
		if (direction === '^') {
			direction = '>'
		} else if (direction === '>') {
			direction = 'v'
		} else if (direction === 'v') {
			direction = '<'
		} else if (direction === '<') {
			direction = '^'
		}
	}
}

// count the X's
var result = 0
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x] === 'X') result++
	}
}

console.log(result)