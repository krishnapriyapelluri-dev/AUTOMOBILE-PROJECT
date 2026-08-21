/**
 * Krishna Priya Automobiles - Side-by-Side Car Comparison System
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonPage();
});

let currentComparedIds = [];
let highlightDiffMode = false;

function initComparisonPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const idsParam = urlParams.get('ids');

  if (idsParam) {
    currentComparedIds = idsParam.split(',').map(n => parseInt(n)).filter(n => !isNaN(n));
  } else {
    const saved = JSON.parse(localStorage.getItem('kp_compare_list') || '[]');
    if (saved.length > 0) {
      currentComparedIds = saved;
    } else {
      // Defaults to Creta (1), XUV700 (4), Nexon EV (3)
      currentComparedIds = [1, 4, 3];
    }
  }

  // Ensure max 3 cars
  if (currentComparedIds.length > 3) {
    currentComparedIds = currentComparedIds.slice(0, 3);
  }

  renderComparison();

  // Highlight button listener
  const toggleBtn = document.getElementById('toggleHighlightBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      highlightDiffMode = !highlightDiffMode;
      toggleBtn.classList.toggle('active', highlightDiffMode);
      toggleBtn.textContent = highlightDiffMode ? '✨ Highlighted Best Specs ON' : '🔍 Highlight Best Specs';
      renderComparison();
    });
  }
}

function renderComparison() {
  const container = document.getElementById('compareContainer');
  if (!container) return;

  const allVehicles = window.vehicles || [];
  const selectedVehicles = currentComparedIds.map(id => allVehicles.find(v => v.id === id)).filter(Boolean);

  // Save to localStorage for sticky bar
  localStorage.setItem('kp_compare_list', JSON.stringify(currentComparedIds));
  if (window.updateStickyCompareBar) window.updateStickyCompareBar();

  if (selectedVehicles.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:4rem 1rem;">
        <h3>No Vehicles Selected for Comparison</h3>
        <p style="color:var(--clr-text-muted); margin-bottom:1.5rem;">Select up to 3 luxury cars from our catalog to compare performance, features, and pricing.</p>
        <a href="vehicles.html" class="btn btn-primary">Browse Vehicles Catalog</a>
      </div>
    `;
    return;
  }

  const formatPrice = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  const calcEMI = (price) => formatPrice(Math.round((price * 0.8 * (1 + 0.08 * 5)) / 60));

  let html = `
    <!-- Top Selector Bar -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
      <div>
        <h2 style="font-size:1.4rem; font-weight:800;">Comparing ${selectedVehicles.length} Vehicles</h2>
        <p style="font-size:0.9rem; color:var(--clr-text-muted);">Side-by-side technical specification analysis</p>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button id="toggleHighlightBtn" class="btn btn-outline btn-sm ${highlightDiffMode ? 'active' : ''}">
          ${highlightDiffMode ? '✨ Highlighted Best Specs ON' : '🔍 Highlight Best Specs'}
        </button>
        <button onclick="clearAllCompared()" class="btn btn-outline btn-sm">Clear Comparison</button>
      </div>
    </div>

    <!-- Vehicles Cards Header -->
    <div style="display:grid; grid-template-columns: repeat(${selectedVehicles.length + 1}, minmax(220px, 1fr)); gap:1.25rem; overflow-x:auto;">
      <div style="padding:1.5rem; background:var(--clr-bg-alt); border-radius:var(--radius-lg); display:flex; flex-direction:column; justify-content:center;">
        <span style="font-size:0.8rem; font-weight:700; color:var(--clr-gold); text-transform:uppercase; letter-spacing:0.05em;">Comparison Slots</span>
        <h3 style="font-weight:800; margin-top:0.3rem;">Vehicle Overview</h3>
        <p style="font-size:0.85rem; color:var(--clr-text-muted); margin-top:0.5rem;">Add more cars using the selector dropdowns.</p>
      </div>

      ${selectedVehicles.map((car, idx) => `
        <div class="compare-col-header">
          <button onclick="removeComparedCar(${car.id})" style="position:absolute; top:12px; right:12px; border:none; background:rgba(0,0,0,0.5); color:#fff; width:28px; height:28px; border-radius:50%; cursor:pointer; font-weight:bold;">&times;</button>
          <img src="${car.image}" alt="${car.name}">
          <span class="badge-360" style="margin-bottom:0.5rem; display:inline-block;">${car.badge}</span>
          <h3 style="font-size:1.15rem; font-weight:800;">${car.name}</h3>
          <div style="font-size:1.2rem; font-weight:800; color:var(--clr-gold); margin:0.4rem 0;">${formatPrice(car.price)}</div>
          <div style="font-size:0.82rem; color:var(--clr-text-muted);">Est. EMI: ${calcEMI(car.price)}/mo</div>
          
          <div style="margin-top:1rem; display:flex; flex-direction:column; gap:0.5rem;">
            <a href="configurator.html?model=${car.id}" class="btn btn-gold btn-sm" style="width:100%;">Build & Customize</a>
            <a href="vip-lounge.html?car=${encodeURIComponent(car.name)}" class="btn btn-outline btn-sm" style="width:100%;">Book Test Drive</a>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Technical Specs Comparison Matrix -->
    <table class="spec-matrix-table">
      <!-- Section: Performance & Engine -->
      <tr class="spec-matrix-row">
        <th colspan="${selectedVehicles.length + 1}" style="background:var(--clr-surface-elevated); color:var(--clr-gold); text-align:left; font-size:1rem;">⚙️ Engine & Performance</th>
      </tr>
      <tr class="spec-matrix-row">
        <td>Engine / Battery</td>
        ${selectedVehicles.map(c => `<td>${c.engine}</td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Power Output</td>
        ${selectedVehicles.map(c => {
          const isBest = highlightDiffMode && isHighestValue(c.power, selectedVehicles.map(v => v.power));
          return `<td class="${isBest ? 'highlight-best' : ''}">${c.power}</td>`;
        }).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Max Torque</td>
        ${selectedVehicles.map(c => {
          const isBest = highlightDiffMode && isHighestValue(c.torque, selectedVehicles.map(v => v.torque));
          return `<td class="${isBest ? 'highlight-best' : ''}">${c.torque}</td>`;
        }).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Acceleration (0-100 km/h)</td>
        ${selectedVehicles.map(c => {
          const isBest = highlightDiffMode && isLowestValue(c.acceleration, selectedVehicles.map(v => v.acceleration));
          return `<td class="${isBest ? 'highlight-best' : ''}">${c.acceleration}</td>`;
        }).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Top Speed</td>
        ${selectedVehicles.map(c => `<td>${c.topSpeed}</td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Fuel Efficiency / Range</td>
        ${selectedVehicles.map(c => `<td><strong>${c.mileage}</strong></td>`).join('')}
      </tr>

      <!-- Section: Safety & Dimensions -->
      <tr class="spec-matrix-row">
        <th colspan="${selectedVehicles.length + 1}" style="background:var(--clr-surface-elevated); color:var(--clr-gold); text-align:left; font-size:1rem;">🛡️ Safety & Dimensions</th>
      </tr>
      <tr class="spec-matrix-row">
        <td>NCAP Safety Rating</td>
        ${selectedVehicles.map(c => `<td><span style="color:#eab308; font-weight:700;">★ ${c.safety}</span></td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Seating Capacity</td>
        ${selectedVehicles.map(c => `<td>${c.seating} Persons</td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Boot Space</td>
        ${selectedVehicles.map(c => `<td>${c.bootSpace}</td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Transmission</td>
        ${selectedVehicles.map(c => `<td>${c.transmission}</td>`).join('')}
      </tr>

      <!-- Section: Features Highlights -->
      <tr class="spec-matrix-row">
        <th colspan="${selectedVehicles.length + 1}" style="background:var(--clr-surface-elevated); color:var(--clr-gold); text-align:left; font-size:1rem;">✨ Key Features Included</th>
      </tr>
      <tr class="spec-matrix-row">
        <td>Sunroof Option</td>
        ${selectedVehicles.map(c => `<td>${c.features.some(f => f.toLowerCase().includes('sunroof') || f.toLowerCase().includes('skyroof')) ? '✅ Yes' : '❌ Standard'}</td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>ADAS Autonomous Tech</td>
        ${selectedVehicles.map(c => `<td>${c.features.some(f => f.toLowerCase().includes('adas')) ? '✅ Level 2 ADAS' : '➖ Standard Cruise'}</td>`).join('')}
      </tr>
      <tr class="spec-matrix-row">
        <td>Premium Sound System</td>
        ${selectedVehicles.map(c => {
          const soundFeature = c.features.find(f => f.toLowerCase().includes('bose') || f.toLowerCase().includes('sony') || f.toLowerCase().includes('jbl') || f.toLowerCase().includes('harman'));
          return `<td>${soundFeature ? '✅ ' + soundFeature : '✓ 6-Speaker System'}</td>`;
        }).join('')}
      </tr>
    </table>
  `;

  container.innerHTML = html;
}

function isHighestValue(valStr, allStrs) {
  const parseNum = (s) => parseFloat((s || '').replace(/[^0-9.]/g, '')) || 0;
  const current = parseNum(valStr);
  const max = Math.max(...allStrs.map(parseNum));
  return current === max && current > 0;
}

function isLowestValue(valStr, allStrs) {
  const parseNum = (s) => parseFloat((s || '').replace(/[^0-9.]/g, '')) || 9999;
  const current = parseNum(valStr);
  const min = Math.min(...allStrs.map(parseNum));
  return current === min && current < 9999;
}

window.removeComparedCar = function(id) {
  currentComparedIds = currentComparedIds.filter(n => n !== id);
  renderComparison();
};

window.clearAllCompared = function() {
  currentComparedIds = [];
  renderComparison();
};
