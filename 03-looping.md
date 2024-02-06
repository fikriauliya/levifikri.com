---
title: Looping
format:
  html:
    code-fold: true
---

Yuk, kita buat 3 lingkaran yang bersampingan.

<iframe src="03-looping/0-manual.html" width="400px" height="400px"></iframe>

```javascript
function draw() {
  background(220);

  circle(10, 100, 10);
  circle(20, 100, 10);
  circle(30, 100, 10);
}
```

## Task 1 📝

Sekarang buatlah 10 lingkaran yang bersampingan.

<iframe src="03-looping/1-ten-manual.html" width="400px" height="400px"></iframe>

Repot kan ya :D, bagaimana kalau kita membuat 100 lingkaran? Tentu sangat repot.

## `for` loop

```javascript
function draw() {
  background(220);

  for (let i = 1; i <= 10; i++) {
    circle(i * 10, 100, 10);
  }
}
```

<iframe src="03-looping/2-loop.html" width="400px" height="400px"></iframe>

Nah, bisa jauh lebih simple kan?

Mari kita pahami isi `for` loop di atas.

- `for (let i = 1;` artinya kita membuat variabel `i` yang nilainya dimulai dari 1.
- `i <= 10;` artinya kita akan melakukan looping selama nilai `i` kurang dari atau sama dengan 10.
- `i++` artinya setiap kali looping, nilai `i` akan bertambah 1.

| i   | i <= 10 | Penjelasan                                               |
| --- | ------- | -------------------------------------------------------- |
| 1   | true    | i dimulai dari 1                                         |
| 2   | true    | Nilai i bertambah 1 karena `i++`                         |
| 3   | true    | Idem                                                     |
| 4   | true    | Idem                                                     |
| 5   | true    | Idem                                                     |
| 6   | true    | Idem                                                     |
| 7   | true    | Idem                                                     |
| 8   | true    | Idem                                                     |
| 9   | true    | Idem                                                     |
| 10  | true    | Idem                                                     |
| 11  | false   | Karena `i <= 10` bernilai `false`, maka looping berhenti |

`circle(i * 10, 100, 10);` -> kita mengalikan nilai `i` dengan 10, sehingga lingkaran akan tergambar di posisi `i * 10`. Jadi lingkaran pertama akan tergambar di posisi 10, kedua di posisi 20, ketiga di posisi 30, dan seterusnya.

## Task 2 📝

Buatlah 20 lingkaran yang bersampingan.

<iframe src="03-looping/3-20-loop.html" width="400px" height="400px"></iframe>

## Task 3 📝

Geser semua lingkaran 10 pixel ke kanan, i.e. lingkaran dimulai dari posisi 20 (bukan 10) dan berakhir di posisi 210.

<iframe src="03-looping/4-20-loop-shifted.html" width="400px" height="400px"></iframe>

## Task 4 📝

Letakkan lingkaran di posisi 10, 30, 50, 70, 90, 110, 130, 150, 170, 190.

<iframe src="03-looping/5-with-padding.html" width="400px" height="400px"></iframe>

## Bonus: Modulo Operator

`%` adalah operator modulo, sisa pembagian dari dua bilangan.

- `5 % 2` = 1 (karena 5 dibagi 2 sisa 1)
- `6 % 2` = 0 (karena 6 dibagi 2 sisa 0)
- `7 % 2` = 1 (karena 7 dibagi 2 sisa 1)
- `7 % 3` = 1 (karena 7 dibagi 3 sisa 1)

Nah, modulo operator bisa digunakan untuk membuat pola yang menarik.

```javascript
function draw() {
  background(220);

  for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      fill("red");
    } else {
      fill("blue");
    }
    circle(i * 20, 100, 10);
  }
}
```

<iframe src="03-looping/6-modulo.html" width="400px" height="400px"></iframe>

| i   | i % 2 |
| --- | ----- |
| 1   | 1     |
| 2   | 0     |
| 3   | 1     |
| 4   | 0     |
| 5   | 1     |

Perhatikan bahwa nilai modulo-nya bergantian antara 0 dan 1, sehingga bisa digunakan untuk membuat pola warna yang menarik.

## Task 5 📝

Buatlah 10 lingkaran dengan pola warna merah - hijau - biru

<iframe src="03-looping/7-modulo-3.html" width="400px" height="400px"></iframe>

## Repeating `for` loop

Bagaimana jika kita ingin membuat 2 baris lingkaran seperti di atas?

Mudah, tinggal copy paste saja `for` loopnya, dan ganti posisi y-nya.

```javascript
function draw() {
  background(220);

  for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      fill("red");
    } else {
      fill("blue");
    }
    circle(i * 20, 100, 10);
  }
  for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      fill("red");
    } else {
      fill("blue");
    }
    circle(i * 20, 120, 10); // perhatikan nilai y-nya berbeda
  }
}
```

<iframe src="03-looping/8-2-loop.html" width="400px" height="400px"></iframe>

Bagaimana untuk 4 baris?

```javascript
function draw() {
  background(220);

  for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      fill("red");
    } else {
      fill("blue");
    }
    circle(i * 20, 100, 10);
  }
  for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      fill("red");
    } else {
      fill("blue");
    }
    circle(i * 20, 120, 10); // perhatikan nilai y-nya berbeda
  }
  for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      fill("red");
    } else {
      fill("blue");
    }
    circle(i * 20, 140, 10); // perhatikan nilai y-nya berbeda
  }
}
```

Wah repot ya, dejavu :D

## Nested `for` loop

Solusinya adalah wrap `for` loop di atas di dalam `for` loop baru

```javascript
function draw() {
  background(220);
  for (let j = 0; j < 3; j++) {
    for (let i = 1; i <= 10; i++) {
      if (i % 2 == 0) {
        fill("red");
      } else {
        fill("blue");
      }
      circle(i * 20, 100 + j * 20, 10);
    }
  }
}
```

Perhatikan adalah `j` yang bertugas menggeser posisi y-nya.

<iframe src="03-looping/9-nested-loop.html" width="400px" height="400px"></iframe>

## Bonus: i, j, k Counter

Pada umumnya, loop counter dinamai `i`, `j`, `k`, dst. Ini adalah konvensi yang umum digunakan di dunia programming.
Code di atas tidak sesuai konvensi, karena kita menggunakan `j` di `foor` yang paling luar, dan `i` di `for` yang paling dalam.

Mari kita ubah agar sesuai konvensi.

```javascript
function draw() {
  background(220);
  for (let i = 0; i < 3; i++) {
    for (let j = 1; j <= 10; j++) {
      if (j % 2 == 0) {
        fill("red");
      } else {
        fill("blue");
      }
      circle(j * 20, 100 + i * 20, 10);
    }
  }
}
```

## Task 6 📝

Buatlah 10 baris pola di atas

<iframe src="03-looping/10-nested-loop-10.html" width="400px" height="400px"></iframe>

## Pola Segitiga

Nilai `i` dan `j` bisa dibandingkan untuk membuat pola menarik

```javascript
for (let i = 0; i < 10; i++) {
  for (let j = 1; j <= 10; j++) {
    if (j <= i + 1) {
      if (j % 2 == 0) {
        fill("red");
      } else {
        fill("blue");
      }
      circle(j * 20, 100 + i * 20, 10);
    }
  }
}
```

<iframe src="03-looping/11-nested-loop-triangle.html" width="400px" height="400px"></iframe>

## Task 7 📝

Buatlah pola segitiga terbalik

<iframe src="03-looping/12-nested-loop-triangle-rev.html" width="400px" height="400px"></iframe>

## Animasikan

Kita bisa membuat animasi dengan mengubah nilai variabel di dalam `draw` loop.

```javascript
function draw() {
  background(220);

  for (let i = 0; i < 10; i++) {
    for (let j = 1; j <= 10; j++) {
      if (j % 2 == 0) {
        fill("red");
      } else {
        fill("blue");
      }
      circle(j * 20 + random(5), 100 + i * 20 + random(5), 10);
    }
  }
}
```

<iframe src="03-looping/13-animated.html" width="400px" height="400px"></iframe>

TODO: add much more fun tasks
