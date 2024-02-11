def gen():
    def next_string(s):
        if not s:
            return 'a'
        if s[-1] != 'z':
            return s[:-1] + chr(ord(s[-1]) + 1)
        return next_string(s[:-1]) + 'a'
    s = 'a'
    while True:
        yield s
        s = next_string(s)
    
a, b = map(int, input().split())
words = []
g = gen()
for i in range(max(a, b//2+1)):
    words.append(next(g))
print(' '.join(words))