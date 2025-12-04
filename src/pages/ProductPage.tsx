import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Minus, Plus, Check, Truck, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { ProductGrid } from '@/components/products/ProductGrid';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', product });
    }
    toast({
      title: "¡Añadido al carrito!",
      description: `${quantity}x ${product.name} se ha añadido a tu carrito.`,
    });
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', product });
    }
    dispatch({ type: 'OPEN_CART' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link 
          to={`/categoria/${product.category}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a {product.category}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.featured && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-[hsl(40,90%,50%)] text-[hsl(25,30%,12%)] text-sm font-medium rounded-full">
                Destacado
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-primary uppercase tracking-wider font-medium">
              {product.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            <div className="font-display text-4xl font-bold text-primary mb-6">
              €{product.price.toFixed(2)}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    En stock ({product.stock} disponibles)
                  </span>
                </>
              ) : (
                <span className="text-destructive font-medium">Agotado</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Cantidad:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="buy"
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Compra Ya
              </Button>
              <Button
                variant="cart"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Añadir al Carrito
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Envío gratis en pedidos +€50</p>
                  <p className="text-sm text-muted-foreground">Entrega en 3-5 días laborables</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Devoluciones gratuitas</p>
                  <p className="text-sm text-muted-foreground">30 días para cambios o devoluciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-bold mb-8">
              También te puede interesar
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
