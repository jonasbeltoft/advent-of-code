// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('09.txt', 'utf8')
} catch (err) {
	console.error(err)
}

let input = s.trim().split('').map(x => x === '.' ? NaN : parseInt(x))
// Gen disk space

let disk_space = gen_disk_space(input)
// Compact disk space

let compact = compact_disk_space(disk_space)

console.log(calc_checksum(compact))

function compact_disk_space(input: number[]): number[] {

	for (let i = input.length - 1; i >= 0; i--) {
		if (Number.isNaN(input[i])) continue
		// get left block
		let left = i
		while (left > 0 && input[left - 1] === input[i]) {
			left--
		}

		let block_size = i - left + 1

		for (let j = 0; j < left; j++) {
			if (!Number.isNaN(input[j])) continue

			let empty_right = j
			while (empty_right < left && Number.isNaN(input[empty_right + 1])) {
				empty_right++
			}
			let empty_size = empty_right - j + 1
			if (empty_size >= block_size) {
				for (let k = j; k <= j + block_size - 1; k++) {
					input[k] = input[i]
				}
				for (let k = left; k <= i; k++) {
					input[k] = NaN
				}

				break
			}
			j = empty_right
		}
		i = left
	}

	return input
}

function gen_disk_space(input: number[]): number[] {
	let result: number[] = []
	let count = 0
	for (let i = 0; i < input.length; i++) {

		if (i % 2 === 0) {
			result.push(...Array(input[i]).fill(count))
			count++
		} else {
			result.push(...Array(input[i]).fill(NaN))
		}
	}
	return result
}

function calc_checksum(input: number[]): number {
	let sum = 0
	let i = 0
	//console.log(input.map(x => Number.isNaN(x) ? '.' : x).join(''))
	for (let i = 0; i < input.length; i++) {
		if (Number.isNaN(input[i])) continue

		sum += i * input[i]
	}
	return sum
}