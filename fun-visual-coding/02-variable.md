---
title: 2. Variable
format:
  html:
    code-fold: true
---

## Constant

```javascript
square(100, 200, 50);
```

<iframe src="02-variable/0-square.html" width="400px" height="400px"></iframe>

Bagaimana agar square-nya jadi lebih lebar

Mudah, cukup ubah parameter ke-3:

```javascript
square(100, 200, 100);
```

<iframe src="02-variable/1-square-larger.html" width="400px" height="400px"></iframe>

Bagaimana jika kita memiliki banyak square?

```javascript
square(100, 200, 50);
square(200, 200, 50);
square(300, 200, 50);
```

<iframe src="02-variable/2-many-square.html" width="400px" height="400px"></iframe>

...dan kita ingin membuat semua square-nya lebih lebar

```javascript
square(100, 200, 100);
square(200, 200, 100);
square(300, 200, 100);
```

Repot kan? Kita harus mengubah semua parameter ke-3.

Nah, yang lebih mudah adalah menggunakan `const`. Sesuai namanya, `const` adalah konstanta, yang artinya nilainya tidak bisa diubah.
Nilai `const` tersebut bisa kita gunakan berkali-kali.

Untuk membuat `const`, kita menggunakan keyword `const` diikuti dengan nama variabel yang kita inginkan, lalu diikuti dengan nilai yang kita inginkan.

Setelah itu, kita bisa menggunakan `const` tersebut di mana saja.

```javascript
//define const
const squareSize = 100;

//use const
square(100, 200, squareSize);
square(200, 200, squareSize);
square(300, 200, squareSize);
```

<iframe src="02-variable/3-many-square-const.html" width="400px" height="400px"></iframe>

Code di atas akan menghasilkan hasil yang sama dengan code sebelumnya, tapi lebih mudah dibaca dan diubah.

Jika kita ingin mengubah ukuran square, kita hanya perlu mengubah nilai `squareSize` di baris pertama.

## Variable

`const` tidak bisa diubah, tapi bagaimana jika kita ingin menyimpan nilai yang bisa diubah?

Kita bisa menggunakan variable, untuk membuat variable kita menggunakan keyword `let`.

```javascript
let squareSize = 50;

square(100, 100, squareSize);
```

Mirip dengan contoh sebelumnya, kita hanya mengganti `const` menjadi `let`.

Tapi... bagaimana jika kita ingin mengubah nilai variablenya?

## Event

Untuk mengubah nilai variabel, kita perlu mendapatkan input dari user/external. Salah satunya adalah dengan menggunakan event.

```javascript
function mousePressed() {
  console.log("Mouse pressed");
}
```

Sesuai namanya `mousePressed` function akan dipanggil ketika mouse ditekan.

Apa itu `console.log`? `console.log` adalah cara untuk menampilkan pesan di console. Ini sangat berguna untuk debugging.

Mari kita lihat code lengkapnya:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let squareSize = 50;
  square(100, 100, squareSize);
}
function mousePressed() {
  console.log("Mouse pressed");
}
```

<iframe src="02-variable/4-event.html" width="400px" height="400px"></iframe>

Apa yang terjadi ketika kita tekan mouse? Tidak terlihat apa-apa.

Namun, jika kita buka console (click kanan di page di browser dan pilih Inspect), kita akan melihat pesan "Mouse pressed" setiap kali kita tekan mouse.

Ok, sekarang bagaimana jika kita ingin mengubah nilai `squareSize` ketika mouse ditekan?

```javascript
function draw() {
  background(220);
  let squareSize = 50;
  square(100, 100, squareSize);
}

function mousePressed() {
  squareSize = 100;
}
```

<iframe src="02-variable/5-event-change-variable-wrong.html" width="400px" height="400px"></iframe>

Hmm, tidak terjadi apa-apa. Kenapa?

## Variable Scope

Variable `squareSize` yang kita buat di dalam function `draw` hanya bisa diakses di dalam function `draw`. Jadi, ketika kita mencoba mengubah `squareSize` di dalam function `mousePressed`, kita sebenarnya membuat variable baru dengan nama yang sama.

TODO: tambah ilustrasi soal scoping

Kita perlu membuat `squareSize` di luar function `draw` agar bisa diakses di dalam function `mousePressed`.

```javascript
let squareSize = 50;

function draw() {
  background(220);
  square(100, 100, squareSize);
}

function mousePressed() {
  squareSize = 100;
}
```

<iframe src="02-variable/6-event-change-variable.html" width="400px" height="400px"></iframe>

Nah, sekarang ketika kita tekan mouse, `squareSize` akan berubah jadi besar.

## Task 1 📝: Increasing Size

Ubah code di atas, sehingga ketika mouse ditekan, `squareSize` akan terus **bertambah** ukurannya.

## Task 2 📝: Decreasing Size

Lihat dokumentasi di [https://p5js.org/reference/](https://p5js.org/reference/), tambahkan sebuah event baru **mengurangi** ukuran `squareSize` ketika keyboard ditekan.

Fun: tekan terus key hingga ukurannya 0. Kemudian tekan sekali lagi, apa yang terjadi?

## Time Variable

Variable bisa juga diubah, tidak hanya oleh event (user input), tapi juga oleh waktu.

```javascript
let startTime;

function setup() {
  createCanvas(400, 400);
  startTime = millis();
}

function draw() {
  background(220);
  let elapsedTime = millis() - startTime;
  let squareSize = elapsedTime / 100;
  square(100, 100, squareSize);
}
```

<iframe src="02-variable/7-time-variable.html" width="400px" height="400px"></iframe>

## Random Variable

Selain waktu, kita juga bisa menggunakan nilai acak. [https://p5js.org/reference/#/p5/random](https://p5js.org/reference/#/p5/random)

`random(20, 80)` akan menghasilkan nilai acak antara 20 dan 80.

```javascript
function draw() {
  background(220);
  let size = random(20, 80);
  square(100, 100, size);
}
```

<iframe src="02-variable/8-random-variable.html" width="400px" height="400px"></iframe>

## Task 3 📝: Random Square Location

Ubah code di atas, sehingga posisi square juga acak.

## Task 4 📝: Click Handling

Ubah code di atas, sehingga posisi dan ukuran square hanya diacak ketika mouse ditekan.

## Text & Emoji

Selain menggambar bentuk, kita juga bisa menampilkan teks.

[https://p5js.org/reference/#/p5/text](https://p5js.org/reference/#/p5/text)

```javascript
text("Hello", 100, 20);
```

Code di atas akan menampilkan teks "Hello" di posisi (100, 20).

Agar lebih menarik, kita bisa memasukkan Emoji. Explore [https://emojipedia.org/](https://emojipedia.org) dan temukan emoji yang kamu suka.

```javascript
text("🐶", 100, 20);
```

<iframe src="02-variable/9-text.html" width="400px" height="400px"></iframe>

Wah, kecil sekali, mari perbesar dengan `textSize`:

```javascript
textSize(60);
text("🐶", 100, 100);
```

<iframe src="02-variable/10-text-larger.html" width="400px" height="400px"></iframe>

## Task 5 📝: Random Emojis

Gambar dua emoji, dan randomize posisinya ketika mouse ditekan.
