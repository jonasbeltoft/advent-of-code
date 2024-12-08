// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('05.txt', 'utf8')
} catch (err) {
	console.error(err)
}

// key must be before value in output
var rules: Map<number, number[]> = new Map()
var updates: number[][] = []

s.trim().split('\n').forEach((line, i) => {
	if (line.includes('|')) {
		let [k, v] = line.trim().split('|').map(x => parseInt(x))
		if (rules.has(k)) {
			let arr = rules.get(k)
			arr!.push(v)
			rules.set(k, arr!)
		} else {
			rules.set(k, [v])
		}
	} else if (line.trim() !== "") {
		updates.push(line.trim().split(',').map(x => parseInt(x)))
	}
})

var result = 0

for (let update of updates) {
	if (!check_update(update)) {

		// order the pages
		update.sort((a, b) => {
			let page_limits = rules.get(a)
			if (page_limits?.includes(b)) return -1
			return 1
		})

		let page = update[(update.length - 1) / 2]
		result += page
	}
}

function check_update(update: number[]): boolean {
	for (let page of update) {
		if (rules.has(page)) {
			let page_limits = rules.get(page)!
			if (update.slice(0, update.indexOf(page)).filter(p => page_limits.includes(p)).length !== 0) return false
		}
	}
	return true
}

console.log(result)