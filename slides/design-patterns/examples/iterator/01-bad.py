class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []
    
    def add_child(self, child):
        self.children.append(child)


def print_tree(node, level=0):
    print("  " * level + str(node.value))
    for child in node.children:
        print_tree(child, level + 1)


def find_all_values(node, values=None):
    if values is None:
        values = []
    values.append(node.value)
    for child in node.children:
        find_all_values(child, values)
    return values


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

# Print tree structure
print_tree(root)

# Get all values (requires custom function)
all_values = find_all_values(root)
print("\nAll values:", all_values)

# No standard way to iterate through tree
# Must write custom traversal logic each time