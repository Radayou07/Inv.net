export const categories = [
  'Drinks',
  'Electronics',
  'Food',
  'Office Supplies',
  'Health',
  'Accessories',
]

export const products = [
  {
    id: 1,
    name: 'Alpine Spring Water',
    category: 'Drinks',
    price: 3.5,
    stock: 124,
    description:
      'A refreshing 12-bottle case of purified spring water for home or office.',
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85',
    featured: true,
  },
  {
    id: 2,
    name: 'Studio Wireless Headphones',
    category: 'Electronics',
    price: 59.99,
    stock: 38,
    description:
      'Comfortable over-ear headphones with rich sound and all-day battery life.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    featured: true,
  },
  {
    id: 3,
    name: 'Premium Jasmine Rice',
    category: 'Food',
    price: 12.5,
    stock: 67,
    description:
      'Fragrant long-grain jasmine rice in a practical five-kilogram bag.',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85',
    featured: true,
  },
  {
    id: 4,
    name: 'A4 Copy Paper',
    category: 'Office Supplies',
    price: 4.75,
    stock: 91,
    description:
      'Bright white multipurpose A4 paper, 500 sheets per ream.',
    image:
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=85',
    featured: true,
  },
  {
    id: 5,
    name: 'Daily Hand Sanitizer',
    category: 'Health',
    price: 3.25,
    stock: 5,
    description:
      'Fast-drying 500 ml hand sanitizer with a clean, gentle formula.',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85',
    featured: true,
  },
  {
    id: 6,
    name: 'Commuter Backpack',
    category: 'Accessories',
    price: 34.9,
    stock: 22,
    description:
      'A lightweight everyday backpack with a padded laptop compartment.',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
  {
    id: 7,
    name: 'Compact Mechanical Keyboard',
    category: 'Electronics',
    price: 79,
    stock: 16,
    description:
      'Space-saving mechanical keyboard with tactile switches and USB-C.',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
  {
    id: 8,
    name: 'Arabica Coffee Beans',
    category: 'Drinks',
    price: 14.25,
    stock: 42,
    description:
      'Medium-roast whole Arabica beans with chocolate and caramel notes.',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
  {
    id: 9,
    name: 'Natural Vitamin C',
    category: 'Health',
    price: 12.9,
    stock: 30,
    description:
      'Daily vitamin C tablets in an easy-to-store 100-count bottle.',
    image:
      'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
  {
    id: 10,
    name: 'Whole Grain Pasta',
    category: 'Food',
    price: 2.95,
    stock: 0,
    description:
      'Nutritious whole grain pasta with a firm texture and rich flavor.',
    image:
      'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
  {
    id: 11,
    name: 'Hardcover Notebook',
    category: 'Office Supplies',
    price: 8.4,
    stock: 54,
    description:
      'Durable ruled notebook with smooth paper and a lay-flat binding.',
    image:
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
  {
    id: 12,
    name: 'Classic Sunglasses',
    category: 'Accessories',
    price: 24.99,
    stock: 12,
    description:
      'Lightweight everyday sunglasses with UV-protective lenses.',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
    featured: false,
  },
]

export const productDetailContent = {
  Drinks: {
    features: [
      'Quality-sealed packaging for reliable freshness',
      'Convenient size for home, work, or travel',
      'Stored and handled under controlled conditions',
      'Ready for fast warehouse fulfillment',
    ],
    specifications: {
      Storage: 'Cool, dry place',
      Packaging: 'Factory sealed',
      Availability: 'Warehouse stocked',
      Fulfillment: '1-2 business days',
    },
  },
  Electronics: {
    features: [
      'Reliable everyday performance with simple setup',
      'Energy-efficient design for extended use',
      'Comfortable and practical for work or home',
      'Quality checked before warehouse dispatch',
    ],
    specifications: {
      Warranty: '12 months',
      Connectivity: 'Model dependent',
      Condition: 'New',
      Fulfillment: '1-2 business days',
    },
  },
  Food: {
    features: [
      'Carefully selected pantry essential',
      'Factory-sealed packaging for freshness',
      'Clear storage guidance and expiry labeling',
      'Handled through a dependable supply chain',
    ],
    specifications: {
      Storage: 'Cool, dry place',
      Packaging: 'Food-grade sealed pack',
      Origin: 'Supplier verified',
      Fulfillment: '1-2 business days',
    },
  },
  'Office Supplies': {
    features: [
      'Dependable quality for everyday office use',
      'Compatible with standard workplace equipment',
      'Easy to store and ready when needed',
      'Available for individual or repeat orders',
    ],
    specifications: {
      Usage: 'Home, school, and office',
      Condition: 'New',
      Packaging: 'Protective retail pack',
      Fulfillment: '1-2 business days',
    },
  },
  Health: {
    features: [
      'Supplier-verified health and personal care item',
      'Sealed packaging with clear usage information',
      'Convenient for home or workplace use',
      'Stored under appropriate warehouse conditions',
    ],
    specifications: {
      Condition: 'New and sealed',
      Storage: 'Follow package guidance',
      Packaging: 'Tamper evident',
      Fulfillment: '1-2 business days',
    },
  },
  Accessories: {
    features: [
      'Practical design for comfortable everyday use',
      'Durable materials selected for reliability',
      'Easy to carry, store, and maintain',
      'Quality checked before dispatch',
    ],
    specifications: {
      Condition: 'New',
      Material: 'Product specific',
      Packaging: 'Protective retail pack',
      Fulfillment: '1-2 business days',
    },
  },
}

export const orders = [
  {
    id: 'ORD-2026-0156',
    date: 'June 10, 2026',
    total: 78.45,
    status: 'Delivered',
    items: 3,
  },
  {
    id: 'ORD-2026-0155',
    date: 'June 8, 2026',
    total: 124.3,
    status: 'Processing',
    items: 2,
  },
  {
    id: 'ORD-2026-0154',
    date: 'June 5, 2026',
    total: 45,
    status: 'Pending',
    items: 4,
  },
  {
    id: 'ORD-2026-0153',
    date: 'May 29, 2026',
    total: 92.1,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 'ORD-2026-0152',
    date: 'May 21, 2026',
    total: 33.8,
    status: 'Cancelled',
    items: 1,
  },
]

export const offers = [
  {
    id: 1,
    title: '10% off drinks',
    description: 'Stock up on refreshing favorites.',
    code: 'FRESH10',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Save on electronics',
    description: 'Up to 15% off selected tech.',
    code: 'TECH15',
    color: 'amber',
  },
]

export const customer = {
  name: 'Sofia Martinez',
  email: 'sofia.martinez@example.com',
  phone: '+66 81 234 5678',
  address: '128 Sukhumvit Road, Bangkok 10110',
  memberSince: 'January 2024',
}
