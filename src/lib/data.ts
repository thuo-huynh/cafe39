import { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "coffee",
    name: "Coffee",
  },
  {
    id: "espresso",
    name: "Espresso",
  },
  {
    id: "frappe",
    name: "Frappe",
  },
  {
    id: "juice",
    name: "Juice",
  },
];

export const products: Product[] = [
  {
    id: "caramel-macchiato",
    categoryId: "coffee",
    title: "Caramel Macchiato",
    description:
      "Vanilla syrup, steamed milk and caramel drizzle topped with espresso shots.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    prices: {
      small: 580,
      medium: 625,
      large: 670,
    },
  },
  {
    id: "banana-frappuccino",
    categoryId: "frappe",
    title: "Banana Frappuccino",
    description:
      "Creamy blend of banana and milk finished with whipped cream and a hint of cinnamon.",
    image: "/images/coffee/cc32481f44aedc6161f4514aa51e86ed.jpg",
    prices: {
      small: 580,
      medium: 625,
      large: 670,
    },
    isNew: true,
  },
  {
    id: "matcha-latte",
    categoryId: "coffee",
    title: "Matcha Latte",
    description:
      "Premium matcha green tea powder with steamed milk for a smooth and creamy taste.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    prices: {
      small: 580,
      medium: 625,
      large: 670,
    },
  },
  {
    id: "strawberry-frappe",
    categoryId: "frappe",
    title: "Strawberry Frappuccino",
    description:
      "Blend of strawberry puree and milk topped with whipped cream and strawberry drizzle.",
    image: "/images/coffee/928ba7c161567dfae97b9f3c8b9cd55d.jpg",
    prices: {
      small: 580,
      medium: 625,
      large: 670,
    },
    isNew: true,
  },
  {
    id: "americano",
    categoryId: "espresso",
    title: "Americano",
    description:
      "Espresso shots topped with hot water to produce a light layer of crema.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    prices: {
      small: 550,
      medium: 595,
      large: 640,
    },
  },
  {
    id: "berry-smoothie",
    categoryId: "juice",
    title: "Berry Smoothie",
    description:
      "Blended mixed berries with yogurt and a touch of honey for natural sweetness.",
    image: "/images/juice/7dc52a2e06d9c703cce83627dd8c9cc7.jpg",
    prices: {
      small: 600,
      medium: 650,
      large: 700,
    },
  },
  {
    id: "orange-juice",
    categoryId: "juice",
    title: "Fresh Orange Juice",
    description:
      "Freshly squeezed orange juice for a refreshing boost of vitamin C.",
    image: "/images/juice/ba5888cae1f244a43710bb38cbbaf23b.jpg",
    prices: {
      small: 550,
      medium: 600,
      large: 650,
    },
  },
  {
    id: "green-smoothie",
    categoryId: "juice",
    title: "Green Detox",
    description:
      "Energizing blend of kale, spinach, cucumber, apple and ginger.",
    image: "/images/juice/e4e298580092546276f9bddbe04cdb23.jpg",
    prices: {
      small: 620,
      medium: 670,
      large: 720,
    },
    isNew: true,
  },
];
