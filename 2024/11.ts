// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('11.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var stones: number[] = s.trim().split(' ').map(x => parseInt(x))

for (let i = 0; i < 25; i++) {


	for (let j = 0; j < stones.length; j++) {
		let stone = stones[j]
		if (stone === 0) {
			stones[j] = 1
		} else if (stone.toString().length % 2 === 0) {
			let left = parseInt(stone.toString().substring(0, stone.toString().length / 2))
			let right = parseInt(stone.toString().substring(stone.toString().length / 2))
			stones[j] = left
			// instert right at j + 1
			stones.splice(j + 1, 0, right)
			j++
		} else {
			stones[j] = stone * 2024
		}
	}
}

console.log(stones.length)