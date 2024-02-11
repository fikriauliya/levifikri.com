from collections import deque

n = int(input())
gates = list(map(lambda x: x == "T", input().split()))
tokens = input().split()

stack = deque()
for token in tokens:
    if token == "+":
        a = stack.pop()
        b = stack.pop()
        stack.append(a or b)
    elif token == "*":
        a = stack.pop()
        b = stack.pop()
        stack.append(a and b)
    elif token == "-":
        a = stack.pop()
        stack.append(not a)
    else:
        a = gates[ord(token[0]) - ord("A")] 
        stack.append(a)

print("T" if stack.pop() else "F")

