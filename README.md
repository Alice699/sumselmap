<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:CC2B2B,100:8B0000&height=180&section=header&text=SumselMap&fontSize=60&fontColor=ffffff&fontAlignY=40&desc=Direktori%20Bisnis%20%26%20Wisata%20Sumatera%20Selatan&descSize=18&descAlignY=65&animation=fadeIn" width="100%"/>

[![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)

**Temukan tempat wisata, kuliner, penginapan, dan bisnis terbaik di Sumatera Selatan.**

[Demo](#) · [Lapor Bug](https://github.com/Alice699/sumselmap/issues) · [Request Fitur](https://github.com/Alice699/sumselmap/issues)

</div>

---

## Tentang Proyek

**SumselMap** adalah platform direktori berbasis peta interaktif yang memudahkan masyarakat menemukan tempat wisata, kuliner, penginapan, dan berbagai bisnis di seluruh wilayah Sumatera Selatan.

Proyek ini dibangun untuk mendukung pertumbuhan UMKM lokal dan promosi pariwisata daerah dengan teknologi modern yang mudah diakses.

### ✨ Fitur Utama

- **Peta Interaktif** - Visualisasi semua tempat di atas peta menggunakan Leaflet.js
- **Pencarian & Filter** - Cari berdasarkan nama, kategori, kota, dan harga
- **Kategori Lengkap** - Wisata, Kuliner, Penginapan, Belanja, Budaya
- **Ulasan & Rating** - Komunitas bisa memberikan ulasan dan rating
- **Verifikasi Bisnis** - Sistem verifikasi untuk memastikan data akurat
- **Responsive** - Optimal di semua perangkat (mobile, tablet, desktop)
- **Performa Tinggi** - Dibangun di atas Next.js 14 App Router

---

## 🛠️ Tech Stack

| Layer       | Teknologi                          |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Language    | TypeScript                        |
| Styling     | Tailwind CSS                      |
| Database    | PostgreSQL + Prisma ORM           |
| Maps        | Leaflet.js + React-Leaflet        |
| Icons       | Lucide React                      |
| Deployment  | Vercel + Neon (DB)                |

---

## Cara Menjalankan Lokal

### Prasyarat

- Node.js >= 18.x
- PostgreSQL (lokal atau gunakan [Neon](https://neon.tech))
- npm / yarn / pnpm

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/Alice699/sumselmap.git
cd sumselmap

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi database kamu

# 4. Push schema ke database
npm run db:push

# 5. Isi data awal (seed)
npm run db:seed

# 6. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser kamu.

---

## 📁 Struktur Proyek

```
sumselmap/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Data seed
├── src/
│   ├── app/
│   │   ├── api/            # API Routes
│   │   │   ├── places/
│   │   │   └── categories/
│   │   ├── explore/        # Halaman eksplorasi + peta
│   │   ├── place/          # Detail tempat
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── cards/          # PlaceCard, dll
│   │   ├── map/            # Komponen peta
│   │   ├── layout/         # Navbar, Footer
│   │   └── ui/             # Komponen UI umum
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Prisma client, utils
│   └── types/              # TypeScript types
└── public/                 # Aset statis
```

---

## Kontribusi

Kontribusi sangat terbuka! Ini cara untuk berkontribusi:

1. **Fork** repository ini
2. Buat branch baru: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat **Pull Request**

Pastikan mengikuti [conventional commits](https://www.conventionalcommits.org) untuk pesan commit.

---

## 📝 Lisensi

Didistribusikan di bawah lisensi **MIT**. Lihat [`LICENSE`](LICENSE) untuk detail lebih lanjut.

---

<div align="center">

Dibuat dengan ❤️ dari **Palembang, Sumatera Selatan** 🇮🇩

oleh [Alice699](https://github.com/Alice699)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8B0000,100:CC2B2B&height=100&section=footer" width="100%"/>

</div>
