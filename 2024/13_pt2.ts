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
	let [ay, ax] = game.button_a
	let [by, bx] = game.button_b
	let [py, px] = game.prize


	let ca = ((px * by) - (py * bx)) / ((ax * by) - (ay * bx))
	let cb = (px - (ax * ca)) / bx

	if (Number.isInteger(ca) && Number.isInteger(cb)) solution += ca * B_A + cb * B_B
}

console.log(solution)