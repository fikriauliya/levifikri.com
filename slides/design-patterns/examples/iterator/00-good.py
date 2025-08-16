# Good example - with Iterator pattern

class BookIterator:
    def __init__(self, books):
        self._books = books
        self._index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self._index < len(self._books):
            book = self._books[self._index]
            self._index += 1
            return book
        raise StopIteration


class BookShelf:
    def __init__(self):
        self._books = []
    
    def add_book(self, book):
        self._books.append(book)
    
    def __iter__(self):
        return BookIterator(self._books)


# Client code doesn't need to know internal structure
shelf = BookShelf()
shelf.add_book("Design Patterns")
shelf.add_book("Clean Code")
shelf.add_book("Refactoring")

# Clean iteration without exposing internals
for book in shelf:
    print(f"Book: {book}")

# Can't modify internal state - better encapsulation!