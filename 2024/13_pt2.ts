// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('13.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var lines: string[] = s.trim().split('\n').map(x => x.trim())

const B_A = 3
const B_B = 1

// [y, x] format
var games: { button_a: number[], button_b: number[], prize: number[] }[] = []

for (let i = 0; i < lines.length; i++) {
	let line = lines[i]
	let elems = line.split(' ')
	let index = Math.floor(i / 4)
	elems.reverse()

	if (i % 4 === 0) {
		games.push({ button_a: [], button_b: [], prize: [] })
		games[index].button_a = [parseInt(elems[0].split('+')[1].trim()), parseInt(elems[1].split('+')[1].trim())]
	} else if (i % 4 === 1) {
		games[index].button_b = [parseInt(elems[0].split('+')[1].trim()), parseInt(elems[1].split('+')[1].trim())]
	} else if (i % 4 === 2) {
		games[index].prize = [parseInt(elems[0].split('=')[1].trim()) + 10000000000000, parseInt(elems[1].split('=')[1].trim()) + 10000000000000]
	} else if (i % 4 === 3) {
		// empty
	}
}

var solution = 0

for (let game of games) {
	let button_a = game.button_a
	let button_b = game.button_b
	let prize = game.prize

	let temp_solutions: { a_count: number, b_count: number }[] = []

	const max_a_x = Math.floor(prize[1] / button_a[1])
	let a_count = max_a_x
	let b_count = 0
	while (a_count >= 0) {
		let coords = [a_count * button_a[0] + b_count * button_b[0], a_count * button_a[1] + b_count * button_b[1]]

		if (coords[0] === prize[0] && coords[1] === prize[1]) {
			temp_solutions.push({ a_count, b_count })
			a_count--
		} else if (coords[0] > prize[0] || coords[1] > prize[1]) {
			a_count--
		} else {
			b_count++
		}
	}

	if (temp_solutions.length === 0) {
		continue
	}
	//console.log(temp_solutions);
	const min = temp_solutions.map(x => x.a_count * B_A + x.b_count * B_B).sort()[0]
	solution += min
	console.log(min);
}

console.log(solution)