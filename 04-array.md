---
title: Array
format:
  html:
    code-fold: true
---

Yuk kita bikin game robot 🤖 vs alien 👾.
Robot harus kabur dari alien yang mengejar.

## Robot

Kita mulai dengan menggambar robotnya. Robot selalu muncul di posisi (0, 20). Robot bisa digerakkan dengan keyboard

```javascript
let grid;
let robotX;
let robotY;

function setup() {
  createCanvas(400, 400);
  grid = 20;

  robotX = 0;
  robotY = grid;
}

function draw() {
  background(220);
  textSize(20);
  text("🤖", robotX, robotY);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    robotX -= grid;
  } else if (keyCode === RIGHT_ARROW) {
    robotX += grid;
  } else if (keyCode === UP_ARROW) {
    robotY -= grid;
  } else if (keyCode === DOWN_ARROW) {
    robotY += grid;
  }
}
```

<iframe src="04-array/0-robot.html" width="400px" height="400px"></iframe>

## Alien

Sekarang kita buat aliennya, biar seru aliennya muncul di tempat random.

```javascript
let grid;
let robotX;
let robotY;

let alienX;
let alienY;

function setup() {
  createCanvas(400, 400);
  grid = 20;

  robotX = 0;
  robotY = grid;
  alienX = 20 * Math.floor(random(0, 20));
  alienY = 20 * Math.floor(random(1, 20));
}

function draw() {
  background(220);
  textSize(20);
  text("🤖", robotX, robotY);
  text("👾", alienX, alienY);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    robotX -= grid;
  } else if (keyCode === RIGHT_ARROW) {
    robotX += grid;
  } else if (keyCode === UP_ARROW) {
    robotY -= grid;
  } else if (keyCode === DOWN_ARROW) {
    robotY += grid;
  }
}
```

<iframe src="04-array/1-robot-alien.html" width="400px" height="400px"></iframe>

## More Alien

Biar makin seru, kita tambahkan satu alien lagi. Berarti perlu bikin variable `alien2X` dan `alien2Y`.

```javascript
let grid;
let robotX;
let robotY;

let alien1X;
let alien1Y;

let alien2X;
let alien2Y;

function setup() {
  createCanvas(400, 400);
  grid = 20;

  robotX = 0;
  robotY = grid;
  alien1X = 20 * Math.floor(random(0, 20));
  alien1Y = 20 * Math.floor(random(1, 20));

  alien2X = 20 * Math.floor(random(0, 20));
  alien2Y = 20 * Math.floor(random(1, 20));
}

function draw() {
  background(220);
  textSize(20);
  text("🤖", robotX, robotY);
  text("👾", alien1X, alien1Y);
  text("👾", alien2X, alien2Y);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    robotX -= grid;
  } else if (keyCode === RIGHT_ARROW) {
    robotX += grid;
  } else if (keyCode === UP_ARROW) {
    robotY -= grid;
  } else if (keyCode === DOWN_ARROW) {
    robotY += grid;
  }
}
```

<iframe src="04-array/2-robot-2-aliens.html" width="400px" height="400px"></iframe>

## Much More Aliens

Tambah lagi donk aliennya, biar makin seru. Tapi kalau kita bikin variable `alien3X`, `alien4X`, `alien5X`, bakal ribet banget.

Gimana supaya lebih simpel?

## Array

Kita bisa pakai array untuk menyimpan posisi semua alien. Array adalah **kumpulan** data yang disimpan dalam satu variabel.

```javascript
let grid;
let robotX;
let robotY;

let numOfAliens = 5;
let aliensX;
let aliensY;

function setup() {
  createCanvas(400, 400);
  grid = 20;

  robotX = 0;
  robotY = grid;

  aliensX = new Array(numOfAliens);
  aliensY = new Array(numOfAliens);

  for (let i = 0; i < numOfAliens; i++) {
    aliensX[i] = 20 * Math.floor(random(0, 20));
    aliensY[i] = 20 * Math.floor(random(1, 20));
  }
}

function draw() {
  background(220);
  textSize(20);
  text("🤖", robotX, robotY);

  for (let i = 0; i < numOfAliens; i++) {
    text("👾", aliensX[i], aliensY[i]);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    robotX -= grid;
  } else if (keyCode === RIGHT_ARROW) {
    robotX += grid;
  } else if (keyCode === UP_ARROW) {
    robotY -= grid;
  } else if (keyCode === DOWN_ARROW) {
    robotY += grid;
  }
}
```

<iframe src="04-array/3-array.html" width="400px" height="400px"></iframe>

Untuk menambah jumlah alien, kita hanya perlu mengubah nilai `numOfAliens`.

Mari kita pelajari lebih dalam soal array.

## Initializing Array

Array memiliki size (berapa jumlah alien yang ingin dibuat?)

Cara membuat array dengan ukuran tetap adalah dengan menggunakan `new Array(size)`. Contoh:

```javascript
let numOfAliens = 5;
let aliensX = new Array(numOfAliens);
let aliensY = new Array(numOfAliens);
```

Kita sudah membuat variable `aliensX` dan `aliensY` yang berisi array dengan 5 elemen.

## Accessing Arrays

Kita bisa mengakses elemen array dengan menggunakan indexnya. Index array dimulai dari 0.

Jadi untuk mendapatkan posisi X alien ke-3, kita bisa menggunakan `aliensX[2]`.

```javascript
console.log("Posisi X alien ke-3: " + aliensX[2]);
```

Untuk mendapatkan posisi X alien ke-1, kita bisa menggunakan `aliensX[0]`.

## Looping Array

Bagusnya adalah kita bisa menggunakan loop untuk mengakses semua elemen array.

```javascript
for (let i = 0; i < numOfAliens; i++) {
  console.log("Posisi X alien ke-" + i + ": " + aliensX[i]);
}
```

## Moving Aliens

Karena sudah disimpan dalam array, untuk menggerakkan semua alien (atau menambahkan sifat yang sama untuk semuanya), kita bisa menggunakan loop!

```javascript
for (let i = 0; i < numOfAliens; i++) {
  let direction = Math.floor(random(0, 4));
  if (direction === 0) {
    aliensX[i] -= grid;
  } else if (direction === 1) {
    aliensX[i] += grid;
  } else if (direction === 2) {
    aliensY[i] -= grid;
  } else if (direction === 3) {
    aliensY[i] += grid;
  }
}
```

<iframe src="04-array/4-moving-aliens.html" width="400px" height="400px"></iframe>

## Task 1 📝

Waduh, aliens bisa keluar dari layar, lantas menghilang

Ok, kita perbaiki. Idenya adalah jika posisi alien melebihi batas layar, kita kembalikan ke batas layar.

Tenang, karena pakai array, kita bisa tingga looping

<iframe src="04-array/5-avoid-off-grid.html" width="400px" height="400px"></iframe>

## Task 2 📝

Aliens terlalu cepat, kita perbaiki dengan menambahkan delay

<iframe src="04-array/6-slower.html" width="400px" height="400px"></iframe>

## Collision detection

Kita ingin robot harus kabur dari aliens, jika robot bertabrakan dengan alien, game over.

Nah, kita perlu buat fungsi untuk mendeteksi tabrakan.

TODO

## Attack

Wah, ini sih sulit, kalau robot tidak bisa menyerang, gimana caranya menang?

Ok, kita buat! Ketika tombol space ditekan, robot akan mengalahkan semua alien yang berada di sekitarnya.

TODO

## Teleport

Tambah satu lagi biar seru! Robot bisa teleport!

Jika tombol T ditekan, robot akan berpindah ke posisi random. Sehingga kalau robot terjebak, bisa kabur deh

TODO

## Challenge: Smarter Alien

Alien terlalu bodoh, karena gerakannya random, kita buat alien lebih pintar yuk!

Jadi alien akan bergerak ke arah robot!

TODO

## Treasure

Masa game tanpa hadiah? Kita tambahkan hadiah di layar, jika robot berhasil mengambilnya, robot menang!

TODO

## Level Up

Setelah ambil hadiah, kita tambahkan level. Ketika naik level, jumlah alien bertambah, dan jumlah hadiahnya lebih banyak.

TODO
