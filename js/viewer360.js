/**
 * Krishna Priya Automobiles - Interactive 360° Vehicle Viewer & Visualizer
 */

(function () {
  let isDragging = false;
  let startX = 0;
  let currentAngle = 0; // 0 to 359 degrees
  let activeVehicle = null;
  let activeColor = null;

  // Color Swatches Database for Visualizer
  const vehicleColors = {
    'Abyss Black': '#121317',
    'Sizzling Red': '#c0392b',
    'Signature Teal Blue': '#0f766e',
    'Everest White': '#f8fafc',
    'Radiant Red': '#e11d48',
    'Intense Red': '#be123c',
    'Atlas Black': '#1e293b',
    'Deep Forest': '#14532d',
    'Pearl White': '#f1f5f9',
    'Premium Silver': '#94a3b8',
    'Phantom Black': '#090d16'
  };

  // Inject 360 Modal HTML dynamically if not present
  function ensure360Modal() {
    if (document.getElementById('modal360')) return;

    const modal = document.createElement('div');
    modal.id = 'modal360';
    modal.className = 'modal-360-backdrop';
    modal.innerHTML = `
      <div class="modal-360-container fade-in">
        <div class="modal-360-header">
          <div class="modal-360-title-wrap">
            <span class="badge-360">360° SHOWROOM EXPERIENCE</span>
            <h2 id="modal360CarTitle" class="modal-360-title">Vehicle Name</h2>
            <p id="modal360CarSub" class="modal-360-sub">Interactive Exterior & Interior View</p>
          </div>
          <button class="modal-360-close" id="close360Btn" aria-label="Close 360 Viewer">&times;</button>
        </div>

        <div class="modal-360-view-tabs">
          <button class="view-tab active" id="tabExterior"><span class="tab-icon">🔄</span> Exterior 360°</button>
          <button class="view-tab" id="tabInterior"><span class="tab-icon">🚘</span> Interior Panorama</button>
        </div>

        <div class="modal-360-canvas-wrap" id="canvas360Wrap">
          <div class="canvas-angle-indicator" id="angleIndicator">Angle: 0°</div>
          <div class="drag-hint" id="dragHint">
            <span class="hint-icon">↔️</span> Drag or Swipe to Rotate 360°
          </div>

          <!-- Exterior Interactive Display -->
          <div class="viewer-exterior-box" id="exteriorBox">
            <div class="vehicle-360-stage" id="stage360">
              <img id="image360" src="" alt="360 Vehicle View" class="vehicle-360-img">
              <div class="stage-shadow"></div>
              <div class="glow-backdrop" id="glowBackdrop"></div>
            </div>
          </div>

          <!-- Interior Interactive Display -->
          <div class="viewer-interior-box" id="interiorBox" style="display:none;">
            <div class="interior-card">
              <div class="interior-img-wrap">
                <img id="interiorImg" src="" alt="Interior View" class="interior-img">
                <div class="interior-hotspot" style="top: 45%; left: 35%;" data-tooltip="10.25-inch Touchscreen Infotainment with Apple CarPlay">📌</div>
                <div class="interior-hotspot" style="top: 60%; left: 50%;" data-tooltip="Ventilated Leatherette Seats with 8-way Power Adjustment">📌</div>
                <div class="interior-hotspot" style="top: 25%; left: 65%;" data-tooltip="Panoramic Sunroof with Voice Control">📌</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Color Selection Bar -->
        <div class="modal-360-footer">
          <div class="color-picker-wrap">
            <span class="color-label">Select Exterior Color:</span>
            <div class="color-swatches" id="colorSwatches"></div>
          </div>
          <div class="action-360-btns">
            <button class="btn btn-outline btn-sm" id="btnResetAngle">Reset Angle</button>
            <a href="contact.html" class="btn btn-primary btn-sm" id="btnBook360TD">Book Test Drive</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners for 360 Modal
    document.getElementById('close360Btn').addEventListener('click', close360);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close360();
    });

    const exteriorBox = document.getElementById('exteriorBox');
    const tabExterior = document.getElementById('tabExterior');
    const tabInterior = document.getElementById('tabInterior');
    const interiorBox = document.getElementById('interiorBox');

    tabExterior.addEventListener('click', () => {
      tabExterior.classList.add('active');
      tabInterior.classList.remove('active');
      exteriorBox.style.display = 'block';
      interiorBox.style.display = 'none';
      document.getElementById('angleIndicator').style.display = 'block';
      document.getElementById('dragHint').style.display = 'flex';
    });

    tabInterior.addEventListener('click', () => {
      tabInterior.classList.add('active');
      tabExterior.classList.remove('active');
      exteriorBox.style.display = 'none';
      interiorBox.style.display = 'block';
      document.getElementById('angleIndicator').style.display = 'none';
      document.getElementById('dragHint').style.display = 'none';
    });

    document.getElementById('btnResetAngle').addEventListener('click', () => {
      currentAngle = 0;
      updateRotation();
    });

    // Mouse & Touch Dragging Handlers
    const canvasWrap = document.getElementById('canvas360Wrap');

    const startDrag = (e) => {
      if (tabInterior.classList.contains('active')) return;
      isDragging = true;
      startX = e.pageX || (e.touches && e.touches[0].pageX);
      canvasWrap.style.cursor = 'grabbing';
      const dragHint = document.getElementById('dragHint');
      if (dragHint) dragHint.style.opacity = '0';
    };

    const doDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX || (e.touches && e.touches[0].pageX);
      const delta = x - startX;
      startX = x;
      
      // Calculate rotation sensitivity
      currentAngle = (currentAngle - Math.round(delta * 0.8)) % 360;
      if (currentAngle < 0) currentAngle += 360;
      
      updateRotation();
    };

    const stopDrag = () => {
      isDragging = false;
      canvasWrap.style.cursor = 'grab';
    };

    canvasWrap.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    canvasWrap.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);

    // Keyboard ESC key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        close360();
      }
    });
  }

  function updateRotation() {
    const angleElem = document.getElementById('angleIndicator');
    const imageElem = document.getElementById('image360');
    const glow = document.getElementById('glowBackdrop');

    if (angleElem) angleElem.textContent = `Angle: ${currentAngle}°`;
    
    // Simulate slight rotation perspective shift via CSS skew and scale transform for organic 3D feel
    const normalizedRad = (currentAngle * Math.PI) / 180;
    const scaleX = Math.cos(normalizedRad);
    const skewY = Math.sin(normalizedRad) * 4;

    if (imageElem) {
      imageElem.style.transform = `perspective(1000px) rotateY(${currentAngle}deg)`;
    }

    if (glow && activeColor) {
      const colorHex = vehicleColors[activeColor] || '#2563eb';
      glow.style.background = `radial-gradient(circle, ${colorHex}44 0%, transparent 70%)`;
    }
  }

  window.open360Viewer = function (carId) {
    ensure360Modal();
    const modal = document.getElementById('modal360');

    // Retrieve car details from window.vehicles if available
    let car = null;
    if (window.vehicles && Array.isArray(window.vehicles)) {
      car = window.vehicles.find(v => v.id === carId || v.name === carId);
    }

    if (!car) {
      car = {
        name: 'Krishna Priya Premium Vehicle',
        brand: 'Luxury',
        year: 2024,
        price: '₹15,000,000',
        color: 'Abyss Black',
        image: 'images/car_creta.jpg'
      };
    }

    activeVehicle = car;
    activeColor = car.color || 'Abyss Black';

    document.getElementById('modal360CarTitle').textContent = `${car.brand} ${car.name}`;
    document.getElementById('modal360CarSub').textContent = `${car.year} Model • ${car.fuel || 'Petrol'} • ${car.transmission || 'Automatic'}`;

    const img360 = document.getElementById('image360');
    img360.src = car.image;

    const interiorImg = document.getElementById('interiorImg');
    interiorImg.src = car.image; // Fallback or main image view

    // Build color swatches
    const colorSwatches = document.getElementById('colorSwatches');
    const colors = [car.color || 'Abyss Black', 'Sizzling Red', 'Everest White', 'Signature Teal Blue', 'Phantom Black'];
    
    colorSwatches.innerHTML = colors.map((colName, index) => {
      const hex = vehicleColors[colName] || '#1a56db';
      const isSel = index === 0 ? 'active' : '';
      return `
        <button class="color-swatch ${isSel}" style="background-color: ${hex};" title="${colName}" onclick="select360Color('${colName}', this)">
          <span class="swatch-check">✓</span>
        </button>
      `;
    }).join('');

    currentAngle = 0;
    updateRotation();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.select360Color = function (colorName, btnElem) {
    activeColor = colorName;
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(s => s.classList.remove('active'));
    if (btnElem) btnElem.classList.add('active');
    updateRotation();
  };

  function close360() {
    const modal = document.getElementById('modal360');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

})();
