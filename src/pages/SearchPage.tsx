import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { searchProducts, products } from '@/data/products';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState(searchProducts(query));

  useEffect(() => {
    setResults(searchProducts(query));
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <>
            <h1 className="font-display text-3xl font-bold mb-2">
              Resultados para "{query}"
            </h1>
            <p className="text-muted-foreground mb-8">
              {results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
            </p>
            
            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No se encontraron resultados</h2>
                <p className="text-muted-foreground mb-6">
                  Intenta con otros términos de búsqueda o explora nuestras categorías
                </p>
                <Button variant="autumn" asChild>
                  <Link to="/categoria/todos">Ver todos los productos</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">¿Qué estás buscando?</h2>
            <p className="text-muted-foreground">
              Escribe el nombre del producto que deseas encontrar
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
