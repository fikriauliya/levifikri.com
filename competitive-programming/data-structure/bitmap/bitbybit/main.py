while True:
    n = int(input())
    if n == 0: 
        break
    knowns = 0
    values = 0

    is_on = lambda x, i: x & (1 << i)
    set_bit = lambda x, i: x | (1 << i)
    clear_bit = lambda x, i: x & ~(1 << i)

    for i in range(n):
        tokens = input().split()
        if tokens[0] == "SET":
            knowns = set_bit(knowns, int(tokens[1]))
            values = set_bit(values, int(tokens[1]))
        elif tokens[0] == "CLEAR":
            knowns = set_bit(knowns, int(tokens[1]))
            values = clear_bit(values, int(tokens[1]))
        elif tokens[0] == "AND" or tokens[0] == "OR":
            a = int(tokens[1])
            b = int(tokens[2])
            if tokens[0] == "AND":
                if is_on(knowns, a) and is_on(knowns, b):
                    if is_on(values, a) and is_on(values, b):
                        values = set_bit(values, a)
                    else:
                        values = clear_bit(values, a)
                elif (is_on(knowns, b) and not is_on(values, b)) \
                    or (is_on(knowns, a) and not is_on(values, a)):
                    values = clear_bit(values, a)
                    knowns = set_bit(knowns, a)
                else:
                    knowns = clear_bit(knowns, a)
            elif tokens[0] == "OR":
                if is_on(knowns, a) and is_on(knowns, b):
                    if is_on(values, a) or is_on(values, b):
                        values = set_bit(values, a)
                    else:
                        values = clear_bit(values, a)
                elif (is_on(knowns, b) and is_on(values, b)) \
                    or (is_on(knowns, a) and is_on(values, a)):
                    values = set_bit(values, a)
                    knowns = set_bit(knowns, a)
                else:
                    knowns = clear_bit(knowns, a)
        # print(tokens)
        # print(bin(values)[2:], bin(knowns)[2:])
    res = []
    for i in range(32):
        if knowns & (1 << i):
            res.append(values & (1 << i) and "1" or "0")
        else:
            res.append("?") 
    res = res[::-1]
    print("".join(res))