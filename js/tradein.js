/**
 * Krishna Priya Automobiles - Trade-In Valuation & Exchange Portal Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTradeInWizard();
});

let currentStep = 1;
let tradeInDetails = {
  brand: 'Hyundai',
  year: 2020,
  kms: 45000,
  fuel: 'Petrol',
  ownership: '1st Owner',
  condition: 'Good',
  accidents: 'No Accidents'
};
let estimatedValuation = 0;

function initTradeInWizard() {
  renderUpgradeCarOptions();
  showStep(1);
}

window.nextTradeInStep = function(step) {
  if (step === 2) {
    // Validate step 1 fields
    const brand = document.getElementById('tradeBrand')?.value;
    const year = parseInt(document.getElementById('tradeYear')?.value || '2020');
    const kms = parseInt(document.getElementById('tradeKms')?.value || '45000');
    const fuel = document.getElementById('tradeFuel')?.value;

    tradeInDetails.brand = brand;
    tradeInDetails.year = year;
    tradeInDetails.kms = kms;
    tradeInDetails.fuel = fuel;
  }

  if (step === 3) {
    // Calculate Valuation
    calculateTradeInValuation();
  }

  currentStep = step;
  showStep(step);
};

window.prevTradeInStep = function(step) {
  currentStep = step;
  showStep(step);
};

function showStep(stepNumber) {
  document.querySelectorAll('.wizard-step-content').forEach(el => el.style.display = 'none');
  const activeStepEl = document.getElementById(`tradeStep${stepNumber}`);
  if (activeStepEl) activeStepEl.style.display = 'block';

  // Update step node indicators
  document.querySelectorAll('.step-node').forEach((node, i) => {
    node.classList.remove('active', 'completed');
    if (i + 1 === stepNumber) node.classList.add('active');
    if (i + 1 < stepNumber) node.classList.add('completed');
  });
}

function calculateTradeInValuation() {
  const currentYear = 2026;
  const age = currentYear - tradeInDetails.year;
  
  // Base valuation heuristics
  let baseValue = 800000;
  
  if (tradeInDetails.brand === 'Maruti Suzuki' || tradeInDetails.brand === 'Hyundai') baseValue = 750000;
  if (tradeInDetails.brand === 'Honda' || tradeInDetails.brand === 'Toyota') baseValue = 900000;
  if (tradeInDetails.brand === 'BMW' || tradeInDetails.brand === 'Mercedes') baseValue = 2500000;

  // Depreciation: 12% per year
  let depreciated = baseValue * Math.pow(0.88, age);

  // Mileage penalty: ₹3 per km above 30,000
  if (tradeInDetails.kms > 30000) {
    depreciated -= (tradeInDetails.kms - 30000) * 2.5;
  }

  // Condition multiplier
  const condEl = document.querySelector('input[name="tradeCond"]:checked')?.value || 'Good';
  if (condEl === 'Excellent') depreciated *= 1.08;
  if (condEl === 'Fair') depreciated *= 0.88;

  estimatedValuation = Math.max(150000, Math.round(depreciated));

  const minVal = Math.round(estimatedValuation * 0.95);
  const maxVal = Math.round(estimatedValuation * 1.05);

  const valRangeEl = document.getElementById('tradeValuationRange');
  const bonusValEl = document.getElementById('tradeBonusValuation');

  if (valRangeEl) valRangeEl.textContent = `${formatPrice(minVal)} - ${formatPrice(maxVal)}`;
  if (bonusValEl) bonusValEl.textContent = formatPrice(estimatedValuation + 50000); // Includes ₹50,000 bonus

  updateUpgradeDifference();
}

function renderUpgradeCarOptions() {
  const select = document.getElementById('targetUpgradeCar');
  if (!select) return;

  const vehicles = window.vehicles || [];
  select.innerHTML = vehicles.map(v => `
    <option value="${v.id}">${v.name} (${v.brand}) - ${formatPrice(v.price)}</option>
  `).join('');

  select.addEventListener('change', updateUpgradeDifference);
}

function updateUpgradeDifference() {
  const select = document.getElementById('targetUpgradeCar');
  if (!select) return;

  const targetId = parseInt(select.value);
  const vehicles = window.vehicles || [];
  const targetCar = vehicles.find(v => v.id === targetId) || vehicles[0];

  if (!targetCar) return;

  const bonusValue = estimatedValuation + 50000;
  const netPayable = Math.max(0, targetCar.price - bonusValue);
  const netEMI = Math.round((netPayable * 0.8 * (1 + 0.08 * 5)) / 60);

  const newPriceEl = document.getElementById('upgradeNewPrice');
  const tradeValueEl = document.getElementById('upgradeTradeValue');
  const netPayableEl = document.getElementById('upgradeNetPayable');
  const netEmiEl = document.getElementById('upgradeNetEMI');

  if (newPriceEl) newPriceEl.textContent = formatPrice(targetCar.price);
  if (tradeValueEl) tradeValueEl.textContent = `-${formatPrice(bonusValue)} (Includes ₹50k Exchange Bonus)`;
  if (netPayableEl) netPayableEl.textContent = formatPrice(netPayable);
  if (netEmiEl) netEmiEl.textContent = `${formatPrice(netEMI)}/month`;
}

window.bookDoorstepInspection = function(event) {
  event.preventDefault();
  
  if (window.showToast) window.showToast('Inspection Scheduled! Our valuation team will contact you shortly.', 'success');

  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal-container" style="max-width:500px; text-align:center; background:var(--clr-surface); padding:2.5rem; border-radius:var(--radius-lg); border:1px solid var(--clr-border);">
      <div style="font-size:3.5rem; margin-bottom:1rem;">🎉</div>
      <h3 style="font-weight:800; margin-bottom:0.5rem;">Doorstep Inspection Confirmed!</h3>
      <p style="font-size:0.9rem; color:var(--clr-text-muted); margin-bottom:1.5rem;">Appointment Reference: <strong>#KP-EX-${Math.floor(100000 + Math.random()*900000)}</strong>. Our evaluation expert will visit your doorstep for physical verification and instant spot payout!</p>
      <button onclick="this.closest('.modal-overlay').remove(); window.location.href='index.html'" class="btn btn-primary" style="width:100%;">Return to Home</button>
    </div>
  `;
  document.body.appendChild(modal);
};

function formatPrice(num) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
}
