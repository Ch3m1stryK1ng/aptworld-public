const ALL = '__ALL__';

const APT = (() => {
    const DATA_URL = '/assets/products_taper_bushing.json';
    // FALLBACK data will be embedded by embed_taper_bushing_data.py script
    const FALLBACK = [
  {
    "id": "tb-001",
    "sku": "TB-1008",
    "name": "Taper Bushing 1008",
    "series": "TB",
    "type": "1",
    "bush_size": "1008",
    "dimension_A": 35.2,
    "dimension_B": 22.3,
    "dimension_D": 33.73,
    "dbmax": 25.0,
    "screw_size": "1/4\" x 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 1.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.11,
    "torque_with_key": 4.8,
    "torque_without_key": 5.6,
    "transmittable_torque": 136.0,
    "coverImage": "../../images/products/taper_bushing/tb1-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb1-1.webp",
      "../../images/products/taper_bushing/tb1-2.webp",
      "../../images/products/taper_bushing/tb1-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-002",
    "sku": "TB-1108",
    "name": "Taper Bushing 1108",
    "series": "TB",
    "type": "1",
    "bush_size": "1108",
    "dimension_A": 38.38,
    "dimension_B": 22.3,
    "dimension_D": 36.92,
    "dbmax": 28.0,
    "screw_size": "1/4\" x 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.11,
    "torque_with_key": 4.8,
    "torque_without_key": 5.6,
    "transmittable_torque": 147.0,
    "coverImage": "../../images/products/taper_bushing/tb2-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb2-1.webp",
      "../../images/products/taper_bushing/tb2-2.webp",
      "../../images/products/taper_bushing/tb2-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-003",
    "sku": "TB-1210",
    "name": "Taper Bushing 1210",
    "series": "TB",
    "type": "1",
    "bush_size": "1210",
    "dimension_A": 47.62,
    "dimension_B": 25.4,
    "dimension_D": 44.44,
    "dbmax": 32.0,
    "screw_size": "3/8\" x 5/8\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.22,
    "torque_with_key": 17.0,
    "torque_without_key": 20.0,
    "transmittable_torque": 407.0,
    "coverImage": "../../images/products/taper_bushing/tb3-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb3-1.webp",
      "../../images/products/taper_bushing/tb3-2.webp",
      "../../images/products/taper_bushing/tb3-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-004",
    "sku": "TB-1215",
    "name": "Taper Bushing 1215",
    "series": "TB",
    "type": "1",
    "bush_size": "1215",
    "dimension_A": 47.62,
    "dimension_B": 38.1,
    "dimension_D": 44.44,
    "dbmax": 32.0,
    "screw_size": "3/8\" x 5/8\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.33,
    "torque_with_key": 17.0,
    "torque_without_key": 20.0,
    "transmittable_torque": 407.0,
    "coverImage": "../../images/products/taper_bushing/tb4-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb4-1.webp",
      "../../images/products/taper_bushing/tb4-2.webp",
      "../../images/products/taper_bushing/tb4-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-005",
    "sku": "TB-1310",
    "name": "Taper Bushing 1310",
    "series": "TB",
    "type": "1",
    "bush_size": "1310",
    "dimension_A": 50.8,
    "dimension_B": 25.4,
    "dimension_D": 47.63,
    "dbmax": 35.0,
    "screw_size": "3/8\" x 5/8\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.28,
    "torque_with_key": 17.0,
    "torque_without_key": 20.0,
    "transmittable_torque": 435.0,
    "coverImage": "../../images/products/taper_bushing/tb5-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb5-1.webp",
      "../../images/products/taper_bushing/tb5-2.webp",
      "../../images/products/taper_bushing/tb5-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-006",
    "sku": "TB-1610",
    "name": "Taper Bushing 1610",
    "series": "TB",
    "type": "1",
    "bush_size": "1610",
    "dimension_A": 57.15,
    "dimension_B": 25.4,
    "dimension_D": 53.97,
    "dbmax": 42.0,
    "screw_size": "3/8\" x 5/8\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.36,
    "torque_with_key": 17.0,
    "torque_without_key": 20.0,
    "transmittable_torque": 486.0,
    "coverImage": "../../images/products/taper_bushing/tb6-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb6-1.webp",
      "../../images/products/taper_bushing/tb6-2.webp",
      "../../images/products/taper_bushing/tb6-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-007",
    "sku": "TB-1615",
    "name": "Taper Bushing 1615",
    "series": "TB",
    "type": "1",
    "bush_size": "1615",
    "dimension_A": 57.15,
    "dimension_B": 38.1,
    "dimension_D": 53.97,
    "dbmax": 42.0,
    "screw_size": "3/8\" x 5/8\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.53,
    "torque_with_key": 17.0,
    "torque_without_key": 20.0,
    "transmittable_torque": 486.0,
    "coverImage": "../../images/products/taper_bushing/tb7-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb7-1.webp",
      "../../images/products/taper_bushing/tb7-2.webp",
      "../../images/products/taper_bushing/tb7-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-008",
    "sku": "TB-2012",
    "name": "Taper Bushing 2012",
    "series": "TB",
    "type": "1",
    "bush_size": "2012",
    "dimension_A": 69.85,
    "dimension_B": 31.8,
    "dimension_D": 66.68,
    "dbmax": 50.0,
    "screw_size": "7/16\" x 7/8\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 0.72,
    "torque_with_key": 26.0,
    "torque_without_key": 31.0,
    "transmittable_torque": 808.0,
    "coverImage": "../../images/products/taper_bushing/tb8-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb8-1.webp",
      "../../images/products/taper_bushing/tb8-2.webp",
      "../../images/products/taper_bushing/tb8-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-009",
    "sku": "TB-2517",
    "name": "Taper Bushing 2517",
    "series": "TB",
    "type": "1",
    "bush_size": "2517",
    "dimension_A": 85.73,
    "dimension_B": 44.5,
    "dimension_D": 82.55,
    "dbmax": 65.0,
    "screw_size": "1/2\" x 1\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 2.8,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 1.54,
    "torque_with_key": 41.0,
    "torque_without_key": 48.0,
    "transmittable_torque": 1310.0,
    "coverImage": "../../images/products/taper_bushing/tb9-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb9-1.webp",
      "../../images/products/taper_bushing/tb9-2.webp",
      "../../images/products/taper_bushing/tb9-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-010",
    "sku": "TB-3020",
    "name": "Taper Bushing 3020",
    "series": "TB",
    "type": "1",
    "bush_size": "3020",
    "dimension_A": 107.96,
    "dimension_B": 50.8,
    "dimension_D": 101.6,
    "dbmax": 80.0,
    "screw_size": "5/8\" x 1 1/4\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 3.3,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 2.53,
    "torque_with_key": 77.0,
    "torque_without_key": 90.0,
    "transmittable_torque": 2710.0,
    "coverImage": "../../images/products/taper_bushing/tb10-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb10-1.webp",
      "../../images/products/taper_bushing/tb10-2.webp",
      "../../images/products/taper_bushing/tb10-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-011",
    "sku": "TB-3030",
    "name": "Taper Bushing 3030",
    "series": "TB",
    "type": "1",
    "bush_size": "3030",
    "dimension_A": 107.96,
    "dimension_B": 76.2,
    "dimension_D": 101.6,
    "dbmax": 80.0,
    "screw_size": "5/8\" x 1 1/4\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 3.3,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 3.67,
    "torque_with_key": 77.0,
    "torque_without_key": 90.0,
    "transmittable_torque": 2710.0,
    "coverImage": "../../images/products/taper_bushing/tb11-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb11-1.webp",
      "../../images/products/taper_bushing/tb11-2.webp",
      "../../images/products/taper_bushing/tb11-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-012",
    "sku": "TB-3525",
    "name": "Taper Bushing 3525",
    "series": "TB",
    "type": "2",
    "bush_size": "3525",
    "dimension_A": 127.0,
    "dimension_B": 63.5,
    "dimension_D": 122.68,
    "dbmax": 100.0,
    "screw_size": "1/2\" x 1 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 3.3,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 4.54,
    "torque_with_key": 95.0,
    "torque_without_key": 112.0,
    "transmittable_torque": 5060.0,
    "coverImage": "../../images/products/taper_bushing/tb12-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb12-1.webp",
      "../../images/products/taper_bushing/tb12-2.webp",
      "../../images/products/taper_bushing/tb12-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-013",
    "sku": "TB-3535",
    "name": "Taper Bushing 3535",
    "series": "TB",
    "type": "2",
    "bush_size": "3535",
    "dimension_A": 127.0,
    "dimension_B": 89.0,
    "dimension_D": 122.68,
    "dbmax": 95.0,
    "screw_size": "1/2\" x 1 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 3.3,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 6.24,
    "torque_with_key": 95.0,
    "torque_without_key": 112.0,
    "transmittable_torque": 5060.0,
    "coverImage": "../../images/products/taper_bushing/tb13-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb13-1.webp",
      "../../images/products/taper_bushing/tb13-2.webp",
      "../../images/products/taper_bushing/tb13-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-014",
    "sku": "TB-4030",
    "name": "Taper Bushing 4030",
    "series": "TB",
    "type": "2",
    "bush_size": "4030",
    "dimension_A": 146.05,
    "dimension_B": 76.2,
    "dimension_D": 140.7,
    "dbmax": 115.0,
    "screw_size": "5/8\" x 1 3/4\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 4.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 6.29,
    "torque_with_key": 145.0,
    "torque_without_key": 170.0,
    "transmittable_torque": 8740.0,
    "coverImage": "../../images/products/taper_bushing/tb14-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb14-1.webp",
      "../../images/products/taper_bushing/tb14-2.webp",
      "../../images/products/taper_bushing/tb14-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-015",
    "sku": "TB-4040",
    "name": "Taper Bushing 4040",
    "series": "TB",
    "type": "2",
    "bush_size": "4040",
    "dimension_A": 146.05,
    "dimension_B": 101.6,
    "dimension_D": 140.72,
    "dbmax": 110.0,
    "screw_size": "5/8\" x 1 3/4\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 4.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 8.19,
    "torque_with_key": 145.0,
    "torque_without_key": 170.0,
    "transmittable_torque": 8740.0,
    "coverImage": "../../images/products/taper_bushing/tb15-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb15-1.webp",
      "../../images/products/taper_bushing/tb15-2.webp",
      "../../images/products/taper_bushing/tb15-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-016",
    "sku": "TB-4535",
    "name": "Taper Bushing 4535",
    "series": "TB",
    "type": "2",
    "bush_size": "4535",
    "dimension_A": 161.93,
    "dimension_B": 88.9,
    "dimension_D": 155.7,
    "dbmax": 125.0,
    "screw_size": "3/4\" x 2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 4.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 9.38,
    "torque_with_key": 163.0,
    "torque_without_key": 192.0,
    "transmittable_torque": 12400.0,
    "coverImage": "../../images/products/taper_bushing/tb16-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb16-1.webp",
      "../../images/products/taper_bushing/tb16-2.webp",
      "../../images/products/taper_bushing/tb16-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-017",
    "sku": "TB-4545",
    "name": "Taper Bushing 4545",
    "series": "TB",
    "type": "2",
    "bush_size": "4545",
    "dimension_A": 161.93,
    "dimension_B": 114.3,
    "dimension_D": 155.7,
    "dbmax": 120.0,
    "screw_size": "3/4\" x 2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 5.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 10.45,
    "torque_with_key": 163.0,
    "torque_without_key": 192.0,
    "transmittable_torque": 12400.0,
    "coverImage": "../../images/products/taper_bushing/tb17-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb17-1.webp",
      "../../images/products/taper_bushing/tb17-2.webp",
      "../../images/products/taper_bushing/tb17-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-018",
    "sku": "TB-5040",
    "name": "Taper Bushing 5040",
    "series": "TB",
    "type": "2",
    "bush_size": "5040",
    "dimension_A": 177.8,
    "dimension_B": 101.6,
    "dimension_D": 170.69,
    "dbmax": 130.0,
    "screw_size": "7/8\" x 2 1/4\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 5.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 11.06,
    "torque_with_key": 230.0,
    "torque_without_key": 271.0,
    "transmittable_torque": 14200.0,
    "coverImage": "../../images/products/taper_bushing/tb1-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb1-1.webp",
      "../../images/products/taper_bushing/tb1-2.webp",
      "../../images/products/taper_bushing/tb1-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-019",
    "sku": "TB-5050",
    "name": "Taper Bushing 5050",
    "series": "TB",
    "type": "2",
    "bush_size": "5050",
    "dimension_A": 177.8,
    "dimension_B": 127.0,
    "dimension_D": 170.69,
    "dbmax": 130.0,
    "screw_size": "7/8\" x 2 1/4\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 5.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 13.54,
    "torque_with_key": 230.0,
    "torque_without_key": 271.0,
    "transmittable_torque": 14200.0,
    "coverImage": "../../images/products/taper_bushing/tb18-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb18-1.webp",
      "../../images/products/taper_bushing/tb18-2.webp",
      "../../images/products/taper_bushing/tb18-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-020",
    "sku": "TB-6050",
    "name": "Taper Bushing 6050",
    "series": "TB",
    "type": "3",
    "bush_size": "6050",
    "dimension_A": 234.95,
    "dimension_B": 127.0,
    "dimension_D": 228.6,
    "dbmax": 150.0,
    "screw_size": "1 1/4\" x 3 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 6.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 28.67,
    "torque_with_key": 792.0,
    "torque_without_key": 880.0,
    "transmittable_torque": 31870.0,
    "coverImage": "../../images/products/taper_bushing/tb1-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb1-1.webp",
      "../../images/products/taper_bushing/tb1-2.webp",
      "../../images/products/taper_bushing/tb1-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-021",
    "sku": "TB-7060",
    "name": "Taper Bushing 7060",
    "series": "TB",
    "type": "4",
    "bush_size": "7060",
    "dimension_A": 260.35,
    "dimension_B": 152.4,
    "dimension_D": 254.0,
    "dbmax": 180.0,
    "screw_size": "1 1/4\" x 3 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 7.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 38.8,
    "torque_with_key": 792.0,
    "torque_without_key": 880.0,
    "transmittable_torque": 47015.0,
    "coverImage": "../../images/products/taper_bushing/tb1-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb1-1.webp",
      "../../images/products/taper_bushing/tb1-2.webp",
      "../../images/products/taper_bushing/tb1-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "tb-022",
    "sku": "TB-8065",
    "name": "Taper Bushing 8065",
    "series": "TB",
    "type": "4",
    "bush_size": "8065",
    "dimension_A": 285.75,
    "dimension_B": 165.1,
    "dimension_D": 279.4,
    "dbmax": 200.0,
    "screw_size": "1 1/4\" x 3 1/2\"",
    "num_screws": null,
    "wrench_size": null,
    "keyway_tolerance": "JS9",
    "keyway_norm": "acc. to DIN 6885 Part 1",
    "T1": 8.4,
    "T2": null,
    "material": "EN-GJL 200 - DIN EN 1561",
    "surface_treatment": "Phosphated",
    "treatment_spec": "ISO 254",
    "weight": 49.82,
    "torque_with_key": 792.0,
    "torque_without_key": 880.0,
    "transmittable_torque": 51535.0,
    "coverImage": "../../images/products/taper_bushing/tb1-1.webp",
    "images": [
      "../../images/products/taper_bushing/tb1-1.webp",
      "../../images/products/taper_bushing/tb1-2.webp",
      "../../images/products/taper_bushing/tb1-3.webp"
    ],
    "features": [
      "High precision manufacturing",
      "Easy installation and removal",
      "Reliable power transmission"
    ],
    "applications": [
      "General machinery",
      "Conveyor systems",
      "Industrial equipment"
    ],
    "categories": [
      "taper-bushing",
      "tb-all"
    ],
    "createdAt": "2026-01-22"
  },
  {
    "id": "qd-001",
    "sku": "QD-JA",
    "name": "QD Bushing JA",
    "series": "QD",
    "type": "JA",
    "bush_size": "JA",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-ja"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-002",
    "sku": "QD-SH",
    "name": "QD Bushing SH",
    "series": "QD",
    "type": "SH",
    "bush_size": "SH",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sh"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-003",
    "sku": "QD-SDS",
    "name": "QD Bushing SDS",
    "series": "QD",
    "type": "SDS",
    "bush_size": "SDS",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sds"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-004",
    "sku": "QD-SD",
    "name": "QD Bushing SD",
    "series": "QD",
    "type": "SD",
    "bush_size": "SD",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sd"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-005",
    "sku": "QD-SK",
    "name": "QD Bushing SK",
    "series": "QD",
    "type": "SK",
    "bush_size": "SK",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sk"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-006",
    "sku": "QD-SF",
    "name": "QD Bushing SF",
    "series": "QD",
    "type": "SF",
    "bush_size": "SF",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sf"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-007",
    "sku": "QD-E",
    "name": "QD Bushing E",
    "series": "QD",
    "type": "E",
    "bush_size": "E",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-e"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-008",
    "sku": "QD-F",
    "name": "QD Bushing F",
    "series": "QD",
    "type": "F",
    "bush_size": "F",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-f"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-009",
    "sku": "QD-J",
    "name": "QD Bushing J",
    "series": "QD",
    "type": "J",
    "bush_size": "J",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-j"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-010",
    "sku": "QD-M",
    "name": "QD Bushing M",
    "series": "QD",
    "type": "M",
    "bush_size": "M",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-m"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-011",
    "sku": "QD-N",
    "name": "QD Bushing N",
    "series": "QD",
    "type": "N",
    "bush_size": "N",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-n"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-012",
    "sku": "QD-P",
    "name": "QD Bushing P",
    "series": "QD",
    "type": "P",
    "bush_size": "P",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-p"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-013",
    "sku": "QD-W",
    "name": "QD Bushing W",
    "series": "QD",
    "type": "W",
    "bush_size": "W",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-w"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-014",
    "sku": "QD-S",
    "name": "QD Bushing S",
    "series": "QD",
    "type": "S",
    "bush_size": "S",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-s"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-007",
    "sku": "QD-JA",
    "name": "QD Bushing JA",
    "series": "QD",
    "type": "JA",
    "bush_size": "JA",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-ja"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-010",
    "sku": "QD-SH",
    "name": "QD Bushing SH",
    "series": "QD",
    "type": "SH",
    "bush_size": "SH",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sh"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-012",
    "sku": "QD-SDS",
    "name": "QD Bushing SDS",
    "series": "QD",
    "type": "SDS",
    "bush_size": "SDS",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sds"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-013",
    "sku": "QD-SD",
    "name": "QD Bushing SD",
    "series": "QD",
    "type": "SD",
    "bush_size": "SD",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sd"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-015",
    "sku": "QD-SK",
    "name": "QD Bushing SK",
    "series": "QD",
    "type": "SK",
    "bush_size": "SK",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sk"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-017",
    "sku": "QD-SF",
    "name": "QD Bushing SF",
    "series": "QD",
    "type": "SF",
    "bush_size": "SF",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sf"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-020",
    "sku": "QD-E",
    "name": "QD Bushing E",
    "series": "QD",
    "type": "E",
    "bush_size": "E",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-e"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-021",
    "sku": "QD-F",
    "name": "QD Bushing F",
    "series": "QD",
    "type": "F",
    "bush_size": "F",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-f"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-022",
    "sku": "QD-J",
    "name": "QD Bushing J",
    "series": "QD",
    "type": "J",
    "bush_size": "J",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-j"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-023",
    "sku": "QD-M",
    "name": "QD Bushing M",
    "series": "QD",
    "type": "M",
    "bush_size": "M",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-m"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-024",
    "sku": "QD-N",
    "name": "QD Bushing N",
    "series": "QD",
    "type": "N",
    "bush_size": "N",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-n"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-025",
    "sku": "QD-P",
    "name": "QD Bushing P",
    "series": "QD",
    "type": "P",
    "bush_size": "P",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-p"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-026",
    "sku": "QD-W",
    "name": "QD Bushing W",
    "series": "QD",
    "type": "W",
    "bush_size": "W",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dbmax": null,
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-w"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-001",
    "sku": "QD-JA",
    "name": "QD Bushing JA",
    "series": "QD",
    "type": "JA",
    "bush_size": "JA",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".375\n .5\n .5\n .5\n .5",
    "bore_range_max": "1\n1 .375\n1 .688\n1 .688\n2 .125",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-ja"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-002",
    "sku": "QD-SH",
    "name": "QD Bushing SH",
    "series": "QD",
    "type": "SH",
    "bush_size": "SH",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".375\n .5\n .5\n .5\n .5",
    "bore_range_max": "1\n1 .375\n1 .688\n1 .688\n2 .125",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sh"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-003",
    "sku": "QD-SDS",
    "name": "QD Bushing SDS",
    "series": "QD",
    "type": "SDS",
    "bush_size": "SDS",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".375\n .5\n .5\n .5\n .5",
    "bore_range_max": "1\n1 .375\n1 .688\n1 .688\n2 .125",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sds"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-004",
    "sku": "QD-SD",
    "name": "QD Bushing SD",
    "series": "QD",
    "type": "SD",
    "bush_size": "SD",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".375\n .5\n .5\n .5\n .5",
    "bore_range_max": "1\n1 .375\n1 .688\n1 .688\n2 .125",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sd"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-005",
    "sku": "QD-SK",
    "name": "QD Bushing SK",
    "series": "QD",
    "type": "SK",
    "bush_size": "SK",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".375\n .5\n .5\n .5\n .5",
    "bore_range_max": "1\n1 .375\n1 .688\n1 .688\n2 .125",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sk"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-006",
    "sku": "QD-SF",
    "name": "QD Bushing SF",
    "series": "QD",
    "type": "SF",
    "bush_size": "SF",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".5\n .875\n1\n1 .438\n1 .938",
    "bore_range_max": "2 .313\n2 .875\n3 .313\n3 .75\n4 .75",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sf"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-007",
    "sku": "QD-E",
    "name": "QD Bushing E",
    "series": "QD",
    "type": "E",
    "bush_size": "E",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".5\n .875\n1\n1 .438\n1 .938",
    "bore_range_max": "2 .313\n2 .875\n3 .313\n3 .75\n4 .75",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-e"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-008",
    "sku": "QD-F",
    "name": "QD Bushing F",
    "series": "QD",
    "type": "F",
    "bush_size": "F",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".5\n .875\n1\n1 .438\n1 .938",
    "bore_range_max": "2 .313\n2 .875\n3 .313\n3 .75\n4 .75",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-f"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-009",
    "sku": "QD-J",
    "name": "QD Bushing J",
    "series": "QD",
    "type": "J",
    "bush_size": "J",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".5\n .875\n1\n1 .438\n1 .938",
    "bore_range_max": "2 .313\n2 .875\n3 .313\n3 .75\n4 .75",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-j"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-010",
    "sku": "QD-M",
    "name": "QD Bushing M",
    "series": "QD",
    "type": "M",
    "bush_size": "M",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": ".5\n .875\n1\n1 .438\n1 .938",
    "bore_range_max": "2 .313\n2 .875\n3 .313\n3 .75\n4 .75",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-m"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-011",
    "sku": "QD-N",
    "name": "QD Bushing N",
    "series": "QD",
    "type": "N",
    "bush_size": "N",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "2 .438\n2 .938\n4\n6",
    "bore_range_max": "5 .125\n5 .938\n7 .5\n8 .25",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-n"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-012",
    "sku": "QD-P",
    "name": "QD Bushing P",
    "series": "QD",
    "type": "P",
    "bush_size": "P",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "2 .438\n2 .938\n4\n6",
    "bore_range_max": "5 .125\n5 .938\n7 .5\n8 .25",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-p"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-013",
    "sku": "QD-W",
    "name": "QD Bushing W",
    "series": "QD",
    "type": "W",
    "bush_size": "W",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "2 .438\n2 .938\n4\n6",
    "bore_range_max": "5 .125\n5 .938\n7 .5\n8 .25",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-w"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-014",
    "sku": "QD-S",
    "name": "QD Bushing S",
    "series": "QD",
    "type": "S",
    "bush_size": "S",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "2 .438\n2 .938\n4\n6",
    "bore_range_max": "5 .125\n5 .938\n7 .5\n8 .25",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-s"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-017",
    "sku": "QD-JA",
    "name": "QD Bushing JA",
    "series": "QD",
    "type": "JA",
    "bush_size": "JA",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-ja"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-018",
    "sku": "QD-SH",
    "name": "QD Bushing SH",
    "series": "QD",
    "type": "SH",
    "bush_size": "SH",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sh"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-019",
    "sku": "QD-SDS",
    "name": "QD Bushing SDS",
    "series": "QD",
    "type": "SDS",
    "bush_size": "SDS",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sds"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-020",
    "sku": "QD-SD",
    "name": "QD Bushing SD",
    "series": "QD",
    "type": "SD",
    "bush_size": "SD",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sd"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-021",
    "sku": "QD-SK",
    "name": "QD Bushing SK",
    "series": "QD",
    "type": "SK",
    "bush_size": "SK",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sk"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-022",
    "sku": "QD-SF",
    "name": "QD Bushing SF",
    "series": "QD",
    "type": "SF",
    "bush_size": "SF",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-sf"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-023",
    "sku": "QD-E",
    "name": "QD Bushing E",
    "series": "QD",
    "type": "E",
    "bush_size": "E",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-e"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-024",
    "sku": "QD-F",
    "name": "QD Bushing F",
    "series": "QD",
    "type": "F",
    "bush_size": "F",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-f"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-025",
    "sku": "QD-J",
    "name": "QD Bushing J",
    "series": "QD",
    "type": "J",
    "bush_size": "J",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-j"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-026",
    "sku": "QD-M",
    "name": "QD Bushing M",
    "series": "QD",
    "type": "M",
    "bush_size": "M",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-m"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-027",
    "sku": "QD-N",
    "name": "QD Bushing N",
    "series": "QD",
    "type": "N",
    "bush_size": "N",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-n"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-028",
    "sku": "QD-P",
    "name": "QD Bushing P",
    "series": "QD",
    "type": "P",
    "bush_size": "P",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-p"
    ],
    "createdAt": "2026-01-23"
  },
  {
    "id": "qd-029",
    "sku": "QD-W",
    "name": "QD Bushing W",
    "series": "QD",
    "type": "W",
    "bush_size": "W",
    "bush_type": "QD",
    "dimension_A": null,
    "dimension_B": null,
    "dimension_D": null,
    "dimension_E": null,
    "dimension_F": null,
    "dimension_G": null,
    "dimension_L": null,
    "dbmax": null,
    "bore_range_min": "nan",
    "bore_range_max": "nan",
    "material": "Steel",
    "surface_treatment": "Phosphated",
    "treatment_spec": null,
    "weight": 0,
    "torque_with_key": null,
    "torque_without_key": null,
    "transmittable_torque": null,
    "coverImage": "../../images/products/taper_bushing/qd1-1.webp",
    "images": [
      "../../images/products/taper_bushing/qd1-1.webp",
      "../../images/products/taper_bushing/qd1-2.webp",
      "../../images/products/taper_bushing/qd1-3.webp"
    ],
    "features": [
      "Quick Detachable design",
      "Easy installation and removal",
      "US standard compatibility",
      "Flange mounting"
    ],
    "applications": [
      "US standard sheaves",
      "HVAC systems",
      "Agricultural machinery",
      "Industrial drives"
    ],
    "categories": [
      "taper-bushing",
      "qd-all",
      "qd-w"
    ],
    "createdAt": "2026-01-23"
  }
];

    const $ = (s, r = document) => r.querySelector(s);
    const fmtKg = (n) => `${n.toFixed(2)} kg`;
    const qs = new URLSearchParams(location.search);
    const skuParam = qs.get('sku') || '';

    const state = {
        data: [],
        q: '',
        series: null,  // TB or QD
        bushSize: [],
        type: [],
        mat: [],
        dbmax: [],
        coat: [],
        torque: [],
        sort: 'sku_desc',
        mode: localStorage.getItem('apt-viewMode') || 'grid',
        cart: loadCart(),
        compare: new Set(JSON.parse(localStorage.getItem('apt-compare') || '[]')),
        compareQty: JSON.parse(localStorage.getItem('apt-compare-qty') || '{}'),
        page: 1,
        limit: 24,
        category: null,
        market: ''
    };

    let isClearing = false;
    let uiLock = false;

    const ts = {};

    // init - 确保 DOM 加载完成后再执行
    function initApp() {
        (async function init() {
            const isFileProtocol = window.location.protocol === 'file:';
            
            if (isFileProtocol) {
                // file:// 协议：使用嵌入的数据
                console.log('[Taper Bushing] Running under file:// protocol, using embedded data');
                if (FALLBACK.length > 0) {
                    state.data = FALLBACK;
                    console.log(`✓ Using ${FALLBACK.length} embedded taper bushing products`);
                } else {
                    console.warn('⚠ No embedded data found. Please run embed_taper_bushing_data.py to embed data.');
                    state.data = [];
                }
            } else {
                // http/https 协议：从服务器加载
                try {
                    // 从当前页面路径计算相对路径
                    const base = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                    const paths = [
                        base + '../../assets/products_taper_bushing.json',
                        base + '../assets/products_taper_bushing.json',
                        '/assets/products_taper_bushing.json',
                        '../../assets/products_taper_bushing.json',
                        '../assets/products_taper_bushing.json',
                        './assets/products_taper_bushing.json'
                    ];
                    let loaded = false;
                    let lastError = null;
                    for (const path of paths) {
                        try {
                            const res = await fetch(path, { cache: 'no-store' });
                            if (res.ok) {
                                const data = await res.json();
                                if (Array.isArray(data) && data.length > 0) {
                                    state.data = data;
                                    console.log(`✓ Loaded ${data.length} taper bushing products from ${path}`);
                                    loaded = true;
                                    break;
                                } else {
                                    console.warn(`Loaded data from ${path} but it's empty or not an array`);
                                }
                            } else {
                                lastError = `HTTP ${res.status} for ${path}`;
                            }
                        } catch (e) {
                            lastError = e.message;
                            continue;
                        }
                    }
                    if (!loaded) {
                        throw new Error(`All paths failed. Last error: ${lastError}`);
                    }
                } catch (e) {
                    console.error('✗ Failed to load products_taper_bushing.json:', e);
                    console.warn('Using fallback data');
                    state.data = FALLBACK;
                }
            }
            
            console.log(`Initializing with ${state.data.length} products`);
            hydrateFromURL();
            bind();
            // 确保筛选器状态已同步（初始状态应该是空的，显示所有产品）
            syncStateFromUI();
            console.log('Filter state:', {
                bushSize: state.bushSize,
                type: state.type,
                mat: state.mat,
                dbmax: state.dbmax,
                coat: state.coat,
                torque: state.torque,
                q: state.q,
                category: state.category
            });
            if (skuParam) renderDetail(skuParam);
            else renderList();
            applyMode();
            updateCartBadge();
        })();
    }

    // 确保 DOM 加载完成后再初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // DOM 已经加载完成
        initApp();
    }

    function hydrateFromURL() {
        const p = new URLSearchParams(location.search);
        state.q = p.get('q') || '';
        state.page = parseInt(p.get('page') || '1', 10);
        state.sort = p.get('sort') || 'sku_desc';
        state.market = p.get('market') || '';
        const cat = p.get('cat');
        if (cat) state.category = cat;
    }

    function writeURL() {
        const p = new URLSearchParams();
        if (state.q) p.set('q', state.q);
        if (state.page > 1) p.set('page', String(state.page));
        if (state.sort !== 'sku_desc') p.set('sort', state.sort);
        if (state.market) p.set('market', state.market);
        if (state.category) p.set('cat', state.category);
        const newUrl = location.pathname + (p.toString() ? '?' + p.toString() : '');
        if (location.href !== location.origin + newUrl) {
            history.replaceState({}, '', newUrl);
        }
    }

    function bind() {
        setupFilterSelects();
        setupSortSelect();
        setupSearchList();
        bindEvents();
        bindCartDelegationOnce();
        loadCompare();
    }

    function setupSortSelect() {
        const el = $('#apt-sort');
        if (!el) return;
        ts.sort = new TomSelect(el, {
            allowEmptyOption: false,
            placeholder: 'Sort by...',
            onChange: (val) => {
                if (uiLock) return;
                state.sort = val || 'sku_desc';
                state.page = 1;
                renderList();
            }
        });
    }

    function setupSearchList() {
        const el = $('#search-list');
        if (!el) return;
        ts.searchList = new TomSelect(el, {
            allowEmptyOption: false,
            placeholder: 'All Products',
            onChange: (val) => {
                if (uiLock) return;
                state.market = val || '';
                state.page = 1;
                renderList();
            }
        });
    }

    function ensureAllOption(selectEl) {
        if (!selectEl) return;
        let optAll = selectEl.querySelector(`option[value="${ALL}"]`);
        if (!optAll) {
            const existedEmpty = selectEl.querySelector('option[value=""]');
            if (existedEmpty) {
                existedEmpty.value = ALL;
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
    }

    function makeMultiTS(selectEl) {
        ensureAllOption(selectEl);
        const instance = new TomSelect(selectEl, {
            maxItems: null,
            allowEmptyOption: true,
            placeholder: 'All',
            plugins: ['remove_button'],
            controlInput: null,
            hideSelected: false,
            closeAfterSelect: false,
            render: {
                option: (data, escape) => {
                    const isAll = (data.value ?? '') === ALL;
                    const check = isAll ? '' : `<span class="ts-checkviz"></span>`;
                    return `<div class="option ${isAll ? 'is-all' : ''}" data-value="${escape(data.value ?? '')}">
                  ${check}<span>${escape(data.text || data.value || '')}</span>
                </div>`;
                }
            }
        });

        instance.clear(true);
        instance.setValue([ALL], true);

        instance.on('item_add', (val) => {
            if (uiLock) return;
            if (val === ALL) {
                uiLock = true; instance.setValue([ALL], true); uiLock = false;
            } else {
                uiLock = true; instance.removeItem(ALL, true); uiLock = false;
            }
            updateFromUIAndRender();
        });
        instance.on('item_remove', () => {
            if (uiLock) return;
            if (instance.getValue().length === 0) {
                uiLock = true; instance.setValue([ALL], true); uiLock = false;
            }
            updateFromUIAndRender();
        });
        instance.on('clear', () => {
            if (uiLock) return;
            uiLock = true; instance.setValue([ALL], true); uiLock = false;
            updateFromUIAndRender();
        });

        instance.dropdown_content.addEventListener('mousedown', (e) => {
            const chk = e.target.closest('.ts-checkviz');
            if (!chk) return;

            e.preventDefault();
            e.stopPropagation();

            const option = chk.closest('.option');
            if (!option) return;
            const val = option.getAttribute('data-value');
            if (!val) return;

            if (val === ALL) {
                uiLock = true; instance.setValue([ALL], true); uiLock = false;
                updateFromUIAndRender();
                return;
            }

            const cur = instance.getValue().filter(v => v !== ALL);
            const set = new Set(cur);

            if (set.has(val)) set.delete(val); else set.add(val);

            const next = (set.size === 0) ? [ALL] : Array.from(set);

            uiLock = true;
            instance.setValue(next, true);
            uiLock = false;

            updateFromUIAndRender();
        });

        return instance;
    }

    function setupFilterSelects() {
        ts.bushSize = makeMultiTS($('#f-bushSize'));
        ts.type = makeMultiTS($('#f-type'));
        ts.mat = makeMultiTS($('#f-mat'));
        ts.dbmax = makeMultiTS($('#f-dbmax'));
        ts.coat = makeMultiTS($('#f-coat'));
        ts.torque = makeMultiTS($('#f-torque'));
    }

    function readTSValues(instance) {
        if (!instance) return [];
        const raw = instance.getValue();
        const arr = Array.isArray(raw) ? raw : (raw ? [raw] : []);
        return arr.filter(v => v && v !== ALL);
    }

    function syncStateFromUI() {
        state.bushSize = readTSValues(ts.bushSize);
        state.type = readTSValues(ts.type);
        state.mat = readTSValues(ts.mat);
        state.dbmax = readTSValues(ts.dbmax);
        state.coat = readTSValues(ts.coat);
        state.torque = readTSValues(ts.torque);
    }

    function anyActiveFilters() {
        const hasArrays = ['bushSize', 'type', 'mat', 'dbmax', 'coat', 'torque'].some(k => state[k].length > 0);
        return hasArrays || !!state.market;
    }

    function updateClearState() {
        const btn = $('#apt-clear');
        if (btn) btn.disabled = !(anyActiveFilters() || state.q);
    }

    function updateFromUIAndRender() {
        if (isClearing) return;
        syncStateFromUI();
        updateClearState();
        state.page = 1;
        renderList();
    }

    function bindEvents() {
        $('#apt-q')?.addEventListener('input', (e) => {
            state.q = e.target.value.trim();
            state.page = 1;
            renderList();
            updateClearState();
        });
        $('#apt-search-btn')?.addEventListener('click', () => {
            state.q = ($('#apt-q')?.value || '').trim();
            state.page = 1;
            renderList();
            updateClearState();
        });

        const setView = (mode) => { state.mode = mode; localStorage.setItem('apt-viewMode', mode); applyMode(); };
        $('#apt-viewGrid')?.addEventListener('click', () => setView('grid'));
        $('#apt-viewList')?.addEventListener('click', () => setView('list'));

        $('#apt-clear')?.addEventListener('click', () => {
            isClearing = true;
            uiLock = true;

            state.q = '';
            state.category = null;
            state.series = null;
            document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));

            state.bushSize = []; state.type = []; state.mat = [];
            state.dbmax = []; state.coat = []; state.torque = [];
            state.sort = 'sku_desc';
            state.market = '';
            state.page = 1;

            const qEl = $('#apt-q'); if (qEl) qEl.value = '';
            if (ts.sort) ts.sort.setValue('sku_desc', true); else { const sEl = $('#apt-sort'); if (sEl) sEl.value = 'sku_desc'; }
            if (ts.searchList) ts.searchList.setValue('', true); else { const sl = $('#search-list'); if (sl) sl.value = ''; }
            [ts.bushSize, ts.type, ts.mat, ts.dbmax, ts.coat, ts.torque].forEach(inst => inst && inst.setValue([ALL], true));

            uiLock = false;
            isClearing = false;

            syncStateFromUI();

            renderList();
            updateClearState();
        });

        $('#apt-openCart')?.addEventListener('click', () => { renderCart(); openCart(); });
        $('#apt-closeCart')?.addEventListener('click', closeCart);
        $('#apt-clearCart')?.addEventListener('click', () => { state.cart = {}; saveCart(); renderCart(); updateCartBadge(); });
        $('#apt-copy')?.addEventListener('click', () => {
            const items = Object.values(state.cart);
            const text = items.map(it => `${it.sku} x ${it.qty}`).join('\n');
            navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard'));
        });
        $('#apt-submitQuote')?.addEventListener('click', () => {
            const items = Object.values(state.cart);
            if (items.length === 0) { alert('Inquiry cart is empty'); return; }
            const payload = encodeURIComponent(JSON.stringify(items));
            location.href = `../contact_us/contact_us.html?cart=${payload}`;
        });

        $('#apt-overlay')?.addEventListener('click', (e) => { if (e.target.id === 'apt-overlay') closeModal(); });

        // Sidebar Category Clicks
        document.querySelectorAll('.category-list a[data-cat]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = el.getAttribute('data-cat');
                const series = el.getAttribute('data-series');
                const bush = el.getAttribute('data-bush');
                if (!cat) return;

                document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active'));
                el.classList.add('active');

                state.category = cat;
                state.page = 1;

                // 设置系列筛选
                if (series) {
                    state.series = series;
                } else if (series === '') {
                    // 点击主分类，清除系列筛选
                    state.series = null;
                }

                // 设置尺寸筛选
                if (bush) {
                    state.bushSize = [bush];
                } else {
                    state.bushSize = [];
                }

                // 如果点击的是主分类或系列分类（没有具体尺寸），清除尺寸筛选
                if (!bush) {
                    state.bushSize = [];
                }

                if (ts.bushSize) ts.bushSize.setValue(state.bushSize.length ? state.bushSize : [ALL], true);

                // 清除其他筛选器
                state.q = '';
                state.type = []; state.mat = [];
                state.dbmax = []; state.coat = []; state.torque = [];
                const qEl = $('#apt-q'); if (qEl) qEl.value = '';
                [ts.type, ts.mat, ts.dbmax, ts.coat, ts.torque].forEach(inst => inst && inst.setValue([ALL], true));

                renderList();
                updateClearState();
            });
        });
    }

    function applyFilters(rows) {
        rows = rows.slice();
        const needle = (state.q || '').trim().toLowerCase();

        if (needle) {
            rows = rows.filter(p => (
                (p.name || '') + ' ' + (p.sku || '') + ' ' +
                (p.bush_size || '') + ' ' + (p.material || '') + ' ' + (p.type || '')
            ).toLowerCase().includes(needle));
        }

        if (state.category && state.category !== 'all') {
            rows = rows.filter(p => p.categories && p.categories.includes(state.category));
        }

        // 按系列筛选（TB 或 QD）
        if (state.series) {
            rows = rows.filter(p => p.series === state.series);
        }

        const has = arr => Array.isArray(arr) && arr.length > 0;

        const runFilter = (keysArr, productKey) => {
            if (!has(keysArr)) return;
            rows = rows.filter(p => keysArr.includes(String(p[productKey])));
        };

        runFilter(state.bushSize, 'bush_size');
        runFilter(state.type, 'type');
        runFilter(state.mat, 'material');
        runFilter(state.coat, 'surface_treatment');

        // Max Bore Range (dbmax) - range filter
        if (has(state.dbmax)) {
            rows = rows.filter(p => {
                const db = +p.dbmax || 0;
                return state.dbmax.some(r => {
                    const [a, b] = String(r).split('-').map(Number);
                    return db >= a && db <= b;
                });
            });
        }

        // Torque Range - range filter
        if (has(state.torque)) {
            rows = rows.filter(p => {
                const tq = +p.transmittable_torque || 0;
                return state.torque.some(r => {
                    const [a, b] = String(r).split('-').map(Number);
                    return tq >= a && tq <= b;
                });
            });
        }

        switch (state.sort) {
            case 'dia_asc': rows.sort((a, b) => (+a.dbmax) - (+b.dbmax)); break;
            case 'dia_desc': rows.sort((a, b) => (+b.dbmax) - (+a.dbmax)); break;
            case 'new': rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
            case 'name_asc': rows.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
            case 'name_desc': rows.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break;
            case 'sku_asc': rows.sort((a, b) => (a.sku || '').localeCompare(b.sku || '')); break;
            case 'sku_desc': rows.sort((a, b) => (b.sku || '').localeCompare(a.sku || '')); break;
            default: rows.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0));
        }

        return rows;
    }

    function renderList() {
        const detail = $('#apt-detail'); if (detail) detail.style.display = 'none';

        console.log('renderList called, state.data.length:', state.data.length);
        const allRows = applyFilters(state.data);
        console.log('After filtering, allRows.length:', allRows.length);
        const total = allRows.length;
        const totalPages = Math.ceil(total / state.limit);

        if (state.page < 1) state.page = 1;
        if (state.page > totalPages && totalPages > 0) state.page = totalPages;

        const start = (state.page - 1) * state.limit;
        const end = start + state.limit;
        const rows = allRows.slice(start, end);
        console.log('Rendering rows:', rows.length, 'from', start, 'to', end);

        const countEl = $('#apt-count'); 
        if (countEl) {
            countEl.textContent = total;
            console.log('Updated count element:', total);
        } else {
            console.warn('Count element #apt-count not found');
        }

        const grid = $('#apt-grid'); 
        if (grid) {
            const html = rows.map(p => cardHTML(p)).join('');
            grid.innerHTML = html;
            console.log('Rendered', rows.length, 'product cards to grid');
        } else {
            console.error('Grid element #apt-grid not found!');
        }

        renderPagination(state.page, totalPages);

        writeURL();
    }

    function renderPagination(curr, total) {
        const nav = document.querySelector('.pagination');
        if (!nav) return;

        if (total <= 1) {
            nav.style.display = 'none';
            return;
        }
        nav.style.display = 'flex';

        let html = '';

        if (curr > 1) html += `<a href="#" class="page prev" data-page="${curr - 1}" aria-label="Previous Page">&laquo;</a>`;
        else html += `<span class="page prev disabled">&laquo;</span>`;

        const delta = 2;
        const left = curr - delta;
        const right = curr + delta + 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= total; i++) {
            if (i == 1 || i == total || (i >= left && i < right)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        rangeWithDots.forEach(p => {
            if (p === '...') html += `<span class="page disabled">...</span>`;
            else {
                if (p === curr) html += `<span class="page active">${p}</span>`;
                else html += `<a href="#" class="page" data-page="${p}">${p}</a>`;
            }
        });

        if (curr < total) html += `<a href="#" class="page next" data-page="${curr + 1}" aria-label="Next Page">&raquo;</a>`;
        else html += `<span class="page next disabled">&raquo;</span>`;

        nav.innerHTML = html;

        nav.querySelectorAll('a.page').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const p = parseInt(a.getAttribute('data-page'));
                if (p) {
                    state.page = p;
                    renderList();
                    document.getElementById('apt-products')?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    function cardHTML(p) {
        const key = 'apt-qty-' + p.id;
        return `
      <div class="product card">
        <div class="thumb"><img src="${p.coverImage || ''}" alt="${p.name || ''}"></div>
        <div class="p-body">
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
            <div>
              <div style="font-weight:600">${p.name || ''}</div>
              <div class="muted" style="font-size:12px">${p.sku || ''}</div>
            </div>
            ${p.series ? `<span class="badge" title="series">${p.series}</span>` : ''}
          </div>
          <div class="row" style="margin-top:6px">
            <span class="badge">Size: ${p.bush_size || ''}</span>
            <span class="badge">Type ${p.type || ''}</span>
            <span class="badge">Max Bore: ${p.dbmax || ''} mm</span>
          </div>
          <div class="kv">
            <div class="kv-name">Material</div><div>${p.material || ''}</div>
            <div class="kv-name">Surface Treatment</div><div>${p.surface_treatment || ''}</div>
            <div class="kv-name">Max Bore</div><div>${p.dbmax || ''} mm</div>
            <div class="kv-name">Torque</div><div>${p.transmittable_torque || ''} Nm</div>
            <div class="kv-name">Weight</div><div>${fmtKg(p.weight || 0)}</div>
          </div>
          <div class="row" style="margin-top:10px;align-items:center">
            <div class="qty">
              <button onclick="APT.stepQty('#${key}',-1)">−</button>
              <input id="${key}" type="number" min="1" value="1" />
              <button onclick="APT.stepQty('#${key}',1)">＋</button>
            </div>
            <button class="btn sm" onclick="APT.openModal('${p.id}')">Quick View</button>
            <a class="btn sm" href="taper_bushing.html?sku=${encodeURIComponent(p.sku || '')}">Details</a>
            <button class="btn sm" onclick="APT.addToCart('${p.id}', document.querySelector('#${key}').value)">Add to Inquiry Cart</button>
            <button class="btn sm ${state.compare.has(p.id) ? 'primary' : ''}"
                onclick="APT.toggleCompare('${p.id}', parseInt(document.querySelector('#${key}').value||'1',10))">
                ${state.compare.has(p.id) ? 'Added' : 'Add to Compare'}
            </button>
          </div>
        </div>
      </div>`;
    }

    function renderDetail(sku) {
        const p = state.data.find(x => x.sku === sku);
        if (!p) { renderList(); return; }

        const grid = $('#apt-grid'); if (grid) grid.innerHTML = '';
        const detail = $('#apt-detail'); if (detail) detail.style.display = 'block';

        $('#apt-crumb').textContent = `Products / Taper Bushing / ${p.series || 'TB'} / ${p.bush_size || ''}`;
        $('#apt-dImg').src = p.images?.[0] || p.coverImage || '';
        $('#apt-dName').textContent = p.name || ''; document.title = (p.name || 'Product') + ' | Taper Bushing';
        $('#apt-dSku').textContent = p.sku || '';

        const kvEl = $('#apt-dKv'); if (kvEl) {
            kvEl.innerHTML = `
                <div class="kv-name">Bushing Size</div><div>${p.bush_size || ''}</div>
                <div class="kv-name">Type</div><div>Type ${p.type || ''}</div>
                <div class="kv-name">Material</div><div>${p.material || ''}</div>
                <div class="kv-name">Surface Treatment</div><div>${p.surface_treatment || ''}</div>
                <div class="kv-name">Max Bore (dbmax)</div><div>${p.dbmax || ''} mm</div>
                <div class="kv-name">Transmittable Torque</div><div>${p.transmittable_torque || ''} Nm</div>
                <div class="kv-name">Weight</div><div>${fmtKg(p.weight || 0)}</div>
            `;
        }

        const ul = $('#apt-dFeat'); if (ul) {
            ul.innerHTML = '';
            [...(p.features || []), ...(p.applications || [])].forEach(t => {
                const li = document.createElement('li'); li.textContent = t; ul.appendChild(li);
            });
        }
        const addBtn = $('#apt-dAdd');
        if (addBtn) addBtn.onclick = () => {
            const q = Math.max(1, parseInt($('#apt-dQty').value || '1', 10));
            addToCart(p.id, q);
        };
    }

    // ---- Modal ----
    function openModal(id) {
        const p = state.data.find(x => x.id === id); if (!p) return;
        $('#apt-mvTitle').textContent = p.name || '';
        $('#apt-mvImg').src = p.images?.[0] || p.coverImage || '';
        $('#apt-mvSku').textContent = p.sku || '';
        $('#apt-mvProfile').textContent = `Size: ${p.bush_size || ''}`;
        $('#apt-mvGrooves').textContent = `Type ${p.type || ''}`;
        $('#apt-mvDia').textContent = `Max Bore: ${p.dbmax || ''} mm`;
        $('#apt-mvBal').textContent = `Torque: ${p.transmittable_torque || ''} Nm`;
        $('#apt-mvMat').textContent = p.material || '';
        $('#apt-mvCoat').textContent = p.surface_treatment || '';
        $('#apt-mvBush').textContent = p.bush_size || '';
        $('#apt-mvBore').textContent = `${p.dbmax || ''} mm`;
        $('#apt-mvWt').textContent = fmtKg(p.weight || 0);
        const ul = $('#apt-mvFeat'); if (ul) {
            ul.innerHTML = '';
            [...(p.features || []), ...(p.applications || [])].forEach(t => {
                const li = document.createElement('li'); li.textContent = t; ul.appendChild(li);
            });
        }
        const detBtn = $('#apt-detailBtn'); if (detBtn) detBtn.href = 'taper_bushing.html?sku=' + encodeURIComponent(p.sku || '');
        const addBtn = $('#apt-mvAdd');
        if (addBtn) addBtn.onclick = () => {
            const q = Math.max(1, parseInt($('#apt-mvQty').value || '1', 10));
            addToCart(p.id, q);
        };

        const cmpBtn = document.getElementById('apt-mvCompare');
        if (cmpBtn) {
            const setCmpBtn = (on) => {
                cmpBtn.classList.toggle('primary', on);
                cmpBtn.textContent = on ? 'Added' : 'Add to Compare';
                cmpBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
            };

            setCmpBtn(state.compare.has(p.id));

            cmpBtn.onclick = () => {
                const q = Math.max(1, parseInt($('#apt-mvQty').value || '1', 10));
                toggleCompare(p.id, q);
                setCmpBtn(state.compare.has(p.id));
            };
        }

        const imgs = Array.isArray(p.images) && p.images.length ? p.images : [p.coverImage].filter(Boolean);
        const mainBox = $('#apt-mvMain');
        const mainImg = $('#apt-mvImg');
        const thumbs = $('#apt-mvThumbs');

        function setMain(src) {
            if (!src) return;
            mainImg.src = src;
            if (thumbs) {
                thumbs.querySelectorAll('img').forEach(i => i.classList.toggle('active', i.dataset.src === src));
            }
        }

        if (mainImg && imgs[0]) setMain(imgs[0]);

        if (thumbs) {
            thumbs.innerHTML = imgs.map((src, i) => `
      <img src="${src}" data-src="${src}" class="${i === 0 ? 'active' : ''}" alt="thumb ${i + 1}">
    `).join('');
            thumbs.onclick = (e) => {
                const t = e.target.closest('img[data-src]'); if (!t) return;
                setMain(t.dataset.src);
            };
            thumbs.style.display = (imgs.length <= 1 ? 'none' : '');
        }

        $('#apt-overlay')?.classList.add('open');
    }

    function closeModal() { $('#apt-overlay')?.classList.remove('open'); }

    function loadCompare() {
        try {
            const stored = JSON.parse(localStorage.getItem('apt-compare') || '[]');
            state.compare = new Set(stored);
            state.compareQty = JSON.parse(localStorage.getItem('apt-compare-qty') || '{}');
        } catch (e) {
            state.compare = new Set();
            state.compareQty = {};
        }
        updateCompare();
    }

    function saveCompare() {
        localStorage.setItem('apt-compare', JSON.stringify(Array.from(state.compare)));
    }

    function saveCompareQty() {
        localStorage.setItem('apt-compare-qty', JSON.stringify(state.compareQty));
    }

    function toggleCompare(id, qty) {
        if (state.compare.has(id)) {
            state.compare.delete(id);
            delete state.compareQty[id];
        } else {
            state.compare.add(id);
            state.compareQty[id] = Math.max(1, +qty || 1);
        }
        saveCompare();
        saveCompareQty();
        updateCompare();
        renderList();
    }

    function updateCompare() {
        const openBtn = document.getElementById('cmp-open');
        if (openBtn) {
            const count = state.compare.size;
            if (count > 0) {
                openBtn.style.display = '';
                document.getElementById('cmp-count').textContent = count;
            } else {
                openBtn.style.display = 'none';
            }
        }
    }

    // ---- Cart ----
    function loadCart() { try { return JSON.parse(localStorage.getItem('apt-quoteCart') || '{}'); } catch { return {}; } }
    function saveCart() { localStorage.setItem('apt-quoteCart', JSON.stringify(state.cart)); }
    function updateCartBadge() {
        const total = Object.values(state.cart).reduce((n, it) => n + (it.qty || 0), 0);
        const badge = $('#apt-cartCount');
        if (!badge) return;
        if (total > 0) { badge.style.display = 'inline-block'; badge.textContent = total; } else { badge.style.display = 'none'; }
    }
    function addToCart(id, qty) {
        const p = state.data.find(x => x.id === id); if (!p) return;
        qty = Math.max(1, parseInt(qty || '1', 10));
        const key = p.id;
        const exists = state.cart[key];
        state.cart[key] = { id: p.id, sku: p.sku, name: p.name, qty: (exists ? exists.qty : 0) + qty, cover: p.coverImage };
        saveCart(); updateCartBadge(); openCart(); renderCart();
    }
    function removeFromCart(id) { delete state.cart[id]; saveCart(); renderCart(); updateCartBadge(); }
    function changeQty(id, delta) { const it = state.cart[id]; if (!it) return; it.qty = Math.max(1, (it.qty || 1) + delta); saveCart(); renderCart(); updateCartBadge(); }

    function renderCart() {
        const list = $('#apt-cartList');
        const items = Object.values(state.cart);
        if (!list) return;
        if (items.length === 0) {
            list.innerHTML = '<div class="muted" style="padding:12px">Inquiry cart is empty</div>';
            const sumEl = $('#apt-cartSummary');
            if (sumEl) sumEl.innerHTML = '0 items';
            return;
        }
        list.innerHTML = items.map(it => `
            <div class="cart-item">
                <img src="${it.cover || ''}" alt="${it.sku}">
                <div>
                <div style="font-weight:600">${it.name}</div>
                <div class="muted" style="font-size:12px">${it.sku}</div>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                <button class="btn sm" data-act="dec" data-id="${it.id}">−</button>
                <span>${it.qty}</span>
                <button class="btn sm" data-act="inc" data-id="${it.id}">＋</button>
                <button class="btn sm danger" data-act="remove" data-id="${it.id}">Remove</button>
                </div>
            </div>`).join('');
        const total = items.reduce((n, it) => n + (it.qty || 0), 0);
        const sumEl = $('#apt-cartSummary');
        if (sumEl) {
            sumEl.innerHTML = `Total <span class="emph-num">${items.length}</span> products, qty <span class="emph-num">${total}</span>`;
        }
    }
    function bindCartDelegationOnce() {
        const cart = $('#apt-cart');
        if (!cart || cart._bound) return;

        cart.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-act]');
            if (!btn || !cart.contains(btn)) return;
            e.preventDefault();

            const id = btn.dataset.id;
            const act = btn.dataset.act;

            if (!id || !act) return;

            if (act === 'dec') changeQty(id, -1);
            else if (act === 'inc') changeQty(id, +1);
            else if (act === 'remove') removeFromCart(id);
        });

        cart._bound = true;
    }
    function openCart() { $('#apt-cart')?.classList.add('open'); }
    function closeCart() { $('#apt-cart')?.classList.remove('open'); }

    function stepQty(sel, delta) { const el = document.querySelector(sel); const v = Math.max(1, parseInt(el.value || '1', 10) + delta); el.value = v; }

    function applyMode() {
        document.body.classList.toggle('mode-list', state.mode === 'list');
        $('#apt-viewGrid')?.classList.toggle('active', state.mode === 'grid');
        $('#apt-viewList')?.classList.toggle('active', state.mode === 'list');
    }

    // ---- Public API ----
    return { openModal, closeModal, addToCart, changeQty, removeFromCart, stepQty, toggleCompare };
})();
