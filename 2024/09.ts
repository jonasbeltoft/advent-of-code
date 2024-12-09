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
	let left = 0
	let right = input.length - 1

	while (left < right) {
		if (Number.isNaN(input[left])) {
			while (true) {
				if (Number.isNaN(input[right])) {
					right--
				} else {
					break
				}
			}
			input[left] = input[right]
			input[right] = NaN
			right--
		}
		left++
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
	while (i < input.length) {
		if (Number.isNaN(input[i])) break

		sum += i * input[i]
		i++
	}
	return sum
}