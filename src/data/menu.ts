import { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "coffee",
    name: "coffee.name",
    slug: "coffee",
  },
  {
    id: "milk-tea",
    name: "milk-tea.name",
    slug: "milk-tea",
  },
  {
    id: "must-try",
    name: "must-try.name",
    slug: "must-try",
  },
  {
    id: "juices",
    name: "juices.name",
    slug: "juices",
  },
  {
    id: "yogurt",
    name: "yogurt.name",
    slug: "yogurt",
  },
  {
    id: "tea",
    name: "tea.name",
    slug: "tea",
  },
];

export const products: Product[] = [
  // Coffee
  {
    id: "coffee-1",
    title: "coffee-1.title",
    description: "coffee-1.description",
    image: "/images/coffee/cafe-den.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-2",
    title: "coffee-2.title",
    description: "coffee-2.description",
    image: "/images/coffee/cafe-sua.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-3",
    title: "coffee-3.title",
    description: "coffee-3.description",
    image: "/images/coffee/cafe-muoi.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-4",
    title: "coffee-4.title",
    description: "coffee-4.description",
    image: "/images/coffee/cafe-dua.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-5",
    title: "coffee-5.title",
    description: "coffee-5.description",
    image: "/images/coffee/cafe-bo.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-6",
    title: "coffee-6.title",
    description: "coffee-6.description",
    image: "/images/coffee/bac-xiu.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-7",
    title: "coffee-7.title",
    description: "coffee-7.description",
    image: "/images/coffee/cacao.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "coffee",
  },

  // Milk Tea
  {
    id: "milk-tea-1",
    title: "milk-tea-1.title",
    description: "milk-tea-1.description",
    image: "/images/milk-tea/truyen-thong.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-2",
    title: "milk-tea-2.title",
    description: "milk-tea-2.description",
    image: "/images/milk-tea/green-tea.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-3",
    title: "milk-tea-3.title",
    description: "milk-tea-3.description",
    image: "/images/milk-tea/red-tea.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-4",
    title: "milk-tea-4.title",
    description: "milk-tea-4.description",
    image: "/images/milk-tea/taro.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-5",
    title: "milk-tea-5.title",
    description: "milk-tea-5.description",
    image: "/images/milk-tea/gao-rang.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-6",
    title: "milk-tea-6.title",
    description: "milk-tea-6.description",
    image: "/images/milk-tea/tra-xanh.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-7",
    title: "milk-tea-7.title",
    description: "milk-tea-7.description",
    image: "/images/milk-tea/chocolate.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-8",
    title: "milk-tea-8.title",
    description: "milk-tea-8.description",
    image: "/images/milk-tea/dau.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-9",
    title: "milk-tea-9.title",
    description: "milk-tea-9.description",
    image: "/images/milk-tea/nhai.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "milk-tea",
  },

  // Must Try
  {
    id: "must-try-1",
    title: "must-try-1.title",
    description: "must-try-1.description",
    image: "/images/must-try/avocado.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "must-try",
  },
  {
    id: "must-try-2",
    title: "must-try-2.title",
    description: "must-try-2.description",
    image: "/images/must-try/mango.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "must-try",
  },
  {
    id: "must-try-3",
    title: "must-try-3.title",
    description: "must-try-3.description",
    image: "/images/must-try/milo-dam.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "must-try",
  },
  {
    id: "must-try-4",
    title: "must-try-4.title",
    description: "must-try-4.description",
    image: "/images/must-try/da-me-1.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "must-try",
  },
  {
    id: "must-try-5",
    title: "must-try-5.title",
    description: "must-try-5.description",
    image: "/images/must-try/nha-dam.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "must-try",
  },
  {
    id: "must-try-6",
    title: "must-try-6.title",
    description: "must-try-6.description",
    image: "/images/must-try/matcha.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "must-try",
  },

  // Tea
  {
    id: "tea-1",
    title: "tea-1.title",
    description: "tea-1.description",
    image: "/images/tea/tra-gung.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-2",
    title: "tea-2.title",
    description: "tea-2.description",
    image: "/images/tea/tra-tac.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-3",
    title: "tea-3.title",
    description: "tea-3.description",
    image: "/images/tea/tra-chanh.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-4",
    title: "tea-4.title",
    description: "tea-4.description",
    image: "/images/tea/tra-trai-cay.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-5",
    title: "tea-5.title",
    description: "tea-5.description",
    image: "/images/tea/tra-mang-cau.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-6",
    title: "tea-6.title",
    description: "tea-6.description",
    image: "/images/tea/tra-dao-cam-xa.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-7",
    title: "tea-7.title",
    description: "tea-7.description",
    image: "/images/tea/tra-vai.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "tea",
  },

  // Juices
  {
    id: "juices-1",
    title: "juices-1.title",
    description: "juices-1.description",
    image: "/images/juice/dua.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },
  {
    id: "juices-2",
    title: "juices-2.title",
    description: "juices-2.description",
    image: "/images/juice/cam.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },
  {
    id: "juices-3",
    title: "juices-3.title",
    description: "juices-3.description",
    image: "/images/juice/dua-hau.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },
  {
    id: "juices-4",
    title: "juices-4.title",
    description: "juices-4.description",
    image: "/images/juice/tay.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },
  {
    id: "juices-5",
    title: "juices-5.title",
    description: "juices-5.description",
    image: "/images/juice/rau-ma.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },
  {
    id: "juices-6",
    title: "juices-6.title",
    description: "juices-6.description",
    image: "/images/juice/day.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },
  {
    id: "juices-7",
    title: "juices-7.title",
    description: "juices-7.description",
    image: "/images/juice/chanh.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "juices",
  },

  // Yogurt
  {
    id: "yogurt-1",
    title: "yogurt-1.title",
    description: "yogurt-1.description",
    image: "/images/yogurt/trai-cay.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-2",
    title: "yogurt-2.title",
    description: "yogurt-2.description",
    image: "/images/yogurt/viet-quat.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-3",
    title: "yogurt-3.title",
    description: "yogurt-3.description",
    image: "/images/yogurt/dau.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-4",
    title: "yogurt-4.title",
    description: "yogurt-4.description",
    image: "/images/yogurt/dao.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-5",
    title: "yogurt-5.title",
    description: "yogurt-5.description",
    image: "/images/yogurt/mit.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-6",
    title: "yogurt-6.title",
    description: "yogurt-6.description",
    image: "/images/yogurt/plan.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-7",
    title: "yogurt-7.title",
    description: "yogurt-7.description",
    image: "/images/yogurt/panna-cotta.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "yogurt",
  },
];
