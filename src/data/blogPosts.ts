export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tendencias de Moda Otoño 2024",
    excerpt: "Descubre los colores y estilos que marcarán esta temporada otoñal.",
    content: `El otoño 2024 viene cargado de propuestas que combinan elegancia con comodidad. Los tonos tierra, desde el camel hasta el terracota, dominan las pasarelas internacionales.

Las capas siguen siendo protagonistas: combina cárdigans oversize con camisas de franela y añade un toque de sofisticación con accesorios dorados.

La sostenibilidad también marca tendencia, con un aumento en la demanda de materiales orgánicos y producción ética. En nuestra tienda, nos comprometemos a ofrecer opciones responsables sin sacrificar el estilo.

Para el calzado, las botas Chelsea y los mocasines en ante son imprescindibles. Opta por tonos cognac o burdeos para un look cohesivo y atemporal.`,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop",
    date: "2024-10-15",
    author: "María García",
    category: "Moda"
  },
  {
    id: 2,
    title: "Cómo Preparar tu Hogar para el Otoño",
    excerpt: "Tips para crear un ambiente cálido y acogedor en tu casa esta temporada.",
    content: `Con la llegada del otoño, es momento de transformar tu hogar en un refugio cálido y acogedor. Aquí te compartimos algunos consejos esenciales.

**Textiles cálidos**: Incorpora mantas de punto grueso, cojines de terciopelo y alfombras de fibras naturales. Los colores mostaza, terracota y burdeos añaden calidez instantánea.

**Iluminación ambiental**: Cambia la luz fría por bombillas cálidas y añade velas aromáticas. Los aromas de canela, vainilla y sándalo crean una atmósfera reconfortante.

**Elementos naturales**: Ramas secas, calabazas decorativas y hojas preservadas son perfectos para centros de mesa y rincones especiales.

**Organización consciente**: Aprovecha el cambio de estación para reorganizar espacios y donar lo que ya no uses.`,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=400&fit=crop",
    date: "2024-10-10",
    author: "Carlos Ruiz",
    category: "Hogar"
  },
  {
    id: 3,
    title: "Guía de Cuidado para Prendas de Lana",
    excerpt: "Aprende a mantener tus suéteres y abrigos de lana como nuevos.",
    content: `La lana es uno de los materiales más nobles y duraderos, pero requiere cuidados específicos para mantener su belleza y suavidad.

**Lavado**: Siempre a mano o en programa delicado con agua fría. Usa detergentes específicos para lana y evita el centrifugado agresivo.

**Secado**: Nunca en secadora ni colgado. Extiende la prenda sobre una toalla limpia y déjala secar en horizontal para evitar deformaciones.

**Almacenamiento**: Guarda las prendas dobladas, nunca colgadas. Añade bolsitas de lavanda para proteger contra polillas y mantener un aroma fresco.

**Antipelusa**: Usa un peine especial para lana para eliminar las bolitas que se forman con el uso.

Siguiendo estos consejos, tus prendas de lana te acompañarán durante muchas temporadas.`,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=400&fit=crop",
    date: "2024-10-05",
    author: "Ana Martínez",
    category: "Consejos"
  },
  {
    id: 4,
    title: "Los Mejores Accesorios para Esta Temporada",
    excerpt: "Complementos que elevarán cualquier look otoñal al siguiente nivel.",
    content: `Los accesorios son la clave para personalizar tu estilo y dar un toque único a cada outfit. Esta temporada, estos son los imprescindibles.

**Pañuelos de seda**: Versátiles y elegantes, pueden usarse al cuello, en el pelo o atados al bolso. Los prints florales y geométricos en tonos otoñales son tendencia.

**Sombreros**: El fedora de fieltro en colores neutros es el rey del otoño. También ganan terreno las boinas y los gorros de lana tejida.

**Bolsos**: Los modelos tipo satchel y los totes de cuero en tonos camel y cognac son perfectos para el día a día.

**Joyería**: Lo dorado sigue dominando. Pendientes de hoja, collares con piedras ámbar y anillos statement completan cualquier look.`,
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800&h=400&fit=crop",
    date: "2024-09-28",
    author: "Laura Sánchez",
    category: "Moda"
  },
  {
    id: 5,
    title: "Recetas de Bebidas Calientes para el Otoño",
    excerpt: "Disfruta de deliciosas bebidas reconfortantes en las tardes frescas.",
    content: `Nada como una bebida caliente para disfrutar las tardes otoñales. Aquí te compartimos tres recetas fáciles y deliciosas.

**Chai Latte Especiado**
Hierve té negro con canela, cardamomo, jengibre y clavo. Añade leche espumada y endulza con miel.

**Chocolate Caliente a la Naranja**
Derrite chocolate negro con leche, añade ralladura de naranja y una pizca de cayena para un toque especial.

**Apple Cider Caliente**
Calienta jugo de manzana con ramitas de canela, anís estrellado y rodajas de naranja. Perfecto para las noches frescas.

Sirve estas bebidas en nuestras tazas de cerámica artesanal para una experiencia completa.`,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=400&fit=crop",
    date: "2024-09-20",
    author: "Pedro López",
    category: "Lifestyle"
  }
];

export const getBlogPostById = (id: number) => {
  return blogPosts.find(post => post.id === id);
};
