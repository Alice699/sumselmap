// src/app/api/places/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query    = searchParams.get('query') || ''
    const category = searchParams.get('category') || ''
    const city     = searchParams.get('city') || ''
    const featured = searchParams.get('featured') === 'true'
    const page     = parseInt(searchParams.get('page') || '1')
    const limit    = parseInt(searchParams.get('limit') || '12')
    const skip     = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (query) {
      where.OR = [
        { name:        { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { address:     { contains: query, mode: 'insensitive' } },
      ]
    }
    if (category) where.category = { slug: category }
    if (city)     where.city = { contains: city, mode: 'insensitive' }
    if (featured) where.isFeatured = true

    const [places, total] = await Promise.all([
      prisma.place.findMany({
        where,
        skip,
        take: limit,
        include: { category: true, tags: true },
        orderBy: [{ isFeatured: 'desc' }, { rating: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.place.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: places,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('[GET /api/places]', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
