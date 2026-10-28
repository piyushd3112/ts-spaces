const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-navigation');
const menuIcon = menu?.innerHTML;
const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
function setMenu(open) {
  navigation.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.innerHTML = open ? closeIcon : menuIcon;
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

const form = document.querySelector('.inquiry-form');
if (form) {
  const workspace = new URLSearchParams(location.search).get('workspace');
  if (workspace) form.elements.workspace.value = workspace === 'Flexible Coworking Space' ? 'Coworking Space' : workspace;
  const button = form.querySelector('button');
  const originalButton = button.innerHTML;
  function showErrors(errors) {
    form.querySelectorAll('.field-error').forEach(element => element.remove());
    for (const field of form.querySelectorAll('input,select,textarea')) {
      field.removeAttribute('aria-describedby');
      field.setAttribute('aria-invalid', 'false');
    }
    for (const [name, message] of Object.entries(errors)) {
      const field = form.elements.namedItem(name);
      if (!field) continue;
      const error = document.createElement('small');
      error.id = `${name}-error`;
      error.className = 'field-error';
      error.textContent = message;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', error.id);
      field.after(error);
    }
    if (Object.keys(errors).length) {
      const alert = document.createElement('p');
      alert.className = 'field-error';
      alert.setAttribute('role', 'alert');
      alert.textContent = 'Please check the highlighted fields.';
      form.append(alert);
    }
  }
  function showStatus(message) {
    form.querySelector('.form-status')?.remove();
    if (!message) return;
    const status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.textContent = message;
    form.append(status);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    const payload = Object.fromEntries(new FormData(form));
    const data = Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, value.trim()]));
    const errors = {};
    if (data.name.length < 2 || data.name.length > 100) errors.name = 'Enter your name (2–100 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) errors.email = 'Enter a valid email address.';
    if (!/^[+\d\s()-]{7,25}$/.test(data.phone) || data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number.';
    if (!['Coworking Space', 'Dedicated Desk', 'Individual Seating', 'Conference Room', 'Startup Workspace', 'Other'].includes(data.workspace)) errors.workspace = 'Choose a workspace requirement.';
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
    if (data.date && (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date || data.date < today)) errors.date = 'Choose today or a future visit date.';
    if (data.message.length > 3000) errors.message = 'Keep your message within 3,000 characters.';
    showErrors(errors);
    showStatus('');
    if (Object.keys(errors).length) return;
    button.disabled = true;
    button.textContent = 'Sending enquiry…';
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) {
        showErrors(result.errors || {});
        throw new Error(result.message || 'Your enquiry could not be sent. Please try again later.');
      }
      showStatus('Your enquiry has been sent. A visit is only confirmed after our team agrees a time with you.');
      form.reset();
      form.elements.workspace.value = '';
    } catch (error) {
      showStatus(error instanceof Error ? error.message : 'Unable to connect. Please try again.');
    } finally {
      button.disabled = false;
      button.innerHTML = originalButton;
    }
  });
}
