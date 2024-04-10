package main

import (
	"errors"
	"fmt"
	"math"
)

func getSquareRoot(x float64) (float64, error) {
	if x < 0 {
		return 0, errors.New("cannot calculate square root of negative number")
	}
	return math.Sqrt(x), nil
}

func doubleValue(x float64) (float64, error) {
	if x > 1000 {
		return 0, errors.New("input too large")
	}
	return x * 2, nil
}

func convertToString(x float64) (string, error) {
	if x > 500 {
		return "", errors.New("value too large to convert to string")
	}
	return fmt.Sprintf("%.2f", x), nil
}

func processValue(x float64) (string, error) {
	sqrt, err := getSquareRoot(x)
	if err != nil {
		return "", err
	}

	doubled, err := doubleValue(sqrt)
	if err != nil {
		return "", err
	}

	str, err := convertToString(doubled)
	if err != nil {
		return "", err
	}

	return "Result: " + str, nil
}

func main() {
	result, err := processValue(16)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(result)
}
