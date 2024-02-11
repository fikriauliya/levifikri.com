# https://open.kattis.com/contests/k6guuj/problems/cd
import sys

while True:
    n, m = map(int, sys.stdin.readline().split())
    if n == 0 and m == 0:
        break

    a = set()
    res = 0
    for i in range(n):
        a.add(int(sys.stdin.readline()))
    for i in range(m):
        # b.append(int(sys.stdin.readline()))
        data = int(sys.stdin.readline())
        if data in a:
            res += 1


    print(res)