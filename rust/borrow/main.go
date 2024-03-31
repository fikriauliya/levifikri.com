package main

import (
	"fmt"
	"slices"
)

type Person struct {
	name string
	age  uint8
}

func first(v *[]Person) *Person {
	return &(*v)[0]
}

func testSlices() {
	people := []Person{
		{
			name: "Alice",
			age:  30,
		},
		{
			name: "Bob",
			age:  25,
		},
	}

	firstPerson := first(&people)
	fmt.Println(firstPerson.name)

	// remove the first element
	_ = slices.Delete(people, 0, 1)

	fmt.Println(firstPerson.name)
}

func main() {
	testSlices()
}
