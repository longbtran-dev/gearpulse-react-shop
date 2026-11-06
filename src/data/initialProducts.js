function createProductSvg(title, color1, color2, iconType) {
  const icons = {
    keyboard: `<rect x="220" y="240" width="360" height="150" rx="16" fill="#1e293b" stroke="${color1}" stroke-width="6"/>
      <rect x="250" y="265" width="40" height="30" rx="6" fill="${color2}"/>
      <rect x="305" y="265" width="40" height="30" rx="6" fill="${color2}"/>
      <rect x="360" y="265" width="40" height="30" rx="6" fill="${color2}"/>
      <rect x="415" y="265" width="40" height="30" rx="6" fill="${color2}"/>
      <rect x="470" y="265" width="80" height="30" rx="6" fill="${color1}"/>
      <rect x="250" y="310" width="60" height="30" rx="6" fill="${color2}"/>
      <rect x="325" y="310" width="180" height="30" rx="6" fill="${color1}"/>
      <rect x="520" y="310" width="30" height="30" rx="6" fill="${color2}"/>`,
    mouse: `<path d="M400 180 C340 180 320 250 320 340 C320 430 350 480 400 480 C450 480 480 430 480 340 C480 250 460 180 400 180 Z" fill="#1e293b" stroke="${color1}" stroke-width="6"/>
      <line x1="400" y1="180" x2="400" y2="300" stroke="${color1}" stroke-width="5"/>
      <rect x="390" y="230" width="20" height="40" rx="10" fill="${color2}"/>
      <circle cx="400" cy="380" r="16" fill="${color1}" opacity="0.6"/>`,
    headset: `<path d="M280 320 A120 120 0 0 1 520 320" fill="none" stroke="${color1}" stroke-width="16" stroke-linecap="round"/>
      <rect x="250" y="300" width="40" height="80" rx="20" fill="${color2}" stroke="#0f172a" stroke-width="4"/>
      <rect x="510" y="300" width="40" height="80" rx="20" fill="${color2}" stroke="#0f172a" stroke-width="4"/>
      <path d="M280 370 Q340 430 400 410" fill="none" stroke="${color1}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="406" cy="410" r="12" fill="${color2}"/>`,
    monitor: `<rect x="220" y="180" width="360" height="230" rx="12" fill="#0f172a" stroke="${color1}" stroke-width="8"/>
      <rect x="235" y="195" width="330" height="200" fill="#1e293b"/>
      <polygon points="340,360 460,250 440,360" fill="${color2}" opacity="0.8"/>
      <path d="M380 410 L370 470 L430 470 L420 410 Z" fill="${color1}"/>
      <rect x="340" y="470" width="120" height="14" rx="7" fill="${color2}"/>`,
    deskgear: `<rect x="220" y="240" width="360" height="180" rx="12" fill="#1e293b" stroke="${color1}" stroke-width="6"/>
      <circle cx="400" cy="330" r="45" fill="${color2}" opacity="0.7"/>
      <line x1="260" y1="380" x2="540" y2="380" stroke="${color1}" stroke-width="4"/>`
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <radialGradient id="grad-${title.replace(/\s+/g, '')}" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#090d16"/>
      </radialGradient>
    </defs>
    <rect width="800" height="600" fill="url(#grad-${title.replace(/\s+/g, '')})"/>
    <circle cx="400" cy="300" r="180" fill="${color1}" opacity="0.08"/>
    ${icons[iconType] || icons.deskgear}
    <text x="400" y="530" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#f8fafc" text-anchor="middle" letter-spacing="1.5">${title}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PRODUCT_CATEGORIES = [
  'All',
  'Keyboard',
  'Mouse',
  'Headset',
  'Monitor',
  'Desk Gear'
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
    reviewsCount: 42,
    isHot: true,
    isNew: false,
    inStock: true,
    stock: 24,
    image: createProductSvg('CyberBlade 75%', '#06b6d4', '#3b82f6', 'keyboard'),
    description: 'Bàn phím cơ không dây layout 75% gõ đầm tay, switch Gateron Pro pre-lubed mượt mà, kết nối 3 chế độ (2.4Ghz/Bluetooth/Type-C) kèm núm xoay kim loại CNC đa năng.',
    specs: {
      Layout: '75% Compact (82 phím)',
      Switch: 'Gateron Pro Yellow (Hot-swap 5-pin)',
      Connectivity: 'Tri-mode: 2.4G / BT 5.1 / Type-C',
      Battery: '4000mAh (lên tới 200 giờ)',
      Keycaps: 'PBT Double-shot Cherry Profile'
    }
  },
  {
    id: '2',
    name: 'ViperStrike Ultralight 4K Wireless Gaming Mouse',
    category: 'Mouse',
    brand: 'AeroPulse',
    price: 99,
    originalPrice: 129,
    rating: 5,
    reviewsCount: 38,
    isHot: true,
    isNew: true,
    inStock: true,
    stock: 40,
    image: createProductSvg('ViperStrike 4K', '#10b981', '#06b6d4', 'mouse'),
    description: 'Chuột gaming siêu nhẹ chỉ 49g, mắt đọc quang học PAW3395 chuẩn xác tối đa 26.000 DPI, hỗ trợ Polling Rate 4000Hz mang lại phản hồi chuẩn xác cho game FPS đỉnh cao.',
    specs: {
      Weight: '49 gram',
      Sensor: 'PixArt PAW3395 (26,000 DPI, 650 IPS)',
      PollingRate: '4000Hz Wireless dongle included',
      Switches: 'Optical Huano 80M clicks',
      Battery: '500mAh (~70 giờ 1000Hz)'
    }
  },
  {
    id: '3',
    name: 'AcoustiGear Apex Spatial Sound Wireless Headset',
    category: 'Headset',
    brand: 'AcoustiGear',
    price: 249,
    originalPrice: 289,
    rating: 5,
    reviewsCount: 29,
    isHot: false,
    isNew: true,
    inStock: true,
    stock: 15,
    image: createProductSvg('Apex Spatial', '#8b5cf6', '#ec4899', 'headset'),
    description: 'Tai nghe gaming chụp tai audiophile với driver planar magnetic 50mm, hỗ trợ âm thanh vòm 7.1 Spatial Audio chân thực, micro chống ồn AI khử tạp âm phòng hoàn hảo.',
    specs: {
      Driver: '50mm Planar Magnetic',
      Audio: '7.1 Spatial Sound / Hi-Res Certified',
      Microphone: 'Detachable AI Noise-Cancelling Boom Mic',
      Connectivity: 'Low-latency 2.4GHz + BT 5.3 + 3.5mm',
      Cushions: 'Memory foam bọc vải lụa thoáng khí'
    }
  },
  {
    id: '4',
    name: 'LumixView 27" QHD 240Hz Fast-IPS Gaming Monitor',
    category: 'Monitor',
    brand: 'LumixView',
    price: 379,
    originalPrice: 429,
    rating: 5,
    reviewsCount: 19,
    isHot: true,
    isNew: false,
    inStock: true,
    stock: 8,
    image: createProductSvg('LumixView 27" 240Hz', '#f59e0b', '#ef4444', 'monitor'),
    description: 'Màn hình chuyên e-Sports 27 inch 2K QHD (2560x1440), tần số quét 240Hz siêu mượt, tấm nền Fast-IPS thời gian phản hồi 1ms GtG, dải màu 99% sRGB hỗ trợ DisplayHDR 400.',
    specs: {
      Size: '27 inch QHD (2560 x 1440)',
      RefreshRate: '240Hz / 1ms GtG response',
      Panel: 'Fast-IPS 10-bit (8-bit + FRC)',
      Sync: 'NVIDIA G-Sync Compatible & FreeSync Premium',
      Color: '99% sRGB, 95% DCI-P3, HDR400'
    }
  },
  {
    id: '5',
    name: 'AeroGlide Artisan Cordura Deskpad XXL',
    category: 'Desk Gear',
    brand: 'AeroPulse',
    price: 39,
    originalPrice: 49,
    rating: 4,
    reviewsCount: 54,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 55,
    image: createProductSvg('AeroGlide XXL Deskpad', '#06b6d4', '#10b981', 'deskgear'),
    description: 'Lót chuột cỡ lớn 900x400x4mm dệt bằng sợi Cordura chống nước, bo viền siêu nhỏ chống sờn, đế cao su tự nhiên bám dính chắc chắn trên mọi mặt bàn.',
    specs: {
      Dimensions: '900 x 400 x 4 mm',
      Material: 'Vải quân sự Cordura chống thấm nước',
      Base: 'Đế cao su cao cấp chống trượt',
      Edge: 'Bo viền phẳng thấp chống cấn cổ tay'
    }
  },
  {
    id: '6',
    name: 'NovaForge Magnetic Hall Effect 60% Keyboard',
    category: 'Keyboard',
    brand: 'NovaForge',
    price: 159,
    originalPrice: 179,
    rating: 5,
    reviewsCount: 31,
    isHot: true,
    isNew: true,
    inStock: true,
    stock: 18,
    image: createProductSvg('NovaForge 60% Rapid', '#ec4899', '#f43f5e', 'keyboard'),
    description: 'Bàn phím cơ Hall Effect nam châm từ tính hỗ trợ Rapid Trigger 0.1mm siêu nhạy cho game thủ Valorant/CS2, hành trình kích hoạt tùy chỉnh từ 0.1mm đến 4.0mm.',
    specs: {
      Layout: '60% Minimalist (61 phím)',
      Switch: 'Magnetic Hall Effect Gateron KS-20',
      RapidTrigger: 'Hỗ trợ 0.1mm - 4.0mm với bước chỉnh 0.05mm',
      PollingRate: '8000Hz (0.125ms delay)',
      Case: 'Vỏ nhôm CNC anodized nguyên khối'
    }
  },
  {
    id: '7',
    name: 'ErgoPulse Vertical Wireless Ergonomic Mouse',
    category: 'Mouse',
    brand: 'VortexTech',
    price: 69,
    originalPrice: 79,
    rating: 4,
    reviewsCount: 22,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 28,
    image: createProductSvg('ErgoPulse Vertical', '#3b82f6', '#8b5cf6', 'mouse'),
    description: 'Chuột công thái học đứng góc nghiêng 57 độ chuẩn tự nhiên, giảm áp lực cổ tay cho người dùng văn phòng và lập trình viên làm việc nhiều giờ liền.',
    specs: {
      Angle: '57 độ nâng đỡ tự nhiên',
      Sensor: 'Optical 4000 DPI điều chỉnh 4 mức',
      Clicks: 'Nút bấm Silent Switches êm ái 90%',
      Connectivity: 'Bluetooth 5.0 + USB 2.4GHz Receiver',
      Battery: 'Pin sạc Type-C dùng liên tục 3 tháng'
    }
  },
  {
    id: '8',
    name: 'PulseMic USB Studio Broadcast Microphone',
    category: 'Desk Gear',
    brand: 'AcoustiGear',
    price: 119,
    originalPrice: 139,
    rating: 5,
    reviewsCount: 16,
    isHot: false,
    isNew: true,
    inStock: true,
    stock: 20,
    image: createProductSvg('PulseMic Studio', '#e11d48', '#fb7185', 'deskgear'),
    description: 'Microphone condenser cổng USB-C chuyên cho streamer và podcast, tích hợp cảm biến chạm tắt mic (tap-to-mute), vòng LED RGB động và shockmount kim loại.',
    specs: {
      Capsule: '3 x 14mm condenser capsules',
      PolarPatterns: 'Cardioid, Stereo, Omnidirectional, Bi-directional',
      BitDepth: '96kHz / 24-bit',
      Features: 'Gain control, Zero-latency headphone monitoring'
    }
  },
  {
    id: '9',
    name: 'LumixView 34" Curved WQHD Ultrawide Monitor',
    category: 'Monitor',
    brand: 'LumixView',
    price: 529,
    originalPrice: 599,
    rating: 5,
    reviewsCount: 12,
    isHot: true,
    isNew: false,
    inStock: false,
    stock: 0,
    image: createProductSvg('LumixView 34" Curved', '#6366f1', '#a855f7', 'monitor'),
    description: 'Màn hình cong tỉ lệ 21:9 WQHD (3440x1440) độ cong 1500R ôm trọn tầm nhìn, tần số quét 165Hz, cổng USB-C sạc 90W một dây tiện lợi cho laptop.',
    specs: {
      Size: '34 inch Ultrawide 21:9 (3440 x 1440)',
      Curvature: '1500R Immersion Curve',
      RefreshRate: '165Hz / 1ms MPRT',
      Ports: '2x HDMI 2.1, 1x DP 1.4, 1x USB-C 90W PD'
    }
  },
  {
    id: '10',
    name: 'Zenith Heavy Duty Gas-Spring Monitor Arm',
    category: 'Desk Gear',
    brand: 'NovaForge',
    price: 79,
    originalPrice: 95,
    rating: 4,
    reviewsCount: 45,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 35,
    image: createProductSvg('Zenith Monitor Arm', '#64748b', '#0ea5e9', 'deskgear'),
    description: 'Tay nâng màn hình piston trợ lực khí nén chịu tải trọng lên tới 15kg (hỗ trợ màn hình 17" - 49" siêu trường), hỗ trợ xoay 360 độ và đi dây ngầm thẩm mỹ.',
    specs: {
      Capacity: 'Chịu tải 2.5kg - 15kg',
      VESA: '75x75mm và 100x100mm',
      Motion: 'Nghiêng +90°/-45°, Xoay 180°, Quay 360°',
      Installation: 'Kẹp bàn (Clamp) hoặc bắt vít xuyên bàn (Grommet)'
    }
  },
  {
    id: '11',
    name: 'VortexCoil Aviator Custom Braided Keyboard Cable',
    category: 'Desk Gear',
    brand: 'VortexTech',
    price: 29,
    originalPrice: 35,
    rating: 5,
    reviewsCount: 68,
    isHot: false,
    isNew: false,
    inStock: true,
    stock: 80,
    image: createProductSvg('VortexCoil Cable', '#0284c7', '#38bdf8', 'deskgear'),
    description: 'Dây cáp xoắn nối rời chuyên dụng cho bàn phím cơ, đầu nối hàng không Aviator GX12 kim loại sáng bóng, bọc 2 lớp dù Paracord + lưới Techflex bền bỉ.',
    specs: {
      Connectors: 'USB-A to Type-C mạ vàng',
      Aviator: 'GX12 5-pin Detachable Connector',
      CoilLength: 'Phần xoắn 15cm, đường kính 20mm',
      TotalLength: 'Tổng chiều dài dây 1.5m'
    }
  },
  {
    id: '12',
    name: 'AcoustiGear Echo ANC True Wireless Earbuds',
    category: 'Headset',
    brand: 'AcoustiGear',
    price: 109,
    originalPrice: 129,
    rating: 4,
    reviewsCount: 27,
    isHot: false,
    isNew: true,
    inStock: true,
    stock: 30,
    image: createProductSvg('Echo ANC Earbuds', '#14b8a6', '#0f766e', 'headset'),
    description: 'Tai nghe TWS gaming độ trễ cực thấp 35ms (Game Mode), chống ồn chủ động Hybrid ANC 42dB, chuẩn kháng nước IPX5 và thời lượng pin 32 giờ kèm hộp sạc.',
    specs: {
      Latency: '35ms Ultra-low Game Mode',
      ANC: 'Chống ồn chủ động 42dB + Xuyên âm',
      Bluetooth: 'BT 5.4 hỗ trợ codec AAC/LDAC',
      Battery: '8h tai nghe + 24h dock sạc (Type-C & Sạc không dây)'
    }
  }
];
