import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - получить все товары
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = {};
    
    if (type) {
      where.type = type;
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({
      success: true,
      products: products.map(p => ({
        ...p,
        images: JSON.parse(p.images),
      })),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - создать новый товар
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const product = await db.product.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        type: body.type || 'gaming',
        description: body.description || '',
        shortDescription: body.shortDescription || '',
        price: parseInt(body.price) || 0,
        originalPrice: body.originalPrice ? parseInt(body.originalPrice) : null,
        images: JSON.stringify(body.images || ['/images/placeholder-pc.png']),
        inStock: body.inStock ?? true,
        isNew: body.isNew ?? false,
        isFeatured: body.isFeatured ?? false,
        rating: body.rating || 4.5,
        reviewsCount: body.reviewsCount || 0,
        // Характеристики
        cpu: body.cpu || '',
        cpuCores: body.cpuCores || 0,
        cpuThreads: body.cpuThreads || 0,
        gpu: body.gpu || '',
        gpuMemory: body.gpuMemory || 0,
        ram: body.ram || '',
        ramSize: body.ramSize || 0,
        ramType: body.ramType || 'DDR5',
        storage: body.storage || '',
        storageSize: body.storageSize || 0,
        storageType: body.storageType || 'NVMe',
        pcCase: body.pcCase || body.case || '',
        psu: body.psu || '',
        cooling: body.cooling || '',
        motherboard: body.motherboard || '',
      },
    });

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        images: JSON.parse(product.images),
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
