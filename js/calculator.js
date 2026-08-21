/**
 * Krishna Priya Automobiles - Interactive Loan, EMI & Trade-In Estimator Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  const vehicleSelect = document.getElementById('emiVehicleSelect');
  const priceInput = document.getElementById('emiPrice');
  const downInput = document.getElementById('emiDown');
  const downPercentSlider = document.getElementById('emiDownPercent');
  const rateInput = document.getElementById('emiRate');
  const tenureInput = document.getElementById('emiTenure');

  const priceVal = document.getElementById('emiPriceVal');
  const downVal = document.getElementById('emiDownVal');
  const downPercentVal = document.getElementById('emiDownPercentVal');
  const rateVal = document.getElementById('emiRateVal');
  const tenureVal = document.getElementById('emiTenureVal');

  const amountDisplay = document.getElementById('emiAmount');
  const loanAmtDisplay = document.getElementById('emiLoanAmt');
  const totalInterestDisplay = document.getElementById('emiTotalInterest');
  const totalPaymentDisplay = document.getElementById('emiTotalPayment');
  const donut = document.getElementById('emiDonut');
  const scheduleTableBody = document.getElementById('amortizationTableBody');

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Populate Vehicle Selector Dropdown if available
  if (vehicleSelect && window.vehicles && Array.isArray(window.vehicles)) {
    vehicleSelect.innerHTML = '<option value="">Custom Vehicle Price</option>' + 
      window.vehicles.map(v => `<option value="${v.price}">${v.brand} ${v.name} (${formatINR(v.price)})</option>`).join('');

    vehicleSelect.addEventListener('change', (e) => {
      const selectedPrice = parseFloat(e.target.value);
      if (selectedPrice) {
        if (priceInput) priceInput.value = selectedPrice;
        if (downInput) downInput.value = Math.round(selectedPrice * 0.2);
        if (downPercentSlider) downPercentSlider.value = 20;
        calculateEMI();
      }
    });
  }

  // Linked Down Payment Percent Slider
  if (downPercentSlider && priceInput && downInput) {
    downPercentSlider.addEventListener('input', (e) => {
      const pct = parseFloat(e.target.value);
      const price = parseFloat(priceInput.value);
      downInput.value = Math.round((price * pct) / 100);
      calculateEMI();
    });
  }

  const calculateEMI = () => {
    if (!priceInput || !downInput || !rateInput || !tenureInput) return;

    let price = parseFloat(priceInput.value) || 1250000;
    let downPayment = parseFloat(downInput.value) || 250000;

    if (downPayment >= price) {
      downPayment = price - 10000;
      downInput.value = downPayment;
    }

    const pct = Math.round((downPayment / price) * 100);
    if (downPercentVal) downPercentVal.textContent = pct + '%';
    if (downPercentSlider && document.activeElement !== downPercentSlider) {
      downPercentSlider.value = pct;
    }

    const rate = parseFloat(rateInput.value) || 8.5;
    const tenureMonths = parseInt(tenureInput.value) || 60;

    if (priceVal) priceVal.textContent = formatINR(price);
    if (downVal) downVal.textContent = formatINR(downPayment);
    if (rateVal) rateVal.textContent = rate + '%';
    if (tenureVal) tenureVal.textContent = (tenureMonths / 12).toFixed(1) + ' Years (' + tenureMonths + ' Months)';

    const p = price - downPayment;
    const r = (rate / 12) / 100;
    const n = tenureMonths;

    let emi = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (p > 0 && r > 0) {
      emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      totalPayment = emi * n;
      totalInterest = totalPayment - p;
    }

    if (amountDisplay) amountDisplay.textContent = formatINR(emi);
    if (loanAmtDisplay) loanAmtDisplay.textContent = formatINR(p);
    if (totalInterestDisplay) totalInterestDisplay.textContent = formatINR(totalInterest);
    if (totalPaymentDisplay) totalPaymentDisplay.textContent = formatINR(totalPayment);

    // Update Visual Donut Chart
    if (donut && totalPayment > 0) {
      const principalPercentage = (p / totalPayment) * 100;
      donut.style.background = `conic-gradient(var(--clr-blue) 0% ${principalPercentage}%, var(--clr-gold) ${principalPercentage}% 100%)`;
    }

    // Render Yearly Amortization Schedule Table if exists
    if (scheduleTableBody) {
      renderAmortizationSchedule(p, r, n, emi);
    }
  };

  function renderAmortizationSchedule(principal, monthlyRate, months, emi) {
    let balance = principal;
    let html = '';
    const years = Math.ceil(months / 12);

    for (let yr = 1; yr <= years; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance -= principalForMonth;
      }

      if (balance < 0) balance = 0;

      html += `
        <tr>
          <td>Year ${yr}</td>
          <td>${formatINR(yearlyPrincipal)}</td>
          <td>${formatINR(yearlyInterest)}</td>
          <td>${formatINR(balance)}</td>
        </tr>
      `;
    }

    scheduleTableBody.innerHTML = html;
  }

  [priceInput, downInput, rateInput, tenureInput].forEach(input => {
    if (input) input.addEventListener('input', calculateEMI);
  });

  calculateEMI();

  // Trade-In Old Car Value Estimator Logic
  const tradeInForm = document.getElementById('tradeInForm');
  if (tradeInForm) {
    tradeInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const year = parseInt(document.getElementById('tiYear').value) || 2018;
      const brand = document.getElementById('tiBrand').value || 'Maruti Suzuki';
      const km = parseInt(document.getElementById('tiKm').value) || 45000;
      const condition = document.getElementById('tiCondition').value || 'Good';

      let baseVal = 450000;
      const age = 2026 - year;
      baseVal -= age * 40000;
      if (km > 50000) baseVal -= (km - 50000) * 2;
      if (condition === 'Excellent') baseVal *= 1.15;
      if (condition === 'Fair') baseVal *= 0.85;

      if (baseVal < 80000) baseVal = 80000;

      const exchangeBonus = 60000;
      const totalBenefit = baseVal + exchangeBonus;

      const resultContainer = document.getElementById('tradeInResult');
      if (resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
          <div style="background:var(--clr-surface); border:1px solid var(--clr-border-glow); padding:1.5rem; border-radius:var(--radius-md); margin-top:1.5rem;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--clr-gold); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:0.25rem;">Estimated Car Valuation</span>
            <div style="font-size:1.8rem; font-weight:800; color:var(--clr-text);">${formatINR(baseVal)}</div>
            <div style="font-size:0.85rem; color:var(--clr-green); font-weight:600; margin-top:0.2rem;">+ ₹60,000 Festive Exchange Bonus Included!</div>
            <div style="margin-top:1rem; padding-top:1rem; border-top:1px dashed var(--clr-border); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.9rem; font-weight:600;">Total Trade-In Value:</span>
              <strong style="font-size:1.3rem; color:var(--clr-blue);">${formatINR(totalBenefit)}</strong>
            </div>
            <a href="contact.html?tradein=true" class="btn btn-gold btn-sm" style="width:100%; margin-top:1rem; text-align:center;">Book Doorstep Physical Evaluation</a>
          </div>
        `;
      }
    });
  }
});
