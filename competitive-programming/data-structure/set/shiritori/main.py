# https://open.kattis.com/contests/k6guuj/problems/shiritori

def solve():
    n = int(input())
    words = set()
    prev = None
    for i in range(n):
        word = input()
        if word in words:
            print('Player', i % 2 + 1, 'lost')
            return
        if prev is not None and prev[-1] != word[0]:
            print('Player', i % 2 + 1, 'lost')
            return
        prev = word
        words.add(word)
    print('Fair Game')

solve()