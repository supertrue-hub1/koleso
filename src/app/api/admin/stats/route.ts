import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Получаем все данные
    const products = await db.product.findMany();
    const orders = await db.order.findMany({
      include: { items: true },
    });
    
    // Статистика товаров
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const featuredProducts = products.filter(p => p.isFeatured).length;
    const newProducts = products.filter(p => p.isNew).length;
    
    // Статистика по типам
    const productsByType = {
      gaming: products.filter(p => p.type === 'gaming').length,
      workstation: products.filter(p => p.type === 'workstation').length,
      creator: products.filter(p => p.type === 'creator').length,
      office: products.filter(p => p.type === 'office').length,
    };
    
    // Статистика заказов
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
    
    // Выручка
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    // Выручка за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentOrders = orders.filter(o => new Date(o.createdAt) >= thirtyDaysAgo);
    const monthlyRevenue = recentOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    // Средний чек
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return NextResponse.json({
      success: true,
      stats: {
        products: {
          total: totalProducts,
          inStock: inStockProducts,
          featured: featuredProducts,
          new: newProducts,
          byType: productsByType,
        },
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          processing: processingOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
        },
        revenue: {
          total: totalRevenue,
          monthly: monthlyRevenue,
          avgOrderValue,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
