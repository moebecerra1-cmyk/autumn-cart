import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getProductsByCategory, products } from '@/data/products';

const categoryNames: Record<string, string> = {
  hombre: 'Moda Hombre',
  mujeres: 'Moda Mujeres',
  hogar: 'Hogar',
  todos: 'Todos los Productos'
};

const categoryDescriptions: Record<string, string> = {
  hombre: 'Descubre nuestra colección de moda masculina con piezas atemporales para la temporada otoñal.',
  mujeres: 'Elegancia y estilo en cada prenda. Encuentra tu look perfecto para este otoño.',
  hogar: 'Transforma tu hogar con nuestra selección de artículos decorativos y textiles acogedores.',
  todos: 'Explora nuestra colección completa con más de 30 productos exclusivos.'
};

const CategoryPage = () => {
  const { category = 'todos' } = useParams<{ category: string }>();
  
  const filteredProducts = category === 'todos' 
    ? products 
    : getProductsByCategory(category);

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {categoryNames[category] || 'Productos'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {categoryDescriptions[category] || 'Descubre nuestra selección de productos.'}
          </p>
          <p className="text-sm text-primary mt-4 font-medium">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
