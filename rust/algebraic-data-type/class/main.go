package main

import "fmt"

// Define an interface for the message
type Message interface {
	process()
}

// Define structs for each message type
type TextMessage struct {
	Text string
}

type ImageMessage struct {
	URL     string
	Caption string
}

type VideoMessage struct {
	VideoURL     string
	ThumbnailURL string
}

// Implement the process method for each message type
func (m TextMessage) process() {
	fmt.Printf("Text message: %s\n", m.Text)
}

func (m ImageMessage) process() {
	fmt.Println("Image message:")
	fmt.Printf("URL: %s\n", m.URL)
	fmt.Printf("Caption: %s\n", m.Caption)
}

func (m VideoMessage) process() {
	fmt.Println("Video message:")
	fmt.Printf("Video URL: %s\n", m.VideoURL)
	fmt.Printf("Thumbnail URL: %s\n", m.ThumbnailURL)
}

// Create a function to process messages
func processMessage(message Message) {
	message.process()
}

func main() {
	// Example usage
	textMessage := TextMessage{Text: "Hello, world!"}
	imageMessage := ImageMessage{
		URL:     "https://example.com/image.jpg",
		Caption: "A beautiful sunset",
	}
	videoMessage := VideoMessage{
		VideoURL:     "https://example.com/video.mp4",
		ThumbnailURL: "https://example.com/thumbnail.jpg",
	}

	processMessage(textMessage)
	processMessage(imageMessage)
	processMessage(videoMessage)
}
