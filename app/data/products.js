// data/products.js

export const categoryDatabase = {
  'smartphone-laptop': {
    title: "Smartphone & Laptop",
    minPrice: 0,
    maxPrice: 699,
    filters: {
      manufacturers: ['Clinic', 'Perfect', 'Creative State', 'Stillness', 'Salon CHIC'],
      colors: ['Yellow', 'Metal', 'Blue', 'Silver', 'Lime']
    },
    bestsellers: [
      { id: 3, title: 'Samsung Galaxy S26 Ultra 5G Smartphone', price: 67.00, oldPrice: 98.00, img: '/mobile/item3/Item3_2.png' },
      { id: 4, title: 'OnePlus 15R 5G Smartphone', price: 117.00, oldPrice: null, img: '/mobile/item4/Item4_2.png' },
      { id: 5, title: 'Motorola Edge 70 Fusion 5G Smartphone', price: 74.00, oldPrice: 92.00, img: '/mobile/item5/Item5_2.png' },
    ],
    promoImage: [{id:3,img:'/mobile/item3/Item3_4.png'}],
    products: [
      {
        id: 1, title: 'Google Pixel 8 Pro 5G Smartphone', brand: 'Google', color: 'Metal', image: '/mobile/item1/Item1_1.png', thumbnails: ['/mobile/item1/Item1_2.png', '/mobile/item1/Item1_3.png', '/mobile/item1/Item1_4.png'], price: 99.22, oldPrice: 121.00, isSale: true, countdown: '293d : 09h : 42m : 48s', stock: 15, sold: 120, rating: 4,
        shortDesc: "Google Pixel 8 Pro is a premium 5G smartphone with Tensor G3 processor, 12GB RAM, triple camera system, and 6.7-inch OLED display, perfect for gaming, photography, and high-performance use.",
        longDesc: "The Google Pixel 8 Pro 5G smartphone is a flagship device designed for powerful performance and professional photography. \nIt comes with the Google Tensor G3 processor, 12GB RAM, and a high-resolution OLED display for smooth and fast performance. \nThe phone features an advanced triple-camera system with AI photography, long-lasting battery, and 5G connectivity, making it perfect for gaming, video recording, and multitasking.With premium build quality and the latest Android features, Pixel 8 Pro offers a smooth and secure smartphone experience.",
        features: ["100% Brand New", "Contains 1 PCS", "Simple and easy"]
      },
      {
        id: 2, title: 'Apple iPhone 17 Pro 5G Smartphone', brand: 'Apple', color: 'orange', image: '/mobile/item2/Item2_1.png', thumbnails: ['/mobile/item2/Item2_2.png', '/mobile/item2/Item2_3.png', '/mobile/item2/Item2_4.png'], price: 500.00, oldPrice: null, isSale: false, stock: 677, sold: 1, rating: 0,
        tags: 'bags',
        shortDesc: "Apple iPhone 17 Pro is a high-performance 5G smartphone with powerful processor, advanced triple camera system, OLED display, and premium design for gaming, photography, and professional use.",
        longDesc: "The Apple iPhone 17 Pro is a next-generation smartphone designed with powerful performance and premium build quality. It features a high-resolution OLED display, advanced Apple chipset, and improved camera system for professional photography and smooth multitasking. \n\nWith 5G connectivity, long battery life, and the latest iOS features, this device is perfect for gaming, video recording, and daily use. The modern design and strong performance make it one of the best flagship smartphones.",
        features: ["✔ Display: 6.3-inch Super Retina XDR OLED, 120Hz", "✔ Processor: Apple A19 Pro Chip (Expected)", "✔ RAM: 8GB / 12GB", "✔ Storage: 256GB / 512GB / 1TB", "✔ Rear Camera: 48MP + 48MP + 12MP Triple Camera", "✔ Front Camera: 12MP Selfie Camera", "✔ Battery: Fast Charging + MagSafe Wireless Charging", "✔ Network: 5G / Wi-Fi 6E / Bluetooth", "✔ Operating System: iOS 19 (Expected)", "✔ Face ID & Dynamic Island"]
      },
      {
        id: 3, title: 'Samsung Galaxy S26 Ultra 5G Smartphone', brand: 'Samsung', color: 'Pink', image: '/mobile/item3/Item3_1.png', thumbnails: ['/mobile/item3/Item3_2.png', '/mobile/item3/Item3_3.png', '/mobile/item3/Item3_4.png'], price: 45.00, oldPrice: 76.00, isSale: true, countdown: '293d : 09h : 42m : 48s', stock: 8, sold: 42, rating: 3,
        shortDesc: "Samsung Galaxy S26 Ultra is a flagship 5G smartphone with powerful processor, AI features, 200MP camera, AMOLED display, and S-Pen support, perfect for gaming, photography, and professional use.",
        longDesc: "The Samsung Galaxy S26 Ultra is a premium flagship smartphone built with advanced Galaxy AI technology and ultra-fast performance. It features a large Dynamic AMOLED display with high refresh rate, powerful Snapdragon processor, and a professional-grade camera system. \n\nWith S-Pen support, long battery life, and 5G connectivity, this phone is perfect for productivity, gaming, photography, and multitasking. The premium design and strong build quality make it one of the best high-end smartphones.",
        features: ["✔ Display: 6.8-inch Dynamic AMOLED 2X, 144Hz", "✔ Processor: Snapdragon 8 Gen 4 (Expected)", "✔ RAM: 12GB / 16GB", "✔ Storage: 256GB / 512GB / 1TB", "✔ Rear Camera: 200MP + 50MP + 50MP + 12MP Quad Camera", "✔ Front Camera: 12MP Selfie Camera", "✔ Battery: 5500 mAh with Fast Charging", "✔ Network: 5G / Wi-Fi 7 / Bluetooth", "✔ Operating System: Android 15 + One UI", "✔ S-Pen Support"]
      },

      {
        id: 4, title: 'OnePlus 15R 5G Smartphone', brand: 'OnePlus', color: 'black', image: '/mobile/item4/Item4_1.png', thumbnails: ['/mobile/item4/Item4_2.png', '/mobile/item4/Item4_3.png', '/mobile/item4/Item4_4.png'], price: 70.00, oldPrice: 82.00, isSale: true, countdown: '293d : 09h : 42m : 48s', stock: 12, sold: 33, rating: 4,
        shortDesc: "OnePlus 15R is a high-performance 5G smartphone with Snapdragon 8 Gen 5 processor, AMOLED display, 12GB RAM, and long-lasting battery, perfect for gaming, multitasking, and photography.",
        longDesc: "The OnePlus 15R 5G smartphone delivers flagship-level performance with the powerful Snapdragon 8 Gen 5 processor and fast LPDDR5X RAM. It features a large AMOLED display with high refresh rate for smooth gaming and video experience.\n\nThe phone comes with a high-resolution camera system, long-lasting battery, and fast charging support, making it ideal for daily use, gaming, and photography. With OxygenOS and premium design, the OnePlus 15R offers speed, stability, and modern features.",
        features: ["✔ Display: 6.83-inch AMOLED, 165Hz refresh rate", "✔ Processor: Qualcomm Snapdragon 8 Gen 5", "✔ RAM: 12GB / 16GB LPDDR5X", "✔ Storage: 256GB / 512GB UFS 4.1", "✔ Rear Camera: 50MP + 8MP Dual Camera", "✔ Front Camera: 32MP Selfie Camera", "✔ Battery: 7400 mAh with 80W Fast Charging", "✔ Network: 5G / Wi-Fi 7 / Bluetooth", "✔ Operating System: Android 16 with OxygenOS ", "✔ In-display Fingerprint Sensor"]
      },

      {
        id: 5, title: 'Motorola Edge 70 Fusion 5G Smartphone', brand: 'Motorola', color: 'Silver', image: '/mobile/item5/Item5_1.png', thumbnails: ['/mobile/item5/Item5_2.png', '/mobile/item5/Item5_3.png', '/mobile/item5/Item5_4.png'], price: 69.00, oldPrice: null, isSale: false, stock: 100, sold: 10, rating: 4,
        shortDesc: "Motorola Edge 70 Fusion is a powerful 5G smartphone with AMOLED display, fast processor, AI features, and high-resolution camera, perfect for gaming, photography, and daily use.",
        longDesc: "The Motorola Edge 70 Fusion 5G smartphone is designed for smooth performance and smart AI features. It comes with a powerful Snapdragon processor, high refresh-rate AMOLED display, and advanced camera system for clear photos and videos.\n\nWith Moto AI features, long battery life, and fast charging support, this phone is perfect for multitasking, gaming, and professional use. The slim and premium design makes it comfortable to hold and stylish to use.",
        features: ["✔ Display: 6.7-inch Full HD+ AMOLED, 144Hz", "✔ Processor: Qualcomm Snapdragon 8s Gen 3", "✔ RAM: 8GB / 12GB", "✔ Storage: 256GB / 512GB", "✔ Rear Camera: 50MP + 13MP Dual Camera", "✔ Front Camera: 32MP Selfie Camera", "✔ Battery: 5000 mAh with 68W Fast Charging", "✔ Network: 5G / Wi-Fi 6 / Bluetooth", "✔ Operating System: Android 15", "✔ In-display Fingerprint Sensor", "✔ Moto AI Features Support"]
      },

      {
        id: 6, title: 'Apple MacBook Neo 14-inch Laptop', brand: 'Apple', color: 'Silver', image: '/mobile/item6/Item6_1.png', thumbnails: ['/mobile/item6/Item6_2.png', '/mobile/item6/Item6_3.png', '/mobile/item6/Item6_4.png'], price: 60.00, oldPrice: 69.00, isSale: false, stock: 2, sold: 500, rating: 5,
        shortDesc: "Apple MacBook Neo is a powerful and lightweight laptop with Apple M3 chip, Retina display, long battery life, and fast SSD storage, perfect for work, coding, editing, and daily use.",
        longDesc: "The Apple MacBook Neo 14-inch laptop is designed for high performance and smooth multitasking. Powered by the Apple M3 chip, it delivers fast speed, low power consumption, and excellent graphics performance.\n\nIt features a Retina display with sharp colors, long battery life, and fast SSD storage for quick loading. The slim and lightweight design makes it perfect for students, professionals, and creators.",
        features: ["✔ Display: 14-inch Liquid Retina Display", "✔ Processor: Apple M3 Chip", "✔ RAM: 16GB Unified Memory", "✔ Storage: 512GB / 1TB SSD", "✔ Graphics: Apple Integrated GPU", "✔ Battery: Up to 18 Hours Backup", "✔ Ports: USB-C / Thunderbolt / Headphone Jack", "✔ Operating System: macOS", "✔ Wi-Fi 6E / Bluetooth 5.3", "✔ Backlit Magic Keyboard", "✔ Touch ID Security"]
      },

      {
        id: 7, title: 'HP Victus Gaming Laptop i5 13th Gen RTX 3050', brand: 'HP', color: 'Silver', image: '/mobile/item7/Item7_1.png', thumbnails: ['/mobile/item7/Item7_2.png', '/mobile/item7/Item7_3.png', '/mobile/item7Iitem7_4.png'], price: 98.00, oldPrice: null, isSale: false, stock: 5, sold: 300, rating: 5,
        shortDesc: "HP Victus gaming laptop comes with Intel i5 13th Gen processor, RTX 3050 graphics, 16GB RAM, and 512GB SSD, perfect for gaming, editing, coding, and high-performance work.",
        longDesc: "The HP Victus Gaming Laptop is built for high performance and smooth gaming experience. Powered by Intel Core i5-13420H processor and NVIDIA RTX 3050 graphics, it delivers fast speed and powerful graphics for modern games and heavy applications.\n\n With 16GB RAM, 512GB SSD, and Windows 11, this laptop ensures smooth multitasking and quick loading. The high-quality display and strong cooling system make it ideal for gamers, students, and professionals.",
        features: ["✔ Display: 15.6-inch Full HD IPS Display", "✔ Processor: Intel Core i5-13420H (13th Gen)", "✔ Graphics: 4GB NVIDIA GeForce RTX 3050", "✔ RAM: 16GB DDR4 3200 MHz", "✔ Storage: 512GB PCIe SSD", "✔ Operating System: Windows 11 Home", "✔ MS Office 2024 Lifetime", "✔ Microsoft 365 – 1 Year Free", "✔ Wi-Fi 6 / Bluetooth 5.3", "✔ Backlit Keyboard", "✔ High Performance Cooling System"]
      },


      {
        id: 8, title: 'Dell Inspiron DB14255 Ryzen 7 AI Laptop', brand: 'Dell', color: 'Metal', image: '/mobile/item8/Item8_1.png', thumbnails: ['/mobile/item8/Item8_2.png', '/mobile/item8/Item8_3.png', '/mobile/item8/Item8_4.png'], price: 499.00, oldPrice: null, isSale: false, stock: 20, sold: 15, rating: 3,
        shortDesc: "Dell Inspiron DB14255 laptop comes with AMD Ryzen 7 AI processor, 16GB RAM, 1TB SSD, and 14-inch FHD+ display, perfect for work, coding, editing, and multitasking.  ",
        longDesc: "The Dell Inspiron DB14255 is a powerful and lightweight laptop designed for productivity and performance. It is powered by AMD Ryzen 7 350 AI processor with Radeon graphics for fast speed and smooth performance.\n\n With 16GB LPDDR5X RAM and 1TB SSD storage, the laptop handles multitasking, office work, and creative tasks easily.The 14-inch FHD+ IPS display gives clear visuals, and Windows 11 with Office 2024 makes it ready for professional use",
        features: ["✔ Display: 14.0-inch FHD+ IPS, 300 nits", "✔ Processor: AMD Ryzen 7 350 AI", "✔ Graphics: AMD Radeon Graphics", "✔ RAM: 16GB LPDDR5X", "✔ Storage: 1TB SSD", "✔ Operating System: Windows 11", "✔ MS Office Home & Student 2024", "✔ Battery: 4-Cell 64Wh"]
      },

      {
        id: 9, title: 'Lenovo IdeaPad Slim Gaming i7 13th Gen Laptop', brand: 'Lenovo', color: 'Metal', image: '/mobile/item9/Item9_1.png', thumbnails: ['/mobile/item9/Item9_2.png', '/mobile/item9/Item9_3.png', '/mobile/item9/Item9_4.png'], price: 499.00, oldPrice: null, isSale: false, stock: 20, sold: 15, rating: 3,
        shortDesc: "Lenovo IdeaPad Slim Gaming laptop comes with Intel i7 13th Gen processor, IPS display, metal body design, and fast performance, perfect for gaming, coding, editing, and office work.",
        longDesc: "The Lenovo IdeaPad Slim Gaming laptop is built for powerful performance and smooth multitasking. It features Intel Core i7-13620H processor, high-quality IPS display, and premium metal design for durability.\n\n With fast RAM, SSD storage, and Windows 11 with Office 2024, this laptop is perfect for gaming, professional work, programming, and content creation.\n\n Its thin and lightweight build makes it easy to carry while still delivering high performance.",
        features: ["✔ Display: 15.3-inch WUXGA IPS Display", "✔ Processor: Intel Core i7-13620H (13th Gen)", "✔ Graphics: Integrated Intel Graphics", "✔ RAM: 16GB DDR5", "✔ Storage: 512GB / 1TB SSD", "✔ Operating System: Windows 11", "✔ MS Office Home & Student 2024", "✔ Body: Metal A Cover Design"]
      },

      {
        id: 10, title: 'ASUS ExpertBook Business Laptop 15.6-inch FHD', brand: 'ASUS', color: 'Metal', image: '/mobile/item10/Item10_1.png', thumbnails: ['/mobile/item10/Item10_2.png', '/mobile/item10/Item10_3.png', '/mobile/item10/Item10_4.png'], price: 499.00, oldPrice: null, isSale: false, stock: 20, sold: 15, rating: 3,
        shortDesc: "ASUS ExpertBook is a lightweight business laptop with FHD display, fast SSD storage, Wi-Fi 6, multiple ports, and strong performance, perfect for office work, coding, and daily use.",
        longDesc: "The ASUS ExpertBook laptop is designed for business users and professionals who need reliable performance and strong connectivity. It features a Full HD display, fast processor, and SSD storage for smooth multitasking.\n\n With multiple USB ports, HDMI, RJ-45 Ethernet, Wi-Fi 6, and Bluetooth 5.4, this laptop provides excellent connectivity options.\n\n Its slim and lightweight design makes it easy to carry, while Windows 11 ensures a modern and secure experience.",
        features: ["✔ Display: 15.6-inch Full HD Display", "✔ Processor: Intel Core i5 / Ryzen 5 (Business Series)", "✔ RAM: 16GB DDR4", "✔ Storage: 512GB SSD", "✔ Graphics: Integrated Graphics", "✔ Operating System: Windows 11", "✔ Ports: USB-C, USB-A, HDMI, RJ-45, Audio Jack", "✔ Fingerprint / Security Lock Support"]
      }
    ]
  },

  'fashion': {
    title: 'Fashion',
    minPrice: 53,
    maxPrice: 212,
    filters: {
      subCategories: ['Women', 'Sneakers', 'Bags & Luggage', 'Handbags', 'Fashion', 'Women Bags', 'Women Fashion'],
      manufacturers: ['Guerlain', 'Farmasi', 'Salon CHIC'],
      colors: ['Blue', 'Lime', 'Pink', 'Yellow', 'Metal', 'Silver'],
      sizes: ['39', '40', '41', '42', '43']
    },
    bestsellers: [
      { id: 103, title: 'Women’s Denim Shirt Style Casual Dress', price: 67.00, oldPrice: 98.00, img: '/Fashion/item3/item3_2.jpg' },
      { id: 104, title: 'Women’s Classic Black Belted Midi Dress', price: 117.00, oldPrice: null, img: '/Fashion/item4/item4_2.jpg' },
      { id: 105, title: 'Women’s Puff Sleeve Mini Casual Dress', price: 74.00, oldPrice: 92.00, img: '/Fashion/item5/item5_2.jpg' },
    ],
    promoImage: [{id:101,img:'/Fashion/item1/item1_3.jpg'}],
    products: [
      {
        id: 101, title: "Women’s Sleeveless Ribbed Crop Top", brand: 'StyleAura Fashion', subCategory: 'Women, Fashion, Top', size: '42', image: '/Fashion/item1/item1_1.jpg', thumbnails: ['/Fashion/item1/item1_1.jpg', '/Fashion/item1/item1_2.jpg', '/Fashion/item1/item1_4.jpg'], price: 59.00, oldPrice: null, isSale: false, swatches: [], stock: 45, sold: 12, rating: 4,
        shortDesc: "This women’s sleeveless ribbed crop top is designed for a modern and stylish look. Made with soft stretchable fabric, it provides comfort and a perfect fit, ideal for casual wear, parties, and daily outfits",
        longDesc: "Upgrade your wardrobe with this stylish women’s sleeveless ribbed crop top, designed for both comfort and elegance. The soft, stretchable fabric gives a smooth fit while allowing easy movement throughout the day.\n\n Its minimal and modern design makes it perfect for pairing with jeans, skirts, or trousers. Whether you are going out with friends, attending a casual event, or looking for everyday wear, this top offers the perfect balance of style and comfort."
      },
      {
        id: 102, title: "Women’s Elegant Sleeveless Midi Dress", brand: 'Farmasi', subCategory: 'Dress, Midi Dress, Sleeveless', size: '40', image: '/Fashion/item2/item2_1.jpg', thumbnails: ['/Fashion/item2/item2_2.jpg', '/Fashion/item2/item2_3.jpg', '/Fashion/item2/item2_4.jpg'], price: 88.00, oldPrice: null, isSale: false, swatches: ['#00d2ff', '#a8e6cf', '#ff99cc', '#ffdd59', '#4b5563'], stock: 765, sold: 0, rating: 0,

        shortDesc: "This elegant sleeveless midi dress for women is designed for comfort and style. Made with soft lightweight fabric and a flexible waist fit, it is perfect for casual outings, parties, and everyday wear.",
        longDesc: "Add a touch of elegance to your wardrobe with this stylish women’s sleeveless midi dress. Designed with soft breathable fabric and a comfortable elastic waist, this dress provides a perfect fit while maintaining a trendy look.\n\n The lightweight material makes it ideal for warm weather, while the simple and classy design makes it suitable for casual wear, vacations, and special occasions. Pair it with flats or heels to complete a fashionable outfit."
      },

      {
        id: 103, title: "Women’s Denim Shirt Style Casual Dress", brand: 'Salon CHIC', subCategory: 'Fashion, Denim Dress, Shirt Dress', size: '39', image: '/Fashion/item3/item3_1.jpg', thumbnails: ['/Fashion/item3/item3_2.jpg', '/Fashion/item3/item3_3.jpg', '/Fashion/item3/item3_4.jpg'], price: 81.00, oldPrice: null, isSale: false, swatches: [], stock: 12, sold: 88, rating: 5,
        shortDesc: "This women’s denim shirt style dress offers a perfect mix of comfort and modern fashion. Made with soft denim fabric and a stylish belt fit, it is ideal for casual wear, outings, and everyday use.",
        longDesc: "Stay stylish and comfortable with this women’s denim shirt style casual dress. Designed with premium quality denim fabric, this dress provides durability along with a soft and breathable feel.\n\nThe button-down shirt design with a waist belt gives a perfect fit and enhances your overall look. It is suitable for daily wear, office casual style, shopping, or weekend outings. Pair it with sneakers, flats, or heels for a trendy appearance."
      },
      {
        id: 104, title: "Women’s Classic Black Belted Midi Dress", brand: 'Guerlain', subCategory: 'Fashion, Black Dress, Midi Dress', size: '41', image: '/Fashion/item4/item4_1.jpg', thumbnails: ['/Fashion/item4/item4_2.jpg', '/Fashion/item4/item4_3.jpg', '/Fashion/item4/item4_4.jpg'], price: 74.00, oldPrice: null, isSale: false, swatches: [], stock: 3, sold: 40, rating: 4,

        shortDesc: "This women’s classic black belted midi dress is designed for a stylish and elegant look. Made with soft comfortable fabric and a fitted waist belt, it is perfect for office wear, parties, and casual outings.",
        longDesc: "Enhance your style with this women’s classic black belted midi dress, designed for elegance and comfort. The soft and breathable fabric ensures all-day comfort, while the waist belt provides a perfect fit and modern silhouette.\n\n This dress is suitable for office wear, evening outings, parties, and casual occasions. The simple yet classy design makes it a must-have outfit for every wardrobe. Pair it with heels or flats for a complete fashionable look."
      },

      {
        id: 105, title: "Women’s Puff Sleeve Mini Casual Dress", brand: 'Farmasi', subCategory: 'Fashion, Party Wear, Trendy, Summer Dress', size: '39', image: '/Fashion/item5/item5_1.jpg', thumbnails: ['/Fashion/item5/item5_2.jpg', '/Fashion/item5/item5_3.jpg', '/Fashion/item5/item5_4.jpg'], price: 212.00, oldPrice: null, isSale: false, swatches: [], stock: 18, sold: 5, rating: 5,
        shortDesc: "This women’s puff sleeve mini dress is designed for a trendy and elegant look. Made with soft lightweight fabric, it provides comfort and a perfect fit, suitable for casual outings, parties, and daily wear.",
        longDesc: "Look stylish and confident with this women’s puff sleeve mini casual dress. Crafted from soft and breathable fabric, this dress offers a comfortable fit while maintaining a modern fashionable style.\n\n The puff sleeve design adds a trendy touch, and the fitted shape enhances your overall look. Perfect for casual wear, parties, dates, and special occasions, this dress pairs well with heels, flats, or handbags for a complete outfit."
      },

      {
        id: 106, title: "Men’s Classic Bomber Casual Jacket", brand: 'StyleAura Fashion', subCategory: 'Jacket, Bomber Jacket, Casual Wear', size: '40', image: '/Fashion/item6/item6_1.jpg', thumbnails: ['/Fashion/item6/item6_2.jpg', '/Fashion/item6/item6_3.jpg', '/Fashion/item6/item6_4.jpg'], price: 81.00, oldPrice: null, isSale: false, swatches: [], stock: 60, sold: 20, rating: 4,
        shortDesc: "This men’s classic bomber jacket is designed for a stylish and comfortable look. Made with high-quality fabric and a modern fit, it is perfect for casual wear, travel, and winter outfits.",
        longDesc: "Upgrade your wardrobe with this men’s classic bomber casual jacket, designed for both style and comfort. The premium quality material provides warmth while remaining lightweight and comfortable for daily wear.\n\n The modern bomber design with zip closure and fitted cuffs gives a trendy look suitable for casual outings, travel, and evening wear. Pair it with jeans or trousers for a smart and fashionable appearance."
      },
      {
        id: 107, title: "Men’s Half-Zip Casual Sport Jacket", brand: 'Guerlain', subCategory: 'Men, Fashion, Jacket, Sports Wear', size: '39', image: '/Fashion/item7/item7_1.jpg', thumbnails: ['/Fashion/item7/item7_2.jpg', '/Fashion/item7/item7_3.jpg', '/Fashion/item7/item7_4.jpg'], price: 53.00, oldPrice: null, isSale: false, swatches: [], stock: 22, sold: 14, rating: 3,
        shortDesc: "This men’s half-zip casual sport jacket is designed for comfort and modern style. Made with lightweight breathable fabric, it is perfect for daily wear, travel, and outdoor activities.",
        longDesc: "Stay comfortable and stylish with this men’s half-zip casual sport jacket. Designed with premium lightweight fabric, this jacket provides excellent comfort while keeping a modern sporty look.\n\n The half-zip design makes it easy to wear, and the relaxed fit allows free movement, making it perfect for casual wear, workouts, travel, and outdoor use. Pair it with jeans or joggers for a smart and sporty outfit."
      },
      {
        id: 108, title: "Men’s Graphic Print Casual T-Shirt", brand: 'StyleAura Fashion', subCategory: 'Fashion, T-Shirt, Printed T-Shirt, Casual Wear', size: '41', image: '/Fashion/item8/item8_1.jpg', thumbnails: ['/Fashion/item8/item8_2.jpg', '/Fashion/item8/item8_3.jpg', '/Fashion/item8/item8_4.jpg'], price: 88.00, oldPrice: null, isSale: false, swatches: [], stock: 5, sold: 60, rating: 5,
        shortDesc: "This men’s graphic print casual t-shirt is designed for a cool and trendy look. Made with soft breathable cotton fabric, it provides comfort for daily wear, outings, and casual style.",
        longDesc: "Upgrade your casual style with this men’s graphic print t-shirt, designed for comfort and modern fashion. Made from soft and breathable cotton fabric, this t-shirt keeps you comfortable throughout the day.\n\n The stylish printed design gives a trendy look, making it perfect for daily wear, travel, and weekend outings. Pair it with jeans, shorts, or joggers for a smart casual outfit."
      },
      {
        id: 109, title: "Men Casual Half Sleeve Shirt with Cargo Pants Outfit", brand: 'Generic', subCategory: 'Cargo Pants, Casual Wear, Summer Shirt, Men Fashion', size: '41', image: '/Fashion/item9/item9_1.jpg', thumbnails: ['/Fashion/item9/item9_2.jpg', '/Fashion/item9/item9_3.jpg', '/Fashion/item9/item9_4.jpg'], price: 88.00, oldPrice: null, isSale: false, swatches: [], stock: 5, sold: 60, rating: 5,
        shortDesc: "Stylish men casual outfit with half sleeve shirt and cargo pants, comfortable for daily wear, travel, and summer fashion.",
        longDesc: "This men’s casual outfit includes a stylish half sleeve shirt and comfortable cargo pants.The shirt is lightweight and breathable, perfect for summer wear.\n\n The cargo pants provide a trendy look with extra pockets and relaxed fit. Ideal for daily wear, travel, college, and casual outings."
      },
    ]
  },
  'jewelry': {
    title: 'Jewelry',
    minPrice: 49,
    maxPrice: 156,
    filters: {
      subCategories: ['Jewelry Armoires', 'Jewelry Sets', 'Earrings', 'Brooches'],
      manufacturers: ['Guerlain', 'RoyalAura Jewellery', 'Creative State', 'Stillness', 'Salon CHIC'],
    },
    bestsellers: [
      { id: 203, title: 'Traditional Gold Plated Temple Necklace Set', price: 67.00, oldPrice: 98.00, img: '/jellwery/item3/item3_1.png' },
      { id: 204, title: 'Elegant Gold Plated Designer Bracelet', price: 117.00, oldPrice: null, img: '/jellwery/item4/item4_2.png' },
      { id: 205, title: 'Gold Plated Stone Design Bracelet for Women', price: 74.00, oldPrice: 92.00, img: '/jellwery/item5/item5_2.png' },
    ],
    promoImage: [{id:201,img:'/jellwery/item1/item1_3.png'}],
    products: [
      {
        id: 201, title: "Traditional Gold Plated Necklace Set with Earrings", brand: 'RoyalAura Jewellery', subCategory: 'Jewelry Sets', image: '/jellwery/item1/item1_1.png', thumbnails: ['/jellwery/item1/item1_2.png', '/jellwery/item1/item1_3.png', '/jellwery/item1/item1_4.png'], price: 59.00, oldPrice: null, isSale: false, swatches: [], stock: 15, sold: 30, rating: 4,
        shortDesc: "This traditional gold plated necklace set comes with matching earrings, designed for weddings, festivals, and special occasions. It gives a rich and elegant ethnic look.", longDesc: "Enhance your traditional look with this beautiful gold plated necklace set crafted with fine detailing and elegant design. This jewellery set includes a long necklace with matching earrings, perfect for weddings, festivals, and cultural events."
      },
      {
        id: 202, title: "Elegant Gold Plated Designer Necklace", brand: 'RoyalAura Jewellery', subCategory: 'Jewelry Armoires', image: '/jellwery/item2/item2_1.png', thumbnails: ['/jellwery/item2/item2_2.jpg', '/jellwery/item2/item2_3.jpg', '/jellwery/item2/item2_4.jpg'], price: 118.00, oldPrice: null, isSale: false, swatches: [], stock: 8, sold: 12, rating: 5,
        shortDesc: "This elegant gold plated designer necklace is perfect for parties, weddings, and special occasions. It gives a stylish and luxurious look while being lightweight and comfortable.", longDesc: "Add a touch of elegance to your jewellery collection with this beautifully crafted gold plated designer necklace. The modern yet traditional design makes it suitable for both festive and party wear."
      },
      {
        id: 203, title: "Traditional Gold Plated Temple Necklace Set", brand: 'RoyalAura Jewellery', subCategory: 'Necklace Set', image: '/jellwery/item3/item3_1.png', thumbnails: ['/jellwery/item3/item3_2.png', '/jellwery/item3/item3_3.png', '/jellwery/item3/item3_4.png'], price: 125.00, oldPrice: null, isSale: false, swatches: [], stock: 25, sold: 5, rating: 4,
        shortDesc: "This traditional gold plated temple necklace set with pendant and earrings is perfect for weddings, festivals, and ethnic wear. It gives a rich and royal look with detailed design work.", longDesc: "Complete your traditional look with this beautifully crafted gold plated temple necklace set. Designed with intricate detailing, this jewellery set includes a stylish necklace, matching earrings, and a decorative pendant that adds a royal touch."
      },
      {
        id: 204, title: "Elegant Gold Plated Designer Bracelet", brand: 'RoyalAura Jewellery', subCategory: 'Bracelet', image: '/jellwery/item4/item4_1.jpg', thumbnails: ['/jellwery/item4/item4_2.jpg', '/jellwery/item4/item4_3.jpg', '/jellwery/item4/item4_4.jpg'], price: 79.00, oldPrice: null, isSale: false, swatches: [], stock: 50, sold: 2, rating: 3,
        shortDesc: "This elegant gold plated bracelet is designed for a simple and stylish look. It is lightweight, comfortable, and perfect for daily wear, parties, and special occasions.", longDesc: "Add a touch of elegance to your jewellery collection with this beautifully crafted gold plated designer bracelet. Made with high-quality material and fine finishing, this bracelet gives a rich and premium look.\n\n Its lightweight design makes it comfortable for long wear, while the stylish pattern makes it suitable for both traditional and modern outfits. Perfect for daily wear, parties, festivals, and special occasions."
      },

      {
        id: 205, title: "Gold Plated Stone Design Bracelet for Women", brand: 'RoyalAura Jewellery', subCategory: 'Gold Plated', image: '/jellwery/item5/item5_4.jpg', thumbnails: ['/jellwery/item5/item5_2.jpg', '/jellwery/item5/item5_3.jpg', '/jellwery/item5/item5_1.jpg'], price: 79.00, oldPrice: 49.00, isSale: false, swatches: [], stock: 100, sold: 50, rating: 5,
        shortDesc: "This gold plated stone design bracelet is perfect for a stylish and elegant look. It is lightweight, comfortable, and suitable for daily wear, parties, and special occasions.", longDesc: "Enhance your style with this beautiful gold plated bracelet designed with elegant stone detailing. Crafted with high-quality material and fine finishing, this bracelet gives a premium and luxurious look."
      },

      {
        id: 206, title: "Bridal Gold Plated Stone Necklace Set with Earrings", brand: 'RoyalAura Jewellery', subCategory: 'Bridal Set', image: '/jellwery/item6/item6_1.png', thumbnails: ['/jellwery/item6/item6_2.png', '/jellwery/item6/item6_3.png', '/jellwery/item6/item6_4.png'], price: 79.00, oldPrice: null, isSale: false, swatches: [], stock: 10, sold: 8, rating: 4,
        shortDesc: "This bridal gold plated necklace set with matching earrings is designed for weddings and special occasions. It gives a royal and traditional look with colorful stone detailing.", longDesc: "Make your special moments more beautiful with this stunning bridal gold plated necklace set. Designed with detailed craftsmanship and colorful stone work, this jewellery set gives a rich and royal appearance."
      },
      {
        id: 207, title: "Traditional Gold Plated Choker Necklace Set with Earrings", brand: 'Guerlain', subCategory: 'Earrings', image: '/jellwery/item7/item7_1.png', thumbnails: ['/jellwery/item7/item7_2.png', '/jellwery/item7/item7_3.png', '/jellwery/item7/item7_4.png'], price: 88.00, oldPrice: null, isSale: false, swatches: [], stock: 765, sold: 0, rating: 5,
        tags: 'camera',

        shortDesc: "This traditional gold plated choker necklace set with matching earrings is perfect for weddings, festivals, and special occasions. It gives a rich and elegant ethnic look.",
        longDesc: "Enhance your traditional outfit with this beautifully designed gold plated choker necklace set. Crafted with detailed stone work and pearl design, this jewellery set gives a royal and elegant appearance.",
        features: ["100% Brand New", "Contains 1 PCS", "Simple and easy"]
      },
      {
        id: 208, title: "Elegant Rose Gold Plated Designer Ring", brand: 'RoyalAura Jewellery', subCategory: 'Jewelry Sets', image: '/jellwery/item8/item8_3.png', thumbnails: ['/jellwery/item8/item8_2.png', '/jellwery/item8/item8_1.png', '/jellwery/item8/item8_4.png'], price: 85.00, oldPrice: null, isSale: false, swatches: [], stock: 12, sold: 4, rating: 4,
        shortDesc: "This elegant rose gold plated designer ring is perfect for daily wear and special occasions. It gives a modern and stylish look with a lightweight and comfortable fit.", longDesc: "Its lightweight and comfortable design makes it perfect for daily wear, parties, and special occasions. The stylish pattern easily matches both traditional and western outfits, making it a perfect addition to your jewellery collection."
      },
      {
        id: 209, title: "Premium Rose Gold Diamond Style Ring", brand: 'Creative State', subCategory: 'Jewelry Sets', image: '/jellwery/item9/item9_3.jpg', thumbnails: ['/jellwery/item9/item9_1.jpg', '/jellwery/item9/item9_2.jpg', '/jellwery/item9/item9_4.jpg'], price: 95.00, oldPrice: null, isSale: false, swatches: [], stock: 12, sold: 4, rating: 4,
        shortDesc: "This premium rose gold diamond style ring gives a luxurious and modern look. It is lightweight, comfortable, and perfect for daily wear, parties, and special occasions.", longDesc: "Enhance your jewellery collection with this premium rose gold diamond style ring, designed with a modern and elegant finish. The beautiful stone detailing gives a luxurious appearance, making it perfect for both daily wear and special occasions."
      },
      {
        id: 210, title: "Luxury Gold Plated Crystal Bracelet", brand: 'Creative State', subCategory: 'Bracelet, Gold Plated', image: '/jellwery/item10/item10_3.jpg', thumbnails: ['/jellwery/item10/item10_2.jpg', '/jellwery/item10/item10_4.jpg', '/jellwery/item10/item10_1.jpg'], price: 79.00, oldPrice: null, isSale: false, swatches: [], stock: 12, sold: 4, rating: 4,
        shortDesc: "This luxury gold plated crystal bracelet gives a modern and elegant look. It is lightweight, stylish, and perfect for daily wear, parties, and special occasions.", longDesc: "Made with high-quality material and fine polishing, this bracelet is comfortable to wear for long hours. Perfect for parties, weddings, and daily wear, it easily matches both modern and traditional outfits."
      },
    ]
  }
};
