
import os

input_path = r'd:\company\website\ApolloPT-website\APT_public\js\taper_bushing.js'
output_path = r'd:\company\website\ApolloPT-website\APT_public\js\taper_bushing-zh.js'

replacements = {
    "const DATA_URL = '/assets/products_taper_bushing.json';": "const DATA_URL = '/assets/products_taper_bushing_zh.json';",
    "Size: ${p.bush_size || ''}": "尺寸: ${p.bush_size || ''}",
    "Type ${p.type || ''}": "类型 ${p.type || ''}",
    "Max Bore: ${p.dbmax || ''} mm": "最大孔径: ${p.dbmax || ''} mm",
    "<div class=\"kv-name\">Material</div>": "<div class=\"kv-name\">材质</div>",
    "<div class=\"kv-name\">Surface Treatment</div>": "<div class=\"kv-name\">表面处理</div>",
    "<div class=\"kv-name\">Max Bore</div>": "<div class=\"kv-name\">最大孔径</div>",
    "<div class=\"kv-name\">Torque</div>": "<div class=\"kv-name\">扭矩</div>",
    "<div class=\"kv-name\">Weight</div>": "<div class=\"kv-name\">重量</div>",
    ">Quick View</button>": ">快速预览</button>",
    ">Details</a>": ">详情</a>",
    ">Add to Inquiry Cart</button>": ">加入询价车</button>",
    "${state.compare.has(p.id) ? 'Added' : 'Add to Compare'}": "${state.compare.has(p.id) ? '已加入' : '加入对比'}",
    "$('#apt-crumb').textContent = `Products / Taper Bushing / ${p.series || 'TB'} / ${p.bush_size || ''}`;": "$('#apt-crumb').textContent = `产品中心 / 锥套 / ${p.series || 'TB'} / ${p.bush_size || ''}`;",
    'products_taper_bushing.json': 'products_taper_bushing_zh.json',
    "<div class=\"kv-name\">Bushing Size</div>": "<div class=\"kv-name\">锥套尺寸</div>",
    "<div class=\"kv-name\">Type</div>": "<div class=\"kv-name\">类型</div>",
    "<div class=\"kv-name\">Max Bore (dbmax)</div>": "<div class=\"kv-name\">最大孔径 (dbmax)</div>",
    "<div class=\"kv-name\">Transmittable Torque</div>": "<div class=\"kv-name\">可传输扭矩</div>",
    "Inquiry cart is empty": "询价车为空",
    "0 items": "0 件商品",
    ">Remove</button>": ">移除</button>",
    "Copied to clipboard": "已复制到清单",
    "`Total <span class=\"emph-num\">${items.length}</span> products, qty <span class=\"emph-num\">${total}</span>`": "`共 <span class=\"emph-num\">${items.length}</span> 款产品，数量 <span class=\"emph-num\">${total}</span>`"
}

with open(input_path, 'r', encoding='utf-8') as f:
    content = f.read()

for old, new in replacements.items():
    content = content.replace(old, new)

# Special handling for "Type ${p.type}" which might be tricky with regex if spaces differ, 
# but simple replace should work if exact match.

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Created {output_path}")
