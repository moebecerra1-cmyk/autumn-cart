import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', product });
    toast({
      title: "¡Añadido al carrito!",
      description: `${product.name} se ha añadido a tu carrito.`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', product });
    dispatch({ type: 'OPEN_CART' });
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover-lift">
      {/* Image */}
      <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-center justify-center">
          <Button
            variant="hero"
            size="sm"
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
        </div>

        {/* Stock Badge */}
        {product.stock < 10 && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-autumn-burgundy text-primary-foreground text-xs font-medium rounded-full">
            ¡Últimas unidades!
          </span>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-autumn-gold text-autumn-dark text-xs font-medium rounded-full">
            Destacado
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>
        <Link to={`/producto/${product.id}`}>
          <h3 className="font-display text-lg font-semibold mt-1 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-xl font-bold text-primary">
            €{product.price.toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button 
            variant="buy" 
            size="sm" 
            className="flex-1"
            onClick={handleBuyNow}
          >
            Compra Ya
          </Button>
          <Button
            variant="cart"
            size="icon"
            onClick={handleAddToCart}
            className="shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
