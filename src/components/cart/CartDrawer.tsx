import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-elevated z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Tu Carrito</h2>
            <span className="text-sm text-muted-foreground">({totalItems} items)</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
              <Button 
                variant="autumn" 
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                asChild
              >
                <Link to="/categoria/todos">Explorar Productos</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-card rounded-lg border border-border hover:shadow-card transition-shadow"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                    <p className="text-primary font-semibold mt-1">
                      €{item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => dispatch({ 
                          type: 'UPDATE_QUANTITY', 
                          productId: item.product.id, 
                          quantity: item.quantity - 1 
                        })}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => dispatch({ 
                          type: 'UPDATE_QUANTITY', 
                          productId: item.product.id, 
                          quantity: item.quantity + 1 
                        })}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.product.id })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl font-bold text-primary">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Envío e impuestos calculados en el checkout
            </p>
            <Button 
              variant="autumn" 
              size="lg" 
              className="w-full"
              onClick={() => dispatch({ type: 'CLOSE_CART' })}
              asChild
            >
              <Link to="/checkout">Proceder al Pago</Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Vaciar Carrito
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
