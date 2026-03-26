import { db } from '@/lib/db';
import { products as mockProducts } from '@/data/products';

async function main() {
  console.log('🌱 Seeding database...');

  // Создаем товары из mock-данных
  for (const product of mockProducts) {
    await db.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        type: product.type,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        originalPrice: product.originalPrice || null,
        images: JSON.stringify(product.images),
        inStock: product.inStock,
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
        cpu: product.specs.cpu || '',
        cpuCores: product.specs.cpuCores || 0,
        cpuThreads: product.specs.cpuThreads || 0,
        gpu: product.specs.gpu || '',
        gpuMemory: product.specs.gpuMemory || 0,
        ram: product.specs.ram || '',
        ramSize: product.specs.ramSize || 0,
        ramType: product.specs.ramType || 'DDR5',
        storage: product.specs.storage || '',
        storageSize: product.specs.storageSize || 0,
        storageType: product.specs.storageType || 'NVMe',
        pcCase: product.specs.case || '',
        psu: product.specs.psu || '',
        cooling: product.specs.cooling || '',
        motherboard: product.specs.motherboard || '',
      },
    });
    console.log(`✓ Created product: ${product.name}`);
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
