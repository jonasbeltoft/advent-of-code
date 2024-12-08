// npx tsx <file>

var s = ""

import { readFileSync } from 'fs'
try {
	s = readFileSync('06.txt', 'utf8')
} catch (err) {
	console.error(err)
}

var map: string[][] = s.trim().split('\n').map(x => x.trim().split(''))

var position = { x: 0, y: 0, direction: 0 }

// Find start
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x] === '^') {
			position = { x: x, y: y, direction: 0 }
			break
		}
	}
}

// 0 = UP 1 = RIGHT 2 = DOWN 3 = LEFT
function detect_loop(_map: string[][], _position: { x: number, y: number, direction: number }): boolean {
	let [dy, dx] = [[-1, 0], [0, 1], [1, 0], [0, -1]][_position.direction]
	if (_position.y + dy < 0 || _position.y + dy >= _map.length || _position.x + dx < 0 || _position.x + dx >= _map[_position.y].length) {
		return false
	} else {
		_map[_position.y + dy][_position.x + dx] = '#'
	}

	while (true) {
		// mark the tile we're on
		_map[_position.y][_position.x] += _position.direction.toString()
		let next_tile = get_next_tile(_map, _position)

		if (next_tile === '') {
			return false
		} else if (next_tile.includes(_position.direction.toString())) {
			return true
		} else if (next_tile !== '#') {
			let [dy, dx] = [[-1, 0], [0, 1], [1, 0], [0, -1]][_position.direction]
			_position.x += dx
			_position.y += dy
		} else if (next_tile === '#') {
			// if it's an obstacle, turn right
			_position.direction = (_position.direction + 1) % 4
		}

	}
}

function get_next_tile(_map: string[][], _position: { x: number, y: number, direction: number }): string {
	let [dy, dx] = [[-1, 0], [0, 1], [1, 0], [0, -1]][_position.direction]
	if (_position.y + dy < 0 || _position.y + dy >= _map.length || _position.x + dx < 0 || _position.x + dx >= _map[_position.y].length) return ''
	return _map[_position.y + dy][_position.x + dx]
}


var result = 0
while (true) {
	let next_tile = get_next_tile(map, position)

	if (next_tile === '.' && detect_loop(JSON.parse(JSON.stringify(map)), JSON.parse(JSON.stringify(position)))) result++

	if (next_tile === '') {
		break
	} else if (next_tile !== '#') {
		let [dy, dx] = [[-1, 0], [0, 1], [1, 0], [0, -1]][position.direction]
		position.x += dx
		position.y += dy
	} else if (next_tile === '#') {
		// if it's an obstacle, turn right
		position.direction = (position.direction + 1) % 4
	}

	// mark the tile we're on
	map[position.y][position.x] += position.direction.toString()
}

console.log(result)