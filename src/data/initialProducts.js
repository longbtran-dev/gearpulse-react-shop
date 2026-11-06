// Cung cấp hình ảnh công nghệ studio chất lượng cao với fallback SVG tự chứa
function getTechPhoto(id, category) {
  const photos = {
    '1': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    '2': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    '3': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    '4': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    '5': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
    '6': 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80',
    '7': 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=1000&q=80',
    '8': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80',
    '9': 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=1000&q=80',
    '10': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
    '11': 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=1000&q=80',
    '12': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80'
  };
  return photos[id] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80';
}

export const PRODUCT_CATEGORIES = [
  'All',
  'Keyboard',
  'Mouse',
  'Headset',
  'Monitor',
  'Desk Gear'
];

export const PRODUCT_BRANDS = [
  'VortexTech',
  'AeroPulse',
  'AcoustiGear',
  'LumixView',
  'NovaForge'
];

export const initialProducts = [
  {
    id: '1',
    name: 'CyberBlade Pro 75% Wireless Mechanical Keyboard',
    category: 'Keyboard',
    brand: 'VortexTech',
    price: 189,
    originalPrice: 219,
    rating: 5,
    reviewsCount: 142,
    salesCount: 890,
    isHot: true,
    isNew: false,
    inStock: true,
    stock: 24,
    image: getTechPhoto('1', 'Keyboard'),
    gallery: [
      getTechPhoto('1', 'Keyboard'),
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: {
      switches: ['Gateron Pro Yellow (Linear)', 'Gateron Pro Silver (Speed)', 'Gateron Pro Brown (Tactile)'],
      colors: ['Obsidian Black', 'Cyber Cyan', 'Glacier White']
    },
    description: 'Bàn phím cơ không dây layout 75% gõ đầm tay chuẩn e-Sports, switch Gateron Pro pre-lubed mượt mà, cấu trúc Gasket Mount 5 lớp tiêu âm Poron cao cấp. Kết nối 3 chế độ (2.4Ghz/Bluetooth 5.1/Type-C) kèm núm xoay kim loại CNC đa chức năng tùy biến âm lượng và hiệu ứng LED RGB.',
    specs: {
      'Layout': '75% Compact (82 phím + Núm xoay CNC kim loại)',
      'Mounting': 'Gasket Mount silicone + 5 lớp lót tiêu âm Poron/IXPE',
      'Switch': 'Gateron Pro Pre-lubed (Hot-swap 5-pin TTC socket)',
      'Kết nối': 'Tri-mode: 2.4GHz không độ trễ / Bluetooth 5.1 / Type-C rời',
      'Pin & Thời lượng': '4000mAh (lên tới 200 giờ khi tắt LED, 45 giờ bật LED)',
      'Keycaps': 'PBT Double-shot Cherry Profile chống bóng mòn vĩnh viễn'
    },
    reviews: [
      { id: 'r1', author: 'Đức Huy', rating: 5, date: '2 ngày trước', comment: 'Âm thanh gõ đầm thock cực kỳ đã tai, gasket mount nhún rất êm tay. Đáng đồng tiền bát gạo!' },
      { id: 'r2', author: 'Minh Tuấn', rating: 5, date: '1 tuần trước', comment: 'Kết nối 2.4Ghz chơi CS2 và Valorant mượt mà, không thấy độ trễ. 10/10.' }
    ]
  },
  {
    id: '2',
    name: 'ViperStrike Ultralight 4K Wireless Gaming Mouse',
    category: 'Mouse',
    brand: 'AeroPulse',
    price: 99,
    originalPrice: 129,
    rating: 5,
    reviewsCount: 128,
    salesCount: 1420,
    isHot: true,
    isNew: true,
    inStock: true,
    stock: 40,
    image: getTechPhoto('2', 'Mouse'),
    gallery: [
      getTechPhoto('2', 'Mouse'),
      'https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: {
      colors: ['Matte Black', 'Ghost White', 'Neon Cyan']
    },
    description: 'Chuột gaming không dây siêu nhẹ chỉ 49 gram tối ưu cho thi đấu chuyên nghiệp. Trang bị mắt đọc PixArt PAW3395 chuẩn xác tối đa 26.000 DPI, hỗ trợ Polling Rate 4000Hz với dongle đi kèm, mang lại đường di chuột mượt mà và phản xạ chớp nhoáng.',
    specs: {
      'Trọng lượng': '49 gram siêu nhẹ không cần đục lỗ',
      'Cảm biến': 'PixArt PAW3395 flagship (26.000 DPI, 650 IPS, 50G)',
      'Polling Rate': '4000Hz (Bao gồm 4K Nano Dongle)',
      'Switch chính': 'Optical Huano Blue Shell Pink Dot (80 triệu lần nhấn)',
      'Feet chuột': '100% PTFE bo cong viền lướt êm ái trên mọi mặt pad'
    },
    reviews: [
      { id: 'r3', author: 'Hoàng Long', rating: 5, date: 'Hôm qua', comment: 'Chuột siêu nhẹ cầm vẩy cực kỳ linh hoạt, form cầm vừa tay với kiểu cầm claw grip.' }
    ]
  },
  {
    id: '3',
    name: 'AcoustiGear Apex Spatial Sound Wireless Headset',
    category: 'Headset',
    brand: 'AcoustiGear',
    price: 249,
    originalPrice: 289,
    rating: 5,
    reviewsCount: 95,
    salesCount: 560,
    isHot: false,
    isNew: true,
    inStock: true,
    stock: 15,
    image: getTechPhoto('3', 'Headset'),
    gallery: [
      getTechPhoto('3', 'Headset'),
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    variants: {
      colors: ['Space Gray', 'Midnight Black']
    },
    description: 'Tai nghe gaming cao cấp audiophile với củ loa Planar Magnetic 50mm tái tạo âm thanh chuẩn phòng thu. Tích hợp công nghệ âm thanh vòm 7.1 Spatial Audio định vị chuẩn xác bước chân đối thủ trong game FPS, kèm micro lọc ồn AI thông minh.',
    specs: {
      'Củ loa': '50mm Planar Magnetic phẳng cao cấp',
      'Âm thanh': '7.1 Spatial Sound / Đạt chuẩn Hi-Res Audio 96kHz/24bit',
      'Microphone': 'Tháo rời, cảm biến AI lọc 99% tiếng ồn quạt và gõ phím',
      'Thời lượng pin': '60 giờ nghe liên tục, sạc nhanh 15 phút nghe 6 giờ'
    },
    reviews: [
      { id: 'r4', author: 'Anh Khoa', rating: 5, date: '3 ngày trước', comment: 'Nghe nhạc chi tiết tuyệt vời, chơi PUBG nghe rõ tiếng bước chân trên tầng lầu.' }
    ]
  },
  {
    id: '4',
    name: 'LumixView 27" QHD 240Hz Fast-IPS Gaming Monitor',
    category: 'Monitor',
    brand: 'LumixView',
    price: 379,
    originalPrice: 429,
    rating: 5,
    reviewsCount: 64,
    salesCount: 310,
    isHot: true,
    isNew: false,
    inStock: true,
    stock: 8,
    image: getTechPhoto('4', 'Monitor'),
    gallery: [
      getTechPhoto('4', 'Monitor'),
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Màn hình chuyên nghiệp dành cho thi đấu e-Sports 27 inch 2K QHD (2560x1440), tần số quét 240Hz siêu mượt, tấm nền Fast-IPS phản hồi 1ms GtG loại bỏ hiện tượng bóng mờ. Dải màu đạt 99% sRGB và 95% DCI-P3 chuẩn màu đồ họa.',
    specs: {
      'Kích thước': '27 inch 2K QHD (2560 x 1440 pixels)',
      'Tần số quét': '240Hz / Thời gian phản hồi 1ms GtG',
      'Tấm nền': 'Fast-IPS 10-bit màu (8-bit + FRC)',
      'Công nghệ đồng bộ': 'Tương thích NVIDIA G-Sync & AMD FreeSync Premium',
      'Chuẩn hiển thị': 'VESA DisplayHDR 400, độ sáng 400 nits'
    },
    reviews: [
      { id: 'r5', author: 'Bảo Trâm', rating: 5, date: '5 ngày trước', comment: 'Màu sắc rất trong và chuẩn, 240Hz chơi game bắn súng là một trải nghiệm hoàn toàn khác biệt!' }
    ]
  },
  {
    id: '5',
    name: 'AeroGlide Artisan Cordura Deskpad XXL',
    category: 'Desk Gear',
    brand: 'AeroPulse',
    price: 39,
    originalPrice: 49,
    rating: 4,
    reviewsCount: 210,
    salesCount: 2300,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 55,
    image: getTechPhoto('5', 'Desk Gear'),
    description: 'Lót chuột cỡ lớn 900x400x4mm dệt bằng sợi Cordura quân sự chống thấm nước tuyệt đối, bo viền siêu phẳng chống cấn cổ tay, đế cao su thiên nhiên bám dính chắc chắn trên mọi mặt bàn làm việc.',
    specs: {
      'Kích thước': '900 x 400 x 4 mm',
      'Bề mặt': 'Vải dệt Cordura 500D cao cấp chống nước',
      'Đế lót': 'Cao su thiên nhiên nguyên khối chống trượt',
      'Viền': 'May bo viền phẳng dập nhiệt chống tưa rách'
    },
    reviews: []
  },
  {
    id: '6',
    name: 'NovaForge Magnetic Hall Effect 60% Keyboard',
    category: 'Keyboard',
    brand: 'NovaForge',
    price: 159,
    originalPrice: 179,
    rating: 5,
    reviewsCount: 88,
    salesCount: 740,
    isHot: true,
    isNew: true,
    inStock: true,
    stock: 18,
    image: getTechPhoto('6', 'Keyboard'),
    variants: {
      colors: ['Anodized Silver', 'Stealth Black']
    },
    description: 'Bàn phím cơ công nghệ cảm ứng từ tính Hall Effect đột phá, hỗ trợ Rapid Trigger 0.1mm siêu nhạy cho game thủ Valorant/CS2. Khả năng tùy chỉnh điểm kích hoạt từ 0.1mm đến 4.0mm cùng tần số lấy mẫu 8000Hz phản hồi 0.125ms.',
    specs: {
      'Layout': '60% Minimalist (61 phím tối ưu diện tích di chuột)',
      'Switch': 'Magnetic Hall Effect Gateron KS-20 (Không ma sát tiếp điểm kim loại)',
      'Rapid Trigger': 'Hành trình tùy chỉnh 0.1mm - 4.0mm với bước chỉnh 0.05mm',
      'Polling Rate': '8000Hz (Tốc độ phản hồi 0.125ms)',
      'Vỏ phím': 'Nhôm CNC 6063 nguyên khối bề mặt anodized cao cấp'
    },
    reviews: []
  },
  {
    id: '7',
    name: 'ErgoPulse Vertical Wireless Ergonomic Mouse',
    category: 'Mouse',
    brand: 'VortexTech',
    price: 69,
    originalPrice: 79,
    rating: 4,
    reviewsCount: 75,
    salesCount: 620,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 28,
    image: getTechPhoto('7', 'Mouse'),
    description: 'Chuột công thái học đứng góc nghiêng 57 độ mô phỏng tư thế bắt tay tự nhiên, giải phóng hoàn toàn áp lực đè nén lên cổ tay và cánh tay cho lập trình viên và người dùng văn phòng.',
    specs: {
      'Góc nghiêng': '57 độ nâng đỡ bàn tay tự nhiên',
      'Cảm biến': 'Quang học 4000 DPI điều chỉnh 4 mức',
      'Nút bấm': 'Silent switches giảm tiếng ồn 90%',
      'Pin': 'Pin sạc Type-C dùng liên tục 3 tháng'
    },
    reviews: []
  },
  {
    id: '8',
    name: 'PulseMic USB Studio Broadcast Microphone',
    category: 'Desk Gear',
    brand: 'AcoustiGear',
    price: 119,
    originalPrice: 139,
    rating: 5,
    reviewsCount: 52,
    salesCount: 410,
    isHot: false,
    isNew: true,
    inStock: true,
    stock: 20,
    image: getTechPhoto('8', 'Desk Gear'),
    description: 'Microphone condenser cổng USB-C chuyên dụng cho streamer, podcaster và game thủ. Tích hợp cảm biến chạm tắt mic tiện lợi (tap-to-mute), vòng LED RGB động và giá chống rung shockmount kim loại.',
    specs: {
      'Loại mic': '3 x 14mm condenser capsules',
      'Tần số mẫu': '96kHz / 24-bit chất lượng studio',
      'Tính năng': 'Cảm biến Tap-to-mute có đèn báo, cổng cắm tai nghe 3.5mm giám sát'
    },
    reviews: []
  },
  {
    id: '9',
    name: 'LumixView 34" Curved WQHD Ultrawide Monitor',
    category: 'Monitor',
    brand: 'LumixView',
    price: 529,
    originalPrice: 599,
    rating: 5,
    reviewsCount: 43,
    salesCount: 180,
    isHot: true,
    isNew: false,
    inStock: false,
    stock: 0,
    image: getTechPhoto('9', 'Monitor'),
    description: 'Màn hình cong tỉ lệ vàng 21:9 WQHD (3440x1440) độ cong 1500R ôm trọn góc nhìn. Tần số quét 165Hz, cổng USB-C 90W PD sạc và truyền hình ảnh cùng lúc một dây duy nhất.',
    specs: {
      'Kích thước': '34 inch Ultrawide cong 1500R',
      'Độ phân giải': 'WQHD (3440 x 1440 pixels)',
      'Tần số quét': '165Hz / 1ms MPRT',
      'Cổng cắm': 'USB-C 90W Power Delivery, 2x HDMI 2.1, 1x DP 1.4'
    },
    reviews: []
  },
  {
    id: '10',
    name: 'Zenith Heavy Duty Gas-Spring Monitor Arm',
    category: 'Desk Gear',
    brand: 'NovaForge',
    price: 79,
    originalPrice: 95,
    rating: 4,
    reviewsCount: 115,
    salesCount: 920,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 35,
    image: getTechPhoto('10', 'Desk Gear'),
    description: 'Tay nâng màn hình cơ chế piston trợ lực khí nén cao cấp chịu tải trọng lên tới 15kg (hỗ trợ màn hình 17" đến 49" siêu trường), hỗ trợ xoay 360 độ và rãnh đi dây ngầm thẩm mỹ.',
    specs: {
      'Tải trọng': '2.5kg đến 15kg (hỗ trợ màn hình phẳng và cong)',
      'Chuẩn VESA': '75x75mm và 100x100mm',
      'Lắp đặt': 'Kẹp bàn (Clamp) hoặc khoan lỗ xuyên bàn (Grommet)'
    },
    reviews: []
  },
  {
    id: '11',
    name: 'VortexCoil Aviator Custom Braided Keyboard Cable',
    category: 'Desk Gear',
    brand: 'VortexTech',
    price: 29,
    originalPrice: 35,
    rating: 5,
    reviewsCount: 195,
    salesCount: 3100,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 80,
    image: getTechPhoto('11', 'Desk Gear'),
    description: 'Dây cáp xoắn nối rời chuyên dụng cho bàn phím cơ custom, trang bị đầu nối hàng không Aviator GX12 kim loại sáng bóng, bọc 2 lớp dù Paracord và lưới Techflex siêu bền.',
    specs: {
      'Đầu cắm': 'USB-A to Type-C mạ vàng chống nhiễu',
      'Đầu nối': 'Aviator GX12 5-pin hợp kim kẽm',
      'Chiều dài': 'Phần xoắn 15cm, tổng chiều dài 1.5m'
    },
    reviews: []
  },
  {
    id: '12',
    name: 'AcoustiGear Echo ANC True Wireless Earbuds',
    category: 'Headset',
    brand: 'AcoustiGear',
    price: 109,
    originalPrice: 129,
    rating: 4,
    reviewsCount: 78,
    salesCount: 540,
    isHot: false,
    isNew: true,
    inStock: true,
    stock: 30,
    image: getTechPhoto('12', 'Headset'),
    description: 'Tai nghe TWS gaming độ trễ siêu thấp 35ms (Game Mode), chống ồn chủ động Hybrid ANC 42dB, chuẩn kháng nước IPX5 và thời lượng pin 32 giờ kèm hộp sạc.',
    specs: {
      'Độ trễ': '35ms siêu thấp chuẩn e-Sports',
      'Chống ồn': 'Hybrid ANC 42dB + Xuyên âm tự nhiên',
      'Pin': '8 giờ tai nghe + 24 giờ dock sạc'
    },
    reviews: []
  }
];
