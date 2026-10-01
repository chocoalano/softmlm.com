# Menjalankan hasil build

`node ace build` menghasilkan aplikasi siap jalan di folder `build/`. Server
dijalankan dengan `node build/bin/server.js`, atau lewat wrapper CommonJS
`node build/server.cjs`. Root aplikasi yang berjalan adalah folder `build/`,
sehingga `.env` di root source tidak terbaca. Hasil build juga tidak
menyertakan `.env`. Di hosting, semua konfigurasi diberikan sebagai
environment variable.

## Hostinger Node.js Web App (deploy dari GitHub)

AdonisJS tidak ada dalam daftar framework Hostinger, jadi gunakan **Other**.
Runbook deploy lengkap (smoke test, rollback, migration) ada di
`docs/production-deployment.md`.

| Pengaturan | Nilai |
| --- | --- |
| Framework | Other |
| Node.js | **24.x** (AdonisJS 7 membutuhkan Node 24; default Hostinger 22) |
| Root directory | kosong / `/` (folder yang berisi `package.json`) |
| Build command | `npm run build:hostinger` |
| Output directory | **`build/public`** (jangan `build`) |
| Entry file | `build/bin/server.js` (atau `server.cjs`; keduanya jalan) |

Penjelasan:

- **Entry file.** Hostinger menjalankan aplikasi lewat `lsnode.js`
  (LiteSpeed), yang memuat entry file dengan `require()`. Node 24 hanya bisa
  me-`require()` ES module yang **tanpa top-level await**. Karena itu
  `bin/server.ts` sengaja tidak memakai top-level await (import dirantai
  dengan promise): `build/bin/server.js` bisa langsung dipakai sebagai entry.
  Bukti 2026-10-01: versi lama dengan top-level await gagal dengan
  `ERR_REQUIRE_ASYNC_MODULE` (HTTP 503) dari `…/nodejs/build/bin/server.js`.
  Jangan tambahkan `await` di level atas `bin/server.ts`.
  `server.cjs` (wrapper CommonJS) tetap tersedia sebagai entry alternatif.

  Bukti dari host (dua kali): dengan output `build` dan entry
  `bin/server.js`, Hostinger menjalankan `build/bin/server.js`. Jadi entry
  file dicari **di dalam output directory**, berbeda dari dokumentasi
  Hostinger. Karena output harus `build/public`, `public/server.cjs` (stub
  satu baris, tersalin ke `build/public/server.cjs`) meneruskan ke
  `build/server.cjs`, yang memuat `build/bin/server.js` dengan `import()`.
  Entry `server.cjs` juga tetap jalan bila Hostinger membacanya dari root
  (`server.cjs` di root) atau dengan output `build`. Stub itu satu-satunya
  file non-aset yang tersalin ke `public_html`, dan isinya hanya
  `require('../server.cjs')`. Jangan tambahkan script `postbuild` untuk
  menyalin wrapper: `node ace build` sudah melakukannya (`metaFiles`).

- **Output directory `build/public`.** Hostinger menyalin output directory
  ke `public_html`, dan CDN-nya menyajikan file di sana secara langsung,
  walaupun entry file diisi. Bukti 2026-10-01: dengan output `build`,
  `https://mlmsofts.com/package.json`, `/config/app.js`, `/start/env.js` dan
  `/bin/server.js` menjawab 200 (kode server terkompilasi bisa diunduh
  publik; nilai secret tidak ikut karena hanya ada di environment hPanel).
  Dengan `build/public`, yang tersalin hanya favicon, gambar dan aset Vite.
  Setelah deploy, pastikan `/package.json` dan `/config/app.js` menjawab
  404.
- **`npm run build:hostinger`** menjalankan `node ace build`, lalu
  `node build/ace.js migration:run --force`. Migration berjalan di folder
  versi baru sebelum versi itu menerima trafik. Jika migration gagal, build
  ditandai gagal dan versi sebelumnya tetap berjalan. Risikonya dijelaskan
  di `docs/production-deployment.md` (Migration).
- **devDependencies dan `.npmrc`.** Hostinger memasang dependency dengan
  pengaturan production (`NODE_ENV=production`) sebelum build command, sehingga
  devDependencies dilewati. Padahal `node ace build` membutuhkannya
  (`@poppinss/ts-exec`, `@adonisjs/tsconfig`, `@vitejs/plugin-vue`,
  TypeScript, Vite). Bukti 2026-10-01: build gagal dengan
  `ERR_MODULE_NOT_FOUND: Cannot find package '@poppinss/ts-exec'`. File
  `.npmrc` di root (`include=dev`) membuat npm selalu memasang
  devDependencies, juga dengan `NODE_ENV=production` atau `--omit=dev`.
  Jangan hapus file itu, dan jangan pindahkan alat build ke
  `dependencies`: memindahkan satu package saja hanya menggeser error ke
  package berikutnya.

Setiap deployment dibangun di folder baru (`hbuilds/versions/{build-id}`),
sehingga **data tidak boleh disimpan di dalam folder aplikasi**. Database
SQLite di `tmp/` akan hilang pada deployment berikutnya. Gunakan MySQL.

### Environment variable (hPanel → Environment variables)

Variabel tersedia saat build dan saat runtime
([Environment variables](https://docs.hostinger.com/node.js/environment-variables)).
Daftar lengkap dan validasinya ada di `start/env.ts`. Contoh format ada di
`.env.example`.

| Variabel | Isi |
| --- | --- |
| `NODE_ENV` | `production` |
| `TZ` | `UTC` (timestamp database disimpan dalam UTC) |
| `LOG_LEVEL` | `info` |
| `APP_KEY` | buat sekali dengan `node ace generate:key --show`; jangan diganti setelah live |
| `APP_URL` | origin https production, mis. `https://mlmsofts.com` (dipakai untuk canonical/hreflang) |
| `SESSION_DRIVER` | `database` (sesi disimpan di server: logout benar-benar mengakhiri sesi) |
| `LIMITER_STORE` | `database` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE` | dari database MySQL di hPanel |
| `MAIL_MAILER` | `smtp` |
| `MAIL_FROM_NAME`, `MAIL_FROM_ADDRESS` | pengirim email |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USERNAME`, `SMTP_PASSWORD` | dari penyedia email |
| `SALES_NOTIFICATION_EMAILS` | inbox sales, dipisah koma |
| `WHATSAPP_MARKETING_NUMBER` | nomor sales format internasional, mis. `62…` |
| `SEARCH_INDEXING_ENABLED` | jangan diisi di production; `false` di staging agar tidak diindeks mesin pencari |

Catatan:

- **`PORT` dan `HOST` tidak wajib.** Gunakan nilai `PORT` dari Hostinger
  jika tersedia. Tanpa keduanya, server mendengarkan di `0.0.0.0:3333`.
- **Nama variabel database.** Jika wizard database Hostinger membuat
  variabel dengan nama lain, salin nilainya ke nama `DB_*` di atas.
- **Mesin database.** Cek versinya di phpMyAdmin (`SELECT VERSION()`).
  Aplikasi diuji pada MySQL; MariaDB belum diverifikasi
  (`docs/production-blockers.md` #17).

### Akun admin pertama (tanpa SSH)

Hostinger shared hosting tidak menyediakan SSH untuk aplikasi Node.js, dan
pendaftaran publik (`/signup`) mati di production. Akun admin pertama dibuat
otomatis oleh `npm run build:hostinger` (`node build/ace.js users:bootstrap`,
setelah migration) dari environment variable di hPanel:

| Variabel | Isi |
| --- | --- |
| `BOOTSTRAP_ADMIN_EMAIL` | email admin |
| `BOOTSTRAP_ADMIN_PASSWORD` | 12 sampai 128 karakter; tidak pernah ditampilkan di log |
| `BOOTSTRAP_ADMIN_NAME` | opsional |

Langkahnya:

1. isi ketiga variabel, lalu deploy;
2. log build menampilkan `users:bootstrap: created the admin account …`;
3. hapus `BOOTSTRAP_ADMIN_PASSWORD` (dan boleh juga email-nya) dari hPanel,
   lalu login di `/login` dan ganti password bila perlu.

Perintah ini tidak melakukan apa pun bila variabelnya kosong atau sudah ada
admin, dan tidak pernah mengubah akun yang sudah ada. Isian yang tidak valid
(email salah, password terlalu pendek, email milik akun non-admin)
menggagalkan deploy dengan pesan jelas, dan versi sebelumnya tetap berjalan.
Akun staf berikutnya dan perubahan role masih memakai `users:create` /
`users:set-role`, yang memerlukan terminal: belum ada caranya di shared
hosting.

### Pemeriksaan setelah deploy

Ganti domain sesuai deployment:

```sh
curl -I https://mlmsofts.com/en             # 200, ada Content-Security-Policy
curl -I https://mlmsofts.com/package.json   # harus 404
curl -I https://mlmsofts.com/config/app.js  # harus 404
curl -I https://mlmsofts.com/signup         # 404
```

Pastikan juga:

- login berhasil;
- form demo masuk ke back office;
- tombol WhatsApp membuka `wa.me` dengan nomor yang benar.

Jika halaman error, buka **Runtime logs** di hPanel. Penyebab paling umum:

- entry file bukan `server.cjs` (pesan `ERR_REQUIRE_ASYNC_MODULE`, HTTP 503);
- variabel environment belum diisi (pesan `Missing environment variable`);
- versi Node bukan 24;
- kredensial database salah.

## Uji production secara lokal

Dari root source, dengan environment production sebagai variabel shell (bukan
`.env` di root):

```sh
npm run build
NODE_ENV=production … node build/bin/server.js
```

Alternatifnya, salin `.env` ke `build/.env` (`chmod 600`), atur
`NODE_ENV=production`, lalu jalankan `cd build && node bin/server.js`. Mode
production tidak memakai `pino-pretty`. Ulangi penyiapan setelah rebuild
karena folder `build` dibuat ulang.

## Database

Konfigurasi koneksi ada di `config/database.ts`:

- tanpa `DB_CONNECTION`: SQLite di `tmp/db.sqlite3`, untuk development;
- tes memakai `tmp/test.sqlite3`;
- `DB_CONNECTION=mysql`: production dan staging, dengan kredensial dari
  `DB_*`.

Migration dijalankan oleh `build:hostinger` saat deploy (shared hosting
tidak punya SSH, jadi itu satu-satunya jalan; env database harus sudah benar
sebelum deploy). Di server dengan terminal, perintah manualnya
`node build/ace.js migration:run --force`. Database development tidak pernah
disalin ke hosting.
