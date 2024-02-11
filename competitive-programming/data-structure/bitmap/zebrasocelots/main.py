# 3
# Z
# O
# Z

# 010
# 001
# 00
# 1 = Ocelot
# 0 = Zebra
# Whenever the zoo bell rings, the ocelot lowest in the pile turns into a zebra, and all zebras (if there are any) below that creature simultaneously turn into ocelots. If there is no ocelot in the pile when the bell tolls, then nothing happens.

# 4
# O
# Z
# Z
# O

# 1001

# 1000
# 0111
# 0110
# 0101
# 0100
# 0011
# 0010
# 0001
# 0000

n = int(input())
bins = 0
for i in range(n):
    bins = bins << 1
    if input() == "O":
        bins = bins | 1
print(bins)