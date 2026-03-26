// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'wisata' },
      update: {},
      create: { name: 'Wisata', slug: 'wisata', icon: '🏛️', color: '#3B82F6' },
    }),
    prisma.category.upsert({
      where: { slug: 'kuliner' },
      update: {},
      create: { name: 'Kuliner', slug: 'kuliner', icon: '🍽️', color: '#EF4444' },
    }),
    prisma.category.upsert({
      where: { slug: 'penginapan' },
      update: {},
      create: { name: 'Penginapan', slug: 'penginapan', icon: '🏨', color: '#8B5CF6' },
    }),
    prisma.category.upsert({
      where: { slug: 'belanja' },
      update: {},
      create: { name: 'Belanja', slug: 'belanja', icon: '🛍️', color: '#F59E0B' },
    }),
    prisma.category.upsert({
      where: { slug: 'budaya' },
      update: {},
      create: { name: 'Budaya', slug: 'budaya', icon: '🎭', color: '#10B981' },
    }),
  ])

  // Sample places
  await prisma.place.upsert({
    where: { slug: 'jembatan-ampera' },
    update: {},
    create: {
      name: 'Jembatan Ampera',
      slug: 'jembatan-ampera',
      description: 'Ikon kota Palembang yang berdiri megah di atas Sungai Musi. Dibangun pada era 1960-an, jembatan ini menjadi simbol kebanggaan masyarakat Palembang dan Sumatera Selatan.',
      address: 'Jl. Jenderal Sudirman, Ilir Bar. I',
      city: 'Palembang',
      district: 'Ilir Barat I',
      lat: -2.9918,
      lng: 104.7640,
      openHours: '24 Jam',
      priceRange: 'Gratis',
      images: [],
      isVerified: true,
      isFeatured: true,
      categoryId: categories[0].id,
    },
  })

  await prisma.place.upsert({
    where: { slug: 'pempek-candy' },
    update: {},
    create: {
      name: 'Pempek Candy',
      slug: 'pempek-candy',
      description: 'Salah satu pempek legendaris di Palembang yang sudah berdiri puluhan tahun. Terkenal dengan cita rasa autentik dan kuah cuko yang khas.',
      address: 'Jl. Letkol Iskandar No. 12, Palembang',
      city: 'Palembang',
      district: 'Ilir Timur II',
      lat: -2.9841,
      lng: 104.7524,
      phone: '+62711-123456',
      openHours: '08:00 - 21:00',
      priceRange: 'Rp 15.000 - Rp 100.000',
      images: [],
      isVerified: true,
      isFeatured: true,
      categoryId: categories[1].id,
    },
  })

  await prisma.place.upsert({
    where: { slug: 'benteng-kuto-besak' },
    update: {},
    create: {
      name: 'Benteng Kuto Besak',
      slug: 'benteng-kuto-besak',
      description: 'Benteng bersejarah peninggalan Kesultanan Palembang Darussalam yang dibangun pada abad ke-18. Menjadi salah satu destinasi wisata sejarah dan budaya utama di Palembang.',
      address: 'Jl. Sultan Mahmud Badaruddin, Palembang',
      city: 'Palembang',
      district: '29 Ilir',
      lat: -2.9921,
      lng: 104.7630,
      openHours: '08:00 - 17:00',
      priceRange: 'Rp 5.000',
      images: [],
      isVerified: true,
      isFeatured: true,
      categoryId: categories[4].id,
    },
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
