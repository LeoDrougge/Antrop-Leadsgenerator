/**
 * Antrop Bot Widget - Embeddable Script
 * Usage: <div data-antrop-widget></div>
 *        <script src="https://antrop-leadsgenerator-4syq.vercel.app/embed.js"></script>
 */

(function () {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Find all widget containers
    const containers = document.querySelectorAll('[data-antrop-widget]');

    containers.forEach((container) => {
      // Don't initialize twice
      if (container.dataset.initialized === 'true') return;
      container.dataset.initialized = 'true';

      // Create widget
      createWidget(container);
    });
  }

  function createWidget(container) {
    // Get base URL (current domain or fallback)
    const baseUrl =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://antrop-leadsgenerator-4syq.vercel.app';

    // Load Martian Mono font if not already loaded
    if (!document.getElementById('antrop-widget-font')) {
      const link = document.createElement('link');
      link.id = 'antrop-widget-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500&display=swap';
      document.head.appendChild(link);
    }

    // Create widget HTML
    const widgetHTML = `
      <div class="antrop-widget" style="
        font-family: 'Martian Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, monospace !important;
        color: #AFDDD9 !important;
        background-color: #001A1A !important;
        box-sizing: border-box !important;
        margin: 0 !important;
        padding: 0 !important;
      ">
        <!-- Header -->
        <div class="antrop-widget-header" style="
          height: 72px !important;
          display: flex !important;
          border-bottom: 1px dashed #064848 !important;
          margin-bottom: 2rem !important;
          box-sizing: border-box !important;
        ">
          <div style="
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
            border-bottom: 1px dashed #064848 !important;
            box-sizing: border-box !important;
          ">
            <span style="
              font-family: 'Martian Mono', monospace !important;
              font-size: 0.875rem !important;
              font-weight: 500 !important;
              color: #6B8E8A !important;
              text-transform: uppercase !important;
              letter-spacing: -0.2px !important;
              line-height: 150% !important;
            ">Antrop bot</span>
          </div>
          <div style="
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            border-bottom: 1px dashed #064848 !important;
            box-sizing: border-box !important;
          ">
            <span style="
              font-family: 'Martian Mono', monospace !important;
              font-size: 0.875rem !important;
              font-weight: 500 !important;
              color: #6B8E8A !important;
              text-transform: uppercase !important;
              letter-spacing: -0.2px !important;
              line-height: 150% !important;
            ">v 0.2</span>
          </div>
        </div>

        <!-- Content -->
        <div class="antrop-widget-content" style="
          display: flex !important;
          flex-direction: column-reverse !important;
          gap: 2rem !important;
          box-sizing: border-box !important;
          align-items: flex-start !important;
        ">
          <!-- Left Column - Form -->
          <div style="
            display: flex !important;
            flex-direction: column !important;
            gap: 3rem !important;
            flex: 0 1 auto !important;
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: fit-content !important;
          ">
            <!-- Text -->
            <div class="antrop-widget-text" style="
              font-family: 'Martian Mono', monospace !important;
              font-size: clamp(1.5rem, 4vw, 2.5rem) !important;
              font-weight: 400 !important;
              line-height: 1.5 !important;
              color: #AFDDD9 !important;
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 0.5em !important;
              text-transform: uppercase !important;
              letter-spacing: -0.56px !important;
            ">
              <span style="white-space: nowrap !important;">JAG KOMMER FRÅN</span>
              <span
                class="antrop-widget-input"
                contenteditable="true"
                data-placeholder="MIN ARBETSPLATS"
                style="
                  font-family: 'Martian Mono', monospace !important;
                  color: #AFDDD9 !important;
                  text-decoration: underline !important;
                  text-underline-offset: 0.2em !important;
                  text-decoration-skip-ink: none !important;
                  outline: none !important;
                  min-width: 200px !important;
                  cursor: text !important;
                  caret-color: #08F9F9 !important;
                "
                onfocus="this.style.color='#AFDDD9'"
                onblur="if(!this.textContent.trim()) this.style.color='#6B8E8A'"
              ></span>
              <span style="white-space: nowrap !important;">OCH BEHÖVER HJÄLP MED</span>
              <span
                class="antrop-widget-input"
                contenteditable="true"
                data-placeholder="MIN UTMANING"
                style="
                  font-family: 'Martian Mono', monospace !important;
                  color: #AFDDD9 !important;
                  text-decoration: underline !important;
                  text-underline-offset: 0.2em !important;
                  text-decoration-skip-ink: none !important;
                  outline: none !important;
                  min-width: 200px !important;
                  cursor: text !important;
                  caret-color: #08F9F9 !important;
                "
                onfocus="this.style.color='#AFDDD9'"
                onblur="if(!this.textContent.trim()) this.style.color='#6B8E8A'"
              ></span>
            </div>

            <!-- Button and Disclaimer -->
            <div style="
              display: flex !important;
              flex-direction: column !important;
              gap: 0.5rem !important;
              box-sizing: border-box !important;
            ">
              <button
                class="antrop-widget-button"
                type="button"
                style="
                  font-family: 'Martian Mono', monospace !important;
                  font-size: 1rem !important;
                  font-weight: 500 !important;
                  display: inline-flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  gap: 1.75rem !important;
                  padding: 1rem 3rem !important;
                  border-radius: 9999px !important;
                  background-color: #AFDDD9 !important;
                  color: #001A1A !important;
                  border: 1.283px solid #0f3951 !important;
                  cursor: pointer !important;
                  transition: opacity 0.2s !important;
                  width: 100% !important;
                  max-width: 308px !important;
                  text-transform: uppercase !important;
                  letter-spacing: -0.2px !important;
                  line-height: 150% !important;
                  margin: 0 !important;
                "
                onmouseover="this.style.opacity='0.9'"
                onmouseout="this.style.opacity='1'"
              >
                <span>Se hur vi kan hjälpa dig</span>
                <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0 !important; display: block !important;">
                  <path d="M16.5 1L25 11L16.5 21M25 11H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>

              <!-- AI Disclaimer -->
              <p style="
                font-family: 'Martian Mono', monospace !important;
                font-size: 1rem !important;
                font-weight: 400 !important;
                line-height: 160% !important;
                letter-spacing: -0.64px !important;
                color: #6B8E8A !important;
                margin: 0 !important;
              ">Svaren skapas med hjälp av AI.</p>
            </div>
          </div>

          <!-- Right Column - Image -->
          <div style="
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          ">
            <img 
              src="${baseUrl}/Assets/start-illu.png" 
              alt="Start illustration"
              style="
                width: 218px !important;
                height: 196px !important;
                object-fit: contain !important;
                display: block !important;
                box-sizing: border-box !important;
              "
            />
          </div>
        </div>
      </div>

      <style>
        /* Reset and isolation for widget */
        .antrop-widget,
        .antrop-widget *,
        .antrop-widget *::before,
        .antrop-widget *::after {
          box-sizing: border-box !important;
        }

        /* Prevent WordPress theme interference */
        .antrop-widget {
          all: initial;
          display: block !important;
          font-family: 'Martian Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, monospace !important;
          color: #AFDDD9 !important;
          background-color: #001A1A !important;
        }

        @media (min-width: 640px) {
          .antrop-widget-content {
            flex-direction: row !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
          }
          .antrop-widget-content > div:first-child {
            flex: 1 !important;
            width: auto !important;
          }
          .antrop-widget-content > div:last-child {
            width: auto !important;
          }
        }
      </style>
    `;

    container.innerHTML = widgetHTML;

    // Override container height to allow content-based sizing
    container.style.setProperty('height', 'auto', 'important');
    container.style.setProperty('min-height', 'auto', 'important');
    container.style.setProperty('max-height', 'none', 'important');
    container.style.setProperty('overflow', 'visible', 'important');

    // Get elements
    const workplaceInput = container.querySelector('.antrop-widget-input:first-of-type');
    const needInput = container.querySelector('.antrop-widget-input:last-of-type');
    const button = container.querySelector('.antrop-widget-button');

    // Handle placeholder
    function handlePlaceholder(element) {
      if (!element.textContent.trim()) {
        element.textContent = '';
        element.style.color = '#6B8E8A';
      } else {
        element.style.color = '#AFDDD9';
      }
    }

    // Set up placeholders
    [workplaceInput, needInput].forEach((input) => {
      input.addEventListener('focus', function () {
        if (this.textContent === this.dataset.placeholder) {
          this.textContent = '';
        }
        this.style.color = '#AFDDD9';
      });

      input.addEventListener('blur', function () {
        if (!this.textContent.trim()) {
          this.textContent = this.dataset.placeholder;
          this.style.color = '#6B8E8A';
        }
      });

      input.addEventListener('input', function () {
        handlePlaceholder(this);
        updateButtonState();
      });

      // Initial placeholder
      if (!input.textContent.trim()) {
        input.textContent = input.dataset.placeholder;
        input.style.color = '#6B8E8A';
      }
    });

    // Update button state
    function updateButtonState() {
      const workplace = workplaceInput.textContent.trim();
      const need = needInput.textContent.trim();
      const hasPlaceholder =
        workplace === workplaceInput.dataset.placeholder ||
        need === needInput.dataset.placeholder;

      if (workplace && need && !hasPlaceholder) {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
      } else {
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
      }
    }

    // Handle submit
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const workplace = workplaceInput.textContent.trim();
      const need = needInput.textContent.trim();

      // Check for placeholders
      if (
        workplace === workplaceInput.dataset.placeholder ||
        need === needInput.dataset.placeholder ||
        !workplace ||
        !need
      ) {
        return;
      }

      // Open in new tab
      const params = new URLSearchParams({
        workplace: encodeURIComponent(workplace),
        need: encodeURIComponent(need),
      });

      window.open(`${baseUrl}/loading?${params.toString()}`, '_blank');
    });

    // Initial button state
    updateButtonState();
  }
})();

