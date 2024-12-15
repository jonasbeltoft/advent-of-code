package main

import (
	"fmt"
	"math"
)

type Pair struct {
	stone uint64
	iter  int
}

var knowns = make(map[Pair]int)

func numDigits(n uint64) int {
	return int(math.Floor(math.Log10(float64(n)))) + 1
}

func splitNumber(n uint64) (uint64, uint64) {
	digits := numDigits(n)
	halfDigits := digits / 2
	divisor := uint64(math.Pow10(halfDigits))
	left := n / divisor
	right := n % divisor
	return left, right
}

func processStones(stone uint64, iterations int, sum int) int {
	if val, ok := knowns[Pair{stone, iterations}]; ok {
		return val
	}

	ret := 0
	if iterations == 0 {
		ret = 1
	} else if stone == 0 {
		ret = processStones(1, iterations-1, sum)
	} else if numDigits(stone)%2 == 0 {
		l, r := splitNumber(stone)
		left := processStones(l, iterations-1, sum)
		right := processStones(r, iterations-1, sum)
		ret = left + right
	} else {
		ret = processStones(stone*2024, iterations-1, sum)
	}
	knowns[Pair{stone, iterations}] = ret
	return ret
}

func main() {
	stones := []uint64{8435, 234, 928434, 14, 0, 7, 92446, 8992692}
	sum := 0
	for i, stone := range stones {
		fmt.Println("stone: ", i)
		sum += processStones(stone, 75, 0)
	}
	fmt.Println(sum)
}
