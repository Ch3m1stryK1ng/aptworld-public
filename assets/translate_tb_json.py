
import json
import os

input_path = r'd:\company\website\ApolloPT-website\APT_public\assets\products_taper_bushing.json'
output_path = r'd:\company\website\ApolloPT-website\APT_public\assets\products_taper_bushing_zh.json'

with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    # Translate Features
    if 'features' in item:
        new_features = []
        for feat in item['features']:
            if feat == "High precision manufacturing":
                new_features.append("高精度制造")
            elif feat == "Easy installation and removal":
                new_features.append("安装拆卸方便")
            elif feat == "Reliable power transmission":
                new_features.append("可靠的动力传输")
            else:
                new_features.append(feat)
        item['features'] = new_features

    # Translate Applications
    if 'applications' in item:
        new_apps = []
        for app in item['applications']:
            if app == "General machinery":
                new_apps.append("通用机械")
            elif app == "Conveyor systems":
                new_apps.append("输送系统")
            elif app == "Industrial equipment":
                new_apps.append("工业设备")
            else:
                new_apps.append(app)
        item['applications'] = new_apps

    # Translate Surface Treatment
    if 'surface_treatment' in item:
        if item['surface_treatment'] == "Phosphated":
            item['surface_treatment'] = "磷化"
        elif item['surface_treatment'] == "Black Oxide":
            item['surface_treatment'] = "发黑"

    # Translate Material (optional, maybe keep technical)
    # item['material'] is usually standard code

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Created {output_path}")
