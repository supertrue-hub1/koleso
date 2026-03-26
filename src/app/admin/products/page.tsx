'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  X,
  ChevronDown,
  Star,
  Eye,
  MoreVertical,
  LayoutDashboard,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  cpu: string;
  gpu: string;
  ramSize: number;
}

const typeLabels: Record<string, string> = {
  gaming: 'Игровой',
  workstation: 'Рабочая станция',
  creator: 'Для творчества',
  office: 'Офисный',
};

const typeColors: Record<string, string> = {
  gaming: 'bg-cyan-500/20 text-cyan-400',
  workstation: 'bg-purple-500/20 text-purple-400',
  creator: 'bg-pink-500/20 text-pink-400',
  office: 'bg-gray-500/20 text-gray-400',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Загрузка товаров
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Удаление товара
  const handleDelete = async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter(p => p.id !== product.id));
        setDeletingProduct(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Фильтрация
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'inStock' && p.inStock) ||
                        (stockFilter === 'outOfStock' && !p.inStock);
    return matchesSearch && matchesType && matchesStock;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121212] border-r border-white/5 fixed left-0 top-0 bottom-0 p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <Package className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-lg">CYBERFORGE</span>
        </div>

        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span>Дашборд</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white">
            <Package className="w-5 h-5" />
            <span>Товары</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <ShoppingCart className="w-5 h-5" />
            <span>Заказы</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        <header className="h-16 bg-[#121212]/50 backdrop-blur-sm border-b border-white/5 sticky top-0 z-40 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Управление товарами</h1>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить товар
          </Button>
        </header>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Input
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-cyan-500/50 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Тип ПК" />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/10">
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="gaming">Игровые</SelectItem>
                <SelectItem value="workstation">Рабочие станции</SelectItem>
                <SelectItem value="creator">Для творчества</SelectItem>
                <SelectItem value="office">Офисные</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <SelectValue placeholder="Наличие" />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/10">
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="inStock">В наличии</SelectItem>
                <SelectItem value="outOfStock">Нет в наличии</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-2xl bg-gradient-to-b from-[#151515] to-[#0f0f0f] border border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 flex gap-2">
                        {product.isNew && (
                          <Badge className="bg-cyan-500 text-black">NEW</Badge>
                        )}
                        {!product.inStock && (
                          <Badge className="bg-red-500/80 text-white">Нет в наличии</Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-black/50 backdrop-blur-sm"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-black/50 backdrop-blur-sm text-red-400 hover:text-red-300"
                          onClick={() => setDeletingProduct(product)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge className={typeColors[product.type]}>
                            {typeLabels[product.type]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-cyan-400">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {product.originalPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <Eye className="w-4 h-4 mr-1" />
                          {product.reviewsCount}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Товары не найдены</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <DialogContent className="bg-[#121212] border-white/10">
          <DialogHeader>
            <DialogTitle>Удалить товар?</DialogTitle>
            <DialogDescription className="text-gray-400">
              Вы уверены, что хотите удалить &quot;{deletingProduct?.name}&quot;? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeletingProduct(null)}>
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingProduct && handleDelete(deletingProduct)}
            >
              Удалить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Product Modal */}
      <Dialog open={showAddModal || !!editingProduct} onOpenChange={() => { setShowAddModal(false); setEditingProduct(null); }}>
        <DialogContent className="bg-[#121212] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onClose={() => { setShowAddModal(false); setEditingProduct(null); }}
            onSave={(product) => {
              if (editingProduct) {
                setProducts(products.map(p => p.id === product.id ? product : p));
              } else {
                setProducts([product, ...products]);
              }
              setShowAddModal(false);
              setEditingProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Form Component
function ProductForm({ product, onClose, onSave }: { 
  product: Product | null; 
  onClose: () => void;
  onSave: (product: Product) => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    type: product?.type || 'gaming',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    inStock: product?.inStock ?? true,
    isNew: product?.isNew ?? false,
    isFeatured: product?.isFeatured ?? false,
    cpu: product?.cpu || '',
    gpu: product?.gpu || '',
    ramSize: product?.ramSize || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = product 
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products';
      
      const res = await fetch(url, {
        method: product ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSave(data.product);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Название</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/5 border-white/10"
            required
          />
        </div>
        <div>
          <Label>Тип</Label>
          <Select
            value={formData.type}
            onValueChange={(v) => setFormData({ ...formData, type: v })}
          >
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-white/10">
              <SelectItem value="gaming">Игровой</SelectItem>
              <SelectItem value="workstation">Рабочая станция</SelectItem>
              <SelectItem value="creator">Для творчества</SelectItem>
              <SelectItem value="office">Офисный</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Краткое описание</Label>
        <Input
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          className="bg-white/5 border-white/10"
        />
      </div>

      <div>
        <Label>Полное описание</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-white/5 border-white/10 min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Цена (₽)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
            className="bg-white/5 border-white/10"
            required
          />
        </div>
        <div>
          <Label>Старая цена (₽)</Label>
          <Input
            type="number"
            value={formData.originalPrice || ''}
            onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || null })}
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Процессор</Label>
          <Input
            value={formData.cpu}
            onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
            className="bg-white/5 border-white/10"
          />
        </div>
        <div>
          <Label>Видеокарта</Label>
          <Input
            value={formData.gpu}
            onChange={(e) => setFormData({ ...formData, gpu: e.target.value })}
            className="bg-white/5 border-white/10"
          />
        </div>
        <div>
          <Label>RAM (GB)</Label>
          <Input
            type="number"
            value={formData.ramSize}
            onChange={(e) => setFormData({ ...formData, ramSize: parseInt(e.target.value) || 0 })}
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            className="w-4 h-4 rounded border-white/20"
          />
          <span className="text-sm">В наличии</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isNew}
            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
            className="w-4 h-4 rounded border-white/20"
          />
          <span className="text-sm">Новинка</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="w-4 h-4 rounded border-white/20"
          />
          <span className="text-sm">Рекомендуемый</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Отмена
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
