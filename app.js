(() => {
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  const dialog = document.querySelector('[data-image-dialog]');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const fullImage = dialog.querySelector('[data-full-image]');
  const caption = dialog.querySelector('[data-image-caption]');
  document.querySelectorAll('[data-enlarge]').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      fullImage.src = source.currentSrc || source.src;
      fullImage.alt = source.alt;
      caption.textContent = button.dataset.caption || source.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => fullImage.removeAttribute('src'));
})();
