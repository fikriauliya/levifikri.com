keys = [
    """`1234567890-=""",
    """QWERTYUIOP[]\\""",
    """ASDFGHJKL;'""",
    """ZXCVBNM,./"""]

m = {}
for k in keys:
    m.update({c: k[i - 1] for i, c in enumerate(k)})

while True:
    try:
        line = input()
    except EOFError:
        break
    
    res = [] 

    for c in line:
        if c in m:
            res.append(m[c])
        else:
            res.append(c)
    print("".join(res))


            