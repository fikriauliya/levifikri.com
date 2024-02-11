from collections import deque

t = int(input())
for i in range(t):
    line = input()
    colls = deque()
    colls.append(deque())
    cur_index = 0

    for c in line:
        # print(c)
        if c == ']':   
            cur_index = len(colls) - 1
        elif c == '[':
            if len(colls[0]) > 0:
                colls.appendleft(deque())
            cur_index = 0
        elif c == '<':
            # print(colls,cur_index)
            while cur_index >= 0:
                try:
                    colls[cur_index].pop()
                    break
                except IndexError:
                    if cur_index == 0:
                        break
                    cur_index -= 1
        else:
            colls[cur_index].append(c)
    
    print(''.join([''.join(colls[i]) for i in range(len(colls))]))
    