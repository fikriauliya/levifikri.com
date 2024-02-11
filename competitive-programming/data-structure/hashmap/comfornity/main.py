from collections import defaultdict
n = int(input())

m = defaultdict(lambda: 0)
for i in range(n):
    courses = list(map(int, input().split()))

    courses.sort()
    key = tuple(courses)
    m[key] += 1

max_v = max([m[k] for k in m])
res = sum([m[k] for k in m if m[k] == max_v])

print(res)

