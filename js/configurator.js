/**
 * Krishna Priya Automobiles - Interactive Studio Configurator & Car Builder
 */

document.addEventListener('DOMContentLoaded', () => {
  initConfigurator();
});

let currentModelId = 1;
let selectedTrimPrice = 0;
let selectedTrimName = 'Base Elegance';
let selectedColor = { name: 'Default', hex: '#000000', hue: 0 };
let dualToneRoof = false;
let selectedWheel = { name: '17" Diamond Cut Alloys', price: 0 };
let selectedInterior = 'Mocha Brown Nappa Leather';
let selectedAddons = [];

function initConfigurator() {
  const urlParams = new URLSearchParams(window.location.search);
  const modelParam = parseInt(urlParams.get('model'));

  if (!isNaN(modelParam) && modelParam > 0) {
    currentModelId = modelParam;
  }

  renderModelDropdown();
  updateConfiguratorState();

  // Model change event
  const modelSelect = document.getElementById('modelSelect');
  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      currentModelId = parseInt(e.target.value);
      // Reset trim/addons on model switch
      selectedTrimPrice = 0;
      selectedTrimName = 'Base Elegance';
      selectedAddons = [];
      updateConfiguratorState();
    });
  }
}

function renderModelDropdown() {
  const select = document.getElementById('modelSelect');
  if (!select) return;

  const vehicles = window.vehicles || [];
  select.innerHTML = vehicles.map(v => `
    <option value="${v.id}" ${v.id === currentModelId ? 'selected' : ''}>
      ${v.name} (${v.brand}) - ${formatPrice(v.price)}
    </option>
  `).join('');
}

function updateConfiguratorState() {
  const vehicles = window.vehicles || [];
  const car = vehicles.find(v => v.id === currentModelId) || vehicles[0];

  if (!car) return;

  // Update canvas car image & paint swatch
  const carImage = document.getElementById('configuratorCarImage');
  const carName = document.getElementById('configuratorCarName');
  const carTagline = document.getElementById('configuratorCarTagline');

  if (carImage) {
    carImage.src = car.image;
    carImage.alt = car.name;
    // Apply hue filter based on selected color
    carImage.style.filter = selectedColor.hue ? `hue-rotate(${selectedColor.hue}deg) drop-shadow(0 20px 25px rgba(0,0,0,0.6))` : 'drop-shadow(0 20px 25px rgba(0,0,0,0.6))';
  }

  if (carName) carName.textContent = car.name;
  if (carTagline) carTagline.textContent = `${car.brand} • ${car.year} • ${car.type} • ${car.fuel}`;

  // Render color swatches
  renderColorSwatches(car);

  // Calculate live total price
  const basePrice = car.price;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const dualToneCost = dualToneRoof ? 25000 : 0;
  const totalPrice = basePrice + selectedTrimPrice + selectedWheel.price + dualToneCost + addonsTotal;

  const calcEMI = (price) => formatPrice(Math.round((price * 0.8 * (1 + 0.08 * 5)) / 60));

  // Update UI price outputs
  const basePriceEl = document.getElementById('summaryBasePrice');
  const trimPriceEl = document.getElementById('summaryTrimPrice');
  const wheelPriceEl = document.getElementById('summaryWheelPrice');
  const addonsPriceEl = document.getElementById('summaryAddonsPrice');
  const totalPriceEl = document.getElementById('summaryTotalPrice');
  const totalEmiEl = document.getElementById('summaryTotalEMI');

  if (basePriceEl) basePriceEl.textContent = formatPrice(basePrice);
  if (trimPriceEl) trimPriceEl.textContent = selectedTrimPrice > 0 ? `+${formatPrice(selectedTrimPrice)} (${selectedTrimName})` : 'Included';
  if (wheelPriceEl) wheelPriceEl.textContent = selectedWheel.price > 0 ? `+${formatPrice(selectedWheel.price)}` : 'Included';
  if (addonsPriceEl) addonsPriceEl.textContent = addonsTotal > 0 ? `+${formatPrice(addonsTotal + dualToneCost)}` : 'None';
  if (totalPriceEl) totalPriceEl.textContent = formatPrice(totalPrice);
  if (totalEmiEl) totalEmiEl.textContent = `${calcEMI(totalPrice)}/month`;
}

function renderColorSwatches(car) {
  const container = document.getElementById('colorSwatchesContainer');
  if (!container) return;

  const colors = car.colorsAvailable || [
    { name: 'Obsidian Black', hex: '#000000', hue: 0 },
    { name: 'Alpine White', hex: '#ffffff', hue: 180 },
    { name: 'Race Red', hex: '#dc2626', hue: 320 },
    { name: 'Sapphire Blue', hex: '#2563eb', hue: 200 }
  ];

  container.innerHTML = colors.map((c, i) => `
    <div class="color-swatch ${selectedColor.name === c.name || (i===0 && selectedColor.name==='Default') ? 'active' : ''}" 
         style="background-color: ${c.hex};" 
         title="${c.name}" 
         onclick="selectStudioColor('${c.name}', '${c.hex}', ${i * 45})">
    </div>
  `).join('');
}

window.selectStudioColor = function(name, hex, hue) {
  selectedColor = { name, hex, hue };
  updateConfiguratorState();
};

window.selectTrim = function(name, price) {
  selectedTrimName = name;
  selectedTrimPrice = price;

  document.querySelectorAll('.trim-card').forEach(card => card.classList.remove('active'));
  event.currentTarget.classList.add('active');

  updateConfiguratorState();
};

window.selectWheels = function(name, price) {
  selectedWheel = { name, price };

  document.querySelectorAll('.wheel-card').forEach(card => card.classList.remove('active'));
  event.currentTarget.classList.add('active');

  updateConfiguratorState();
};

window.toggleAddon = function(name, price, element) {
  const idx = selectedAddons.findIndex(a => a.name === name);
  if (idx > -1) {
    selectedAddons.splice(idx, 1);
    element.classList.remove('active');
  } else {
    selectedAddons.push({ name, price });
    element.classList.add('active');
  }
  updateConfiguratorState();
};

window.toggleDualToneRoof = function(checkbox) {
  dualToneRoof = checkbox.checked;
  updateConfiguratorState();
};

window.saveConfigurationQuote = function() {
  const vehicles = window.vehicles || [];
  const car = vehicles.find(v => v.id === currentModelId) || vehicles[0];
  const totalPrice = car.price + selectedTrimPrice + selectedWheel.price + (dualToneRoof ? 25000 : 0) + selectedAddons.reduce((s, a) => s + a.price, 0);

  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal-container" style="max-width:600px; background:var(--clr-surface); padding:2rem; border-radius:var(--radius-lg); border:1px solid var(--clr-border);">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--clr-border); padding-bottom:1rem; margin-bottom:1.5rem;">
        <h3 style="font-weight:800;">📄 Custom Vehicle Quotation Summary</h3>
        <button onclick="this.closest('.modal-overlay').remove()" style="font-size:1.5rem; border:none; background:none; cursor:pointer;">&times;</button>
      </div>
      <div>
        <div style="font-size:1.2rem; font-weight:800; color:var(--clr-gold);">${car.name} (${selectedTrimName})</div>
        <p style="font-size:0.85rem; color:var(--clr-text-muted);">Exterior Color: ${selectedColor.name} | Wheels: ${selectedWheel.name}</p>
        
        <table style="width:100%; margin-top:1.5rem; font-size:0.9rem; border-collapse:collapse;">
          <tr style="border-bottom:1px solid var(--clr-border);"><td style="padding:0.5rem 0;">Base Model Price:</td><td style="text-align:right;">${formatPrice(car.price)}</td></tr>
          <tr style="border-bottom:1px solid var(--clr-border);"><td style="padding:0.5rem 0;">Trim Package (${selectedTrimName}):</td><td style="text-align:right;">+${formatPrice(selectedTrimPrice)}</td></tr>
          <tr style="border-bottom:1px solid var(--clr-border);"><td style="padding:0.5rem 0;">Alloy Wheels (${selectedWheel.name}):</td><td style="text-align:right;">+${formatPrice(selectedWheel.price)}</td></tr>
          <tr style="border-bottom:1px solid var(--clr-border);"><td style="padding:0.5rem 0;">Selected Accessories:</td><td style="text-align:right;">+${formatPrice(selectedAddons.reduce((s, a) => s + a.price, 0) + (dualToneRoof ? 25000 : 0))}</td></tr>
          <tr style="font-weight:800; font-size:1.1rem; color:var(--clr-gold);"><td style="padding:1rem 0;">Total Estimated Price:</td><td style="text-align:right; padding:1rem 0;">${formatPrice(totalPrice)}</td></tr>
        </table>

        <div style="margin-top:1.5rem; display:flex; gap:1rem;">
          <button onclick="window.print()" class="btn btn-outline" style="flex:1;">🖨️ Print Quotation</button>
          <a href="contact.html?subject=Custom Build ${encodeURIComponent(car.name)}" class="btn btn-gold" style="flex:1;">Submit Booking Request</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

function formatPrice(num) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
}
