# Bad example - without Iterator pattern

class BookShelf:
    def __init__(self):
        self.books = []
    
    def add_book(self, book):
        self.books.append(book)
    
    def get_books(self):
        return self.books


# Client code has to know internal structure
shelf = BookShelf()
shelf.add_book("Design Patterns")
shelf.add_book("Clean Code")
shelf.add_book("Refactoring")

# Direct access to internal list
books = shelf.get_books()
for i in range(len(books)):
    print(f"Book {i + 1}: {books[i]}")

# Client can modify internal state
books.clear()  # This breaks encapsulation!