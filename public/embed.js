/**
 * Antrop Bot Widget - Embeddable Script
 * Usage: <div data-antrop-widget></div>
 *        <script src="https://antrop-bot.vercel.app/embed.js"></script>
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
        : 'https://antrop-bot.vercel.app';

    // Create widget HTML
    const widgetHTML = `
      <div class="antrop-widget" style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #AFDDD9;
        background-color: #001A1A;
      ">
        <!-- Header -->
        <div class="antrop-widget-header" style="
          height: 72px;
          display: flex;
          border-bottom: 1px dashed #064848;
          margin-bottom: 2rem;
        ">
          <div style="
            flex: 1;
            display: flex;
            align-items: center;
            border-bottom: 1px dashed #064848;
          ">
            <span style="
              font-size: 0.875rem;
              font-weight: 500;
              color: #6B8E8A;
            ">Antrop bot</span>
          </div>
          <div style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-bottom: 1px dashed #064848;
          ">
            <span style="
              font-size: 0.875rem;
              font-weight: 500;
              color: #6B8E8A;
            ">v 0.2</span>
          </div>
        </div>

        <!-- Content -->
        <div class="antrop-widget-content" style="
          display: flex;
          flex-direction: column-reverse;
          gap: 2rem;
        ">
          <!-- Left Column - Form -->
          <div style="
            display: flex;
            flex-direction: column;
            gap: 3rem;
            flex: 1;
          ">
            <!-- Text -->
            <div class="antrop-widget-text" style="
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              font-weight: 500;
              line-height: 1.4;
              color: #AFDDD9;
              display: flex;
              flex-wrap: wrap;
              gap: 0.5em;
            ">
              <span style="white-space: nowrap;">JAG KOMMER FRÅN</span>
              <span
                class="antrop-widget-input"
                contenteditable="true"
                data-placeholder="MIN ARBETSPLATS"
                style="
                  color: #AFDDD9;
                  text-decoration: underline;
                  text-underline-offset: 0.2em;
                  outline: none;
                  min-width: 200px;
                  cursor: text;
                  caret-color: #08F9F9;
                "
                onfocus="this.style.color='#AFDDD9'"
                onblur="if(!this.textContent.trim()) this.style.color='#6B8E8A'"
              ></span>
              <span style="white-space: nowrap;">OCH BEHÖVER HJÄLP MED</span>
              <span
                class="antrop-widget-input"
                contenteditable="true"
                data-placeholder="MIN UTMANING"
                style="
                  color: #AFDDD9;
                  text-decoration: underline;
                  text-underline-offset: 0.2em;
                  outline: none;
                  min-width: 200px;
                  cursor: text;
                  caret-color: #08F9F9;
                "
                onfocus="this.style.color='#AFDDD9'"
                onblur="if(!this.textContent.trim()) this.style.color='#6B8E8A'"
              ></span>
            </div>

            <!-- Button and Disclaimer -->
            <div style="
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            ">
              <button
                class="antrop-widget-button"
                style="
                  font-size: 1rem;
                  font-weight: 500;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  gap: 1.75rem;
                  padding: 1rem 3rem;
                  border-radius: 9999px;
                  background-color: #AFDDD9;
                  color: #001A1A;
                  border: 1.283px solid #0f3951;
                  cursor: pointer;
                  transition: opacity 0.2s;
                  width: 100%;
                  max-width: 308px;
                "
                onmouseover="this.style.opacity='0.9'"
                onmouseout="this.style.opacity='1'"
              >
                <span>Se hur vi kan hjälpa dig</span>
                <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 1L25 11L16.5 21M25 11H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>

              <!-- AI Disclaimer -->
              <p style="
                font-size: 1rem;
                line-height: 1.5;
                color: #6B8E8A;
                margin: 0;
              ">Svaren skapas med hjälp av AI.</p>
            </div>
          </div>

          <!-- Right Column - Image -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 100%;
          ">
            <img 
              src="${baseUrl}/Assets/start-illu.png" 
              alt="Start illustration"
              style="
                width: 218px;
                height: 196px;
                object-fit: contain;
              "
            />
          </div>
        </div>
      </div>

      <style>
        @media (min-width: 640px) {
          .antrop-widget-content {
            flex-direction: row !important;
            align-items: flex-start;
            justify-content: space-between;
          }
          .antrop-widget-content > div:last-child {
            width: auto !important;
          }
        }
      </style>
    `;

    container.innerHTML = widgetHTML;

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

