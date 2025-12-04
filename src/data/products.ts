export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'hombre' | 'mujeres' | 'hogar';
  image: string;
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  // HOMBRE - 10 productos
  {
    id: 1,
    name: "Chaqueta de Cuero Premium",
    description: "Chaqueta de cuero genuino con forro térmico. Perfecta para el otoño.",
    price: 289.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Suéter de Lana Merino",
    description: "Suéter cálido de lana merino 100%. Ideal para días frescos.",
    price: 89.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    stock: 25
  },
  {
    id: 3,
    name: "Pantalón Chino Slim",
    description: "Pantalón chino de corte slim en algodón premium.",
    price: 59.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
    stock: 30
  },
  {
    id: 4,
    name: "Botas de Ante",
    description: "Botas Chelsea de ante con suela de goma antideslizante.",
    price: 149.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=400&fit=crop",
    stock: 12,
    featured: true
  },
  {
    id: 5,
    name: "Camisa de Franela",
    description: "Camisa de franela a cuadros, suave y cálida.",
    price: 49.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
    stock: 40
  },
  {
    id: 6,
    name: "Bufanda de Cachemira",
    description: "Bufanda elegante de cachemira pura en tonos otoñales.",
    price: 79.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop",
    stock: 20
  },
  {
    id: 7,
    name: "Reloj Clásico Marrón",
    description: "Reloj analógico con correa de cuero genuino marrón.",
    price: 199.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    stock: 8
  },
  {
    id: 8,
    name: "Chaleco Acolchado",
    description: "Chaleco ligero acolchado, perfecto para capas.",
    price: 99.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1559582798-678dfc68cce9?w=400&h=400&fit=crop",
    stock: 18
  },
  {
    id: 9,
    name: "Gorro de Lana",
    description: "Gorro tejido de lana con forro polar interior.",
    price: 29.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    stock: 50
  },
  {
    id: 10,
    name: "Cinturón de Cuero",
    description: "Cinturón de cuero italiano con hebilla metálica.",
    price: 45.99,
    category: "hombre",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    stock: 35
  },

  // MUJERES - 10 productos
  {
    id: 11,
    name: "Vestido Midi Otoñal",
    description: "Vestido midi fluido con estampado de hojas otoñales.",
    price: 119.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    stock: 20,
    featured: true
  },
  {
    id: 12,
    name: "Abrigo de Lana Camel",
    description: "Abrigo largo de lana en tono camel, elegante y cálido.",
    price: 259.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
    stock: 10,
    featured: true
  },
  {
    id: 13,
    name: "Botas Altas de Cuero",
    description: "Botas hasta la rodilla en cuero marrón cognac.",
    price: 189.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    stock: 15
  },
  {
    id: 14,
    name: "Bolso Tote de Cuero",
    description: "Bolso tote espacioso en cuero vegano color terracota.",
    price: 129.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    stock: 22
  },
  {
    id: 15,
    name: "Cárdigan Oversize",
    description: "Cárdigan largo y acogedor en punto grueso.",
    price: 79.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    stock: 28
  },
  {
    id: 16,
    name: "Falda Plisada Midi",
    description: "Falda plisada en satén color burdeos.",
    price: 69.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj3d?w=400&h=400&fit=crop",
    stock: 25
  },
  {
    id: 17,
    name: "Pañuelo de Seda",
    description: "Pañuelo cuadrado de seda con print floral otoñal.",
    price: 59.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=400&fit=crop",
    stock: 30
  },
  {
    id: 18,
    name: "Jersey de Cuello Alto",
    description: "Jersey ajustado de cuello alto en lana fina.",
    price: 65.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    stock: 35
  },
  {
    id: 19,
    name: "Pendientes Hoja Dorada",
    description: "Pendientes colgantes con forma de hoja bañados en oro.",
    price: 39.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    stock: 45
  },
  {
    id: 20,
    name: "Blazer Structured Fit",
    description: "Blazer entallado en tweed marrón oscuro.",
    price: 159.99,
    category: "mujeres",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
    stock: 12
  },

  // HOGAR - 10 productos
  {
    id: 21,
    name: "Vela Aromática Canela",
    description: "Vela de soja con aroma a canela y naranja, 50h de duración.",
    price: 24.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1602607718066-f73a1ca8afdc?w=400&h=400&fit=crop",
    stock: 60,
    featured: true
  },
  {
    id: 22,
    name: "Manta de Punto Grueso",
    description: "Manta tejida a mano en algodón orgánico color mostaza.",
    price: 89.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    stock: 18
  },
  {
    id: 23,
    name: "Cojín Terciopelo Burdeos",
    description: "Cojín decorativo de terciopelo con relleno de plumas.",
    price: 34.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=400&h=400&fit=crop",
    stock: 40
  },
  {
    id: 24,
    name: "Jarrón Cerámica Artesanal",
    description: "Jarrón de cerámica hecho a mano en tonos terracota.",
    price: 49.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
    stock: 25,
    featured: true
  },
  {
    id: 25,
    name: "Set de Tazas Otoñales",
    description: "Set de 4 tazas de cerámica con diseños de hojas.",
    price: 39.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    stock: 30
  },
  {
    id: 26,
    name: "Alfombra de Yute",
    description: "Alfombra natural de yute tejido, 120x180cm.",
    price: 119.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop",
    stock: 8
  },
  {
    id: 27,
    name: "Lámpara de Mesa Vintage",
    description: "Lámpara con base de madera y pantalla de lino.",
    price: 79.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    stock: 14
  },
  {
    id: 28,
    name: "Marco de Fotos Madera",
    description: "Set de 3 marcos de madera de roble en diferentes tamaños.",
    price: 44.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop",
    stock: 35
  },
  {
    id: 29,
    name: "Difusor de Aromas",
    description: "Difusor de varillas con esencia de sándalo y vainilla.",
    price: 29.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    stock: 50
  },
  {
    id: 30,
    name: "Bandeja Decorativa Dorada",
    description: "Bandeja redonda con acabado dorado mate para servir.",
    price: 54.99,
    category: "hogar",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&h=400&fit=crop",
    stock: 20
  }
];

export const getProductsByCategory = (category: string) => {
  if (category === 'todos') return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};
