def solve():
    chars = input()
    words = input().split()
    if len(chars) != len(words):
        return False

    c_to_w = {}
    w_to_c = {}
    for i, word in enumerate(words):
        if word not in w_to_c and chars[i] not in c_to_w:
            w_to_c[word] = chars[i]
            c_to_w[chars[i]] = word
        else:
            if word in w_to_c and chars[i] != w_to_c[word]:
                return False
            if chars[i] in c_to_w and word != c_to_w[chars[i]]:
                return False
    return True

print(solve())

