/**
 * Krishna Priya Automobiles - AI Automotive Assistant ("Priya AI") & Quick Action Controller
 */

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    initAIAssistant();
    initStickyCompareBar();
  });

  function initAIAssistant() {
    // Check if assistant widget already rendered
    if (document.getElementById('aiAssistantBtn')) return;

    // Inject AI Assistant HTML into body
    const assistantHTML = `
      <button class="ai-assistant-btn" id="aiAssistantBtn" aria-label="Open AI Car Assistant">
        <span class="ai-assistant-pulse"></span>
        <span style="font-size:1.2rem;">🤖</span>
        <span>Ask Priya AI</span>
      </button>

      <div class="ai-assistant-window" id="aiAssistantWindow">
        <div class="ai-assistant-header">
          <div class="ai-assistant-title">
            <span style="font-size:1.4rem;">🏎️</span>
            <div>
              <div style="font-size:0.95rem; font-weight:800; color:var(--clr-text);">Priya AI Assistant</div>
              <div style="font-size:0.75rem; color:var(--clr-gold); font-weight:600;">Luxury Automotive Concierge</div>
            </div>
          </div>
          <button id="closeAIAssistant" style="font-size:1.4rem; color:var(--clr-text-muted); cursor:pointer; border:none; background:none;">&times;</button>
        </div>

        <div class="ai-assistant-messages" id="aiMessages">
          <div class="chat-bubble chat-bubble-bot">
            👋 Namaste! Welcome to Krishna Priya Automobiles. I'm your digital car consultant. How can I assist you today?
            <div class="chat-chip-container">
              <span class="chat-chip" onclick="handleChipClick('SUVs under ₹15 Lakhs')">🚙 SUVs under ₹15 Lakhs</span>
              <span class="chat-chip" onclick="handleChipClick('Electric Cars & Range')">⚡ EV Savings</span>
              <span class="chat-chip" onclick="handleChipClick('Book VIP Test Drive')">📅 VIP Test Drive</span>
              <span class="chat-chip" onclick="handleChipClick('Calculate Trade-in Value')">🔄 Trade-In Value</span>
            </div>
          </div>
        </div>

        <div class="ai-assistant-input-area">
          <input type="text" class="ai-assistant-input" id="aiInput" placeholder="Ask about mileage, SUVs, budget, EMI..." onkeypress="if(event.key==='Enter') sendAIMessage()">
          <button class="btn btn-primary btn-sm" onclick="sendAIMessage()" style="padding:0.5rem 0.9rem; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">➔</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', assistantHTML);

    const btn = document.getElementById('aiAssistantBtn');
    const win = document.getElementById('aiAssistantWindow');
    const closeBtn = document.getElementById('closeAIAssistant');

    btn.addEventListener('click', () => {
      win.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
      win.classList.remove('open');
    });
  }

  window.handleChipClick = function(text) {
    const input = document.getElementById('aiInput');
    if (input) {
      input.value = text;
      sendAIMessage();
    }
  };

  window.sendAIMessage = function() {
    const input = document.getElementById('aiInput');
    const messagesContainer = document.getElementById('aiMessages');
    if (!input || !input.value.trim() || !messagesContainer) return;

    const userText = input.value.trim();
    input.value = '';

    // Append user message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble chat-bubble-user';
    userBubble.textContent = userText;
    messagesContainer.appendChild(userBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble chat-bubble-bot';
    typingBubble.innerHTML = `<i>Priya AI is thinking...</i>`;
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      const botResponse = generateAIResponse(userText);
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble chat-bubble-bot';
      botBubble.innerHTML = botResponse;
      messagesContainer.appendChild(botBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
  };

  function generateAIResponse(query) {
    const q = query.toLowerCase();
    const veh = window.vehicles || [];

    if (q.includes('suv')) {
      const suvs = veh.filter(v => v.type === 'SUV');
      return `We have <strong>${suvs.length} flagship SUVs</strong> in our inventory including the Hyundai Creta, Mahindra XUV700, and Tata Harrier. <br><br><a href="vehicles.html?type=SUV" class="btn btn-primary btn-sm" style="margin-top:0.4rem;">Browse SUVs</a>`;
    }

    if (q.includes('electric') || q.includes('ev')) {
      return `⚡ <strong>Tata Nexon EV</strong> is our top recommendation! Features 320 km range per charge, 5-star NCAP safety, and savings up to ₹80,000/year on fuel. <br><br><a href="configurator.html?model=3" class="btn btn-gold btn-sm" style="margin-top:0.4rem;">Customize Nexon EV</a>`;
    }

    if (q.includes('test drive') || q.includes('vip') || q.includes('book')) {
      return `📅 You can schedule a <strong>VIP Doorstep Test Drive</strong> where our executive brings your selected luxury car right to your home or office! <br><br><a href="vip-lounge.html" class="btn btn-primary btn-sm" style="margin-top:0.4rem;">Book Doorstep Drive</a>`;
    }

    if (q.includes('trade') || q.includes('exchange') || q.includes('old car')) {
      return `🔄 Upgrade to a new car with our <strong>Instant Valuation Portal</strong>. Get up to ₹50,000 festive exchange bonus! <br><br><a href="tradein.html" class="btn btn-gold btn-sm" style="margin-top:0.4rem;">Calculate Valuation</a>`;
    }

    if (q.includes('compare')) {
      return `🔍 Compare any 3 cars side-by-side with full engine specs, safety ratings, 0-100 acceleration, and monthly EMI. <br><br><a href="compare.html" class="btn btn-outline btn-sm" style="margin-top:0.4rem;">Launch Car Comparer</a>`;
    }

    if (q.includes('15 lakh') || q.includes('budget') || q.includes('under')) {
      const budgetCars = veh.filter(v => v.price <= 1500000);
      return `Targeting under ₹15 Lakhs? Excellent choices include <strong>${budgetCars.slice(0, 3).map(c => c.name).join(', ')}</strong>. <br><br><a href="vehicles.html?price=1500000" class="btn btn-primary btn-sm" style="margin-top:0.4rem;">View Budget Inventory</a>`;
    }

    return `Krishna Priya Automobiles offers 150-point certified luxury vehicles, 7.99% low-interest EMI, and doorstep test drives in Jubilee Hills, Hyderabad. How else can I help?
    <div class="chat-chip-container" style="margin-top:0.6rem;">
      <span class="chat-chip" onclick="handleChipClick('Show me Sedans')">🚘 Sedans</span>
      <span class="chat-chip" onclick="handleChipClick('Compare Creta & XUV700')">⚔️ Creta vs XUV700</span>
    </div>`;
  }

  function initStickyCompareBar() {
    if (document.getElementById('compareStickyBar')) return;

    const barHTML = `
      <div class="compare-sticky-bar" id="compareStickyBar">
        <span style="font-size:1.2rem;">⚔️</span>
        <span id="compareStickyCount" style="font-weight:700; font-size:0.9rem;">0 Cars Selected</span>
        <a href="compare.html" class="btn btn-gold btn-sm" style="padding:0.4rem 0.9rem;">Compare Now</a>
        <button onclick="clearCompareBar()" style="color:var(--clr-text-muted); cursor:pointer; background:none; border:none; font-size:1.1rem;">&times;</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', barHTML);

    updateStickyCompareBar();
  }

  window.updateStickyCompareBar = function() {
    const selected = JSON.parse(localStorage.getItem('kp_compare_list') || '[]');
    const bar = document.getElementById('compareStickyBar');
    const countEl = document.getElementById('compareStickyCount');
    if (!bar || !countEl) return;

    if (selected.length > 0) {
      countEl.textContent = `${selected.length} Car${selected.length > 1 ? 's' : ''} in Compare`;
      bar.classList.add('active');
    } else {
      bar.classList.remove('active');
    }
  };

  window.clearCompareBar = function() {
    localStorage.removeItem('kp_compare_list');
    updateStickyCompareBar();
  };
})();
