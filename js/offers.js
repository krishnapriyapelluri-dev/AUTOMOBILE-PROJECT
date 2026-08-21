/**
 * Krishna Priya Automobiles - Festive Offers & Limited Deals Module
 */

document.addEventListener('DOMContentLoaded', () => {
  // Countdown Timer Logic
  const daysElem = document.getElementById('offerDays');
  const hoursElem = document.getElementById('offerHours');
  const minsElem = document.getElementById('offerMins');
  const secsElem = document.getElementById('offerSecs');

  if (daysElem && hoursElem && minsElem && secsElem) {
    // Target date 15 days from now
    const targetDate = new Date().getTime() + (15 * 24 * 60 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        daysElem.textContent = String(days).padStart(2, '0');
        hoursElem.textContent = String(hours).padStart(2, '0');
        minsElem.textContent = String(mins).padStart(2, '0');
        secsElem.textContent = String(secs).padStart(2, '0');
      }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
  }

  // Claim Offer Modal
  window.claimOfferModal = function(offerTitle) {
    const modal = document.getElementById('claimOfferModal');
    const titleSpan = document.getElementById('claimOfferTitle');

    if (modal) {
      if (titleSpan) titleSpan.textContent = offerTitle || 'Festive Offer Deal';
      modal.classList.add('active');
    }
  };

  window.closeClaimModal = function() {
    const modal = document.getElementById('claimOfferModal');
    if (modal) modal.classList.remove('active');
  };
});
