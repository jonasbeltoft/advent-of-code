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
		let freq_coords = get_freq_coords(freq, y, x)
		for (let freq_coord of freq_coords) {
			let antinodes = get_antinodes([y, x], freq_coord)
			if (antinodes.length === 0) continue
			for (let antinode of antinodes) {
				map[antinode[0]][antinode[1]] += '#'
			}
		}
	}
}

function get_antinodes(origin: number[], target: number[]): number[][] {
	let [oy, ox] = JSON.parse(JSON.stringify(origin))
	let [ty, tx] = target
	let [dy, dx] = [ty - oy, tx - ox]
	let nodes: number[][] = []
	// negatives
	while (true) {
		let [y, x] = [oy - dy, ox - dx]
		if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
			break
		}
		nodes.push([y, x])
		oy = y
		ox = x
	}

	let [poy, pox] = JSON.parse(JSON.stringify(origin))
	// positives
	while (true) {
		let [y, x] = [poy + dy, pox + dx]
		if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
			break
		}
		nodes.push([y, x])
		poy = y
		pox = x
	}
	return nodes
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