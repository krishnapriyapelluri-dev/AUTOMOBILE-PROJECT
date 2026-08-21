/**
 * Krishna Priya Automobiles - VIP Concierge & Test Drive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initVIPLounge();
});

function initVIPLounge() {
  const urlParams = new URLSearchParams(window.location.search);
  const carParam = urlParams.get('car');

  populateVIPCarOptions(carParam);
  setMinTestDriveDate();
}

function populateVIPCarOptions(selectedCarName) {
  const select = document.getElementById('vipCarSelect');
  if (!select) return;

  const vehicles = window.vehicles || [];
  select.innerHTML = vehicles.map(v => `
    <option value="${v.name}" ${selectedCarName && selectedCarName.toLowerCase() === v.name.toLowerCase() ? 'selected' : ''}>
      ${v.name} (${v.brand})
    </option>
  `).join('');
}

function setMinTestDriveDate() {
  const dateInput = document.getElementById('vipDriveDate');
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow minimum
    dateInput.min = today.toISOString().split('T')[0];
  }
}

window.handleVIPBooking = function(event) {
  event.preventDefault();

  const name = document.getElementById('vipCustomerName')?.value || 'Valued Guest';
  const car = document.getElementById('vipCarSelect')?.value || 'Hyundai Creta';
  const date = document.getElementById('vipDriveDate')?.value || 'Tomorrow';
  const slot = document.getElementById('vipTimeSlot')?.value || '10:00 AM - 12:00 PM';
  const location = document.getElementById('vipLocation')?.value || 'Doorstep Address';

  const passCode = `VIP-KP-${Math.floor(100000 + Math.random() * 900000)}`;

  if (window.showToast) window.showToast('VIP Test Drive Scheduled Successfully!', 'success');

  // Render Luxury Digital Pass Modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal-container" style="max-width:550px; background:none; border:none; padding:0;">
      <div class="vip-pass-card">
        <button onclick="this.closest('.modal-overlay').remove()" style="position:absolute; top:16px; right:20px; color:#fff; font-size:1.5rem; background:none; border:none; cursor:pointer;">&times;</button>
        
        <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1.5rem;">
          <span style="font-size:1.6rem;">🏎️</span>
          <div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--clr-gold); font-family:var(--font-serif);">KRISHNA PRIYA AUTOMOBILES</div>
            <div style="font-size:0.75rem; letter-spacing:0.1em; color:rgba(255,255,255,0.7); text-transform:uppercase;">VIP DOORSTEP TEST DRIVE PASS</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(212,175,55,0.3); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1.5rem;">
          <div style="font-size:0.8rem; color:var(--clr-gold); text-transform:uppercase; font-weight:700;">PASS NUMBER</div>
          <div style="font-size:1.5rem; font-weight:900; letter-spacing:0.05em; font-family:monospace; margin-bottom:0.75rem;">${passCode}</div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.88rem;">
            <div><span style="color:rgba(255,255,255,0.6);">Guest Name:</span><br><strong>${name}</strong></div>
            <div><span style="color:rgba(255,255,255,0.6);">Selected Vehicle:</span><br><strong style="color:var(--clr-gold);">${car}</strong></div>
            <div><span style="color:rgba(255,255,255,0.6);">Scheduled Date:</span><br><strong>${date}</strong></div>
            <div><span style="color:rgba(255,255,255,0.6);">Time Window:</span><br><strong>${slot}</strong></div>
          </div>
        </div>

        <div style="font-size:0.8rem; color:rgba(255,255,255,0.7); margin-bottom:1.5rem; text-align:center;">
          📍 Delivery Location: <strong>${location}</strong><br>
          An executive car concierge will arrive in a sanitized, fuel-topped demo vehicle.
        </div>

        <div style="display:flex; gap:1rem;">
          <button onclick="window.print()" class="btn btn-gold btn-sm" style="flex:1;">🖨️ Download / Print Pass</button>
          <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-outline btn-sm" style="color:#fff; border-color:rgba(255,255,255,0.4); flex:1;">Close Pass</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};
