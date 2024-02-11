label_to_num = {}
num_to_label = {}

while True:
    try:
        line = input()
    except EOFError:
        break

    words = line.split()
    if words[0] == "def":
        if int(words[2]) in num_to_label:
            del label_to_num[num_to_label[int(words[2])]]
        if words[1] in label_to_num:
            del num_to_label[label_to_num[words[1]]]

        label_to_num[words[1]] = int(words[2])
        num_to_label[int(words[2])] = words[1]
    elif words[0] == "clear":
        label_to_num.clear()
        num_to_label.clear()
    else:
        res = 0
        operands = []
        operators = []
        for i in range(1, len(words) - 1):
            if words[i] == "+" or words[i] == "-":
                operators.append(words[i])
            else:
                if words[i] in label_to_num:
                    operands.append(label_to_num[words[i]])
                    if len(operands) == 2:
                        if operators[-1] == "+":
                            res = operands[0] + operands[1]
                        else:
                            res = operands[0] - operands[1]
                        operands = [res]
                        operators.pop()
                else:
                    res = None
                    break
        if res is None:
            print(" ".join(words[1:]), "unknown")
        else:
            if operands[0] in num_to_label:
                print(" ".join(words[1:]), num_to_label[operands[0]])
            else:
                print(" ".join(words[1:]), "unknown")