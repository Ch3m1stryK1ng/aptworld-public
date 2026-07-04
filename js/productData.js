const productData = [
  {
    id: 1,
    name: 'V-Belt Pulley',
    description: 'European Standard V-Pulleys for Taper Bushes.',
    imageUrl: 'images/home/product/pulley-1.webp',
    image_webp: 'images/products/pulley-1.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>Models:</strong> SPA, SPB, SPC, SPZ<br><strong>Material:</strong> GG25 (HT250)<br><strong>Standard:</strong> ISO 4183 / DIN 2211<br><strong>Balance:</strong> G6.3 Static/Dynamic'
  },
  {
    id: 2,
    name: 'Timing Pulley',
    description: 'Synchronous drive pulleys for precise positioning.',
    imageUrl: 'images/home/product/pulley-2.webp',
    image_webp: 'images/home/product/pulley-2.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>Profiles:</strong> 3M, 5M, 8M, 14M; T2.5, T5, T10<br><strong>Material:</strong> Steel / Aluminum / Cast Iron<br><strong>Finish:</strong> Black Oxide / Anodized'
  },
  {
    id: 3,
    name: 'American Standard Pulley',
    description: 'AK/BK/TA/TB/QD series sheaves.',
    imageUrl: 'images/home/product/pulley-3.webp',
    image_webp: 'images/home/product/pulley-3.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>Series:</strong> AK, BK, 3V, 5V, 8V<br><strong>Bushing:</strong> QD / Split Taper<br><strong>Material:</strong> Cast Iron Gr.35<br><strong>Standard:</strong> ANSI/Muls'
  },
  {
    id: 4,
    name: 'Variable Speed Pulley',
    description: 'Adjustable speed drives for industrial machinery.',
    imageUrl: 'images/home/product/pulley-4.webp',
    image_webp: 'images/home/product/pulley-4.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>Type:</strong> Spring-loaded / Manual Adjust<br><strong>Power:</strong> Up to 50HP<br><strong>Material:</strong> Cast Iron / Aluminum'
  },
  {
    id: 5,
    name: 'Poly-V Pulley',
    description: 'Multi-ribbed pulleys for compact high-speed drives.',
    imageUrl: 'images/home/product/pulley-5.webp',
    image_webp: 'images/home/product/pulley-5.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>Sections:</strong> PJ, PK, PL, PM<br><strong>Material:</strong> GG25 / Steel<br><strong>Features:</strong> High power density'
  },
  {
    id: 6,
    name: 'Flywheel',
    description: 'Custom flywheels for crushers and heavy machinery.',
    imageUrl: 'images/home/product/pulley-6.webp',
    image_webp: 'images/home/product/pulley-6.webp',
    productUrl: 'subpage/products/pulley.html',
    isHot: true,
    details: '<strong>Weight:</strong> Up to 5,000 kg<br><strong>Diameter:</strong> Up to 1,500 mm<br><strong>Material:</strong> Ductile Iron / Cast steel'
  },
  {
    id: 7,
    name: 'Taper Lock Bushing',
    description: 'Pre-machined locking bush for quick mounting.',
    imageUrl: 'images/home/product/bushing-1.webp',
    image_webp: 'images/home/product/bushing-1.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>Sizes:</strong> 1008 - 5050<br><strong>Bore:</strong> 10mm - 125mm (Imperial available)<br><strong>Material:</strong> High-grade Cast Iron / Steel'
  },
  {
    id: 8,
    name: 'QD Bushing',
    description: 'Quick Detachable bushings for US standard sheaves.',
    imageUrl: 'images/home/product/bushing-2.webp',
    image_webp: 'images/home/product/bushing-2.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>Series:</strong> JA, SH, SDS, SD, SK, SF, E, F, J, M<br><strong>Installation:</strong> Flange mounting<br><strong>Material:</strong> Steel / Cast Iron'
  },
  {
    id: 9,
    name: 'Split Taper Bushing',
    description: 'Double split barrel for superior clamping force.',
    imageUrl: 'images/home/product/bushing-3.webp',
    image_webp: 'images/home/product/bushing-3.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>Series:</strong> G, H, P, Q, R, S, U, W<br><strong>Keyway:</strong> Standard ANSI<br><strong>Application:</strong> High torque drives'
  },
  {
    id: 10,
    name: 'Weld-on Hub',
    description: 'Steel hubs for welding onto fan rotors or pulleys.',
    imageUrl: 'images/home/product/bushing-4.webp',
    image_webp: 'images/home/product/bushing-4.webp',
    productUrl: 'subpage/products/taper_bushing.html',
    isHot: true,
    details: '<strong>Types:</strong> W / WH / WM<br><strong>Compatible Bush:</strong> Taper Lock<br><strong>Material:</strong> Low Carbon Steel (C20)'
  },
  {
    id: 11,
    name: 'Flexible Coupling',
    description: 'Torque transmission compensating for misalignment.',
    imageUrl: 'images/home/product/coupling.webp',
    image_webp: 'images/home/product/coupling.webp',
    productUrl: 'subpage/products/coupling.html',
    isHot: true,
    details: '<strong>Types:</strong> HRC, Jaw (L-Type), MH, NM<br><strong>Element:</strong> Nitrile Rubber / PU<br><strong>Material:</strong> Cast Iron / Aluminum'
  },
  {
    id: 12,
    name: 'Sprocket',
    description: 'Chain sprockets for industrial machinery.',
    imageUrl: 'images/home/product/sprocket-1.webp',
    image_webp: 'images/home/product/sprocket-1.webp',
    productUrl: 'subpage/products/sprocket.html',
    isHot: true,
    details: '<strong>Standards:</strong> DIN8187 (ISO) / ANSI<br><strong>Types:</strong> Plate / Hub / Taper Bore<br><strong>Material:</strong> C45 Steel (Teeth Hardened)'
  },
  {
    id: 13,
    name: 'Tyre Coupling',
    description: 'High elasticity coupling for shock absorption.',
    imageUrl: 'images/home/product/other-1.webp',
    image_webp: 'images/home/product/other-1.webp',
    productUrl: 'subpage/products/coupling.html',
    isHot: true,
    details: '<strong>Sizes:</strong> F40 - F250<br><strong>Misalignment:</strong> High angular/parallel<br><strong>Maintenance:</strong> No lubrication needed'
  },
  {
    id: 14,
    name: 'Motor Base',
    description: 'Adjustable motor slide bases.',
    imageUrl: 'images/home/product/other-2.webp',
    image_webp: 'images/home/product/other-2.webp',
    productUrl: 'subpage/products/other_products.html',
    isHot: true,
    details: '<strong>Adjustment:</strong> Sliding screw<br><strong>Material:</strong> Galvanized Steel<br><strong>Application:</strong> Belt tensioning'
  }
];