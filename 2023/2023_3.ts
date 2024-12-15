// To run:
// npx tsx .\2023_3.ts

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
		if ("0123456789".includes(s1[i][j])) {
			if (check_suroundings(i, j)) {
				nums.push(get_number(i, j))
				// Skip the rest of the number
				while (j < s1[i].length && "0123456789".includes(s1[i][j])) {
					j++
				}
			}
		}
	}
}


//nums.length != 0 && console.log(nums.reduce((a, b) => a + b))

function check_suroundings(i: number, j: number): boolean {
	for (let y = i - 1; y <= i + 1; y++) {
		for (let x = j - 1; x <= j + 1; x++) {
			if (y < 0 || x < 0 || y >= s1.length || x >= s1[0].length) {
				continue
			}
			if (!"0123456789.".includes(s1[y][x])) {
				return true
			}
		}
	}
	return false
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

// def check_suroundings() -> bool:
// pass

// def get_number() -> int:
// pass

// for x, i in enumerate(s1):
// 	for y, char in enumerate(i):
// 		if char == '.':
// 			continue
// 		elif char.isdecimal():
// continue
// 		else:
// pass			
