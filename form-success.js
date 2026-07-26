(() => {
  const modal = document.getElementById("formSuccessModal");
  const forms = document.querySelectorAll(".js-success-form");

  if (!modal || forms.length === 0) return;

  const title = modal.querySelector("#formSuccessTitle");
  const message = modal.querySelector("#formSuccessMessage");
  const closeButtons = modal.querySelectorAll(
    ".form-success-close, .form-success-confirm",
  );
  let lastFocusedElement = null;

  const openModal = (form) => {
    lastFocusedElement = document.activeElement;
    title.textContent =
      form.dataset.successTitle || "Registration Successful!";
    message.textContent =
      form.dataset.successMessage ||
      "Your information was submitted successfully.";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("form-modal-open");
    modal.querySelector(".form-success-close").focus();
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("form-modal-open");

    if (lastFocusedElement) lastFocusedElement.focus();
  };

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      openModal(form);
      form.reset();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();
