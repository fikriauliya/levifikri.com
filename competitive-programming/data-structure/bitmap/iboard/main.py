while True:
    try:
        line = input()
    except EOFError:
        break

    left_trapped = False
    right_trapped = False

    for c in line:
        for i in range(7):
            if 1 << i & ord(c) == 0:
                left_trapped = not left_trapped
            else:
                right_trapped = not right_trapped
    if left_trapped or right_trapped:
        print("trapped")
    else:
        print("free")
            
