---
title: Function
format:
  html:
    code-fold: true
---

Di programming, kita tidak ingin membuat semuanya dari awal/nol.

Bagaimana cara menggambar lingkaran? Tentu saja kita tidak ingin membuatnya dari titik-titik kecil atau menghitung sendiri lengkungan-nya.

Kita bisa menggunakan fungsi yang sudah ada!

Mari kita coba:

```javascript
circle(100, 200, 50);
```

<iframe src="00-function/0-circle.html" width="400px" height="400px"></iframe>

## Reading Docs

Apa arti dari `circle(100, 200, 50)`?

Penjelasannya ada di dokumentasi

[https://p5js.org/reference/#/p5/circle](https://p5js.org/reference/#/p5/circle)

Mari kita belajar membacanya

---

```
circle(x, y, d)

Parameters

x Number: x-coordinate of the center of the circle.
y Number: y-coordinate of the center of the circle.
d Number: diameter of the circle.
```

---

x, y, dan d disebut parameter. Apa itu parameter?

Parameter adalah nilai yang kita berikan ke fungsi. Nah, urutan parameter ini penting.

Sesuai dokumentasi di atas, `circle(100, 200, 50)` artinya:

- x = 100
- y = 200
- d = 50

---

## Playing with Parameter

Mari kita ganti nilai x, y, dan d

`circle(100, 200, 100)`

Apa yang berubah?

<iframe src="00-function/1-circle.html" width="400px" height="400px"></iframe>

## Task 1 📝: Playing with Variables

Coba ubah nilai x, y, dan d. Apa yang terjadi?

## Coordinate System

Di P5.js, koordinat dimulai dari kiri atas. Sehingga pojok kiri atas adalah titik (0, 0).

- Pojok kanan bawah adalah (width, height)
- Pojok kiri bawah adalah (0, height)
- Pojok kanan atas adalah (width, 0)
- dst

TODO: tambah visualisasi

## Task 2 📝: Square

Buatlah bentuk seperti ini (Hint: bisa gunakan fungsi `square` atau `rect`)

<iframe src="00-function/2-square.html" width="400px" height="400px"></iframe>

## Other functions

Selain `circle`, ada banyak fungsi lain yang bisa kita gunakan di P5.js

Ada apa lagi? Mari kita cek dokumentasi

[https://p5js.org/reference/](https://p5js.org/reference/)

## Task 3 📝: Other Shapes

Lihat bagian "Shape", dan coba buat lah bentuk `triangle`, `point`, dan `line`

## Optional Parameters

Mari kita buat `square`:

```javascript
square(100, 200, 50);
```

<iframe src="00-function/3-square-normal.html" width="400px" height="400px"></iframe>

Di situ kita memberikan 3 parameter: x, y, dan s.

Namun jika kita lihat dokumentasi, ternyata ada parameter lain:

---

```
square(x, y, s, [tl], [tr], [br], [bl])

Parameters

x Number: x-coordinate of the square.
y Number: y-coordinate of the square.
s Number: side size of the square.
tl Number: optional radius of top-left corner. (Optional)
tr Number: optional radius of top-right corner. (Optional)
br Number: optional radius of bottom-right corner. (Optional)
bl Number: optional radius of bottom-left corner. (Optional)
```

---

Parameter yang ditulis dalam kurung siku `[]` adalah parameter opsional. Artinya, kita bisa tidak menulisnya.

Jika kita tidak menulisnya, maka nilai default-nya akan digunakan.

Jika kita menulisnya, maka nilai yang kita tulis akan digunakan:

```javascript
square(100, 200, 50, 10);
```

di sini, `10` adalah nilai `tl`, dan nilai `tr`, `br`, dan `bl` akan menggunakan nilai default

<iframe src="00-function/4-square-with-optional-param.html" width="400px" height="400px"></iframe>

## Task 4 📝: Rounded

Coba ubah nilai `tl`, `tr`, `br`, dan `bl`. Apa yang terjadi?

## Function Overloading

Mari kita beri warna!

Baca dokumentasi berikut: [https://p5js.org/reference/#/p5/fill](https://p5js.org/reference/#/p5/fill), dan perhatikan parameter yang ada

---

```
fill(v1, v2, v3, [alpha])
fill(value)
fill(gray, [alpha])
fill(values)
fill(color)
```

---

Ternyata ada banyak versi dari fungsi `fill`. Ini disebut function overloading.

Mari lihat contoh pemanggilannya:

```javascript
fill(255, 0, 0); //red, green, blue
fill("red"); //color name
fill(255); //gray
```

Semuanya valid! Jadi kita bisa memiliki keleluasaan dalam memanggil fungsi ini, tergantung kebutuhan kita.

## Bonus: RGB

RGB adalah singkatan dari Red, Green, Blue. Untuk membuat warna, kita bisa menggunakan kombinasi dari ketiga warna ini.

Silakan bermain-main dengan nilai RGB di [sini](https://www.rapidtables.com/web/color/RGB_Color.html)

## Fill

Fungsi `fill` digunakan untuk memberi warna pada bentuk yang akan kita gambar. Analoginya seperti kita mencelupkan kuas ke dalam cat. Warna tersebut akan digunakan untuk menggambar bentuk selanjutnya. Jika ingin mengganti warna, kita tinggal memanggil fungsi `fill` lagi.

```javascript
fill(255, 0, 0); //red
circle(100, 200, 50);
fill(0, 255, 0); //green
rect(200, 100, 50, 50);
```

<iframe src="00-function/5-fill.html" width="400px" height="400px"></iframe>

## Declaring Function

TODO: fill in

## Task 5 📝: Nice Drawing

Gambarlah bentuk Doraemon/kucing dengan menggunakan fungsi-fungsi yang sudah ada di P5.js

Kurang lebih seperti ini, tapi buatlah versi yang jauh lebih keren!

<iframe src="00-function/5-doraemon.html" width="400px" height="400px"></iframe>

## Conclusion

Sudah banyak yang kita pelajari, yaitu:

- Fungsi
- Parameter
- Membaca dokumentasi
- Function Optional Parameter
- Function Overloading
