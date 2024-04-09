# Define classes for each message type
class TextMessage:
    def __init__(self, text):
        self.text = text


class ImageMessage:
    def __init__(self, url, caption):
        self.url = url
        self.caption = caption


class VideoMessage:
    def __init__(self, video_url, thumbnail_url):
        self.video_url = video_url
        self.thumbnail_url = thumbnail_url


# Create a function to process messages
def process_message(message):
    if isinstance(message, TextMessage):
        print(f"Text message: {message.text}")
    elif isinstance(message, ImageMessage):
        print("Image message:")
        print(f"URL: {message.url}")
        print(f"Caption: {message.caption}")
    elif isinstance(message, VideoMessage):
        print("Video message:")
        print(f"Video URL: {message.video_url}")
        print(f"Thumbnail URL: {message.thumbnail_url}")
    else:
        print("Unknown message type")


# Example usage
text_message = TextMessage("Hello, world!")
image_message = ImageMessage(
    "https://example.com/image.jpg", "A beautiful sunset")
video_message = VideoMessage(
    "https://example.com/video.mp4", "https://example.com/thumbnail.jpg")

process_message(text_message)
process_message(image_message)
process_message(video_message)
