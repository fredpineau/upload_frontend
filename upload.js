const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const uploadForm = document.getElementById('uploadForm');
const result = document.getElementById('result');
const uploadBtn = document.getElementById('uploadBtn');
const listBtn = document.getElementById('listBtn');

// Drag & drop UX
dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = '#8aa'; });
dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = ''; });
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f) fileInput.files = e.dataTransfer.files;
});

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) {
    result.textContent = 'Aucun fichier choisi.';
    return;
  }
  uploadBtn.disabled = true;
  result.textContent = 'Envoi en cours...';
  try {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('https://upload-backend-pkab.onrender.com/', { method: 'POST', body: fd });
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = 'Erreur: ' + err.message;
  } finally {
    uploadBtn.disabled = false;
  }
});

listBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('https://upload-backend-pkab.onrender.com/');
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = 'Erreur: ' + err.message;
  }
});
