const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const form = document.getElementById("uploadForm");
const result = document.getElementById("result");
const uploadBtn = document.getElementById("uploadBtn");

dropzone.addEventListener("click", () => fileInput.click());

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("border-blue-400", "bg-blue-50");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("border-blue-400", "bg-blue-50");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("border-blue-400", "bg-blue-50");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
  }
});

form.addEventListener("submit", async (e) => {
  const nom = document.getElementById("contact-name").value;
  const prenom = document.getElementById("contact-prenom").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;

  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) {
    result.textContent = "Aucun fichier sélectionné.";
    return;
  }

  uploadBtn.disabled = true;
  result.textContent = "Envoi en cours ...";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("nom", nom);
  formData.append("prenom", prenom);
  formData.append("email", email);

  try {
    const res = await fetch("https://upload-backend-pkab.onrender.com/api/upload-with-contact", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = "Erreur : " + err.message;
  } finally {
    uploadBtn.disabled = false;
  }
});

