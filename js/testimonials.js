/**
 * Krishna Priya Automobiles - Customer Stories & Testimonials Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTestimonials();
});

const sampleReviews = [
  {
    id: 1,
    name: 'Rajesh & Swapna Rao',
    role: 'IT Director & Architect',
    car: 'Mahindra XUV700 AX7L',
    rating: 5,
    city: 'Jubilee Hills, Hyderabad',
    date: 'August 2024',
    image: 'images/car_xuv700.jpg',
    comment: 'Buying our XUV700 from Krishna Priya Automobiles was an absolute delight! The doorstep test drive concierge service made our choice effortless. Their exchange trade-in valuation for our old car was ₹45,000 higher than anywhere else.'
  },
  {
    id: 2,
    name: 'Dr. Ananya Reddy',
    role: 'Senior Cardiologist',
    car: 'Tata Nexon EV Empowered',
    rating: 5,
    city: 'Banjara Hills, Hyderabad',
    date: 'July 2024',
    image: 'images/car_nexon_ev.jpg',
    comment: 'The EV consultation team helped me calculate my monthly running cost savings (over ₹7,000/month!). Seamless doorstep delivery with full ceremonial ribbon unveiling. Highly professional team!'
  },
  {
    id: 3,
    name: 'Vikram & Priya Teja',
    role: 'Tech Entrepreneur',
    car: 'BMW 3 Series Gran Limousine',
    rating: 5,
    city: 'Gachibowli, Hyderabad',
    date: 'June 2024',
    image: 'images/car_honda_city.jpg',
    comment: 'Certified 150-point inspection quality gave me 100% confidence buying a pre-owned executive BMW. Car arrived in pristine showroom condition with 1-year comprehensive coverage.'
  },
  {
    id: 4,
    name: 'Srinivas Varma',
    role: 'Real Estate Developer',
    car: 'Hyundai Creta SX (O)',
    rating: 5,
    city: 'Kondapur, Hyderabad',
    date: 'August 2024',
    image: 'images/car_creta.jpg',
    comment: 'Fastest finance approval ever! 7.99% EMI rate approved within 2 hours. Delivery ceremony with home cake cutting made our family feel like royalty.'
  }
];

function initTestimonials() {
  renderReviews(sampleReviews);
}

function renderReviews(reviewsList) {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;

  container.innerHTML = reviewsList.map(r => `
    <div class="card" style="padding:1.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-lg); position:relative;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem;">
        <div style="display:flex; align-items:center; gap:0.85rem;">
          <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, var(--clr-gold), #b89028); color:#000; font-weight:800; font-size:1.2rem; display:flex; align-items:center; justify-content:center;">
            ${r.name.charAt(0)}
          </div>
          <div>
            <div style="font-weight:800; font-size:1.05rem;">${r.name}</div>
            <div style="font-size:0.8rem; color:var(--clr-text-muted);">${r.role} • ${r.city}</div>
          </div>
        </div>
        <div style="color:#eab308; font-size:1.1rem; font-weight:700;">
          ${'★'.repeat(r.rating)}
        </div>
      </div>

      <div style="margin-bottom:1rem; font-size:0.95rem; line-height:1.6; color:var(--clr-text); font-style:italic;">
        "${r.comment}"
      </div>

      <div style="margin-top:auto; padding-top:0.85rem; border-top:1px solid var(--clr-border); display:flex; justify-content:space-between; align-items:center; font-size:0.82rem;">
        <span style="font-weight:700; color:var(--clr-gold);">🚘 Purchased: ${r.car}</span>
        <span style="color:var(--clr-text-muted);">${r.date}</span>
      </div>
    </div>
  `).join('');
}

window.filterReviews = function(category) {
  if (category === 'all') {
    renderReviews(sampleReviews);
  } else if (category === '5star') {
    renderReviews(sampleReviews.filter(r => r.rating === 5));
  } else if (category === 'suv') {
    renderReviews(sampleReviews.filter(r => r.car.toLowerCase().includes('suv') || r.car.toLowerCase().includes('creta') || r.car.toLowerCase().includes('xuv')));
  } else if (category === 'ev') {
    renderReviews(sampleReviews.filter(r => r.car.toLowerCase().includes('ev')));
  }
};

window.openSubmitReviewModal = function() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.innerHTML = `
    <div class="modal-container" style="max-width:520px; background:var(--clr-surface); padding:2rem; border-radius:var(--radius-lg); border:1px solid var(--clr-border);">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--clr-border); padding-bottom:1rem; margin-bottom:1.5rem;">
        <h3 style="font-weight:800;">✍️ Share Your Showroom Experience</h3>
        <button onclick="this.closest('.modal-overlay').remove()" style="font-size:1.5rem; border:none; background:none; cursor:pointer;">&times;</button>
      </div>
      <form onsubmit="handleReviewSubmit(event)">
        <div class="form-group" style="margin-bottom:1rem;">
          <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">Your Full Name</label>
          <input type="text" id="reviewName" required class="form-control" placeholder="e.g. Ramesh Kumar" style="width:100%; padding:0.65rem 1rem; border-radius:var(--radius-md); border:1px solid var(--clr-border); background:var(--clr-bg);">
        </div>
        <div class="form-group" style="margin-bottom:1rem;">
          <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">Purchased Vehicle</label>
          <input type="text" id="reviewCar" required class="form-control" placeholder="e.g. Hyundai Creta 2024" style="width:100%; padding:0.65rem 1rem; border-radius:var(--radius-md); border:1px solid var(--clr-border); background:var(--clr-bg);">
        </div>
        <div class="form-group" style="margin-bottom:1rem;">
          <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">Rating</label>
          <select id="reviewRating" class="form-control" style="width:100%; padding:0.65rem 1rem; border-radius:var(--radius-md); border:1px solid var(--clr-border); background:var(--clr-bg);">
            <option value="5">⭐⭐⭐⭐⭐ (5/5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4/5 Stars)</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:1.5rem;">
          <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">Your Review Comments</label>
          <textarea id="reviewComment" required rows="4" class="form-control" placeholder="Describe your experience with our team, delivery ceremony, or car performance..." style="width:100%; padding:0.65rem 1rem; border-radius:var(--radius-md); border:1px solid var(--clr-border); background:var(--clr-bg);"></textarea>
        </div>
        <button type="submit" class="btn btn-gold" style="width:100%;">Publish Review</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
};

window.handleReviewSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('reviewName').value;
  const car = document.getElementById('reviewCar').value;
  const rating = parseInt(document.getElementById('reviewRating').value);
  const comment = document.getElementById('reviewComment').value;

  sampleReviews.unshift({
    id: Date.now(),
    name,
    role: 'Verified Car Buyer',
    car,
    rating,
    city: 'Hyderabad',
    date: 'Just Now',
    comment
  });

  renderReviews(sampleReviews);
  event.target.closest('.modal-overlay').remove();
  if (window.showToast) window.showToast('Thank you! Your story has been published.', 'success');
};
