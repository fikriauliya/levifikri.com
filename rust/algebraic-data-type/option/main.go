package main

import "fmt"

type User struct {
	Username string
	ID       int
}

type Post struct {
	UserID  int
	Title   string
	Content string
}

func getUser(userDB []User, id int) *User {
	for _, u := range userDB {
		if u.ID == id {
			return &u
		}
	}
	return nil
}

func getPost(postDB []Post, id int) *Post {
	for _, p := range postDB {
		if p.UserID == id {
			return &p
		}
	}
	return nil
}

func main() {
	userDB := []User{
		{
			Username: "levi",
			ID:       1,
		},
	}

	postDB := []Post{
		{
			UserID:  1,
			Title:   "Hello, world",
			Content: "This is my first post",
		},
	}

	user := getUser(userDB, 2)
	post := getPost(postDB, user.ID)
	fmt.Println(post.Title)
}
