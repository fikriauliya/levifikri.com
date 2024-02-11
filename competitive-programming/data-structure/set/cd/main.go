package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	for {
		scanner.Scan()
		line := scanner.Text()
		parts := strings.Split(line, " ")
		n, _ := strconv.Atoi(parts[0])
		m, _ := strconv.Atoi(parts[1])

		if n == 0 && m == 0 {
			break
		}

		nums := make(map[int]bool)

		for i := 0; i < n; i++ {
			scanner.Scan()
			num, _ := strconv.Atoi(scanner.Text())
			nums[num] = true
		}

		count := 0
		for i := 0; i < m; i++ {
			scanner.Scan()
			num, _ := strconv.Atoi(scanner.Text())
			if nums[num] {
				count++
			}
		}

		fmt.Println(count)
	}
}
