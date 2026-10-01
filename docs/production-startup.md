# Menjalankan hasil build

`start/env.ts` membaca file `.env` dari root aplikasi yang dijalankan.
Saat menjalankan `build/bin/server.js`, root tersebut adalah `build`, sehingga
`.env` di root source tidak otomatis terbaca. Hasil build tidak menyertakan `.env`.

## Hostinger Node.js Web App (upload source ZIP)

Jika build gagal dengan `Cannot find package '@poppinss/ts-exec'`, dependency
build belum terpasang. Package tersebut, assembler, TypeScript, dan Vite ada
di `devDependencies`. Instalasi npm dengan `NODE_ENV=production` secara default
melewatkan dependency development.

Gunakan pengaturan berikut di panel deployment:

| Pengaturan | Nilai |
| --- | --- |
| Application/framework type | Other (Node.js dengan server) |
| Node.js | 24 |
| Root directory | Folder yang berisi `package.json` dan `ace.js` |
| Build command | `npm run build` |
| Output directory | `build` |
| Entry file | `bin/server.js` relatif terhadap hasil build; `build/bin/server.js` jika panel meminta path relatif terhadap root source |

Perintah `build` menjalankan `npm ci --include=dev` sebelum `node ace build`.
Flag tersebut memasang dependency build sekalipun environment production aktif.
Sertakan `package-lock.json` dalam ZIP. `build:hostinger` adalah alias untuk
perintah yang sama. Instalasi ini mengganti `node_modules` sesuai lockfile pada
setiap build. Untuk build lokal tanpa instalasi ulang, gunakan `node ace build`.

Pastikan ZIP yang diunggah berisi `package.json` terbaru. Log deployment harus
menampilkan `npm ci --include=dev && node ace build` setelah `npm run build`.
Jika masih menampilkan `node ace build` saja, source yang dideploy masih lama.

Upload source terbaru tanpa `node_modules`, `build`, database lokal, atau file
`.env`. Dependency native seperti `better-sqlite3` harus dipasang di server.
Sediakan seluruh variabel wajib dari `start/env.ts` melalui environment panel,
termasuk `NODE_ENV=production`, `HOST=0.0.0.0`, `APP_URL=https://mlmsofts.com`,
`APP_KEY`, konfigurasi session/limiter, dan SMTP. Gunakan `PORT` yang ditentukan
hosting. Environment tersebut harus tersedia saat build dan saat runtime.

Output `dist` dan entry file kosong tidak sesuai dengan aplikasi ini: backend
AdonisJS dijalankan dari `build/bin/server.js`.

Referensi: [pengaturan deployment Hostinger](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
dan [npm ci: include/omit](https://docs.npmjs.com/cli/v11/commands/npm-ci/).

## Uji production secara lokal

Jalankan dari root source:

```sh
npm run build
cp -n .env build/.env
chmod 600 build/.env
```

Atur `NODE_ENV=production` di `build/.env`, kemudian:

```sh
cd build
npm ci --omit=dev
node bin/server.js
```

Mode production juga menghindari penggunaan `pino-pretty`, yang hanya tersedia
sebagai dependency development. Ulangi penyiapan environment setelah rebuild
karena folder build dapat dibuat ulang.

## Deployment

Sediakan variabel environment melalui konfigurasi hosting atau file `.env`
di root hasil build. Gunakan `.env.example` sebagai daftar konfigurasi dan
`start/env.ts` sebagai acuan validasi. Isi `NODE_ENV=production`, `APP_URL`
sesuai domain deployment, serta kredensial SMTP dan `APP_KEY` untuk environment
tersebut. Pertahankan `APP_KEY` yang sama pada deployment berikutnya.

File `.env` berisi rahasia: sediakan secara terpisah dari artifact build.
Konfigurasi lokal yang disalin untuk pengujian perlu disesuaikan sebelum
dipakai di hosting.

Database saat ini menggunakan SQLite di `tmp/db.sqlite3`, relatif terhadap
root aplikasi yang dijalankan. Penyiapan environment tidak menyalin database
development maupun menjalankan migration; siapkan database deployment dan
penyimpanan persisten secara terpisah.
