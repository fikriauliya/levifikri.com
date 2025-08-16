class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []
    
    def add_child(self, child):
        self.children.append(child)
    
    def __iter__(self):
        return TreeIterator(self)


class TreeIterator:
    def __init__(self, root):
        self.stack = [root]
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if not self.stack:
            raise StopIteration
        
        node = self.stack.pop()
        # Add children in reverse order for depth-first traversal
        self.stack.extend(reversed(node.children))
        return node.value


# Usage
root = TreeNode("A")
b = TreeNode("B")
c = TreeNode("C")
d = TreeNode("D")
e = TreeNode("E")

root.add_child(b)
root.add_child(c)
b.add_child(d)
b.add_child(e)

# Now we can use standard Python iteration
print("Tree values using iterator:")
for value in root:
    print(value)

# Works with all Python iteration tools
all_values = list(root)
print("\nAll values:", all_values)

# Can use in comprehensions
uppercase = [v.upper() for v in root]
print("Uppercase:", uppercase)