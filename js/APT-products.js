const ALL = '__ALL__';

const APT = (() => {
  const DATA_URL = '/assets/products.json';
  const FALLBACK = [
    { id: 'p1', sku: 'VTP-SPB-315x4-TB2517', series: 'VTP', name: 'VTP 高速皮带轮 SPB 315/4', profile: 'SPB', grooves: 4, pitchDiameter: 315, material: 'Ductile Iron GGG40', coating: 'KTL/CDP', balancing: 'G2.5', bush: 'TB 2517', boreRange: '25–65 mm', weight: 12.4, features: ['高转速优化，降低带温', '球墨铸铁，强度与减重兼顾', '精密槽型，延长寿命'], applications: ['压缩机', '鼓风机', '机床'], coverImage: 'https://images.unsplash.com/photo-1556438064-2a6b9e2a5e0a?q=80&w=1200&auto=format&fit=crop', createdAt: '2025-08-10' },
    { id: 'p2', sku: 'STD-SPA-200x3-TB1610', series: 'STD', name: '标准 V 带轮 SPA 200/3', profile: 'SPA', grooves: 3, pitchDiameter: 200, material: 'Cast Iron HT250', coating: 'Phosphate/Black Oxide', balancing: 'G6.3', bush: 'TB 1610', boreRange: '14–42 mm', weight: 8.1, features: ['ISO 槽型', '通用互换，经济型'], applications: ['输送机', '风机', '通用机械'], coverImage: 'https://images.unsplash.com/photo-1581092585026-8c14bbce01df?q=80&w=1200&auto=format&fit=crop', createdAt: '2025-07-18' },
    { id: 'p3', sku: 'AL-SPZ-90x2-TB1008', series: 'STD', name: '轻量化皮带轮 SPZ 90/2', profile: 'SPZ', grooves: 2, pitchDiameter: 90, material: 'Aluminum 6061', coating: 'Painted', balancing: 'G6.3', bush: 'TB 1008', boreRange: '9–25 mm', weight: 1.2, features: ['低转动惯量，加速敏捷', '耐腐涂装'], applications: ['自动化', '包装设备'], coverImage: 'https://images.unsplash.com/photo-1596495578065-8fe885b9d208?q=80&w=1200&auto=format&fit=crop', createdAt: '2025-06-02' },
    { id: 'p4', sku: 'HI-SPC-630x8-TB3525', series: 'STD', name: '重载皮带轮 SPC 630/8', profile: 'SPC', grooves: 8, pitchDiameter: 630, material: 'Steel C45', coating: 'None', balancing: 'G2.5', bush: 'TB 3525', boreRange: '40–95 mm', weight: 45.3, features: ['高功率传递', '精细动平衡，运行更稳'], applications: ['矿山', '造纸化工'], coverImage: 'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=1200&auto=format&fit=crop', createdAt: '2025-08-30' },
    { id: 'p5', sku: 'STD-SPB-250x5-QD-SF', series: 'STD', name: 'QD 锥套皮带轮 SPB 250/5 (SF)', profile: 'SPB', grooves: 5, pitchDiameter: 250, material: 'Cast Iron HT250', coating: 'Phosphate/Black Oxide', balancing: 'G6.3', bush: 'QD SF', boreRange: '1" – 2-3/4"', weight: 18.7, features: ['QD 通用互换', '性价比优'], applications: ['农机', 'HVAC'], coverImage: 'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef37?q=80&w=1200&auto=format&fit=crop', createdAt: '2025-05-20' },
  ];
  const $ = (s, r = document) => r.querySelector(s);
  const fmtKg = (n) => `${n.toFixed(1)} kg`;
  const qs = new URLSearchParams(location.search);
  const skuParam = qs.get('sku') || '';

  const state = {
    data: [], q: '',
    profile: [], grooves: [], dia: [], mat: [], coat: [], bal: [], bush: [],
    sort: 'sku_desc',
    mode: localStorage.getItem('apt-viewMode') || 'grid', cart: loadCart()
  };
  let isClearing = false;

  // init
  (async function init() {
    try { const res = await fetch(DATA_URL, { cache: 'no-store' }); state.data = await res.json(); }
    catch (e) { console.warn('读取 products.json 失败，使用演示数据', e); state.data = FALLBACK; }
    hydrateFromURL();
    bind();
    if (skuParam) renderDetail(skuParam); else renderList();
    applyMode();
    updateCartBadge();
  })();

  function hydrateFromURL() {
    const p = new URLSearchParams(location.search);
    const parseList = s => s ? s.split(',').filter(Boolean) : [];
    state.q = p.get('q') || '';

    // state.profile = p.get('profile') || ''; 
    // state.grooves = p.get('grooves') || '';
    // state.dia = p.get('dia') || ''; 
    // state.mat = p.get('mat') || ''; 
    // state.coat = p.get('coat') || ''; 
    // state.bal = p.get('bal') || ''; 
    // state.bush = p.get('bush') || '';
    state.profile = parseList(p.get('profile'));
    state.grooves = parseList(p.get('grooves'));
    state.dia = parseList(p.get('dia'));
    state.mat = parseList(p.get('mat'));
    state.coat = parseList(p.get('coat'));
    state.bal = parseList(p.get('bal'));
    state.bush = parseList(p.get('bush'));

    state.sort = p.get('sort') || 'sku_desc';

    $('#apt-q').value = state.q; $('#apt-sort').value = state.sort;
    // ['profile', 'grooves', 'dia', 'mat', 'coat', 'bal', 'bush'].forEach(k => {
    //   const el = document.getElementById('f-' + k); if (el) el.value = state[k];
    // });
  }

  function writeURL() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    ['profile', 'grooves', 'dia', 'mat', 'coat', 'bal', 'bush'].forEach(k => {
      if (Array.isArray(state[k]) && state[k].length) p.set(k, state[k].join(','));
    });
    if (state.sort !== 'relevance') p.set('sort', state.sort);
    history.replaceState(null, '', '?' + p.toString());
  }

  // function applyFilters(rows) {
  //   rows = rows.slice();
  //   const needle = state.q.trim().toLowerCase();
  //   if (needle) { rows = rows.filter(p => (p.name + ' ' + p.sku + ' ' + p.profile + ' ' + p.material + ' ' + p.bush).toLowerCase().includes(needle)); }
  //   if (state.profile) rows = rows.filter(p => p.profile === state.profile);
  //   if (state.grooves) rows = rows.filter(p => String(p.grooves) === state.grooves);
  //   if (state.dia) { const [a, b] = state.dia.split('-').map(Number); rows = rows.filter(p => p.pitchDiameter >= a && p.pitchDiameter <= b); }
  //   if (state.mat) rows = rows.filter(p => p.material === state.mat);
  //   if (state.coat) rows = rows.filter(p => p.coating === state.coat);
  //   if (state.bal) rows = rows.filter(p => p.balancing === state.bal);
  //   if (state.bush) rows = rows.filter(p => p.bush === state.bush);

  //   switch (state.sort) {
  //     case 'dia_asc': rows.sort((a, b) => a.pitchDiameter - b.pitchDiameter); break;
  //     case 'dia_desc': rows.sort((a, b) => b.pitchDiameter - a.pitchDiameter); break;
  //     case 'new': rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
  //     case 'name_asc': rows.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
  //     case 'name_desc': rows.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break;
  //     case 'sku_asc': rows.sort((a, b) => (a.sku || '').localeCompare(b.sku || '')); break;
  //     case 'sku_desc': rows.sort((a, b) => (b.sku || '').localeCompare(a.sku || '')); break;
  //     default: rows.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0));
  //   }
  //   return rows;
  // }
  // function applyFilters(rows) {
  //   rows = rows.slice();
  //   const needle = state.q.trim().toLowerCase();
  //   if (needle) {
  //     rows = rows.filter(p => (p.name + ' ' + p.sku + ' ' + p.profile + ' ' + p.material + ' ' + p.bush).toLowerCase().includes(needle));
  //   }

  //   // 同类筛选：OR；不同筛选：AND
  //   const has = arr => Array.isArray(arr) && arr.length > 0;

  //   if (has(state.profile)) rows = rows.filter(p => state.profile.includes(p.profile));
  //   if (has(state.grooves)) rows = rows.filter(p => state.grooves.includes(String(p.grooves)));
  //   if (has(state.dia)) {
  //     rows = rows.filter(p => state.dia.some(r => {
  //       const [a, b] = r.split('-').map(Number);
  //       return p.pitchDiameter >= a && p.pitchDiameter <= b;
  //     }));
  //   }
  //   if (has(state.mat)) rows = rows.filter(p => state.mat.includes(p.material));
  //   if (has(state.coat)) rows = rows.filter(p => state.coat.includes(p.coating));
  //   if (has(state.bal)) rows = rows.filter(p => state.bal.includes(p.balancing));
  //   if (has(state.bush)) rows = rows.filter(p => state.bush.includes(p.bush));

  //   // 下面的排序保持你的原样...
  //   switch (state.sort) {
  //     case 'dia_asc': rows.sort((a, b) => a.pitchDiameter - b.pitchDiameter); break;
  //     case 'dia_desc': rows.sort((a, b) => b.pitchDiameter - a.pitchDiameter); break;
  //     case 'new': rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
  //     case 'name_asc': rows.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
  //     case 'name_desc': rows.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break;
  //     case 'sku_asc': rows.sort((a, b) => (a.sku || '').localeCompare(b.sku || '')); break;
  //     case 'sku_desc': rows.sort((a, b) => (b.sku || '').localeCompare(a.sku || '')); break;
  //     default: rows.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0));
  //   }
  //   return rows;
  // }

  function applyFilters(rows) {
    rows = rows.slice();
    const needle = state.q.trim().toLowerCase();

    const DEBUG_MODE = false;
    if (DEBUG_MODE) console.log('--- 筛选开始 ---', { state });

    if (needle) {
      rows = rows.filter(p =>
        (p.name + ' ' + p.sku + ' ' + p.profile + ' ' + p.material + ' ' + p.bush)
          .toLowerCase().includes(needle)
      );
    }

    const has = arr => Array.isArray(arr) && arr.length > 0;

    const runFilter = (key, dataKey, isString = false) => {
      if (has(state[key])) {
        const originalCount = rows.length;
        rows = rows.filter(p => {
          const productValue = isString ? String(p[dataKey]) : p[dataKey];
          return state[key].includes(productValue);
        });
        if (DEBUG_MODE) console.log(`Filter by ${key}: [${state[key].join(', ')}]`, `(${originalCount} -> ${rows.length} rows)`);
      }
    };

    runFilter('profile', 'profile');
    runFilter('grooves', 'grooves', true); // grooves 在数据中是数字，需要转为字符串匹配
    runFilter('mat', 'material');
    runFilter('coat', 'coating');
    runFilter('bal', 'balancing');
    runFilter('bush', 'bush');

    if (has(state.dia)) {
      const originalCount = rows.length;
      rows = rows.filter(p => state.dia.some(r => {
        const [a, b] = r.split('-').map(Number);
        return p.pitchDiameter >= a && p.pitchDiameter <= b;
      }));
      if (DEBUG_MODE) console.log(`Filter by dia: [${state.dia.join(', ')}]`, `(${originalCount} -> ${rows.length} rows)`);
    }

    // 排序逻辑保持不变
    switch (state.sort) {
      case 'dia_asc': rows.sort((a, b) => a.pitchDiameter - b.pitchDiameter); break;
      case 'dia_desc': rows.sort((a, b) => b.pitchDiameter - a.pitchDiameter); break;
      case 'new': rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
      case 'name_asc': rows.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
      case 'name_desc': rows.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break;
      case 'sku_asc': rows.sort((a, b) => (a.sku || '').localeCompare(b.sku || '')); break;
      case 'sku_desc': rows.sort((a, b) => (b.sku || '').localeCompare(a.sku || '')); break;
      default: rows.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0));
    }

    if (DEBUG_MODE) console.log('--- 筛选结束 ---', `${rows.length} rows returned.`);
    return rows;
  }

  function renderList() {
    document.getElementById('apt-detail').style.display = 'none';
    const rows = applyFilters(state.data);
    document.getElementById('apt-count').textContent = rows.length;
    const grid = document.getElementById('apt-grid');
    grid.innerHTML = rows.map(p => cardHTML(p)).join('');
    writeURL();
  }

  function cardHTML(p) {
    const key = 'apt-qty-' + p.id;
    return `
        <div class="product card">
          <div class="thumb"><img src="${p.coverImage}" alt="${p.name}"></div>
          <div class="p-body">
            <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
              <div>
                <div style="font-weight:600">${p.name}</div>
                <div class="muted" style="font-size:12px">${p.sku}</div>
              </div>
              ${p.series ? `<span class="badge" title="系列">${p.series}</span>` : ''}
            </div>
            <div class="row" style="margin-top:6px">
              <span class="badge">${p.profile}</span>
              <span class="badge">${p.grooves} 槽</span>
              <span class="badge">⌀ ${p.pitchDiameter} mm</span>
              <span class="badge">${p.balancing}</span>
            </div>
            <div class="kv">
              <div>材质</div><div>${p.material}</div>
              <div>涂层</div><div>${p.coating}</div>
              <div>孔径范围</div><div>${p.boreRange}</div>
              <div>重量</div><div>${fmtKg(p.weight)}</div>
            </div>
            <div class="row" style="margin-top:10px;align-items:center">
              <div class="qty">
                <button onclick="APT.stepQty('#${key}',-1)">−</button>
                <input id="${key}" type="number" min="1" value="1" />
                <button onclick="APT.stepQty('#${key}',1)">＋</button>
              </div>
              <button class="btn sm" onclick="APT.openModal('${p.id}')">快速查看</button>
              <button class="btn sm" onclick="APT.addToCart('${p.id}', document.querySelector('#${key}').value)">加入询价车</button>
              <a class="btn sm" href="pulley.html?sku=${encodeURIComponent(p.sku)}">详情</a>
            </div>
          </div>
        </div>`;
  }

  function renderDetail(sku) {
    const p = state.data.find(x => x.sku === sku); if (!p) { renderList(); return; }
    document.getElementById('apt-grid').innerHTML = '';
    document.getElementById('apt-detail').style.display = 'block';
    document.getElementById('apt-crumb').textContent = `Products / Pulleys / ${p.series || 'STD'} / ${p.profile}`;
    document.getElementById('apt-dImg').src = p.images?.[0] || p.coverImage;
    document.getElementById('apt-dName').textContent = p.name; document.title = p.name + ' | Products';
    document.getElementById('apt-dSku').textContent = p.sku;
    document.getElementById('apt-dProfile').textContent = p.profile;
    document.getElementById('apt-dGrooves').textContent = p.grooves + ' 槽';
    document.getElementById('apt-dDia').textContent = '⌀ ' + p.pitchDiameter + ' mm';
    document.getElementById('apt-dBal').textContent = p.balancing;
    document.getElementById('apt-dSeries').textContent = p.series ? ('系列：' + p.series) : '';
    document.getElementById('apt-dMat').textContent = p.material;
    document.getElementById('apt-dCoat').textContent = p.coating;
    document.getElementById('apt-dBush').textContent = p.bush;
    document.getElementById('apt-dBore').textContent = p.boreRange;
    document.getElementById('apt-dWt').textContent = fmtKg(p.weight);
    const ul = document.getElementById('apt-dFeat'); ul.innerHTML = '';
    [...(p.features || []), ...(p.applications || [])].forEach(t => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
    document.getElementById('apt-dAdd').onclick = () => { const q = Math.max(1, parseInt(document.getElementById('apt-dQty').value || '1')); addToCart(p.id, q); };
  }

  // modal
  function openModal(id) {
    const p = state.data.find(x => x.id === id); if (!p) return;
    document.getElementById('apt-mvTitle').textContent = p.name;
    document.getElementById('apt-mvImg').src = p.images?.[0] || p.coverImage;
    document.getElementById('apt-mvSku').textContent = p.sku;
    document.getElementById('apt-mvProfile').textContent = p.profile;
    document.getElementById('apt-mvGrooves').textContent = p.grooves + ' 槽';
    document.getElementById('apt-mvDia').textContent = '⌀ ' + p.pitchDiameter + ' mm';
    document.getElementById('apt-mvBal').textContent = p.balancing;
    document.getElementById('apt-mvMat').textContent = p.material;
    document.getElementById('apt-mvCoat').textContent = p.coating;
    document.getElementById('apt-mvBush').textContent = p.bush;
    document.getElementById('apt-mvBore').textContent = p.boreRange;
    document.getElementById('apt-mvWt').textContent = fmtKg(p.weight);
    const ul = document.getElementById('apt-mvFeat'); ul.innerHTML = '';
    [...(p.features || []), ...(p.applications || [])].forEach(t => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
    document.getElementById('apt-detailBtn').href = 'pulley.html?sku=' + encodeURIComponent(p.sku);
    document.getElementById('apt-mvAdd').onclick = () => { const q = Math.max(1, parseInt(document.getElementById('apt-mvQty').value || '1')); addToCart(p.id, q); };
    document.getElementById('apt-overlay').classList.add('open');
  }
  function closeModal() { document.getElementById('apt-overlay').classList.remove('open'); }

  // cart
  function loadCart() { try { return JSON.parse(localStorage.getItem('apt-quoteCart') || '{}'); } catch { return {}; } }
  function saveCart() { localStorage.setItem('apt-quoteCart', JSON.stringify(state.cart)); }
  function updateCartBadge() {
    const total = Object.values(state.cart).reduce((n, it) => n + (it.qty || 0), 0);
    const badge = document.getElementById('apt-cartCount');
    if (total > 0) { badge.style.display = 'inline-block'; badge.textContent = total; } else { badge.style.display = 'none'; }
  }
  function addToCart(id, qty) {
    const p = state.data.find(x => x.id === id); if (!p) return;
    qty = Math.max(1, parseInt(qty || '1'));
    const key = p.sku; const exists = state.cart[key];
    state.cart[key] = { sku: p.sku, name: p.name, qty: (exists ? exists.qty : 0) + qty, cover: p.coverImage };
    saveCart(); updateCartBadge(); openCart(); renderCart();
  }
  function removeFromCart(sku) { delete state.cart[sku]; saveCart(); renderCart(); updateCartBadge(); }
  function changeQty(sku, delta) { const it = state.cart[sku]; if (!it) return; it.qty = Math.max(1, (it.qty || 1) + delta); saveCart(); renderCart(); updateCartBadge(); }

  function renderCart() {
    const list = document.getElementById('apt-cartList');
    const items = Object.values(state.cart);
    if (items.length === 0) { list.innerHTML = '<div class="muted" style="padding:12px">询价车为空</div>'; document.getElementById('apt-cartSummary').textContent = '共 0 个条目'; return; }
    list.innerHTML = items.map(it => `
          <div class="cart-item">
            <img src="${it.cover || ''}" alt="${it.sku}">
            <div>
              <div style="font-weight:600">${it.name}</div>
              <div class="muted" style="font-size:12px">${it.sku}</div>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button class="btn sm" onclick="APT.changeQty('${it.sku}',-1)">−</button>
              <span>${it.qty}</span>
              <button class="btn sm" onclick="APT.changeQty('${it.sku}',1)">＋</button>
              <button class="btn sm" onclick="APT.removeFromCart('${it.sku}')">移除</button>
            </div>
          </div>
        `).join('');
    const total = items.reduce((n, it) => n + (it.qty || 0), 0);
    document.getElementById('apt-cartSummary').textContent = `共 ${items.length} 个产品，合计数量 ${total}`;
  }
  function openCart() { document.getElementById('apt-cart').classList.add('open'); }
  function closeCart() { document.getElementById('apt-cart').classList.remove('open'); }

  function stepQty(sel, delta) { const el = document.querySelector(sel); const v = Math.max(1, parseInt(el.value || '1') + delta); el.value = v; }

  function bind() {
    document.getElementById('apt-q').addEventListener('input', e => { state.q = e.target.value; skuParam ? renderDetail(skuParam) : renderList(); });
    document.getElementById('apt-sort').addEventListener('change', e => { state.sort = e.target.value; renderList(); });
    // dropdown filters
    // document.getElementById('f-profile').addEventListener('change', e => { state.profile = e.target.value; renderList(); });
    // document.getElementById('f-grooves').addEventListener('change', e => { state.grooves = e.target.value; renderList(); });
    // document.getElementById('f-dia').addEventListener('change', e => { state.dia = e.target.value; renderList(); });
    // document.getElementById('f-mat').addEventListener('change', e => { state.mat = e.target.value; renderList(); });
    // document.getElementById('f-coat').addEventListener('change', e => { state.coat = e.target.value; renderList(); });
    // document.getElementById('f-bal').addEventListener('change', e => { state.bal = e.target.value; renderList(); });
    // document.getElementById('f-bush').addEventListener('change', e => { state.bush = e.target.value; renderList(); });
    function syncStateFromUI() {
      const ids = ['profile', 'grooves', 'dia', 'mat', 'coat', 'bal', 'bush'];
      ids.forEach(k => {
        state[k] = (function (id) {
          const el = document.getElementById(id);
          if (!el) return [];
          if (el.tomselect) {
            const raw = el.tomselect.getValue();
            const arr = Array.isArray(raw) ? raw : (raw ? [raw] : []);
            return arr.filter(v => v && v !== ALL);
          }
          const arr = Array.from(el.selectedOptions).map(o => o.value);
          return arr.filter(v => v && v !== ALL);
        })('f-' + k);
      });
    }

    function readTS(id) {
      const el = document.getElementById(id);
      if (!el) return [];
      const ts = el.tomselect;
      const raw = ts ? ts.getValue() : Array.from(el.selectedOptions).map(o => o.value);
      const vals = Array.isArray(raw) ? raw : (raw ? [raw] : []);
      return vals.filter(v => v && v !== ALL);
    }
    // document.getElementById('f-profile').addEventListener('change', () => { state.profile = readTS('f-profile'); renderList(); });
    // document.getElementById('f-grooves').addEventListener('change', () => { state.grooves = readTS('f-grooves'); renderList(); });
    // document.getElementById('f-dia').addEventListener('change', () => { state.dia = readTS('f-dia'); renderList(); });
    // document.getElementById('f-mat').addEventListener('change', () => { state.mat = readTS('f-mat'); renderList(); });
    // document.getElementById('f-coat').addEventListener('change', () => { state.coat = readTS('f-coat'); renderList(); });
    // document.getElementById('f-bal').addEventListener('change', () => { state.bal = readTS('f-bal'); renderList(); });
    // document.getElementById('f-bush').addEventListener('change', () => { state.bush = readTS('f-bush'); renderList(); });
    function setupFilterListener(key, elementId) {
      document.getElementById(elementId).addEventListener('change', () => {
        if (isClearing) return; // 如果正在清除，则忽略此次 change 事件
        state[key] = readTS(elementId);
        renderList();
      });
    }

    setupFilterListener('profile', 'f-profile');
    setupFilterListener('grooves', 'f-grooves');
    setupFilterListener('dia', 'f-dia');
    setupFilterListener('mat', 'f-mat');
    setupFilterListener('coat', 'f-coat');
    setupFilterListener('bal', 'f-bal');
    setupFilterListener('bush', 'f-bush');

    // document.getElementById('apt-clear').addEventListener('click', () => {
    //   Object.assign(state, { ...state, q: '', profile: '', grooves: '', dia: '', mat: '', coat: '', bal: '', bush: '', sort: 'sku_desc' });
    //   document.getElementById('apt-q').value = ''; document.getElementById('apt-sort').value = 'sku_desc';
    //   ['profile', 'grooves', 'dia', 'mat', 'coat', 'bal', 'bush'].forEach(k => { const el = document.getElementById('f-' + k); if (el) el.value = ''; });
    //   renderList();
    // });
    document.getElementById('apt-clear').addEventListener('click', () => {
      isClearing = true;
      try {
        // 1) 重置内部状态
        Object.assign(state, {
          ...state,
          q: '',
          profile: [], grooves: [], dia: [], mat: [], coat: [], bal: [], bush: [],
          sort: 'sku_desc'
        });

        // 2) 重置 UI
        document.getElementById('apt-q').value = '';
        const sortSelect = document.getElementById('apt-sort');
        if (sortSelect.tomselect) {
          sortSelect.tomselect.setValue('sku_desc', true); // 静默
        } else {
          sortSelect.value = 'sku_desc';
        }
        const ids = ['profile', 'grooves', 'dia', 'mat', 'coat', 'bal', 'bush'];
        ids.forEach(k => {
          const el = document.getElementById('f-' + k);
          if (el && el.tomselect) {
            el.tomselect.setValue([ALL], true); // 静默改成 All
          } else if (el) {
            el.value = ALL; // 兜底
          }
        });

        // 3) **关键：再从 UI 回读一次，确保 state 与 UI 完全一致**
        syncStateFromUI();

        // 4) 渲染一次（会同时刷新 URL）
        renderList();

      } finally {
        isClearing = false;
        const clearBtn = document.getElementById('apt-clear');
        if (clearBtn) clearBtn.disabled = true;
        if (window.updateClearState) window.updateClearState();
      }
    });

    function setView(mode) { state.mode = mode; localStorage.setItem('apt-viewMode', mode); applyMode(); }
    document.getElementById('apt-viewGrid').addEventListener('click', () => setView('grid'));
    document.getElementById('apt-viewList').addEventListener('click', () => setView('list'));

    document.getElementById('apt-openCart').addEventListener('click', () => { renderCart(); openCart(); });
    document.getElementById('apt-closeCart').addEventListener('click', closeCart);
    document.getElementById('apt-clearCart').addEventListener('click', () => { state.cart = {}; saveCart(); renderCart(); updateCartBadge(); });
    document.getElementById('apt-copy').addEventListener('click', () => {
      const items = Object.values(state.cart);
      const text = items.map(it => `${it.sku} x ${it.qty}`).join('\n');
      navigator.clipboard.writeText(text).then(() => alert('已复制到剪贴板'));
    });
    document.getElementById('apt-submitQuote').addEventListener('click', () => {
      const items = Object.values(state.cart);
      if (items.length === 0) { alert('询价车为空'); return; }
      const payload = encodeURIComponent(JSON.stringify(items));
      location.href = `../contact_us/contact_us.html?cart=${payload}`;
    });

    document.getElementById('apt-overlay').addEventListener('click', (e) => { if (e.target.id === 'apt-overlay') closeModal(); });
  }

  function applyMode() {
    document.body.classList.toggle('mode-list', state.mode === 'list');
    document.getElementById('apt-viewGrid').classList.toggle('active', state.mode === 'grid');
    document.getElementById('apt-viewList').classList.toggle('active', state.mode === 'list');
  }

  // public
  return { openModal, closeModal, addToCart, changeQty, removeFromCart, stepQty };
})();

document.addEventListener("DOMContentLoaded", function () {
  new TomSelect('#search-list', {
    placeholder: 'All Products',
    allowEmptyOption: true,
    controlInput: null,
    create: false,
    sortField: {
      field: "text",
      direction: "asc"
    }
  });
  new TomSelect('#apt-sort', {
    controlInput: null,

    render: {
      /**
       * 自定义下拉列表中每个选项的渲染方式
       * @param {object} data - 包含选项信息的对象, e.g., {text: 'Name: A→Z', value: 'name_asc'}
       * @param {function} escape - 用于转义 HTML 的函数
       * @returns {string} - 返回最终要显示的 HTML 字符串
       */
      option: function (data, escape) {
        const originalText = escape(data.text);
        const modifiedText = originalText.replace('→', '<span class="sort-arrow">→</span>');
        return `<div>${modifiedText}</div>`;
      }
    }
  });

  const filterSelects = document.querySelectorAll('.apt-filter-row .apt-select select');
  const tsMap = new Map();

  filterSelects.forEach(selectEl => {
    let optAll = selectEl.querySelector(`option[value="${ALL}"]`);
    if (!optAll) {
      const existedEmpty = selectEl.querySelector('option[value=""]');
      if (existedEmpty) {
        existedEmpty.value = ALL;
        existedEmpty.textContent = existedEmpty.textContent || 'All';
        optAll = existedEmpty;
      } else {
        const o = document.createElement('option');
        o.value = ALL;
        o.textContent = 'All';
        selectEl.insertBefore(o, selectEl.firstChild);
        optAll = o;
      }
    }

    selectEl.setAttribute('multiple', 'multiple');

    const ts = new TomSelect(selectEl, {
      maxItems: null,
      allowEmptyOption: true,
      placeholder: 'All',
      plugins: ['remove_button'],
      controlInput: null,
      hideSelected: false,
      closeAfterSelect: false,
      create: false,
      render: {
        option: (data, escape) => {
          const isAll = (data.value ?? '') === ALL;
          const check = isAll ? '' : `<span class="ts-checkviz"></span>`;
          return `<div class="option ${isAll ? 'is-all' : ''}" data-value="${escape(data.value ?? '')}">
                  ${check}<span>${escape(data.text)}</span>
                </div>`;
        }
      }
    });

    // ['profile', 'grooves', 'dia', 'mat', 'coat', 'bal', 'bush'].forEach(k => {
    //   const el = document.getElementById('f-' + k);
    //   if (!el || !el.tomselect) return;
    //   const vals = (state[k] && state[k].length) ? state[k] : [ALL];
    //   el.tomselect.setValue(vals, true);
    // });

    ts.clear(true);
    ts.setValue([ALL], true)

    ts.on('dropdown_open', () => {
      const onlyAll = (ts.getValue().length === 1 && ts.getValue()[0] === ALL);
      const opt = ts.dropdown_content?.querySelector(`.option.is-all`);
      if (opt) opt.classList.toggle('disabled', !!onlyAll);
    });

    ts.on('item_add', (val) => {
      if (val === ALL) ts.setValue([ALL], true);
      else ts.removeItem(ALL, true);
      ts.refreshOptions(false);
      updateClearState();
      // dispatchFilterChange(selectEl);
    });

    ts.on('item_remove', () => {
      if (ts.getValue().length === 0) ts.setValue([ALL], true);
      ts.refreshOptions(false);
      updateClearState();
      // dispatchFilterChange(selectEl);
    });

    ts.on('clear', () => {
      ts.setValue([ALL], true);
      ts.refreshOptions(false);
      updateClearState();
      // dispatchFilterChange(selectEl);
    });

    tsMap.set(selectEl.id || selectEl.name || Math.random().toString(36).slice(2), ts);
  });

  function dispatchFilterChange(el) {
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const clearBtn = document.getElementById('apt-clear');

  function hasActiveFilters() {
    for (const ts of tsMap.values()) {
      const value = ts.getValue();
      if ((value.length > 1 || (value.length === 1 && value[0] !== ALL))) {
        return true;
      }
    }
    return false;
  }

  function updateClearState() {
    if (clearBtn) {
      clearBtn.disabled = !hasActiveFilters();
    }
  }

  filterSelects.forEach(el => {
    el.addEventListener('change', updateClearState);
  });
  updateClearState();

  window.updateClearState = updateClearState;

  // if (clearBtn) {
  //   clearBtn.addEventListener('click', () => {
  //     if (clearBtn.disabled) return;
  //     for (const ts of tsMap.values()) {
  //       ts.setValue([ALL], true);
  //     }
  //     Object.assign(state, {
  //       profile: [],
  //       grooves: [],
  //       dia: [],
  //       mat: [],
  //       coat: [],
  //       bal: [],
  //       bush: []
  //     });
  //     renderList();
  //     updateClearState();
  //   });
  // }

});