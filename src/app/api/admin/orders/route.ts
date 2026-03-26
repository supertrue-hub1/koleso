import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - получить все заказы
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let orders = await db.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Фильтр по статусу
    if (status) {
      orders = orders.filter(o => o.status === status);
    }

    // Лимит
    if (limit) {
      orders = orders.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST - создать заказ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const orderNumber = `CF-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const order = await db.order.create({
      data: {
        orderNumber,
        status: 'pending',
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        totalAmount: body.totalAmount,
        notes: body.notes || null,
        items: {
          create: body.items.map((item: { productId: string; productName: string; quantity: number; price: number; customConfig?: string }) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            customConfig: item.customConfig || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
