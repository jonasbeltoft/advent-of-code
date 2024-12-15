// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('07.txt', 'utf8')
} catch (err) {
	console.error(err)
}

const symbols = ['+', '*', '||']

var equations: { result: number, numbers: number[], match: boolean }[] = s.trim().split('\n').map(line => {
	let x = line.split(':')
	let numbers = x[1].trim().split(' ').map(x => parseInt(x))
	return { result: parseInt(x[0]), numbers: numbers, match: false }
})

function generatePermutations(length: number) {

	const permutations: string[][] = [];

	// Recursive helper function to build permutations
	function backtrack(current: string[]) {
		if (current.length === length) {
			permutations.push([...current]);
			return;
		}

		for (const symbol of symbols) {
			current.push(symbol);
			backtrack(current);
			current.pop();
		}
	}

	// Generate permutations
	backtrack([]);

	// Run calculate on each permutation
	return permutations
}

var perms = new Map<number, string[][]>()

for (let eq of equations) {
	if (!perms.has(eq.numbers.length - 1)) perms.set(eq.numbers.length - 1, generatePermutations(eq.numbers.length - 1))

	for (let perm of perms.get(eq.numbers.length - 1)!) {
		let result = calculate_equation(eq.numbers, perm)
		if (result === eq.result) {
			eq.match = true
		}
	}
}
// Example: Generate all permutations for an array of length 3

function calculate_equation(numbers: number[], operators: string[]): number {
	let result = numbers[0]
	for (let i = 0; i < operators.length; i++) {
		if (operators[i] === '+') {
			result += numbers[i + 1]
		} else if (operators[i] === '*') {
			result *= numbers[i + 1]
		} else if (operators[i] === '||') {
			result = parseInt(result.toString() + numbers[i + 1].toString())
		}
	}
	return result
}

console.log(equations.filter(eq => eq.match).reduce((acc, eq) => acc + eq.result, 0))