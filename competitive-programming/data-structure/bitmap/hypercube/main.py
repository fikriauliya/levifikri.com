# 000 001 011 010 110 111 101 100

def pos(num, n):
    if n == 1: 
        return num & 1
    if num & (1 << (n - 1)) == 0:
        return pos(num, n - 1)
    return (1 << n) - pos(num, n - 1) - 1

n, a, b = input().split()
n = int(n)
a = int(a, 2)
b = int(b, 2)
print(pos(b, n) - pos(a, n) - 1)