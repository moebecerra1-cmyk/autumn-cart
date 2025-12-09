import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Plus, ArrowLeft, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Sale {
  id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  sale_date: string;
}

export default function SalesPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '1',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('id, name, price, stock').order('name');
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!user && isAdmin,
  });

  const { data: sales, isLoading } = useQuery({
    queryKey: ['admin-sales'],
    queryFn: async () => {
      const { data, error } = await supabase.from('sales').select('*').order('sale_date', { ascending: false });
      if (error) throw error;
      return data as Sale[];
    },
    enabled: !!user && isAdmin,
  });

  const createMutation = useMutation({
    mutationFn: async (data: { product_id: string; product_name: string; quantity: number; unit_price: number; total_price: number }) => {
      const { error } = await supabase.from('sales').insert([data]);
      if (error) throw error;
      
      // Update product stock
      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: (selectedProduct?.stock || 0) - data.quantity })
        .eq('id', data.product_id);
      if (stockError) throw stockError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sales'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Venta registrada correctamente');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Error al registrar venta: ' + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('sales').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sales'] });
      toast.success('Venta eliminada');
    },
    onError: (error) => {
      toast.error('Error al eliminar venta: ' + error.message);
    },
  });

  const resetForm = () => {
    setFormData({ product_id: '', quantity: '1' });
    setSelectedProduct(null);
  };

  const handleProductChange = (productId: string) => {
    const product = products?.find(p => p.id === productId);
    setSelectedProduct(product || null);
    setFormData({ ...formData, product_id: productId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      toast.error('Selecciona un producto');
      return;
    }

    const quantity = parseInt(formData.quantity);
    
    if (quantity > selectedProduct.stock) {
      toast.error(`Stock insuficiente. Disponible: ${selectedProduct.stock}`);
      return;
    }

    createMutation.mutate({
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      quantity,
      unit_price: selectedProduct.price,
      total_price: selectedProduct.price * quantity,
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const totalSales = sales?.reduce((acc, s) => acc + Number(s.total_price), 0) || 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <h1 className="text-3xl font-display font-bold">Ventas</h1>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Registrar Venta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Nueva Venta</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Producto</Label>
                  <Select
                    value={formData.product_id}
                    onValueChange={handleProductChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.filter(p => p.stock > 0).map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${product.price} (Stock: {product.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedProduct?.stock || 1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>

                {selectedProduct && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <p className="text-sm text-muted-foreground">Resumen</p>
                    <div className="flex justify-between">
                      <span>Precio unitario:</span>
                      <span>${selectedProduct.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${(selectedProduct.price * parseInt(formData.quantity || '1')).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={createMutation.isPending || !selectedProduct}
                >
                  {createMutation.isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Registrar Venta
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-card bg-primary/5">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">Ventas totales</p>
            <p className="text-3xl font-bold">${totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-display">
              Historial de Ventas ({sales?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sales && sales.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Producto</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cantidad</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Precio Unit.</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fecha</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{sale.product_name}</td>
                        <td className="py-3 px-4">{sale.quantity}</td>
                        <td className="py-3 px-4">${Number(sale.unit_price).toFixed(2)}</td>
                        <td className="py-3 px-4 font-medium">${Number(sale.total_price).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          {format(new Date(sale.sale_date), 'dd MMM yyyy HH:mm', { locale: es })}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm('¿Eliminar esta venta?')) {
                                deleteMutation.mutate(sale.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay ventas registradas
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
