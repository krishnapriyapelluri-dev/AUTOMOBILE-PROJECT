/**
 * Krishna Priya Automobiles - Vehicle Catalog & Interactive Experience System
 * Features: Multi-criteria filtering, 360° interactive view, side-by-side comparison,
 * detail modal with interactive color preview, spec highlights & direct WhatsApp/EMI inquiry.
 */

const vehicles = [
  {
    id: 1,
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    year: 2024,
    price: 1250000,
    originalPrice: 1300000,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '17.4 km/l',
    engine: '1497 cc',
    power: '115 PS',
    torque: '144 Nm',
    safety: '5 Star NCAP',
    topSpeed: '180 km/h',
    acceleration: '10.4s (0-100)',
    bootSpace: '433 Liters',
    seating: 5,
    color: 'Abyss Black',
    colorsAvailable: [
      { name: 'Abyss Black', hex: '#0e1116' },
      { name: 'Atlas White', hex: '#f0f2f5' },
      { name: 'Titan Grey', hex: '#4a515a' },
      { name: 'Fiery Red', hex: '#a61c1c' }
    ],
    badge: 'Popular SUV',
    image: 'images/car_creta.jpg',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'ADAS Level 2', 'Bose 8-Speaker Sound', '10.25" Touchscreen', 'Wireless Charging'],
    description: 'The Hyundai Creta continues to dominate the compact SUV segment with its stunning parametric design, feature-loaded cabin, dynamic power delivery, and refined road presence.'
  },
  {
    id: 2,
    name: 'Maruti Suzuki Swift',
    brand: 'Maruti Suzuki',
    year: 2024,
    price: 650000,
    originalPrice: 690000,
    type: 'Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    mileage: '22.5 km/l',
    engine: '1197 cc',
    power: '89 PS',
    torque: '113 Nm',
    safety: '4 Star NCAP',
    topSpeed: '165 km/h',
    acceleration: '11.8s (0-100)',
    bootSpace: '268 Liters',
    seating: 5,
    color: 'Sizzling Red',
    colorsAvailable: [
      { name: 'Sizzling Red', hex: '#c0392b' },
      { name: 'Pearl Arctic White', hex: '#f5f5f5' },
      { name: 'Magma Grey', hex: '#555555' },
      { name: 'Luster Blue', hex: '#1e3799' }
    ],
    badge: 'Best Seller',
    image: 'images/car_swift.jpg',
    gradient: 'linear-gradient(135deg, #c0392b, #8e0000)',
    features: ['SmartPlay Studio 9"', 'Dual Airbags', 'Keyless Push Button Entry', 'Auto Climate Control', 'Steering Mounted Controls'],
    description: 'India\'s favorite sport hatchback. The updated Swift delivers unmatched fuel efficiency, nimble city handling, low maintenance cost, and timeless sporty appeal.'
  },
  {
    id: 3,
    name: 'Tata Nexon EV',
    brand: 'Tata',
    year: 2024,
    price: 1475000,
    originalPrice: 1550000,
    type: 'SUV',
    fuel: 'Electric',
    transmission: 'Automatic',
    mileage: '320 km/charge',
    engine: 'Electric Motor (40.5 kWh)',
    power: '129 PS',
    torque: '245 Nm',
    safety: '5 Star NCAP',
    topSpeed: '140 km/h',
    acceleration: '8.9s (0-100)',
    bootSpace: '350 Liters',
    seating: 5,
    color: 'Signature Teal',
    colorsAvailable: [
      { name: 'Signature Teal', hex: '#008080' },
      { name: 'Empowered Oxide', hex: '#e2e8f0' },
      { name: 'Daytona Grey', hex: '#475569' },
      { name: 'Pristine White', hex: '#ffffff' }
    ],
    badge: 'Eco Choice',
    image: 'images/car_nexon_ev.jpg',
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    features: ['ZConnect Smart App (60+ Features)', 'Fast DC 50kW Charging', 'Electric Sunroof', 'JBL Audio System', 'Digital Instrument Cockpit'],
    description: 'India\'s top-selling electric SUV. Combines robust 5-star Tata build quality, zero emissions, instant electric torque, and lowest operating cost per km.'
  },
  {
    id: 4,
    name: 'Mahindra XUV700',
    brand: 'Mahindra',
    year: 2024,
    price: 1625000,
    originalPrice: 1700000,
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    mileage: '14.5 km/l',
    engine: '2184 cc mHawk',
    power: '185 PS',
    torque: '450 Nm',
    safety: '5 Star NCAP',
    topSpeed: '200 km/h',
    acceleration: '9.2s (0-100)',
    bootSpace: '460 Liters',
    seating: 7,
    color: 'Everest White',
    colorsAvailable: [
      { name: 'Everest White', hex: '#f8fafc' },
      { name: 'Midnight Black', hex: '#090d16' },
      { name: 'Electric Blue', hex: '#2563eb' },
      { name: 'Dazzling Red', hex: '#dc2626' }
    ],
    badge: 'Flagship SUV',
    image: 'images/car_xuv700.jpg',
    gradient: 'linear-gradient(135deg, #7F00FF, #E100FF)',
    features: ['Skyroof Panoramic Glass', 'AdrenoX Connect System', 'ADAS Level 2 Autonomous Safety', 'Sony 3D Immersive 12-Speaker Audio', 'Dual HD Screens'],
    description: 'A benchmark SUV featuring class-leading 185 PS power, sophisticated dual-screen cockpit, all-wheel drive stability, and autonomous driver assist technology.'
  },
  {
    id: 5,
    name: 'Honda City',
    brand: 'Honda',
    year: 2024,
    price: 1200000,
    originalPrice: 1260000,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'CVT',
    mileage: '18.4 km/l',
    engine: '1498 cc i-VTEC',
    power: '121 PS',
    torque: '145 Nm',
    safety: '5 Star NCAP',
    topSpeed: '190 km/h',
    acceleration: '10.2s (0-100)',
    bootSpace: '506 Liters',
    seating: 5,
    color: 'Radiant Red',
    colorsAvailable: [
      { name: 'Radiant Red', hex: '#b91c1c' },
      { name: 'Platinum White', hex: '#f8fafc' },
      { name: 'Golden Brown', hex: '#78350f' },
      { name: 'Meteoroid Grey', hex: '#374151' }
    ],
    badge: 'Comfort King',
    image: 'images/car_honda_city.jpg',
    gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
    features: ['Honda Sensing ADAS Suite', 'LaneWatch Blindspot Camera', 'Electric Sunroof', 'Alexa Remote Control', 'Perforated Leather Seating'],
    description: 'The iconic sedan that redefined mid-size luxury comfort in India. Famous for buttery smooth i-VTEC engine refinement and supreme rear lounge space.'
  },
  {
    id: 6,
    name: 'Kia Seltos',
    brand: 'Kia',
    year: 2024,
    price: 1150000,
    originalPrice: 1220000,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '16.5 km/l',
    engine: '1497 cc Smartstream',
    power: '115 PS',
    torque: '144 Nm',
    safety: '4 Star NCAP',
    topSpeed: '175 km/h',
    acceleration: '10.8s (0-100)',
    bootSpace: '433 Liters',
    seating: 5,
    color: 'Intense Red',
    colorsAvailable: [
      { name: 'Intense Red', hex: '#991b1b' },
      { name: 'Glacier White', hex: '#ffffff' },
      { name: 'Aurora Black', hex: '#030712' },
      { name: 'Pewter Olive', hex: '#3f6212' }
    ],
    badge: 'Tech Leader',
    image: 'images/car_kia_seltos.jpg',
    gradient: 'linear-gradient(135deg, #00B4DB, #0083B0)',
    features: ['8" Head-Up Display (HUD)', 'Smart Air Purifier with Virus Protect', 'Ventilated Front Seats', 'Bose 8-Speaker System', 'Kia Connect Telematics'],
    description: 'A sharp, head-turning SUV equipped with futuristic tech, dual 10.25" panoramic curved displays, smart drive modes, and dynamic styling.'
  },
  {
    id: 7,
    name: 'Tata Harrier',
    brand: 'Tata',
    year: 2024,
    price: 1500000,
    originalPrice: 1580000,
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    mileage: '16.8 km/l',
    engine: '1956 cc Kryotec',
    power: '170 PS',
    torque: '350 Nm',
    safety: '5 Star NCAP',
    topSpeed: '185 km/h',
    acceleration: '9.8s (0-100)',
    bootSpace: '445 Liters',
    seating: 5,
    color: 'Atlas Black',
    colorsAvailable: [
      { name: 'Atlas Black', hex: '#111827' },
      { name: 'Sunlit Yellow', hex: '#eab308' },
      { name: 'Ash Grey', hex: '#64748b' },
      { name: 'Lunar White', hex: '#f1f5f9' }
    ],
    badge: 'Bold Beast',
    image: 'images/car_tata_harrier.jpg',
    gradient: 'linear-gradient(135deg, #1c1c1c, #3a3a3a)',
    features: ['Voice-Assisted Sunroof', 'ADAS Level 2 (11 Features)', 'JBL Audio with Subwoofer', '360° High Def Camera', 'Persona Mood Lighting'],
    description: 'Built on the Land Rover-derived OMEGAArc platform, the Harrier delivers imposing road presence, unshakeable highway composure, and plush ride quality.'
  },
  {
    id: 8,
    name: 'Mahindra Scorpio N',
    brand: 'Mahindra',
    year: 2024,
    price: 1395000,
    originalPrice: 1450000,
    type: 'SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    mileage: '15.0 km/l',
    engine: '2184 cc mHawk',
    power: '175 PS',
    torque: '400 Nm',
    safety: '5 Star NCAP',
    topSpeed: '180 km/h',
    acceleration: '9.6s (0-100)',
    bootSpace: '460 Liters',
    seating: 7,
    color: 'Deep Forest',
    colorsAvailable: [
      { name: 'Deep Forest', hex: '#14532d' },
      { name: 'Grand Canyon', hex: '#9a3412' },
      { name: 'Stealth Black', hex: '#0f172a' },
      { name: 'Everest White', hex: '#ffffff' }
    ],
    badge: 'Big Daddy SUV',
    image: 'images/car_scorpio_n.jpg',
    gradient: 'linear-gradient(135deg, #1a3c1a, #2d5a2d)',
    features: ['4XPLOR Intelligent Terrain AWD', 'Sony 3D Immersive Sound', 'Dual Zone Climate Control', 'Penta-Link Wattage Suspension', 'Wireless Android Auto/CarPlay'],
    description: 'An authentic body-on-frame SUV with formidable off-road prowess, commanding high seating position, and premium 7-seat leatherette cabin.'
  },
  {
    id: 9,
    name: 'Toyota Innova Hycross',
    brand: 'Toyota',
    year: 2024,
    price: 2050000,
    originalPrice: 2150000,
    type: 'MPV',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    mileage: '21.1 km/l',
    engine: '1987 cc Self-Charging Hybrid',
    power: '186 PS',
    torque: '206 Nm',
    safety: '5 Star NCAP',
    topSpeed: '170 km/h',
    acceleration: '9.5s (0-100)',
    bootSpace: '300 Liters',
    seating: 7,
    color: 'Pearl White',
    colorsAvailable: [
      { name: 'Pearl White', hex: '#f8fafc' },
      { name: 'Blackish Ageha', hex: '#022c22' },
      { name: 'Attitude Black', hex: '#0b0f19' },
      { name: 'Silver Metallic', hex: '#94a3b8' }
    ],
    badge: 'Executive Lounge',
    image: 'images/car_innova_hycross.jpg',
    gradient: 'linear-gradient(135deg, #e0e0e0, #a0a0a0)',
    features: ['Self-Charging Strong Hybrid Electric System', 'Ottoman Power Reclining Seats', '10.1" Floating Touchscreen', 'Panoramic Moonroof', 'Toyota Safety Sense 3.0'],
    description: 'The ultimate luxury lounge MPV. Features strong hybrid fuel economy (21+ km/l), whisper-quiet electric cruising, and regal captain seats for business executives and families.'
  },
  {
    id: 10,
    name: 'Maruti Suzuki Ertiga',
    brand: 'Maruti Suzuki',
    year: 2024,
    price: 900000,
    originalPrice: 950000,
    type: 'MPV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '19.3 km/l',
    engine: '1462 cc K15C Smart Hybrid',
    power: '103 PS',
    torque: '136.8 Nm',
    safety: '3 Star NCAP',
    topSpeed: '160 km/h',
    acceleration: '12.5s (0-100)',
    bootSpace: '209 Liters',
    seating: 7,
    color: 'Splendid Silver',
    colorsAvailable: [
      { name: 'Splendid Silver', hex: '#cbd5e1' },
      { name: 'Dignity Brown', hex: '#451a03' },
      { name: 'Auburn Red', hex: '#7f1d1d' },
      { name: 'Pearl Arctic White', hex: '#ffffff' }
    ],
    badge: 'Family Favorite',
    image: 'images/car_ertiga.jpg',
    gradient: 'linear-gradient(135deg, #c0c0c0, #808080)',
    features: ['Next Gen Smart Hybrid Tech', '6-Speed Automatic with Paddle Shifters', 'Roof-Mounted 2nd & 3rd Row AC', 'SmartPlay Pro Touchscreen', '4 Airbags & Hill Hold Assist'],
    description: 'India\'s most practical and efficient 7-seater MPV. Perfect for families who prioritize low running cost, expansive cabin flexibility, and proven Maruti reliability.'
  },
  {
    id: 11,
    name: 'Hyundai Tucson',
    brand: 'Hyundai',
    year: 2024,
    price: 2900000,
    originalPrice: 3000000,
    type: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '14.0 km/l',
    engine: '1999 cc Nu 2.0L',
    power: '156 PS',
    torque: '192 Nm',
    safety: '5 Star NCAP',
    topSpeed: '201 km/h',
    acceleration: '8.6s (0-100)',
    bootSpace: '540 Liters',
    seating: 5,
    color: 'Phantom Black',
    colorsAvailable: [
      { name: 'Phantom Black', hex: '#000000' },
      { name: 'Polar White', hex: '#ffffff' },
      { name: 'Amazon Grey', hex: '#334155' },
      { name: 'Fiery Red', hex: '#991b1b' }
    ],
    badge: 'Ultra Luxury',
    image: 'images/car_tucson.jpg',
    gradient: 'linear-gradient(135deg, #0d0d0d, #2a2a2a)',
    features: ['Parametric Hidden LED DRL Lights', 'Hyundai SmartSense Level 2 ADAS (19 Features)', '10-Way Memory Driver Seat', 'Bose Premium Audio', 'HTRAC All-Wheel Drive'],
    description: 'The flagship luxury SUV from Hyundai. Showcases avant-garde parametric design, ultra-quiet acoustically insulated cabin, and European-grade safety technology.'
  },
  {
    id: 12,
    name: 'BMW 3 Series Gran Limousine',
    brand: 'BMW',
    year: 2024,
    price: 6150000,
    originalPrice: 6350000,
    type: 'Sedan',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '15.3 km/l',
    engine: '1998 cc TwinPower Turbo',
    power: '258 PS',
    torque: '400 Nm',
    safety: '5 Star Euro NCAP',
    topSpeed: '250 km/h',
    acceleration: '6.2s (0-100)',
    bootSpace: '480 Liters',
    seating: 5,
    color: 'M Portimao Blue',
    colorsAvailable: [
      { name: 'M Portimao Blue', hex: '#1d4ed8' },
      { name: 'Carbon Black', hex: '#0f172a' },
      { name: 'Mineral White', hex: '#f8fafc' },
      { name: 'Skyscraper Grey', hex: '#475569' }
    ],
    badge: 'Pre-Owned Certified',
    image: 'images/car_honda_city.jpg',
    gradient: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
    features: ['BMW Curved Display (14.9" + 12.3")', 'Harman Kardon 16-Speaker Surround', 'Comfort Access Keyless Entry', 'Panoramic Glass Roof', 'Reversing Assistant'],
    description: 'The pinnacle of executive long-wheelbase sport luxury. certified 150-point inspected with low mileage, delivering 258 PS twin-turbo adrenaline and royal rear legroom.'
  }
];

// Expose globally for 360 viewer & calculator auto-fill
window.vehicles = vehicles;

// Format INR Price Utility
const formatPrice = (num) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

// Render Active Filter Pills
function updateActiveFilterPills() {
  const container = document.getElementById('activeFilterPills');
  if (!container) return;

  const searchInput = document.getElementById('searchInput');
  const brandFilter = document.getElementById('brandFilter');
  const typeFilter = document.getElementById('typeFilter');
  const fuelFilter = document.getElementById('fuelFilter');
  const transmissionFilter = document.getElementById('transmissionFilter');
  const priceFilter = document.getElementById('priceFilter');

  const pills = [];

  if (searchInput && searchInput.value.trim()) {
    pills.push({ key: 'search', label: `Search: "${searchInput.value.trim()}"` });
  }
  if (brandFilter && brandFilter.value !== 'All') {
    pills.push({ key: 'brand', label: `Brand: ${brandFilter.value}` });
  }
  if (typeFilter && typeFilter.value !== 'All') {
    pills.push({ key: 'type', label: `Type: ${typeFilter.value}` });
  }
  if (fuelFilter && fuelFilter.value !== 'All') {
    pills.push({ key: 'fuel', label: `Fuel: ${fuelFilter.value}` });
  }
  if (transmissionFilter && transmissionFilter.value !== 'All') {
    pills.push({ key: 'trans', label: `Trans: ${transmissionFilter.value}` });
  }
  if (priceFilter && priceFilter.value !== 'All') {
    pills.push({ key: 'price', label: `Price: ${priceFilter.value}` });
  }

  if (pills.length > 0) {
    container.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center; margin-bottom:1.25rem;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--clr-text-muted); text-transform:uppercase; letter-spacing:0.05em;">Active Filters:</span>
        ${pills.map(p => `
          <span class="active-filter-pill" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.25rem 0.75rem; background:rgba(37,99,235,0.15); border:1px solid rgba(37,99,235,0.3); border-radius:999px; font-size:0.82rem; font-weight:600; color:var(--clr-blue-light);">
            ${p.label}
            <span onclick="removeFilterPill('${p.key}')" style="cursor:pointer; font-weight:bold; font-size:1rem; line-height:1; margin-left:2px;">&times;</span>
          </span>
        `).join('')}
        <button onclick="clearAllFilters()" class="btn btn-outline btn-sm" style="padding:0.2rem 0.6rem; font-size:0.75rem;">Clear All</button>
      </div>
    `;
  } else {
    container.innerHTML = '';
  }
}

window.removeFilterPill = function(key) {
  if (key === 'search') { const el = document.getElementById('searchInput'); if (el) el.value = ''; }
  if (key === 'brand') { const el = document.getElementById('brandFilter'); if (el) el.value = 'All'; }
  if (key === 'type') { const el = document.getElementById('typeFilter'); if (el) el.value = 'All'; }
  if (key === 'fuel') { const el = document.getElementById('fuelFilter'); if (el) el.value = 'All'; }
  if (key === 'trans') { const el = document.getElementById('transmissionFilter'); if (el) el.value = 'All'; }
  if (key === 'price') { const el = document.getElementById('priceFilter'); if (el) el.value = 'All'; }
  filterVehicles();
};

window.clearAllFilters = function() {
  ['searchInput', 'brandFilter', 'typeFilter', 'fuelFilter', 'transmissionFilter', 'priceFilter', 'sortFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'searchInput') el.value = '';
      else if (id === 'sortFilter') el.value = 'Featured';
      else el.value = 'All';
    }
  });
  filterVehicles();
};

// Render Vehicles in Inventory Grid
function renderVehicles(list) {
  const vehicleGrid = document.getElementById('vehicleGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');

  if (!vehicleGrid) return;

  updateActiveFilterPills();

  if (list.length === 0) {
    vehicleGrid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    if (resultsCount) resultsCount.textContent = 'Showing 0 vehicles';
    return;
  }
  
  if (noResults) noResults.style.display = 'none';
  if (resultsCount) resultsCount.textContent = `Showing ${list.length} luxury vehicle${list.length > 1 ? 's' : ''}`;
  
  vehicleGrid.innerHTML = list.map(car => `
    <div class="card fade-in">
      <div class="card-image">
        <img
          src="${car.image}"
          alt="${car.name} ${car.year}"
          loading="lazy"
          onerror="this.onerror=null; this.src='images/car_creta.jpg';"
        >
        ${car.badge ? `<span class="card-badge">${car.badge}</span>` : ''}
        <button class="btn-360-badge" onclick="open360Viewer(${car.id})">
          <span>🔄 360° View</span>
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${car.name}</h3>
        <p class="card-meta">${car.year} • ${car.transmission} • ${car.fuel} • ${car.type}</p>
        
        <div class="card-specs-row">
          <div class="spec-item">
            <span class="spec-label">Mileage</span>
            <span class="spec-val">${car.mileage.split(' ')[0]}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Engine</span>
            <span class="spec-val">${car.engine.split(' ')[0]} cc</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Safety</span>
            <span class="spec-val">${car.safety.split(' ')[0]} ★</span>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.2rem; margin-top:0.5rem;">
          <div>
            <span style="font-size:0.75rem;color:var(--clr-text-muted);display:block;">Ex-Showroom Price</span>
            <div style="display:flex; align-items:baseline; gap:0.5rem;">
              <h4 class="card-price">${formatPrice(car.price)}</h4>
              ${car.originalPrice ? `<span style="font-size:0.8rem; text-decoration:line-through; color:var(--clr-text-muted);">${formatPrice(car.originalPrice)}</span>` : ''}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: auto; flex-wrap:wrap;">
          <button class="btn btn-primary" style="flex: 1; font-size:0.85rem; padding:0.65rem 0.8rem;" onclick="showVehicleDetail(${car.id})">View Specs</button>
          <button class="btn btn-gold" style="font-size:0.85rem; padding:0.65rem 0.8rem;" onclick="open360Viewer(${car.id})">360°</button>
          <label style="display:flex;align-items:center;gap:0.4rem;cursor:pointer;padding:0.6rem 0.75rem;background:var(--clr-bg-alt);border-radius:var(--radius-sm);border:1px solid var(--clr-border);white-space:nowrap;font-size:0.8rem;font-weight:600;">
            <input type="checkbox" onchange="toggleCompare(${car.id}, this)" ${compareList.includes(car.id) ? 'checked' : ''}>
            <span>Compare</span>
          </label>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter Logic
function filterVehicles() {
  const searchInput = document.getElementById('searchInput');
  const brandFilter = document.getElementById('brandFilter');
  const typeFilter = document.getElementById('typeFilter');
  const fuelFilter = document.getElementById('fuelFilter');
  const transmissionFilter = document.getElementById('transmissionFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');

  if (!searchInput) return;

  const term = searchInput.value.toLowerCase();
  const brand = brandFilter ? brandFilter.value : 'All';
  const type = typeFilter ? typeFilter.value : 'All';
  const fuel = fuelFilter ? fuelFilter.value : 'All';
  const trans = transmissionFilter ? transmissionFilter.value : 'All';
  const price = priceFilter ? priceFilter.value : 'All';
  const sort = sortFilter ? sortFilter.value : 'Featured';
  
  let filtered = vehicles.filter(car => {
    const matchSearch = car.name.toLowerCase().includes(term) || car.brand.toLowerCase().includes(term) || car.type.toLowerCase().includes(term);
    const matchBrand = brand === 'All' || car.brand === brand;
    const matchType = type === 'All' || car.type === type;
    const matchFuel = fuel === 'All' || car.fuel === fuel;
    const matchTrans = trans === 'All' || car.transmission === trans;
    
    let matchPrice = true;
    if (price === 'Under ₹5L') matchPrice = car.price < 500000;
    else if (price === '₹5-10L') matchPrice = car.price >= 500000 && car.price <= 1000000;
    else if (price === '₹10-15L') matchPrice = car.price > 1000000 && car.price <= 1500000;
    else if (price === '₹15-20L') matchPrice = car.price > 1500000 && car.price <= 2000000;
    else if (price === 'Above ₹20L') matchPrice = car.price > 2000000;
    
    return matchSearch && matchBrand && matchType && matchFuel && matchTrans && matchPrice;
  });
  
  if (sort === 'Price: Low to High') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'Price: High to Low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'Newest First') {
    filtered.sort((a, b) => b.year - a.year);
  } else {
    filtered.sort((a, b) => a.id - b.id);
  }
  
  renderVehicles(filtered);
}

// Compare System Logic
let compareList = [];
let highlightDiffs = false;

window.toggleCompare = function(id, el) {
  if (el && el.checked) {
    if (compareList.length >= 3) {
      if (typeof window.showToast === 'function') {
        window.showToast('You can compare up to 3 vehicles at a time.', 'warning');
      } else {
        alert('You can compare up to 3 vehicles at a time.');
      }
      el.checked = false;
      return;
    }
    if (!compareList.includes(id)) {
      compareList.push(id);
    }
  } else {
    compareList = compareList.filter(item => item !== id);
  }
  updateCompareTray();
};

function updateCompareTray() {
  const compareTray = document.getElementById('compareTray');
  const compareChips = document.getElementById('compareChips');
  const compareNowBtn = document.getElementById('compareNowBtn');

  if (!compareTray) return;

  if (compareList.length > 0) {
    compareTray.classList.add('active');
    
    if (compareChips) {
      compareChips.innerHTML = compareList.map(id => {
        const car = vehicles.find(v => v.id === id);
        return `
          <div class="compare-item-chip">
            <span>${car.name}</span>
            <span class="compare-item-remove" onclick="toggleCompare(${id}, null)">×</span>
          </div>
        `;
      }).join('');
    }
    
    if (compareNowBtn) {
      compareNowBtn.disabled = compareList.length < 2;
      compareNowBtn.style.opacity = compareList.length < 2 ? '0.5' : '1';
    }
  } else {
    compareTray.classList.remove('active');
  }
}

function showComparison() {
  if (compareList.length < 2) return;
  
  const selectedCars = compareList.map(id => vehicles.find(v => v.id === id));
  const compareModal = document.getElementById('compareModal');
  const compareModalBody = document.getElementById('compareModalBody');

  if (!compareModal || !compareModalBody) return;

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <h3 style="margin:0; font-size:1.3rem; font-family:var(--font-heading);">Side-by-Side Vehicle Comparison Matrix</h3>
        <p style="color:var(--clr-text-muted); font-size:0.85rem; margin:0;">Compare specifications, pricing, and key features side-by-side</p>
      </div>
      <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-size:0.9rem; font-weight:600;">
        <input type="checkbox" id="toggleDiffCheck" onchange="window.toggleHighlightDiffs(this.checked)" ${highlightDiffs ? 'checked' : ''}>
        <span>Highlight Differences</span>
      </label>
    </div>

    <table class="compare-table">
      <thead>
        <tr>
          <th style="width:20%;">Specification</th>
          ${selectedCars.map(car => `
            <th style="width:${80 / selectedCars.length}%;">
              <div style="text-align:center;">
                <img src="${car.image}" alt="${car.name}" style="height:100px; width:100%; object-fit:cover; border-radius:var(--radius-sm); margin:0 auto 0.75rem;">
                <h4 style="margin:0.25rem 0; font-size:1.1rem;">${car.name}</h4>
                <div style="color:var(--clr-blue); font-weight:800; font-size:1.2rem;">${formatPrice(car.price)}</div>
                <div style="margin-top:0.75rem; display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap;">
                  <button class="btn btn-primary btn-sm" onclick="open360Viewer(${car.id})">360° View</button>
                  <a href="contact.html?car=${car.id}" class="btn btn-gold btn-sm">Book Drive</a>
                </div>
              </div>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Brand</strong></td>${selectedCars.map(c => `<td>${c.brand}</td>`).join('')}</tr>
        <tr><td><strong>Body Style</strong></td>${selectedCars.map(c => `<td>${c.type}</td>`).join('')}</tr>
        <tr><td><strong>Fuel Type</strong></td>${selectedCars.map(c => `<td>${c.fuel}</td>`).join('')}</tr>
        <tr><td><strong>Transmission</strong></td>${selectedCars.map(c => `<td>${c.transmission}</td>`).join('')}</tr>
        <tr><td><strong>Engine Capacity</strong></td>${selectedCars.map(c => `<td>${c.engine}</td>`).join('')}</tr>
        <tr><td><strong>Power Output</strong></td>${selectedCars.map(c => `<td class="${c.power === findMaxSpec(selectedCars, 'power') ? 'spec-winner' : ''}">${c.power} ${c.power === findMaxSpec(selectedCars, 'power') ? '🏆 Best' : ''}</td>`).join('')}</tr>
        <tr><td><strong>Max Torque</strong></td>${selectedCars.map(c => `<td>${c.torque}</td>`).join('')}</tr>
        <tr><td><strong>Fuel Efficiency</strong></td>${selectedCars.map(c => `<td class="${c.mileage === findMaxSpec(selectedCars, 'mileage') ? 'spec-winner' : ''}">${c.mileage} ${c.mileage === findMaxSpec(selectedCars, 'mileage') ? '🏆 Best' : ''}</td>`).join('')}</tr>
        <tr><td><strong>Acceleration (0-100)</strong></td>${selectedCars.map(c => `<td>${c.acceleration || 'N/A'}</td>`).join('')}</tr>
        <tr><td><strong>Boot Space</strong></td>${selectedCars.map(c => `<td>${c.bootSpace || 'N/A'}</td>`).join('')}</tr>
        <tr><td><strong>Safety Rating</strong></td>${selectedCars.map(c => `<td class="spec-winner">${c.safety}</td>`).join('')}</tr>
        <tr><td><strong>Seating Capacity</strong></td>${selectedCars.map(c => `<td>${c.seating} Seats</td>`).join('')}</tr>
        <tr>
          <td><strong>Key Features</strong></td>
          ${selectedCars.map(c => `<td><ul style="padding-left:1.2rem; font-size:0.85rem; text-align:left;">${c.features.map(f => `<li style="margin-bottom:0.25rem;">${f}</li>`).join('')}</ul></td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;

  compareModalBody.innerHTML = html;
  compareModal.classList.add('active');
}

function findMaxSpec(cars, key) {
  if (key === 'mileage') {
    return cars.map(c => c.mileage).sort((a, b) => parseFloat(b) - parseFloat(a))[0];
  }
  if (key === 'power') {
    return cars.map(c => c.power).sort((a, b) => parseInt(b) - parseInt(a))[0];
  }
  return '';
}

window.toggleHighlightDiffs = function(val) {
  highlightDiffs = val;
  showComparison();
};

// Interactive Color Selector logic in Detail Modal
window.selectCarColor = function(carId, hexColor, colorName) {
  const previewImg = document.getElementById(`modalCarImg_${carId}`);
  const colorLabel = document.getElementById(`selectedColorLabel_${carId}`);
  
  if (colorLabel) colorLabel.textContent = colorName;
  if (previewImg) {
    previewImg.style.filter = `brightness(1.05) drop-shadow(0 0 15px ${hexColor}80)`;
    setTimeout(() => {
      previewImg.style.filter = 'none';
    }, 600);
  }
};

// Vehicle Detail Modal with Multi-tab Structure
window.showVehicleDetail = function(id) {
  const car = vehicles.find(v => v.id === id);
  if (!car) return;
  
  const modal = document.getElementById('vehicleDetailModal');
  const body = document.getElementById('vehicleDetailBody');

  if (!modal || !body) return;

  const estEmi = Math.round((car.price * 0.8 * 0.085 * Math.pow(1.085/12, 60)) / (Math.pow(1.085/12, 60) - 1)) || Math.round(car.price * 0.017);

  const html = `
    <div style="position:relative; border-radius: var(--radius-md) var(--radius-md) 0 0; overflow:hidden; margin: -2rem -2rem 1.5rem -2rem; height: 320px; background:#090d16;">
      <img id="modalCarImg_${car.id}" src="${car.image}" alt="${car.name}" style="width:100%;height:100%;object-fit:cover;display:block; transition: filter 0.5s ease;">
      <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(7,11,20,0.95) 0%, rgba(7,11,20,0.4) 60%, transparent 100%);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:2rem;color:white;">
        <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
          <span class="card-badge" style="position:static;">${car.badge || car.type}</span>
          <span class="card-badge" style="position:static; background:var(--clr-blue); color:#fff; border:none;">${car.year} Model</span>
        </div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.25rem; font-family: var(--font-heading);">${car.name}</h2>
        <div style="display:flex; align-items:baseline; gap:1rem; flex-wrap:wrap;">
          <span style="font-size: 1.6rem; color:var(--clr-gold); font-weight:800;">${formatPrice(car.price)}</span>
          ${car.originalPrice ? `<span style="font-size:1.1rem; text-decoration:line-through; opacity:0.7;">${formatPrice(car.originalPrice)}</span>` : ''}
          <span style="font-size:0.85rem; color:#fff; opacity:0.8;">Est. EMI starting at <strong style="color:var(--clr-gold);">₹${estEmi.toLocaleString('en-IN')}/mo</strong></span>
        </div>
      </div>
    </div>

    <!-- Color Palette Selection -->
    ${car.colorsAvailable ? `
      <div style="margin-bottom:1.5rem; padding:1rem; background:var(--clr-bg-alt); border-radius:var(--radius-md); border:1px solid var(--clr-border);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.6rem;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--clr-text); text-transform:uppercase; letter-spacing:0.05em;">Exterior Color Palette:</span>
          <span id="selectedColorLabel_${car.id}" style="font-size:0.85rem; font-weight:600; color:var(--clr-gold);">${car.color}</span>
        </div>
        <div style="display:flex; gap:0.8rem; align-items:center;">
          ${car.colorsAvailable.map(c => `
            <button onclick="selectCarColor(${car.id}, '${c.hex}', '${c.name}')" title="${c.name}" style="width:32px; height:32px; border-radius:50%; background:${c.hex}; border:2px solid var(--clr-surface-elevated); box-shadow:0 2px 6px rgba(0,0,0,0.3); cursor:pointer; transition:transform 0.2s ease;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"></button>
          `).join('')}
        </div>
      </div>
    ` : ''}
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <div>
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.75rem; border-bottom: 2px solid var(--clr-border); padding-bottom: 0.4rem; font-size:1.25rem;">Vehicle Overview</h3>
        <p style="color: var(--clr-text-muted); line-height: 1.7; margin-bottom: 1.5rem; font-size:0.95rem;">${car.description}</p>
        
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.75rem; border-bottom: 2px solid var(--clr-border); padding-bottom: 0.4rem; font-size:1.25rem;">Key Technology & Safety Features</h3>
        <ul style="list-style-type: none; padding: 0; margin-bottom:1.5rem;">
          ${car.features.map(f => `<li style="padding: 0.55rem 0; border-bottom: 1px solid var(--clr-border); display: flex; align-items: center; gap: 0.6rem; font-size:0.9rem; font-weight:500;"><span style="color:var(--clr-green); font-weight:700;">✓</span> ${f}</li>`).join('')}
        </ul>

        <!-- Direct WhatsApp Inquiry -->
        <a href="https://wa.me/919876543210?text=Hi%20Krishna%20Priya%20Automobiles!%20I%20am%20interested%20in%20buying%20the%20${encodeURIComponent(car.name)}%20(Price:%20${encodeURIComponent(formatPrice(car.price))}).%20Please%20send%20me%20brochure%20and%20on-road%20quote." target="_blank" rel="noopener" class="btn btn-gold" style="width:100%; margin-top:0.5rem; gap:0.5rem; display:inline-flex; justify-content:center;">
          <span>💬 Instant WhatsApp Quote & Brochure</span>
        </a>
      </div>
      
      <div>
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.75rem; border-bottom: 2px solid var(--clr-border); padding-bottom: 0.4rem; font-size:1.25rem;">Technical Specifications</h3>
        <table style="width: 100%; border-collapse: collapse; font-size:0.9rem;">
          <tbody>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Brand</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.brand}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Body Type</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.type}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Fuel Type</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.fuel}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Transmission</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.transmission}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Engine Capacity</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.engine}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Max Power</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.power}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Max Torque</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.torque}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Fuel Mileage</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.mileage}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Acceleration</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.acceleration || '10.2s'}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">Boot Space</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600;">${car.bootSpace || '400L'}</td></tr>
            <tr><th style="text-align: left; padding: 0.55rem; border-bottom: 1px solid var(--clr-border); color: var(--clr-text-muted);">NCAP Rating</th><td style="padding: 0.55rem; border-bottom: 1px solid var(--clr-border); font-weight: 600; color:var(--clr-green);">${car.safety}</td></tr>
          </tbody>
        </table>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <button onclick="open360Viewer(${car.id})" class="btn btn-outline" style="flex: 1; justify-content: center;">🔄 360° View</button>
          <a href="contact.html?car=${car.id}" class="btn btn-primary" style="flex: 1; justify-content: center;">Book Test Drive</a>
        </div>
      </div>
    </div>
  `;
  
  body.innerHTML = html;
  modal.classList.add('active');
};

// Event Attachments
document.addEventListener('DOMContentLoaded', () => {
  renderVehicles(vehicles);

  const compareNowBtn = document.getElementById('compareNowBtn');
  const clearCompareBtn = document.getElementById('clearCompareBtn');
  const closeCompareModal = document.getElementById('closeCompareModal');
  const closeDetailModal = document.getElementById('closeDetailModal');

  if (compareNowBtn) compareNowBtn.addEventListener('click', showComparison);
  if (clearCompareBtn) {
    clearCompareBtn.addEventListener('click', () => {
      compareList = [];
      updateCompareTray();
      renderVehicles(vehicles);
    });
  }

  if (closeCompareModal) {
    closeCompareModal.addEventListener('click', () => {
      document.getElementById('compareModal').classList.remove('active');
    });
  }

  if (closeDetailModal) {
    closeDetailModal.addEventListener('click', () => {
      document.getElementById('vehicleDetailModal').classList.remove('active');
    });
  }

  // Filter Listeners
  const filterInputs = ['searchInput', 'brandFilter', 'typeFilter', 'fuelFilter', 'transmissionFilter', 'priceFilter', 'sortFilter'];
  filterInputs.forEach(id => {
    const elem = document.getElementById(id);
    if (elem) elem.addEventListener('input', filterVehicles);
  });
});
