// Mock product data for the VELOCITA ELECTRONICS website

import { isMotionComponent } from "framer-motion";
import { data, form } from "framer-motion/client";

// Featured Products
export const featuredProducts = [
  {
    id: 1,
    name: "Arduino Uno R3 Development Board",
    price: 399.00,
    image: "/images/arduino.jpg", // Updated path
    category: "development-boards",
    rating: 4.8,
    discount: 10,
    inStock: true,
  },
  {
    id: 2,
    name: "Raspberry Pi 5 - 16GB RAM",
    price: 11999,
    image: "/images/raspberrypi5_16.jpg", // Updated path
    category: "development-boards",
    rating: 4.9,
    discount: 0,
    inStock: true,
  },
  {
    id: 3,
    name: "Seeed Studio XIAO ESP32C3",
    price: 449,
    image: "/images/xiao-esp32.jpg", // Updated path
    category: "sensors",
    rating:4.5,
    discount: 0,
    inStock: true,
  },
  {
    id: 4,
    name: "Arduino Nano Development Board",
    price: 199,
    image: "/images/arduinonano.jpg", // Updated path
    category: "development-boards",
    rating: 4.6,
    discount: 5,
    inStock: true,
  },
  {
    id: 5,
    name: "NRF24L01 Wireless Transceiver Module",
    price: 199,
    image: "/images/nrf24l01lapla.jpg", // Updated path
    category: "sensors",
    rating: 4.5,
    discount: 10,
    inStock: true,
  },
  {
    id: 6,
    name: "18650 Lithium Battery - 2600mAh",
    price: 149,
    image: "/images/2600mah.jpg", // Updated path
    category: "batteries",
    rating: 4.4,
    discount: 15,
    inStock: true,
  },
  {
    id: 7,
    name: "ESP32 Development Board WiFi+Bluetooth",
    price: 399,
    image: "/images/esp32.jpg",
    category: "development-boards", // Updated path
    rating: 4.8,
    discount: 10,
    inStock: true,
  },
  {
    id: 8,
    name: "OLED Display Module 0.96 inch I2C",
    price: 199,
    image: "/images/0.96oled.jpg", // Updated path
    category: "components",
    rating: 4.5,
    discount: 10,
    inStock: true,
  },
  {
    id: 17,
    name: "SG90 Servo Motor",
    price: 80,
    image: "/images/sg90-servo.jpg",
    category: "tools",
    rating: 4.7,
    discount: 7,
    inStock: true,
  },
  {
    id: 18,
    name: "12V Solenoid lock",
    price: 350,
    image: "/images/solenoid-lock.jpg",
    category: "power",
    rating: 4.6,
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
  {
    id: 19,
    name: "Raspberry Pi Pico W",
    price: "₹9.99",
    image: "/images/products/pi-pico-w.jpg",
    category: "development-boards",
    rating: 4.8,
    discount: 0,
    inStock: true,
  },
  {
    id: 20,
    name: "Soil Moisture Sensor - Capacitive",
    price: "₹3.50",
    image: "/images/products/soil-moisture.jpg",
    category: "sensors",
    rating: 4.5,
    discount: 0,
    inStock: true,
  },
  {
    id: 21,
    name: "AA Rechargeable NiMH Batteries (4-pack)",
    price: "₹12.99",
    image: "/images/products/aa-batteries.jpg",
    category: "batteries",
    rating: 4.6,
    discount: 5,
    inStock: true,
  },
  {
    id: 22,
    name: "Jumper Wires Male-to-Male (65 pcs)",
    price: "₹4.99",
    image: "/images/products/jumper-wires.jpg",
    category: "components",
    rating: 4.7,
    discount: 0,
    inStock: true,
  },
  {
    id: 23,
    name: "Helping Hands Soldering Tool",
    price: "₹18.50",
    image: "/images/products/helping-hands.jpg",
    category: "tools",
    rating: 4.4,
    discount: 0,
    inStock: true,
  },
  {
    id: 24,
    name: "USB C Power Delivery Module (PD Trigger)",
    price: "₹8.75",
    image: "/images/products/usb-c-pd.jpg",
    category: "power",
    rating: 4.9,
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