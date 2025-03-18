import { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "coffee",
    name: "Cà phê",
    slug: "coffee",
  },
  {
    id: "milk-tea",
    name: "Trà sữa",
    slug: "milk-tea",
  },
  {
    id: "must-try",
    name: "Đặc biệt",
    slug: "must-try",
  },
  {
    id: "tea",
    name: "Trà",
    slug: "tea",
  },
  {
    id: "juices",
    name: "Nước ép",
    slug: "juices",
  },
  {
    id: "yogurt",
    name: "Sữa chua",
    slug: "yogurt",
  },
];

export const products: Product[] = [
  // Coffee
  {
    id: "coffee-1",
    title: "Cà phê đen sài gòn",
    description:
      "Hương vị đậm đà của cà phê nguyên chất với độ đắng vừa phải, thưởng thức buổi sáng tuyệt vời.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-2",
    title: "Cà phê sữa sài gòn",
    description:
      "Sự kết hợp hoàn hảo giữa cà phê đậm đà và sữa đặc béo ngậy, tạo nên hương vị hài hòa, thơm ngon.",
    image: "/images/coffee/cc32481f44aedc6161f4514aa51e86ed.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-3",
    title: "Cà phê muối",
    description:
      "Vị cà phê thơm nồng kết hợp với một chút muối biển, tạo nên hương vị độc đáo, làm giảm vị đắng và tăng độ thơm ngon.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "coffee",
  },
  {
    id: "coffee-4",
    title: "Cà phê dừa",
    description:
      "Sự kết hợp tuyệt vời giữa cà phê và nước cốt dừa tươi, tạo nên hương vị ngọt ngào, béo ngậy và thơm mát.",
    image: "/images/coffee/928ba7c161567dfae97b9f3c8b9cd55d.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "coffee",
  },
  {
    id: "coffee-5",
    title: "Cà phê bơ",
    description:
      "Một loại cà phê đặc biệt với lớp kem bơ mềm mịn, béo ngậy phía trên, kết hợp hoàn hảo với vị đắng của cà phê.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    price: {
      medium: 25000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-6",
    title: "Bạc xíu",
    description:
      "Thức uống có nguồn gốc từ người Hoa với sự kết hợp hài hòa giữa cà phê, sữa đặc và sữa tươi, vị ngọt đậm đà.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 17000,
      large: null,
    },
    category: "coffee",
  },
  {
    id: "coffee-7",
    title: "Cacao",
    description:
      "Thức uống từ bột cacao nguyên chất, thơm ngon và bổ dưỡng, có thể uống nóng hoặc lạnh đều ngon.",
    image: "/images/coffee/cc32481f44aedc6161f4514aa51e86ed.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "coffee",
  },

  // Milk Tea
  {
    id: "milk-tea-1",
    title: "Trà sữa truyền thống",
    description:
      "Hương vị trà đen đậm đà kết hợp với sữa tạo nên thức uống béo ngậy, thơm ngon với topping trân châu dẻo dai.",
    image: "/images/juice/7dc52a2e06d9c703cce83627dd8c9cc7.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-2",
    title: "Trà sữa thái xanh",
    description:
      "Hương vị trà xanh Thái đặc trưng kết hợp với sữa, mang đến hương vị thơm mát, ngọt thanh.",
    image: "/images/juice/ba5888cae1f244a43710bb38cbbaf23b.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-3",
    title: "Trà sữa thái đỏ",
    description:
      "Hương vị độc đáo từ trà đỏ Thái, kết hợp với sữa tạo nên màu sắc đẹp mắt và hương vị thơm ngon.",
    image: "/images/juice/e4e298580092546276f9bddbe04cdb23.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-4",
    title: "Trà sữa khoai môn",
    description:
      "Hương vị ngọt nhẹ, béo ngậy của khoai môn kết hợp với trà sữa tạo nên thức uống thơm ngon, bổ dưỡng.",
    image: "/images/juice/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-5",
    title: "Trà sữa gạo rang",
    description:
      "Hương vị đặc biệt từ gạo được rang thơm, kết hợp với trà sữa tạo nên mùi thơm đặc trưng và vị ngon khó cưỡng.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-6",
    title: "Trà sữa matcha",
    description:
      "Vị đắng nhẹ của bột trà xanh Nhật Bản kết hợp với sữa tạo nên hương vị thơm ngon, thanh mát.",
    image: "/images/coffee/928ba7c161567dfae97b9f3c8b9cd55d.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-7",
    title: "Trà sữa chocolate",
    description:
      "Sự kết hợp hài hòa giữa vị đắng của chocolate và vị ngọt béo của sữa, tạo nên thức uống thơm ngon, đậm đà.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-8",
    title: "Trà sữa dâu",
    description:
      "Vị ngọt thanh của dâu tây kết hợp với trà sữa béo ngậy, tạo nên thức uống thơm ngon, màu sắc bắt mắt.",
    image: "/images/juice/7dc52a2e06d9c703cce83627dd8c9cc7.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-9",
    title: "Trà sữa sâm dứa",
    description:
      "Hương vị đặc trưng của sâm dứa kết hợp với trà sữa tạo nên thức uống thơm mát, giải nhiệt hiệu quả.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },
  {
    id: "milk-tea-10",
    title: "Trà sữa nhai",
    description:
      "Trà sữa với các loại topping như trân châu, thạch... tạo nên trải nghiệm vừa uống vừa nhai thú vị.",
    image: "/images/juice/ba5888cae1f244a43710bb38cbbaf23b.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "milk-tea",
  },

  // Must Try
  {
    id: "must-try-1",
    title: "Sinh tố bơ",
    description:
      "Thức uống bổ dưỡng từ bơ tươi xay nhuyễn, béo ngậy và mát lạnh, tốt cho sức khỏe.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "must-try",
  },
  {
    id: "must-try-2",
    title: "Sinh tố xoài",
    description:
      "Vị ngọt thanh mát của xoài chín, xay cùng đá tạo nên thức uống giải nhiệt tuyệt vời cho ngày hè.",
    image: "/images/coffee/928ba7c161567dfae97b9f3c8b9cd55d.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "must-try",
  },
  {
    id: "must-try-3",
    title: "Milo dằm",
    description:
      "Thức uống quen thuộc với hương vị chocolate malt đặc trưng của Milo, kết hợp với đá dằm mát lạnh.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "must-try",
  },
  {
    id: "must-try-4",
    title: "Đá me hạt dẻ",
    description:
      "Vị chua ngọt của me, kết hợp với hạt dẻ dẻo dai, tạo nên thức uống giải khát tuyệt vời.",
    image: "/images/juice/7dc52a2e06d9c703cce83627dd8c9cc7.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "must-try",
  },
  {
    id: "must-try-5",
    title: "Nha đam hạt chia",
    description:
      "Thức uống thanh mát với nha đam giòn ngọt và hạt chia bổ dưỡng, giúp giải nhiệt hiệu quả.",
    image: "/images/juice/ba5888cae1f244a43710bb38cbbaf23b.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "must-try",
  },
  {
    id: "must-try-6",
    title: "Matcha latte",
    description:
      "Sự kết hợp hài hòa giữa bột trà xanh Nhật Bản và sữa tươi, tạo nên thức uống thơm ngon, thanh mát.",
    image: "/images/juice/e4e298580092546276f9bddbe04cdb23.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "must-try",
  },

  // Tea
  {
    id: "tea-1",
    title: "Trà gừng",
    description:
      "Thức uống ấm nóng từ trà và gừng tươi, giúp giữ ấm cơ thể và tốt cho sức khỏe, đặc biệt vào mùa lạnh.",
    image: "/images/juice/e4e298580092546276f9bddbe04cdb23.jpg",
    price: {
      medium: 20000,
      large: null,
    },
    category: "tea",
  },
  {
    id: "tea-2",
    title: "Trà tắc",
    description:
      "Vị chua thanh của quả tắc kết hợp với vị chát nhẹ của trà, tạo nên thức uống giải khát hiệu quả.",
    image: "/images/juice/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "tea",
  },
  {
    id: "tea-3",
    title: "Trà chanh",
    description:
      "Đồ uống giải khát phổ biến với vị chua của chanh và vị chát nhẹ của trà, dễ uống và thơm mát.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "tea",
  },
  {
    id: "tea-4",
    title: "Trà trái cây",
    description:
      "Sự kết hợp hoàn hảo giữa trà và nhiều loại trái cây tươi, tạo nên thức uống đầy màu sắc và hương vị.",
    image: "/images/coffee/cc32481f44aedc6161f4514aa51e86ed.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "tea",
  },
  {
    id: "tea-5",
    title: "Trà măng cầu",
    description:
      "Vị ngọt thanh của măng cầu kết hợp với trà tạo nên thức uống thơm mát, dễ chịu.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "tea",
  },
  {
    id: "tea-6",
    title: "Trà đào xí muội cam sả",
    description:
      "Hương vị độc đáo từ sự kết hợp của trà, đào, xí muội, cam và sả, tạo nên thức uống thơm mát, chua ngọt vừa phải.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "tea",
  },
  {
    id: "tea-7",
    title: "Trà vải",
    description:
      "Vị ngọt thanh của vải kết hợp với trà tạo nên thức uống thơm mát, thích hợp cho ngày hè.",
    image: "/images/juice/ba5888cae1f244a43710bb38cbbaf23b.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "tea",
  },

  // Juices
  {
    id: "juices-1",
    title: "Nước ép dứa",
    description:
      "Vị ngọt thanh mát của dứa tươi, giàu vitamin C và các enzym giúp tiêu hóa tốt.",
    image: "/images/coffee/928ba7c161567dfae97b9f3c8b9cd55d.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-2",
    title: "Nước ép cam",
    description:
      "Vị chua ngọt tự nhiên của cam tươi, giàu vitamin C, giúp tăng cường sức đề kháng.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-3",
    title: "Nước ép dưa hấu",
    description:
      "Thức uống mát lạnh từ dưa hấu tươi, giàu nước và các chất chống oxy hóa, giúp giải nhiệt hiệu quả.",
    image: "/images/juice/7dc52a2e06d9c703cce83627dd8c9cc7.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-4",
    title: "Nước ép rau cần",
    description:
      "Thức uống thanh mát, bổ dưỡng từ rau cần tươi, giàu chất xơ và vitamin.",
    image: "/images/juice/ba5888cae1f244a43710bb38cbbaf23b.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-5",
    title: "Nước ép rau má đậu xanh",
    description:
      "Thức uống thanh mát, bổ dưỡng từ rau má và đậu xanh, có tác dụng giải nhiệt và làm đẹp da.",
    image: "/images/juice/e4e298580092546276f9bddbe04cdb23.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-6",
    title: "Nước chanh dây",
    description:
      "Vị chua đặc trưng của chanh dây kết hợp với đường tạo nên thức uống chua ngọt, giải khát hiệu quả.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-7",
    title: "Nước chanh",
    description:
      "Thức uống giải khát cổ điển với vị chua thanh mát của chanh tươi.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },
  {
    id: "juices-8",
    title: "Nước chanh muối",
    description:
      "Sự kết hợp hài hòa giữa vị chua của chanh và vị mặn của muối, tạo nên thức uống giải khát và bù nước hiệu quả.",
    image: "/images/coffee/cc32481f44aedc6161f4514aa51e86ed.jpg",
    price: {
      medium: 15000,
      large: 20000,
    },
    category: "juices",
  },

  // Yogurt
  {
    id: "yogurt-1",
    title: "Sữa chua trái cây",
    description:
      "Sữa chua tươi mát kết hợp với nhiều loại trái cây tươi, tạo nên hương vị thơm ngon và bổ dưỡng.",
    image: "/images/juice/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-2",
    title: "Sữa chua việt quất",
    description:
      "Sự kết hợp hoàn hảo giữa sữa chua béo ngậy và việt quất chua ngọt, giàu chất chống oxy hóa.",
    image: "/images/coffee/864e94ccd30286832c1241ad193ca5a5.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-3",
    title: "Sữa chua dâu",
    description:
      "Vị chua ngọt của dâu tây kết hợp với sữa chua tươi, tạo nên thức uống thơm ngon, lý tưởng cho mùa hè.",
    image: "/images/coffee/cc32481f44aedc6161f4514aa51e86ed.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-4",
    title: "Sữa chua đào",
    description:
      "Vị ngọt thanh của đào kết hợp với sữa chua tươi, tạo nên hương vị thơm ngon, hấp dẫn.",
    image: "/images/coffee/9a897189061a44ccbc211f88205d161c.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-5",
    title: "Sữa chua mít",
    description:
      "Vị ngọt đặc trưng của mít kết hợp với sữa chua tươi, tạo nên hương vị thơm ngon, độc đáo.",
    image: "/images/coffee/928ba7c161567dfae97b9f3c8b9cd55d.jpg",
    price: {
      medium: 20000,
      large: 25000,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-6",
    title: "Kem plan",
    description:
      "Món tráng miệng béo ngậy với vị caramen ngọt thơm, mềm mịn, tan trong miệng.",
    image: "/images/coffee/40dae7bdfe27273b454c7c4b4ef72e50.jpg",
    price: {
      medium: 10000,
      large: null,
    },
    category: "yogurt",
  },
  {
    id: "yogurt-7",
    title: "Panna cotta nhiều vị",
    description:
      "Món tráng miệng của Ý với vị kem sữa mềm mịn, phủ lớp sốt trái cây thơm ngon.",
    image: "/images/juice/7dc52a2e06d9c703cce83627dd8c9cc7.jpg",
    price: {
      medium: 5000,
      large: 10000,
    },
    category: "yogurt",
  },
];
