import avantoLogo from "../imagenes/Logo_Avanto.png";
import nordaLogo from "../imagenes/Logo_nor.png";
import maisoneLogo from "../imagenes/Logo_M.png";
import urbanImage from "../imagenes/Urban.jpeg";
import novaImage from "../imagenes/NOVA.jpeg";
import lunaImage from "../imagenes/Luna.jpeg";
import vendeImage from "../imagenes/Vende.jpeg";
import logoVelmora from "../imagenes/Logo_velmora_t.png";
import producto1 from "../imagenes/producto-1.png";
import producto2 from "../imagenes/producto-2.png";
import producto3 from "../imagenes/producto-3.png";
import producto4 from "../imagenes/producto-4.png";

export const baseStores = [
  {
    id: "avanto",
    name: "Avanto",
    category: "Moda elegante",
    description: "Prendas sofisticadas para ocasiones especiales.",
    logo: avantoLogo,
    image: vendeImage,
    type: "Tienda Velmora",
    link: "/tiendas/avanto",
    featured: true,
    products: [
      {
        id: "avanto-1",
        name: "Chaleco de lino",
        category: "Moda elegante",
        price: "S/ 149.90",
        stock: "18",
        image: producto1,
        description: "Chaleco ligero para combinar con pantalones de vestir.",
        sizes: ["S", "M", "L"],
        colors: ["Beige", "Blanco", "Negro"],
      },
      {
        id: "avanto-2",
        name: "Camisa satinada",
        category: "Moda elegante",
        price: "S/ 119.90",
        stock: "24",
        image: producto2,
        description: "Camisa satinada para looks formales o de noche.",
        sizes: ["XS", "S", "M"],
        colors: ["Blanco", "Dorado", "Rosa"],
      },
    ],
  },
  {
    id: "norda",
    name: "Norda",
    category: "Accesorios",
    description: "Detalles, bolsos y complementos para cada outfit.",
    logo: nordaLogo,
    image: lunaImage,
    type: "Tienda Velmora",
    link: "/tiendas/norda",
    featured: false,
    products: [
      {
        id: "norda-1",
        name: "Bolso bucket",
        category: "Accesorios",
        price: "S/ 169.90",
        stock: "15",
        image: producto3,
        description: "Bolso amplio con acabado urbano y elegante.",
        sizes: ["Unica"],
        colors: ["Marron", "Negro", "Crema"],
      },
    ],
  },
  {
    id: "maisone",
    name: "Maisone",
    category: "Calzado",
    description: "Calzado elegante y urbano para temporada.",
    logo: maisoneLogo,
    image: novaImage,
    type: "Tienda Velmora",
    link: "/tiendas/maisone",
    featured: false,
    products: [
      {
        id: "maisone-1",
        name: "Zapatillas urban style",
        category: "Calzado",
        price: "S/ 209.90",
        stock: "20",
        image: producto4,
        description: "Zapatillas comodas para uso diario.",
        sizes: ["36", "37", "38", "39", "40"],
        colors: ["Blanco", "Negro"],
      },
    ],
  },
  {
    id: "urban-flow",
    name: "Urban Flow",
    category: "Ropa urbana",
    description: "Looks casuales, modernos y comodos para el dia a dia.",
    logo: logoVelmora,
    image: urbanImage,
    type: "Tienda Velmora",
    link: "/tiendas/urban-flow",
    featured: true,
    products: [
      {
        id: "urban-1",
        name: "Polo oversize",
        category: "Ropa urbana",
        price: "S/ 69.90",
        stock: "32",
        image: producto2,
        description: "Polo de corte amplio para outfits urbanos.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Blanco", "Verde"],
      },
    ],
  },
];
