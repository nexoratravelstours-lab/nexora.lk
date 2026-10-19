/**
 * NEXORA Travels - Country-Specific Visa Inquiry Modal & WhatsApp Handoff
 * 
 * Complies with Prompt.md specifications:
 * - Automatically pre-selects clicked destination
 * - Validates all required fields
 * - Generates properly URL-encoded WhatsApp message (+94770500639)
 * - Transparent submission without claiming false backend processing
 * - Direct email option fallback (nexoratravels.tours@gmail.com)
 */

(function () {
  const WHATSAPP_NUMBER = "94770500639";
  const BUSINESS_EMAIL = "nexoratravels.tours@gmail.com";

  function setupInquiryModal() {
    const modal = document.getElementById("inquiryModal");
    const form = document.getElementById("visaInquiryForm");
    const closeBtn = document.getElementById("closeInquiryModalBtn");
    const cancelBtn = document.getElementById("cancelInquiryBtn");
    const countrySelect = document.getElementById("inquiryDestination");
    const formContainer = document.getElementById("inquiryFormContainer");
    const successContainer = document.getElementById("inquirySuccessContainer");
    const dynamicModalTitle = document.getElementById("dynamicModalTitle");
    const dynamicModalSubtitle = document.getElementById("dynamicModalSubtitle");

    if (!modal || !form) return;

    window.openInquiryModal = function (destinationName) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      // Reset form & state
      form.reset();
      clearErrors();
      if (formContainer && successContainer) {
        formContainer.style.display = "block";
        successContainer.style.display = "none";
      }

      // Pre-select country
      if (destinationName && countrySelect) {
        let matched = false;
        for (let i = 0; i < countrySelect.options.length; i++) {
          const opt = countrySelect.options[i];
          if (opt.value.toLowerCase() === destinationName.toLowerCase() ||
              opt.text.toLowerCase().includes(destinationName.toLowerCase())) {
            countrySelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched && destinationName.toLowerCase() !== "general") {
          // Check if "Other Schengen Destination"
          countrySelect.value = "Other Schengen Destination";
        }
      }

      // Update titles
      const currentSelected = countrySelect ? countrySelect.value : "";
      if (dynamicModalTitle) {
        dynamicModalTitle.textContent = currentSelected && currentSelected !== "Other Schengen Destination"
          ? `${currentSelected} Visit Visa Inquiry`
          : "Schengen Visit Visa Consultation";
      }
      if (dynamicModalSubtitle) {
        dynamicModalSubtitle.textContent = "Fill in your details below. Our visa specialists in Dehiwala will review your requirements.";
      }

      // Focus first input
      const firstInput = document.getElementById("inquiryFullName");
      if (firstInput) setTimeout(() => firstInput.focus(), 150);
    };

    window.closeInquiryModal = function () {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", window.closeInquiryModal);
    if (cancelBtn) cancelBtn.addEventListener("click", window.closeInquiryModal);

    // Close when clicking modal backdrop
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        window.closeInquiryModal();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        window.closeInquiryModal();
      }
    });

    // Dynamically update title when country selector changes
    if (countrySelect && dynamicModalTitle) {
      countrySelect.addEventListener("change", () => {
        const val = countrySelect.value;
        dynamicModalTitle.textContent = val && val !== "Other Schengen Destination"
          ? `${val} Visit Visa Inquiry`
          : "Schengen Visit Visa Consultation";
      });
    }

    // Attach listeners to all trigger buttons
    function attachTriggerButtons() {
      document.querySelectorAll("[data-inquire-country]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const country = btn.getAttribute("data-inquire-country");
          window.openInquiryModal(country);
        });
      });
    }

    attachTriggerButtons();
    // Expose for dynamic destination card rendering
    window.attachInquiryTriggers = attachTriggerButtons;

    // Validation helpers
    function showError(inputId, msg) {
      const errEl = document.getElementById(inputId + "Error");
      const inputEl = document.getElementById(inputId);
      if (errEl) {
        errEl.textContent = msg;
        errEl.style.display = "block";
      }
      if (inputEl) {
        inputEl.classList.add("input-error");
      }
    }

    function clearErrors() {
      document.querySelectorAll(".form-error-msg").forEach(el => {
        el.textContent = "";
        el.style.display = "none";
      });
      document.querySelectorAll(".input-error").forEach(el => {
        el.classList.remove("input-error");
      });
    }

    // Form Submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const fullName = (document.getElementById("inquiryFullName")?.value || "").trim();
      const email = (document.getElementById("inquiryEmail")?.value || "").trim();
      const phone = (document.getElementById("inquiryPhone")?.value || "").trim();
      const destination = (document.getElementById("inquiryDestination")?.value || "").trim();
      const purpose = (document.getElementById("inquiryPurpose")?.value || "").trim();
      const travelDate = (document.getElementById("inquiryDate")?.value || "").trim();
      const travelers = (document.getElementById("inquiryTravelers")?.value || "1").trim();
      const message = (document.getElementById("inquiryMessage")?.value || "").trim();

      let isValid = true;

      if (!fullName || fullName.length < 2) {
        showError("inquiryFullName", "Please provide your full legal name.");
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError("inquiryEmail", "Please enter a valid email address.");
        isValid = false;
      }

      if (!phone || phone.replace(/\D/g, "").length < 7) {
        showError("inquiryPhone", "Please provide a valid phone/WhatsApp number.");
        isValid = false;
      }

      if (!destination) {
        showError("inquiryDestination", "Please select a destination country.");
        isValid = false;
      }

      if (!purpose) {
        showError("inquiryPurpose", "Please specify your purpose of visit.");
        isValid = false;
      }

      if (!isValid) return;

      // Construct WhatsApp pre-filled text
      const waText = 
`*NEXORA Travels & Tours - Visa Inquiry*
---------------------------------------
*Destination:* ${destination}
*Applicant Name:* ${fullName}
*Phone / WhatsApp:* ${phone}
*Email:* ${email}
*Purpose of Visit:* ${purpose}
*Approx. Travel Date:* ${travelDate || "To be decided"}
*Travelers:* ${travelers}
*Special Notes:* ${message || "None provided"}
---------------------------------------
_Sent via Nexora Website Inquiry Portal_`;

      const encodedWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

      // Construct Email mailto link
      const emailSubject = encodeURIComponent(`Schengen Visa Inquiry - ${destination} - ${fullName}`);
      const emailBody = encodeURIComponent(waText.replace(/\*/g, ""));
      const mailtoUrl = `mailto:${BUSINESS_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

      // Populate Success Box
      const successCountry = document.getElementById("successSelectedCountry");
      const successApplicant = document.getElementById("successApplicantName");
      const successWaBtn = document.getElementById("successWhatsAppBtn");
      const successEmailBtn = document.getElementById("successEmailBtn");

      if (successCountry) successCountry.textContent = destination;
      if (successApplicant) successApplicant.textContent = fullName;
      if (successWaBtn) {
        successWaBtn.href = encodedWaUrl;
        successWaBtn.target = "_blank";
      }
      if (successEmailBtn) {
        successEmailBtn.href = mailtoUrl;
      }

      // Show confirmation view
      if (formContainer && successContainer) {
        formContainer.style.display = "none";
        successContainer.style.display = "block";
      }

      // Optional auto-open WhatsApp handoff in new tab
      // window.open(encodedWaUrl, '_blank');
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupInquiryModal);
  } else {
    setupInquiryModal();
  }
})();
