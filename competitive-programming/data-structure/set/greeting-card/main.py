def correct_distance():
    return [(a, b) for a in range(-2018, 2019) for b in range(-2018, 2019) if a**2 + b**2 == 2018**2]

deltas = correct_distance()

n = int(input())
res = 0
plots = set()
for i in range(n):
    a, b = tuple(map(int, input().split()))

    for da, db in deltas:
        if (a + da, b + db) in plots:
            res+=1
    plots.add((a, b))

print(res)


