// To run:
// npx tsx .\foo.ts

var s = ""

import * as fs from 'fs'
try {
	s = fs.readFileSync('2023_3_input.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var s1 = s.trim().split('\n').map(list => list.trim().split(''))

// for (let i of s1) {
// 	console.log(i.join(' '))
// }

var nums: number[] = []

for (let i = 0; i < s1.length; i++) {
	for (let j = 0; j < s1[i].length; j++) {
		if ("*".includes(s1[i][j])) {

			let coords = check_suroundings(i, j)
			if (coords.length > 1) {
				//console.log(coords)
				console.log(coords)
				for (let h = 1; h < coords.length; h++) {
					let [y, x] = coords[h]
					if (y == coords[h - 1][0] && x - coords[h - 1][1] == 1) {
						coords.splice(h - 1, 1)
						h--
					}
				}
				let gears: number[] = []
				for (let [y, x] of coords) {
					gears.push(get_number(y, x))
				}

				//console.log(gears)
				if (gears.length != 2) {
					continue
				}
				nums.push(gears[0] * gears[1])
			}
		}
	}
}

nums.length != 0 && console.log(nums.reduce((a, b) => a + b))

function check_suroundings(i: number, j: number): number[][] {
	let nums: number[][] = []
	for (let y = i - 1; y <= i + 1; y++) {
		for (let x = j - 1; x <= j + 1; x++) {
			if (y < 0 || x < 0 || y >= s1.length || x >= s1[0].length) {
				continue
			}
			if ("0123456789".includes(s1[y][x])) {
				nums.push([y, x])
			}
		}
	}
	return nums
}

function get_number(i: number, j: number): number {
	let num = ""
	let startX = j
	while (startX > 0 && "0123456789".includes(s1[i][startX - 1])) {
		startX--
	}
	while (startX < s1[i].length && "0123456789".includes(s1[i][startX])) {
		num += s1[i][startX]
		startX++
	}
	return parseInt(num)
}