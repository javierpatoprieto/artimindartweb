// ===== API Client for frontend forms =====

const API_BASE = '';

// Contact form submission
export function setupContactForm() {
  const form = document.querySelector('#contact form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const originalText = button.textContent;

    try {
      const formData = new FormData(form);
      const data = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        company: formData.get('company') || '',
        project_type: formData.get('project_type') || '',
        budget: document.querySelector('input[name="b"]:checked')?.nextElementSibling?.textContent || '',
        message: formData.get('message') || '',
        source: 'landing',
      };

      button.textContent = 'Sending...';
      button.disabled = true;

      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        button.textContent = 'Sent ✓';
        button.style.background = 'var(--neon)';
        form.reset();
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.disabled = false;
        }, 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      button.textContent = 'Try again ✗';
      button.style.background = 'var(--danger, #ef4444)';
      console.error('Form error:', err);
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
      }, 2000);
    }
  });
}

// Pricing CTA buttons
export function setupPricingCheckout() {
  const buttons = document.querySelectorAll('.plan .btn.primary');

  buttons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      const email = prompt('Enter your email to proceed with payment:');
      if (!email) return;

      const plan = btn.closest('.plan')?.querySelector('h4')?.textContent?.toLowerCase() || 'spark';
      const originalText = btn.textContent;

      try {
        btn.textContent = 'Loading...';
        btn.disabled = true;

        const res = await fetch(`${API_BASE}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, email }),
        });

        if (!res.ok) throw new Error('Checkout failed');

        const { url } = await res.json();
        if (url) {
          window.location.href = url;
        }
      } catch (err) {
        console.error('Checkout error:', err);
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Payment setup failed. Please try again.');
      }
    });
  });
}

// Newsletter signup
export function setupNewsletter() {
  const form = document.querySelector('footer form') || document.querySelector('[role="subscribe"] form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');

    if (!input?.value) return;

    try {
      button.disabled = true;
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });

      if (res.ok) {
        button.textContent = 'Check your email ✓';
        input.value = '';
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      button.textContent = 'Try again';
    } finally {
      button.disabled = false;
    }
  });
}

// Initialize all forms
export function initializeForms() {
  setupContactForm();
  setupPricingCheckout();
  setupNewsletter();
}

// Auto-init if loaded as module
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeForms);
}
