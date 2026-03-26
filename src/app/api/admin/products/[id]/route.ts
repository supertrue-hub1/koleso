import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - получить товар по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        images: JSON.parse(product.images),
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - обновить товар
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const product = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        type: body.type,
        description: body.description,
        shortDescription: body.shortDescription,
        price: parseInt(body.price) || 0,
        originalPrice: body.originalPrice ? parseInt(body.originalPrice) : null,
        images: JSON.stringify(body.images || []),
        inStock: body.inStock,
        isNew: body.isNew,
        isFeatured: body.isFeatured,
        rating: body.rating || 4.5,
        reviewsCount: body.reviewsCount || 0,
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
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - удалить товар
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
