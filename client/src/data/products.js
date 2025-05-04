// Mock product data for the VELOCITA ELECTRONICS website

// Featured Products
export const featuredProducts = [
  {
    id: 1,
    name: "Arduino Uno R3 Development Board",
    price: "₹24.99",
    image: "/images/products/arduino-uno.jpg",
    category: "development-boards",
    rating: 4.8,
    discount: 0,
    inStock: true,
  },
  {
    id: 2,
    name: "Raspberry Pi 4 Model B - 4GB RAM",
    price: "₹59.99",
    image: "/images/products/raspberry-pi-4.jpg",
    category: "development-boards",
    rating: 4.9,
    discount: 0,
    inStock: true,
  },
  {
    id: 3,
    name: "DHT22 Temperature and Humidity Sensor Module",
    price: "₹8.99",
    image: "/images/products/dht22.jpg",
    category: "sensors",
    rating: 4.5,
    discount: 10,
    inStock: true,
  },
  {
    id: 4,
    name: "HC-SR04 Ultrasonic Distance Sensor",
    price: "₹3.99",
    image: "/images/products/hc-sr04.jpg",
    category: "sensors",
    rating: 4.6,
    discount: 0,
    inStock: true,
  },
  {
    id: 5,
    name: "12V 2A Power Adapter",
    price: "₹9.99",
    image: "/images/products/power-adapter.jpg",
    category: "power",
    rating: 4.7,
    discount: 15,
    inStock: true,
  },
  {
    id: 6,
    name: "18650 Lithium Battery - 3000mAh",
    price: "₹7.99",
    image: "/images/products/18650-battery.jpg",
    category: "batteries",
    rating: 4.4,
    discount: 0,
    inStock: true,
  },
  {
    id: 7,
    name: "ESP32 Development Board WiFi+Bluetooth",
    price: "₹12.99",
    image: "/images/products/esp32.jpg",
    category: "development-boards",
    rating: 4.8,
    discount: 5,
    inStock: true,
  },
  {
    id: 8,
    name: "OLED Display Module 0.96 inch I2C",
    price: "₹6.99",
    image: "/images/products/oled-display.jpg",
    category: "components",
    rating: 4.5,
    discount: 0,
    inStock: true,
  },
];

// Latest Products
export const latestProducts = [
  {
    id: 9,
    name: "LD2410 24GHz Human Presence Radar Sensor Module",
    price: "₹19.99",
    image: "/images/products/radar-sensor.jpg",
    category: "sensors",
    rating: 4.7,
    discount: 0,
    inStock: true,
  },
  {
    id: 10,
    name: "433MHz RF Transmitter and Receiver Module",
    price: "₹5.99",
    image: "/images/products/rf-module.jpg",
    category: "components",
    rating: 4.3,
    discount: 0,
    inStock: true,
  },
  {
    id: 11,
    name: "STM32F103C8T6 ARM Development Board",
    price: "₹14.99",
    image: "/images/products/stm32.jpg",
    category: "development-boards",
    rating: 4.6,
    discount: 0,
    inStock: true,
  },
  {
    id: 12,
    name: "12V SPDT Relay Module",
    price: "₹3.49",
    image: "/images/products/relay.jpg",
    category: "components",
    rating: 4.5,
    discount: 0,
    inStock: true,
  },
  {
    id: 13,
    name: "DC-DC Step Down Converter Module",
    price: "₹4.99",
    image: "/images/products/step-down.jpg",
    category: "power",
    rating: 4.8,
    discount: 10,
    inStock: true,
  },
  {
    id: 14,
    name: "32650 LiFePO4 Battery Cell 6000mAh",
    price: "₹15.99",
    image: "/images/products/lifepo4.jpg",
    category: "batteries",
    rating: 4.9,
    discount: 0,
    inStock: true,
  },
  {
    id: 15,
    name: "Soldering Iron Kit - 60W Adjustable Temperature",
    price: "₹29.99",
    image: "/images/products/soldering-kit.jpg",
    category: "tools",
    rating: 4.7,
    discount: 5,
    inStock: true,
  },
  {
    id: 16,
    name: "Digital Multimeter - Auto-Ranging",
    price: "₹24.99",
    image: "/images/products/multimeter.jpg",
    category: "tools",
    rating: 4.6,
    discount: 0,
    inStock: true,
  },
];

// All Products (combining featured and latest)
export const allProducts = [...featuredProducts, ...latestProducts];

// Get products by category
export const getProductsByCategory = (category) => {
  return allProducts.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id) => {
  return allProducts.find(product => product.id === parseInt(id));
};

// Get related products (same category, excluding the current product)
export const getRelatedProducts = (productId) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
};
