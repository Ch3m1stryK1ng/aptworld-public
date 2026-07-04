const productData = [
  {
    id: 1,
    name: 'V型皮带轮',
    description: '欧标V型皮带轮，配合锥套使用。',
    imageUrl: '../images/home/product/pulley-1.webp',
    image_webp: '../images/products/pulley-1.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>型号:</strong> SPA, SPB, SPC, SPZ<br><strong>材质:</strong> 灰铸铁 GG25 (HT250)<br><strong>标准:</strong> ISO 4183 / DIN 2211<br><strong>动平衡:</strong> G6.3 级静/动平衡'
  },
  {
    id: 2,
    name: '同步带轮',
    description: '用于精确传动与定位的同步轮。',
    imageUrl: '../images/home/product/pulley-2.webp',
    image_webp: '../images/home/product/pulley-2.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>齿型:</strong> 3M, 5M, 8M, 14M; T2.5, T5, T10<br><strong>材质:</strong> 钢 / 铝 / 铸铁<br><strong>表面处理:</strong> 发黑 / 阳极氧化'
  },
  {
    id: 3,
    name: '美标皮带轮',
    description: 'AK/BK/TA/TB/QD 系列皮带轮。',
    imageUrl: '../images/home/product/pulley-3.webp',
    image_webp: '../images/home/product/pulley-3.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>系列:</strong> AK, BK, 3V, 5V, 8V<br><strong>锥套:</strong> QD / 分离式<br><strong>材质:</strong> 铸铁 Gr.35<br><strong>标准:</strong> ANSI/Muls'
  },
  {
    id: 4,
    name: '无级变速轮',
    description: '用于工业机械的可调速传动装置。',
    imageUrl: '../images/home/product/pulley-4.webp',
    image_webp: '../images/home/product/pulley-4.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>类型:</strong> 弹簧加载 / 手动调节<br><strong>功率:</strong> 最高 50HP<br><strong>材质:</strong> 铸铁 / 铝'
  },
  {
    id: 5,
    name: '多楔带轮',
    description: '用于紧凑型高速传动的多楔轮。',
    imageUrl: '../images/home/product/pulley-5.webp',
    image_webp: '../images/home/product/pulley-5.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>截面:</strong> PJ, PK, PL, PM<br><strong>材质:</strong> GG25 / 钢<br><strong>特点:</strong> 高传动功率密度'
  },
  {
    id: 6,
    name: '飞轮',
    description: '破碎机及重型机械专用定制飞轮。',
    imageUrl: '../images/home/product/pulley-6.webp',
    image_webp: '../images/home/product/pulley-6.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>重量:</strong> 可达 5,000 kg<br><strong>直径:</strong> 可达 1,500 mm<br><strong>材质:</strong> 球墨铸铁 / 铸钢'
  },
  {
    id: 7,
    name: '锥套 (Taper Lock)',
    description: '预加工键槽，实现快速安装与拆卸。',
    imageUrl: '../images/home/product/bushing-1.webp',
    image_webp: '../images/home/product/bushing-1.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>尺寸:</strong> 1008 - 5050<br><strong>孔径:</strong> 10mm - 125mm (提供英制孔)<br><strong>材质:</strong> 优质铸铁 / 钢'
  },
  {
    id: 8,
    name: 'QD 锥套',
    description: '专为美标皮带轮设计的快速拆装锥套。',
    imageUrl: '../images/home/product/bushing-2.webp',
    image_webp: '../images/home/product/bushing-2.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>系列:</strong> JA, SH, SDS, SD, SK, SF, E, F, J, M<br><strong>安装:</strong> 法兰式安装<br><strong>材质:</strong> 钢 / 铸铁'
  },
  {
    id: 9,
    name: '分离式锥套 (Split Taper)',
    description: '双向开口设计，提供卓越的锁紧力。',
    imageUrl: '../images/home/product/bushing-3.webp',
    image_webp: '../images/home/product/bushing-3.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>系列:</strong> G, H, P, Q, R, S, U, W<br><strong>键槽:</strong> 标准 ANSI<br><strong>应用:</strong> 高扭矩传动'
  },
  {
    id: 10,
    name: '焊接套 (Weld-on Hub)',
    description: '用于焊接在风机转子或皮带轮上的钢制轮毂。',
    imageUrl: '../images/home/product/bushing-4.webp',
    image_webp: '../images/home/product/bushing-4.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>类型:</strong> W / WH / WM<br><strong>适配锥套:</strong> Taper Lock<br><strong>材质:</strong> 低碳钢 (C20)'
  },
  {
    id: 11,
    name: '弹性联轴器',
    description: '有效补偿轴向偏差并吸收震动。',
    imageUrl: '../images/home/product/coupling.webp',
    image_webp: '../images/home/product/coupling.webp',
    productUrl: 'subpage/products/coupling.html',
    isHot: true,
    details: '<strong>类型:</strong> HRC, Jaw (L型), MH, NM<br><strong>缓冲体:</strong> 丁腈橡胶 / 聚氨酯<br><strong>材质:</strong> 铸铁 / 铝'
  },
  {
    id: 12,
    name: '链轮',
    description: '用于各类工业机械传动的链轮。',
    imageUrl: '../images/home/product/sprocket-1.webp',
    image_webp: '../images/home/product/sprocket-1.webp',
    productUrl: 'subpage/products/sprocket.html',
    isHot: true,
    details: '<strong>标准:</strong> DIN8187 (ISO) / ANSI<br><strong>类型:</strong> 平片式 / 单毂 / 锥孔<br><strong>材质:</strong> 45#钢 (齿面高频淬火)'
  },
  {
    id: 13,
    name: '轮胎及蛇形联轴器',
    description: '高弹性、高减震性能的重型联轴器。',
    imageUrl: '../images/home/product/other-1.webp',
    image_webp: '../images/home/product/other-1.webp',
    productUrl: 'subpage/products/coupling.html',
    isHot: true,
    details: '<strong>尺寸:</strong> F40 - F250<br><strong>偏差补偿:</strong> 高角度/平行偏差<br><strong>维护:</strong> 免润滑'
  },
  {
    id: 14,
    name: '电机导轨',
    description: '用于电机安装与皮带张紧调节的底座。',
    imageUrl: '../images/home/product/other-2.webp',
    image_webp: '../images/home/product/other-2.webp',
    productUrl: 'subpage/products/motor_rail.html',
    isHot: true,
    details: '<strong>调节方式:</strong> 滑动螺杆<br><strong>材质:</strong> 镀锌钢<br><strong>应用:</strong> 便捷调整皮带张力'
  }
];

