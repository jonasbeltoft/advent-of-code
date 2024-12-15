var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('02.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var reports: number[][] = []

var safe_reports: number = 0

s.trim().split('\n').forEach((list, i) => {
	reports[i] = list.trim().split(' ').map(x => parseInt(x))
})

// All in- or decreasing by 1-3

for (let report of reports) {
	let safe = true
	let direction = 0
	for (let i = 1; i < report.length; i++) {
		let diff = report[i] - report[i - 1]
		if (diff < 0 && (direction == -1 || direction == 0)) {
			direction = -1
		} else if (diff > 0 && (direction == 1 || direction == 0)) {
			direction = 1
		} else {
			safe = false
			break
		}
		if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
			safe = false
			break
		}
	}
	console.log(report, safe)
	if (safe) safe_reports++
}

console.log(safe_reports)