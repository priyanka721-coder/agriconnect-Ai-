// Crop Presets Utility for Farmer Marketplace
// Provides 50+ mapped crop presets with high-quality, realistic agriculturally curated Unsplash images,
// category matching keywords, and pre-seeded authentic listings representing multiple Indian regions.

export interface CropPreset {
  name: string;
  category: 'Cereals' | 'Pulses' | 'Fibers' | 'Sugars' | 'Oilseeds' | 'Vegetables' | 'Fruits' | 'Spices' | 'Beverages' | 'Dry Fruits';
  imageUrl: string;
  defaultPricePerQtl: number;
}

export const CROP_PRESETS: Record<string, CropPreset> = {
  rice: {
    name: 'Rice (Paddy)',
    category: 'Cereals',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.zDkwL754aVVuZCH4ikMvagHaEL?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2450
  },
  wheat: {
    name: 'Wheat',
    category: 'Cereals',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.e0jdMLjsK2g8rh8MQ1236wHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2650
  },
  maize: {
    name: 'Maize (Corn)',
    category: 'Cereals',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.5hK-ba1-6UJCaHl-4H8CxgHaFG?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2150
  },
  cotton: {
    name: 'Cotton',
    category: 'Fibers',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.RmqfsLiqgxiR3uw6u5es1gHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 7800
  },
  sugarcane: {
    name: 'Sugarcane',
    category: 'Sugars',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.zE_-jDyYSXxn8fOYr3iueQHaFj?pid=Api&h=220&P=0',
    defaultPricePerQtl: 3400
  },
  groundnut: {
    name: 'Groundnut (Peanut)',
    category: 'Oilseeds',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.b4fc8W_-jDJIliqJdvmhMAHaEV?pid=Api&h=220&P=0',
    defaultPricePerQtl: 6200
  },
  tomato: {
    name: 'Tomato',
    category: 'Vegetables',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.eJfELhrS5U_6guz41uzEdQHaE7?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1800
  },
  potato: {
    name: 'Potato',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600',
    defaultPricePerQtl: 1600
  },
  onion: {
    name: 'Onion',
    category: 'Vegetables',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.QekfxFaXXvJBEI5ffzw0uAHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2800
  },
  brinjal: {
    name: 'Brinjal (Eggplant)',
    category: 'Vegetables',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.j7x_aCHk1GKD-SHe9faoDwHaFW?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1400
  },
  chilli: {
    name: 'Chilli',
    category: 'Spices',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.oUCEwEeSTjg6Nr6EOTJYQAHaE7?pid=Api&h=220&P=0',
    defaultPricePerQtl: 19500
  },
  carrot: {
    name: 'Carrot',
    category: 'Vegetables',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.l_0nRm4bokIj-O0BRzd9jgHaE7?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2400
  },
  cabbage: {
    name: 'Cabbage',
    category: 'Vegetables',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.G6jNK_N7SVox-rqrKrGzsQHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1200
  },
  cauliflower: {
    name: 'Cauliflower',
    category: 'Vegetables',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.lQ9sBnPaLzGPbkdQgJ-DqwHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1550
  },
  mango: {
    name: 'Mango',
    category: 'Fruits',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.b7z1RX4O1kEvdUuSjfJRqQHaE7?pid=Api&h=220&P=0',
    defaultPricePerQtl: 5500
  },
  banana: {
    name: 'Banana',
    category: 'Fruits',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.1QdNtcOXXEfeQ7T1V9Mb3AHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2200
  },
  apple: {
    name: 'Apple',
    category: 'Fruits',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.ApWa2GtvReBKxhRDuBuPngHaEo?pid=Api&h=220&P=0',
    defaultPricePerQtl: 7500
  },
  orange: {
    name: 'Orange',
    category: 'Fruits',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.xCk7VktOPq8xto23tA_aZAHaFj?pid=Api&h=220&P=0',
    defaultPricePerQtl: 4200
  },
  papaya: {
    name: 'Papaya',
    category: 'Fruits',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.4vvSYniMgo1uwbPtUxkCIwHaEC?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2800
  },
  guava: {
    name: 'Guava',
    category: 'Fruits',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.FEo5lxxZYilBp7kzbXys3QHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2500
  },
  coconut: {
    name: 'Coconut',
    category: 'Fruits',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.mY_xnFkD3ucYGeS3bVDXAAHaHv?pid=Api&h=220&P=0',
    defaultPricePerQtl: 3800
  },
  grapes: {
    name: 'Grapes',
    category: 'Fruits',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.EHmTU8BsB7BiitfLnZXtYQHaEO?pid=Api&h=220&P=0',
    defaultPricePerQtl: 6800
  },
  pomegranate: {
    name: 'Pomegranate',
    category: 'Fruits',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7eHolY_hOAQAL1ZBGkQDOAHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 8800
  },
  lemon: {
    name: 'Lemon',
    category: 'Fruits',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.qxFJb5B8OsZce0SF8VsKhgHaEo?pid=Api&h=220&P=0',
    defaultPricePerQtl: 5000
  },
  watermelon: {
    name: 'Watermelon',
    category: 'Fruits',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.shnP9HmB7arN2HSBsPZ3rQHaE6?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1400
  },
  muskmelon: {
    name: 'Muskmelon',
    category: 'Fruits',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.P_JLvdOqAu1L01kjRBCfTQHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1800
  },
  turmeric: {
    name: 'Turmeric',
    category: 'Spices',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.i19xXHsn9bLaUEgmoYv60wHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 12500
  },
  ginger: {
    name: 'Ginger',
    category: 'Spices',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.iIxXBM1yiQs24Z2DNDAUWwHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 8500
  },
  coriander: {
    name: 'Coriander',
    category: 'Spices',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.sbHybTXWR0LwCtD9AwMSeQHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 7200
  },
  sunflower: {
    name: 'Sunflower Seeds',
    category: 'Oilseeds',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.lb8axU8GaI2njVsMFh6euwHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 5600
  },
  soybean: {
    name: 'Soybean',
    category: 'Pulses',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.HNpJ4HcX5assmRriVG7qBQHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 4850
  },
  blackgram: {
    name: 'Black Gram (Urad)',
    category: 'Pulses',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.geeMX4VVroUwafIa3XDzcAHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 7400
  },
  greengram: {
    name: 'Green Gram (Moong)',
    category: 'Pulses',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.lyTvWYiOCtEzFKLU0Woh2wHaFE?pid=Api&h=220&P=0',
    defaultPricePerQtl: 8200
  },
  redgram: {
    name: 'Red Gram (Toor)',
    category: 'Pulses',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.9r1OF-T4DqAfc6QWNO_UuAHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 9550
  },
  mustard: {
    name: 'Mustard Seeds',
    category: 'Oilseeds',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.fBlFitC6GcNvykJ-re4jwAHaEJ?pid=Api&h=220&P=0',
    defaultPricePerQtl: 5450
  },
  barley: {
    name: 'Barley',
    category: 'Cereals',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.cieRGdK6O0z7BB4xZAfZyQHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2180
  },
  ragi: {
    name: 'Finger Millet (Ragi)',
    category: 'Cereals',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.yiVxzVU-G8RBjA4Gp_3YcQHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 4100
  },
  bajra: {
    name: 'Pearl Millet (Bajra)',
    category: 'Cereals',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.0IFRAtloyPHC33G_GDHAXwHaE7?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2450
  },
  korra: {
    name: 'Foxtail Millet (Korra)',
    category: 'Cereals',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.cPG4hKcIpQMPs2Wtl1KslgHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 3500
  },
  jowar: {
    name: 'Sorghum (Jowar)',
    category: 'Cereals',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.lloo-biId4llqDtor5dkJwHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 3100
  },
  garlic: {
    name: 'Garlic',
    category: 'Spices',
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=600',
    defaultPricePerQtl: 9500
  },
  radish: {
    name: 'Radish',
    category: 'Vegetables',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.uCwvFtNIX-xUhkrUXAPWfgHaK8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1300
  },
  spinach: {
    name: 'Spinach',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600',
    defaultPricePerQtl: 1100
  },
  fenugreek: {
    name: 'Fenugreek',
    category: 'Vegetables',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.MSSOmd9AdadAAmM6bfa3VwHaDt?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1400
  },
  ladysfinger: {
    name: 'ladys finger',
    category: 'Vegetables',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.wkKoclDSZWcjW4J763xX8QHaEL?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1850
  },
  peas: {
    name: 'Peas (Matar)',
    category: 'Vegetables',
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.yMAICFRWhB2P7D_XDZdwnwHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 2800
  },
  sweetpotato: {
    name: 'Sweet Potato',
    category: 'Vegetables',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.-BIcKkiY4lWVpWfxX3jLvwHaFj?pid=Api&h=220&P=0',
    defaultPricePerQtl: 1700
  },
  cashew: {
    name: 'Cashew Nut',
    category: 'Dry Fruits',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.8dTuH85nBIK4VktdFHSVHAHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 68000
  },
  almond: {
    name: 'Almond',
    category: 'Dry Fruits',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.m4XG-ATeHCX8DXDSFr1NFgHaE6?pid=Api&h=220&P=0',
    defaultPricePerQtl: 72000
  },
  coffee: {
    name: 'Coffee Beans',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&q=80&w=600',
    defaultPricePerQtl: 18500
  },
  tea: {
    name: 'Tea Leaves',
    category: 'Beverages',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.zfxiigvmTpqUFO5xTkeE0QHaE6?pid=Api&h=220&P=0',
    defaultPricePerQtl: 14500
  },
  cardamom: {
    name: 'Cardamom',
    category: 'Spices',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.X1ygBM8gGPZiZsirVvUzUwHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 140000
  },
  cloves: {
    name: 'Clove',
    category: 'Spices',
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.-5xmHQgq-ZpBkaIluEo9TwHaEK?pid=Api&h=220&P=0',
    defaultPricePerQtl: 88000
  },
  blackpepper: {
    name: 'Black Pepper',
    category: 'Spices',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.O1NOTDhoJcMnFbx_fMsyUwHaE8?pid=Api&h=220&P=0',
    defaultPricePerQtl: 48000
  },
  chickpeas: {
    name: 'Chickpeas (Chana)',
    category: 'Pulses',
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.LRMb5WAKtHHwndvM6d480gHaHa?pid=Api&h=220&P=0',
    defaultPricePerQtl: 5800
  }
};

// Generic highly realistic agricultural photography backup images
export const AGRICULTURE_BACKUPS = [
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600', // mustard fields morning light
  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600', // fresh soil plants
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600', // sunrise over fields
  'https://images.unsplash.com/photo-1464226184884-fa280b87c3a9?auto=format&fit=crop&q=80&w=600'  // fresh vegetables market
];

export function getCropImageAndCategory(cropNameOrCategory: string): { imageUrl: string; category: string } {
  const normalized = cropNameOrCategory.toLowerCase().trim();
  
  // 0. Priority exact matching for paddy / rice variations to resolve the paddy user request
  if (
    normalized.includes('paddy') || 
    normalized.includes('rice') || 
    normalized.includes('dhan') || 
    normalized.includes('paddy crop') || 
    normalized.includes('వరి') || 
    normalized.includes('ధాన్యం') || 
    normalized.includes('धान')
  ) {
    return { imageUrl: CROP_PRESETS.rice.imageUrl, category: CROP_PRESETS.rice.category };
  }

  const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedClean = clean(normalized);

  // 1. Double check exact matching from dictionary using cleaned, space-stripped strings
  for (const [key, preset] of Object.entries(CROP_PRESETS)) {
    const keyClean = clean(key);
    const presetNameClean = clean(preset.name);
    
    if (
      normalizedClean.includes(keyClean) ||
      keyClean.includes(normalizedClean) ||
      normalizedClean.includes(presetNameClean) ||
      presetNameClean.includes(normalizedClean)
    ) {
      return { imageUrl: preset.imageUrl, category: preset.category };
    }
  }

  // 2. Secondary fallback matches for words
  if (normalized.includes('seed') || normalized.includes('oil') || normalized.includes('sunflower') || normalized.includes('mustard')) {
    return { imageUrl: CROP_PRESETS.sunflower.imageUrl, category: 'Oilseeds' };
  }
  if (normalized.includes('pulse') || normalized.includes('dal') || normalized.includes('gram') || normalized.includes('chana') || normalized.includes('moong') || normalized.includes('toor') || normalized.includes('urad')) {
    return { imageUrl: CROP_PRESETS.redgram.imageUrl, category: 'Pulses' };
  }
  if (normalized.includes('millet') || normalized.includes('ragi') || normalized.includes('jowar') || normalized.includes('bajra') || normalized.includes('grain')) {
    return { imageUrl: CROP_PRESETS.ragi.imageUrl, category: 'Cereals' };
  }
  if (normalized.includes('spice') || normalized.includes('masala') || normalized.includes('pepper') || normalized.includes('chilli') || normalized.includes('turmeric') || normalized.includes('ginger') || normalized.includes('clove') || normalized.includes('cardamom')) {
    return { imageUrl: CROP_PRESETS.chilli.imageUrl, category: 'Spices' };
  }
  if (normalized.includes('fruit') || normalized.includes('berry') || normalized.includes('mango') || normalized.includes('apple') || normalized.includes('banana') || normalized.includes('grape') || normalized.includes('lemon')) {
    return { imageUrl: CROP_PRESETS.mango.imageUrl, category: 'Fruits' };
  }
  if (normalized.includes('leaf') || normalized.includes('tea') || normalized.includes('coffee') || normalized.includes('beverage')) {
    return { imageUrl: CROP_PRESETS.tea.imageUrl, category: 'Beverages' };
  }
  if (normalized.includes('vegetable') || normalized.includes('potato') || normalized.includes('tomato') || normalized.includes('onion') || normalized.includes('carrot') || normalized.includes('spinach')) {
    return { imageUrl: CROP_PRESETS.tomato.imageUrl, category: 'Vegetables' };
  }

  // 3. Fallback to categories based on sub-word matching or deterministic seeds
  const hash = Math.abs(hashString(normalized));
  const backupImage = AGRICULTURE_BACKUPS[hash % AGRICULTURE_BACKUPS.length];

  return { 
    imageUrl: backupImage,
    category: 'Vegetables'
  };
}

// Simple deterministic hash to get stable fallback variants for custom crop words
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// Generate exactly 50+ diverse listings representing farmers all over Indian states!
export function getSeededCropListings(): any[] {
  const targetRegions = [
    { loc: 'Guntur, Andhra Pradesh', farmer: 'Koteswara Rao', prefix: 'Premium Dry' },
    { loc: 'Bhatinda, Punjab', farmer: 'Gurpreet Singh', prefix: 'Organic Golden' },
    { loc: 'Nashik, Maharashtra', farmer: 'Sanjay Patil', prefix: 'Fresh Grade-A' },
    { loc: 'Adilabad, Telangana', farmer: 'Srinivas Goud', prefix: 'BT Hybrid' },
    { loc: 'Shivamogga, Karnataka', farmer: 'Dharma Gowda', prefix: 'Natural Raw' },
    { loc: 'Aligarh, Uttar Pradesh', farmer: 'Ramesh Chaudhary', prefix: 'Pure Swarna' },
    { loc: 'Anantapur, Andhra Pradesh', farmer: 'Anjaneyulu Naik', prefix: 'Rainfed Local' },
    { loc: 'Palakkad, Kerala', farmer: 'Madhavan Nair', prefix: 'Traditional Kerala' },
    { loc: 'Shimla, Himachal Pradesh', farmer: 'Baldev Thakur', prefix: 'Royal Red Extra' },
    { loc: 'Bardhaman, West Bengal', farmer: 'Animesh Ghosh', prefix: 'Gobindobhog Rice' }
  ];

  const generated: any[] = [];
  const keys = Object.keys(CROP_PRESETS);

  keys.forEach((key, index) => {
    const p = CROP_PRESETS[key];
    const region = targetRegions[index % targetRegions.length];
    
    // Vary quantity slightly
    const qtyAmount = 20 + (index * 7) % 150;
    const qtyString = `${qtyAmount} ${p.category === 'Fruits' || p.category === 'Vegetables' ? 'Crates' : 'Quintals'}`;
    
    // Vary prices around default to look highly authentic
    const priceVariance = Math.round(p.defaultPricePerQtl * (1 + ((index % 5) - 2) * 0.04));
    
    // Generate phone ending with incremental digits
    const phone = `9${80000000 + index * 12345}`;

    generated.push({
      id: `seeded_crop_${index + 1}`,
      title: `${region.prefix} ${p.name}`,
      category: p.name,
      price: priceVariance,
      quantity: qtyString,
      sellerName: `${p.category === 'Cereals' || p.category === 'Pulses' ? 'Sardar ' : ''}${region.farmer}`,
      sellerPhone: phone.slice(0, 10),
      location: region.loc,
      imageUrl: p.imageUrl,
      createdAt: new Date(Date.now() - (index * 12 * 60 * 60 * 1000)).toISOString().split('T')[0]
    });
  });

  return generated;
}
