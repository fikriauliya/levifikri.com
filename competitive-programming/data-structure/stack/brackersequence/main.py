from collections import deque

while True:
    try:
        input()
    except EOFError:
        break
    tokens = input().split(' ')

    stack = deque()
    is_addition = True

    for token in tokens:
        if token == '(':
            stack.append(token)
            is_addition = not is_addition
        elif token == ')':
            if is_addition:
                res = 0
                op = lambda x, y: (x + y) % (10**9 + 7)
            else:
                res = 1
                op = lambda x, y: (x * y) % (10**9 + 7)

            while stack:
                top = stack.pop()
                if top == '(':
                    break
                res = op(res, top)
            stack.append(res)
            is_addition = not is_addition
        else:
            stack.append(int(token))

    if is_addition:
        res = 0
        op = lambda x, y: (x + y) % (10**9 + 7)
    else:
        res = 1
        op = lambda x, y: (x * y) % (10**9 + 7)
    while stack:
        top = stack.pop()
        res = op(res, top)
    print(res)
    


