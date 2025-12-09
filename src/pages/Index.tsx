import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getFeaturedProducts, products } from '@/data/products';
import heroImage from '@/assets/hero-autumn.jpg';

const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En pedidos superiores a €50"
  },
  {
    icon: RefreshCw,
    title: "30 Días",
    description: "Devoluciones gratuitas"
  },
  {
    icon: Shield,
    title: "Pago Seguro",
    description: "100% protegido"
  },
  {
    icon: Leaf,
    title: "Sostenible",
    description: "Materiales eco-friendly"
  }
];

const categories = [
  {
    name: "Hombre",
    href: "/categoria/hombre",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    count: 10
  },
  {
    name: "Mujeres",
    href: "/categoria/mujeres",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop",
    count: 10
  },
  {
    name: "Hogar",
    href: "/categoria/hogar",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=800&fit=crop",
    count: 10
  }
];

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm mb-6 animate-fade-in">
              <Leaf className="h-4 w-4" />
              Nueva Colección Otoño 2024
            </span>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Vive la Magia del
              <span className="block text-[hsl(40,90%,60%)]">Otoño</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Descubre nuestra colección inspirada en los cálidos colores de la temporada. Moda y hogar que abrazan el espíritu otoñal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/categoria/todos">
                  Explorar Colección
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/categoria/mujeres">Moda Mujer</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-background shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explora por Categoría
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Encuentra exactamente lo que buscas en nuestra selección cuidadosamente curada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.name}
                to={category.href}
                className="group relative h-[400px] rounded-2xl overflow-hidden hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-3xl font-bold text-primary-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4">{category.count} productos</p>
                  <span className="inline-flex items-center gap-2 text-primary-foreground group-hover:gap-4 transition-all">
                    Ver colección <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Productos Destacados
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Los favoritos de nuestros clientes esta temporada
            </p>
          </div>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="text-center mt-8">
            <Button variant="autumn" size="lg" asChild>
              <Link to="/categoria/todos">
                Ver Todos los Productos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-[hsl(25,40%,30%)] to-[hsl(10,60%,30%)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            ¿Listo para Renovar tu Estilo?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Suscríbete a nuestra newsletter y obtén un 10% de descuento en tu primera compra. Además, accede a ofertas exclusivas y novedades.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contacto">
              Comenzar Ahora
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
