// Mock product data for the VELOCITA ELECTRONICS website

import { isMotionComponent } from "framer-motion";
import { data, form } from "framer-motion/client";

// Featured Products
export const featuredProducts = [
  {
    id: 1,
    name: "Arduino Uno R3 Development Board",
    price: 399.00,
    image: "/images/arduino.jpg",
    category: "development-boards",
    rating: 4.8,
    discount: 10,
    inStock: true,
    description: {
      short: "Professional-grade Arduino Uno R3 board with ATmega328P microcontroller",
      long: "The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button. It contains everything needed to support the microcontroller.",
      features: [
        "ATmega328P microcontroller",
        "Operating Voltage: 5V",
        "Input Voltage: 7-12V",
        "14 Digital I/O Pins",
        "6 Analog Inputs",
        "32k Flash Memory"
      ]
    },
    specifications: {
      dimensions: "68.6 x 53.4 mm",
      weight: "25g",
      microcontroller: "ATmega328P",
      operatingVoltage: "5V",
      inputVoltage: "7-12V",
      digitalPins: 14,
      analogPins: 6,
      flashMemory: "32 KB",
      sram: "2 KB",
      eeprom: "1 KB",
      clockSpeed: "16 MHz"
    },
    includes: [
      "Arduino Uno R3 Board",
      "USB Cable",
      "Quick Start Guide"
    ]
  },
  {
    id: 2,
    name: "Raspberry Pi 5 - 16GB RAM",
    price: 11999,
    image: "/images/raspberrypi5_16.jpg",
    category: "development-boards",
    rating: 4.9,
    discount: 0,
    inStock: true,
    description: {
      short: "Powerful single-board computer with 16GB RAM for advanced projects.",
      long: "The Raspberry Pi 5 is the latest in the Raspberry Pi family, featuring a quad-core processor and 16GB RAM, making it suitable for demanding applications and multitasking.",
      features: [
        "Quad-core ARM Cortex-A76 CPU",
        "16GB LPDDR4X RAM",
        "Dual 4K HDMI output",
        "USB 3.0 and USB 2.0 ports",
        "Gigabit Ethernet",
        "40-pin GPIO header"
      ]
    },
    specifications: {
      dimensions: "85.6 x 56.5 mm",
      weight: "46g",
      microcontroller: "Broadcom BCM2712",
      operatingVoltage: "5V",
      inputVoltage: "5V USB-C",
      digitalPins: 40,
      analogPins: 0,
      flashMemory: "microSD slot",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "2.4 GHz"
    },
    includes: [
      "Raspberry Pi 5 Board",
      "Quick Start Guide"
    ]
  },
  {
    id: 3,
    name: "Seeed Studio XIAO ESP32C3",
    price: 449,
    image: "/images/xiao-esp32.jpg",
    category: "sensors",
    rating: 4.5,
    discount: 0,
    inStock: true,
    description: {
      short: "Compact ESP32-C3 based development board with WiFi and BLE.",
      long: "The Seeed Studio XIAO ESP32C3 is a tiny development board featuring the ESP32-C3 chip, offering WiFi and Bluetooth LE connectivity for IoT projects.",
      features: [
        "ESP32-C3 RISC-V MCU",
        "WiFi & Bluetooth 5 (LE)",
        "11 digital I/O pins",
        "1 analog input",
        "Low power consumption",
        "USB-C interface"
      ]
    },
    specifications: {
      dimensions: "21 x 17.5 mm",
      weight: "2g",
      microcontroller: "ESP32-C3",
      operatingVoltage: "3.3V",
      inputVoltage: "5V USB-C",
      digitalPins: 11,
      analogPins: 1,
      flashMemory: "4 MB",
      sram: "400 KB",
      eeprom: "N/A",
      clockSpeed: "160 MHz"
    },
    includes: [
      "XIAO ESP32C3 Board",
      "Pin Headers"
    ]
  },
  {
    id: 4,
    name: "Arduino Nano Development Board",
    price: 199,
    image: "/images/arduinonano.jpg",
    category: "development-boards",
    rating: 4.6,
    discount: 5,
    inStock: true,
    description: {
      short: "Compact Arduino Nano board for breadboard-friendly prototyping.",
      long: "The Arduino Nano is a small, complete, and breadboard-friendly board based on the ATmega328P, ideal for compact projects.",
      features: [
        "ATmega328P microcontroller",
        "Operating Voltage: 5V",
        "Input Voltage: 7-12V",
        "22 I/O Pins (14 Digital, 8 Analog)",
        "16 KB Flash Memory",
        "Mini USB connector"
      ]
    },
    specifications: {
      dimensions: "45 x 18 mm",
      weight: "7g",
      microcontroller: "ATmega328P",
      operatingVoltage: "5V",
      inputVoltage: "7-12V",
      digitalPins: 14,
      analogPins: 8,
      flashMemory: "16 KB",
      sram: "1 KB",
      eeprom: "512 bytes",
      clockSpeed: "16 MHz"
    },
    includes: [
      "Arduino Nano Board",
      "Pin Headers"
    ]
  },
  {
    id: 5,
    name: "NRF24L01 Wireless Transceiver Module",
    price: 199,
    image: "/images/nrf24l01lapla.jpg",
    category: "sensors",
    rating: 4.5,
    discount: 10,
    inStock: true,
    description: {
      short: "2.4GHz wireless transceiver module for Arduino and microcontrollers.",
      long: "The NRF24L01 is a low-cost, highly integrated 2.4GHz transceiver suitable for wireless communication between microcontrollers.",
      features: [
        "2.4GHz ISM band operation",
        "Up to 2Mbps data rate",
        "Low power consumption",
        "SPI interface",
        "On-board antenna"
      ]
    },
    specifications: {
      dimensions: "29 x 15 mm",
      weight: "2g",
      microcontroller: "NRF24L01",
      operatingVoltage: "1.9-3.6V",
      inputVoltage: "3.3V",
      digitalPins: 8,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "NRF24L01 Module"
    ]
  },
  {
    id: 6,
    name: "18650 Lithium Battery - 2600mAh",
    price: 149,
    image: "/images/2600mah.jpg",
    category: "batteries",
    rating: 4.4,
    discount: 15,
    inStock: true,
    description: {
      short: "Rechargeable 18650 lithium battery with 2600mAh capacity.",
      long: "High-quality 18650 lithium-ion battery suitable for various electronics and DIY projects requiring reliable power.",
      features: [
        "2600mAh capacity",
        "Rechargeable",
        "3.7V nominal voltage",
        "Standard 18650 size"
      ]
    },
    specifications: {
      dimensions: "65 x 18 mm",
      weight: "45g",
      microcontroller: "N/A",
      operatingVoltage: "3.7V",
      inputVoltage: "N/A",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "18650 Battery"
    ]
  },
  {
    id: 7,
    name: "ESP32 Development Board WiFi+Bluetooth",
    price: 399,
    image: "/images/esp32.jpg",
    category: "development-boards",
    rating: 4.8,
    discount: 10,
    inStock: true,
    description: {
      short: "ESP32-based development board with WiFi and Bluetooth support.",
      long: "The ESP32 development board is a powerful microcontroller with integrated WiFi and Bluetooth, ideal for IoT and smart device projects.",
      features: [
        "Dual-core Tensilica LX6 MCU",
        "WiFi 802.11 b/g/n",
        "Bluetooth 4.2",
        "30+ GPIO pins",
        "Multiple interfaces (SPI, I2C, UART)"
      ]
    },
    specifications: {
      dimensions: "58 x 25.5 mm",
      weight: "10g",
      microcontroller: "ESP32",
      operatingVoltage: "3.3V",
      inputVoltage: "5V",
      digitalPins: 30,
      analogPins: 18,
      flashMemory: "4 MB",
      sram: "520 KB",
      eeprom: "N/A",
      clockSpeed: "240 MHz"
    },
    includes: [
      "ESP32 Board",
      "Pin Headers"
    ]
  },
  {
    id: 8,
    name: "OLED Display Module 0.96 inch I2C",
    price: 199,
    image: "/images/0.96oled.jpg",
    category: "components",
    rating: 4.5,
    discount: 10,
    inStock: true,
    description: {
      short: "0.96 inch OLED display module with I2C interface.",
      long: "This OLED display module offers a crisp 128x64 pixel display, perfect for microcontroller projects requiring visual output.",
      features: [
        "0.96 inch diagonal",
        "128x64 pixel resolution",
        "I2C interface",
        "Low power consumption",
        "Wide viewing angle"
      ]
    },
    specifications: {
      dimensions: "27 x 27 mm",
      weight: "5g",
      microcontroller: "SSD1306 (driver IC)",
      operatingVoltage: "3.3V/5V",
      inputVoltage: "3.3V/5V",
      digitalPins: 4,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "OLED Display Module"
    ]
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
    description: {
      short: "Mini 9g servo motor for robotics and RC projects.",
      long: "The SG90 is a lightweight, high-quality servo motor ideal for small robotics, RC vehicles, and automation projects.",
      features: [
        "Operating voltage: 4.8V-6V",
        "Stall torque: 1.8kg/cm",
        "Rotation angle: 180°",
        "Lightweight design"
      ]
    },
    specifications: {
      dimensions: "23 x 12.2 x 29 mm",
      weight: "9g",
      microcontroller: "N/A",
      operatingVoltage: "4.8V-6V",
      inputVoltage: "N/A",
      digitalPins: 3,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "SG90 Servo Motor",
      "Servo Horns",
      "Mounting Screws"
    ]
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
    description: {
      short: "12V electric solenoid lock for access control and automation.",
      long: "This 12V solenoid lock is suitable for electronic door locks, cabinets, and automation projects requiring secure locking mechanisms.",
      features: [
        "Operating voltage: 12V DC",
        "Strong metal construction",
        "Easy to install",
        "Low power consumption"
      ]
    },
    specifications: {
      dimensions: "55 x 42 x 28 mm",
      weight: "120g",
      microcontroller: "N/A",
      operatingVoltage: "12V",
      inputVoltage: "12V",
      digitalPins: 2,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Solenoid Lock",
      "Mounting Plate"
    ]
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
    description: {
      short: "24GHz radar sensor for human presence detection.",
      long: "The LD2410 radar sensor module detects human presence and movement using 24GHz microwave technology, ideal for smart home and security applications.",
      features: [
        "24GHz microwave radar",
        "High sensitivity",
        "Low power consumption",
        "Compact size"
      ]
    },
    specifications: {
      dimensions: "30 x 20 mm",
      weight: "5g",
      microcontroller: "N/A",
      operatingVoltage: "3.3V/5V",
      inputVoltage: "3.3V/5V",
      digitalPins: 4,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Radar Sensor Module"
    ]
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
    description: {
      short: "433MHz RF module for wireless communication.",
      long: "This RF module set enables simple wireless communication between microcontrollers at 433MHz frequency.",
      features: [
        "433MHz frequency",
        "Simple interface",
        "Low power consumption",
        "Long range (up to 100m)"
      ]
    },
    specifications: {
      dimensions: "19 x 19 mm (Tx), 30 x 14 mm (Rx)",
      weight: "5g",
      microcontroller: "N/A",
      operatingVoltage: "3.3V-5V",
      inputVoltage: "3.3V-5V",
      digitalPins: 4,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "RF Transmitter Module",
      "RF Receiver Module"
    ]
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
    description: {
      short: "STM32F103C8T6 ARM Cortex-M3 development board.",
      long: "This board features the STM32F103C8T6 ARM Cortex-M3 microcontroller, suitable for embedded and real-time applications.",
      features: [
        "ARM Cortex-M3 core",
        "64KB Flash, 20KB SRAM",
        "72 MHz clock speed",
        "Multiple I/O ports",
        "USB interface"
      ]
    },
    specifications: {
      dimensions: "53 x 22 mm",
      weight: "8g",
      microcontroller: "STM32F103C8T6",
      operatingVoltage: "3.3V",
      inputVoltage: "5V",
      digitalPins: 37,
      analogPins: 10,
      flashMemory: "64 KB",
      sram: "20 KB",
      eeprom: "N/A",
      clockSpeed: "72 MHz"
    },
    includes: [
      "STM32 Board",
      "Pin Headers"
    ]
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
    description: {
      short: "12V single-channel SPDT relay module.",
      long: "This relay module allows microcontrollers to control high-voltage devices using a 12V SPDT relay.",
      features: [
        "12V operating voltage",
        "SPDT relay",
        "LED indicator",
        "Screw terminals"
      ]
    },
    specifications: {
      dimensions: "50 x 26 x 18 mm",
      weight: "20g",
      microcontroller: "N/A",
      operatingVoltage: "12V",
      inputVoltage: "12V",
      digitalPins: 3,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Relay Module"
    ]
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
    description: {
      short: "Adjustable DC-DC buck converter module.",
      long: "This step-down converter efficiently reduces voltage for powering microcontrollers and modules.",
      features: [
        "Input voltage: 4V-40V",
        "Output voltage: 1.25V-37V adjustable",
        "High efficiency",
        "Compact size"
      ]
    },
    specifications: {
      dimensions: "43 x 21 x 14 mm",
      weight: "10g",
      microcontroller: "N/A",
      operatingVoltage: "N/A",
      inputVoltage: "4V-40V",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Step Down Converter Module"
    ]
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
    description: {
      short: "High-capacity 32650 LiFePO4 rechargeable battery.",
      long: "This 32650 LiFePO4 battery cell offers 6000mAh capacity and long cycle life for demanding power applications.",
      features: [
        "6000mAh capacity",
        "LiFePO4 chemistry",
        "3.2V nominal voltage",
        "Long cycle life"
      ]
    },
    specifications: {
      dimensions: "65 x 32 mm",
      weight: "90g",
      microcontroller: "N/A",
      operatingVoltage: "3.2V",
      inputVoltage: "N/A",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "32650 Battery Cell"
    ]
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
    description: {
      short: "60W soldering iron kit with adjustable temperature.",
      long: "This kit includes a 60W soldering iron with adjustable temperature and essential accessories for electronics soldering.",
      features: [
        "60W power",
        "Adjustable temperature",
        "Includes solder wire and stand",
        "Multiple tips"
      ]
    },
    specifications: {
      dimensions: "Varies (kit)",
      weight: "350g",
      microcontroller: "N/A",
      operatingVoltage: "220V/110V",
      inputVoltage: "220V/110V",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Soldering Iron",
      "Solder Wire",
      "Iron Stand",
      "Tips"
    ]
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
    description: {
      short: "Auto-ranging digital multimeter for electronics testing.",
      long: "This digital multimeter features auto-ranging capability for measuring voltage, current, resistance, and more.",
      features: [
        "Auto-ranging",
        "Measures voltage, current, resistance",
        "Backlit display",
        "Continuity buzzer"
      ]
    },
    specifications: {
      dimensions: "140 x 70 x 35 mm",
      weight: "200g",
      microcontroller: "N/A",
      operatingVoltage: "Battery powered",
      inputVoltage: "N/A",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Digital Multimeter",
      "Test Leads",
      "Battery"
    ]
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
    description: {
      short: "Raspberry Pi Pico W with WiFi for IoT projects.",
      long: "The Pico W is a compact microcontroller board based on the RP2040 chip, now with integrated WiFi for wireless applications.",
      features: [
        "RP2040 microcontroller",
        "WiFi 802.11n",
        "26 GPIO pins",
        "2MB Flash memory"
      ]
    },
    specifications: {
      dimensions: "51 x 21 mm",
      weight: "4g",
      microcontroller: "RP2040",
      operatingVoltage: "1.8-5.5V",
      inputVoltage: "USB",
      digitalPins: 26,
      analogPins: 3,
      flashMemory: "2 MB",
      sram: "264 KB",
      eeprom: "N/A",
      clockSpeed: "133 MHz"
    },
    includes: [
      "Raspberry Pi Pico W"
    ]
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
    description: {
      short: "Capacitive soil moisture sensor for plant monitoring.",
      long: "This sensor measures soil moisture using capacitive sensing, providing reliable readings for gardening and agriculture.",
      features: [
        "Capacitive sensing",
        "Analog output",
        "Corrosion resistant",
        "Easy to use"
      ]
    },
    specifications: {
      dimensions: "98 x 23 mm",
      weight: "8g",
      microcontroller: "N/A",
      operatingVoltage: "3.3V-5V",
      inputVoltage: "3.3V-5V",
      digitalPins: 1,
      analogPins: 1,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Soil Moisture Sensor"
    ]
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
    description: {
      short: "Pack of 4 AA NiMH rechargeable batteries.",
      long: "These AA NiMH batteries are rechargeable and suitable for a wide range of electronic devices and projects.",
      features: [
        "AA size",
        "NiMH chemistry",
        "Rechargeable",
        "1.2V nominal voltage"
      ]
    },
    specifications: {
      dimensions: "50.5 x 14.5 mm (each)",
      weight: "25g (each)",
      microcontroller: "N/A",
      operatingVoltage: "1.2V",
      inputVoltage: "N/A",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "4 x AA NiMH Batteries"
    ]
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
    description: {
      short: "Set of 65 male-to-male jumper wires for prototyping.",
      long: "These jumper wires are ideal for breadboard and prototyping connections, offering flexibility and reliability.",
      features: [
        "65 pieces",
        "Male-to-male connectors",
        "Flexible and durable",
        "Assorted colors"
      ]
    },
    specifications: {
      dimensions: "Varies (20cm typical)",
      weight: "50g",
      microcontroller: "N/A",
      operatingVoltage: "N/A",
      inputVoltage: "N/A",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "65 x Jumper Wires"
    ]
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
    description: {
      short: "Adjustable helping hands tool for soldering and assembly.",
      long: "This tool provides adjustable clips and magnification for precise soldering and assembly work.",
      features: [
        "Adjustable arms",
        "Magnifying glass",
        "Heavy base",
        "Alligator clips"
      ]
    },
    specifications: {
      dimensions: "Varies",
      weight: "300g",
      microcontroller: "N/A",
      operatingVoltage: "N/A",
      inputVoltage: "N/A",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "Helping Hands Tool"
    ]
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
    description: {
      short: "USB-C PD trigger module for power delivery applications.",
      long: "This module negotiates USB-C Power Delivery voltages for powering devices and projects.",
      features: [
        "USB-C PD compatible",
        "Selectable output voltage",
        "Compact design",
        "Easy integration"
      ]
    },
    specifications: {
      dimensions: "20 x 15 mm",
      weight: "3g",
      microcontroller: "N/A",
      operatingVoltage: "5V-20V",
      inputVoltage: "USB-C",
      digitalPins: 0,
      analogPins: 0,
      flashMemory: "N/A",
      sram: "N/A",
      eeprom: "N/A",
      clockSpeed: "N/A"
    },
    includes: [
      "USB-C PD Module"
    ]
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