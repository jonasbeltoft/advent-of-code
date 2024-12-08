// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('08.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var map: string[][] = s.trim().split('\n').map(x => x.trim().split(''))

for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x].includes('.')) {
			continue
		}
		let freq = map[y][x][0]
		let coords = get_freq_coords(freq, y, x)
		for (let coord of coords) {
			let antinode = get_antinode([y, x], coord)
			if (antinode.length === 0) continue
			map[antinode[0]][antinode[1]] += '#'
		}
	}
}

function get_antinode(origin: number[], target: number[]): number[] {
	let [oy, ox] = origin
	let [ty, tx] = target
	let [dy, dx] = [ty - oy, tx - ox]
	let [y, x] = [oy - dy, ox - dx]
	if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
		return []
	}
	return [y, x]
}

function get_freq_coords(_freq: string, _y: number, _x: number): number[][] {
	let coords: number[][] = []
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x].includes(_freq) && (y !== _y && x !== _x)) {
				coords.push([y, x])
			}
		}
	}
	return coords
}

console.log(map.flat(2).reduce((acc, val) => val.includes('#') ? acc + 1 : acc, 0))