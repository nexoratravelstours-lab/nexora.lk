/**
 * NEXORA Travels and Tours - Main Application Logic
 * Interactive UI, Destination Cards, Filter Tabs, FAQs, and Mobile Drawer
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Menu Drawer
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  mobileNavLinks.forEach(link => link.addEventListener("click", closeDrawer));

  // 2. Sticky Glassmorphism Header
  const siteHeader = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
  });

  // 3. Render Destination Cards dynamically if container exists
  const destinationsGrid = document.getElementById("destinationsGrid");
  if (destinationsGrid && window.SCHENGEN_DESTINATIONS) {
    renderDestinations(window.SCHENGEN_DESTINATIONS);
    setupFilterTabs();
  }

  function renderDestinations(destinations) {
    if (!destinationsGrid) return;
    destinationsGrid.innerHTML = "";

    destinations.forEach((dest, index) => {
      const card = document.createElement("div");
      card.className = "destination-card";
      card.setAttribute("data-region", dest.region);
      card.setAttribute("data-id", dest.id);

      card.innerHTML = `
        <div class="dest-card-inner">
          <div class="dest-image-wrapper">
            <img src="${dest.image}" alt="${dest.name} - ${dest.featuredLocation} travel visa assistance" class="dest-img" loading="lazy">
            <div class="dest-gradient-overlay"></div>
            <div class="dest-badge-top">
              <span class="dest-flag-badge">${dest.flag}</span>
              <span class="dest-location-badge"><i class="fa-solid fa-location-dot"></i> ${dest.featuredLocation}</span>
            </div>
            <div class="dest-quick-meta">
              <span><i class="fa-regular fa-clock"></i> ${dest.processingTime}</span>
              <span><i class="fa-solid fa-coins"></i> ${dest.currency}</span>
            </div>
          </div>
          <div class="dest-card-content">
            <div class="dest-country-header">
              <h3 class="dest-country-name">${dest.name}</h3>
              <span class="dest-schengen-tag">Schengen Member</span>
            </div>
            <p class="dest-description">${dest.description}</p>
            
            <div class="dest-highlights-preview">
              ${dest.highlights.map(h => `<span class="highlight-pill">${h}</span>`).join("")}
            </div>

            <div class="dest-card-footer">
              <button type="button" class="btn btn-primary btn-block dest-cta-btn" data-inquire-country="${dest.name}">
                <span>${dest.cta}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      // 3D Tilt Effect on mousemove
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      });

      destinationsGrid.appendChild(card);
    });

    // Reattach inquiry buttons
    if (window.attachInquiryTriggers) {
      window.attachInquiryTriggers();
    }
  }

  function setupFilterTabs() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filterVal = btn.getAttribute("data-filter");

        const cards = document.querySelectorAll(".destination-card");
        cards.forEach(card => {
          if (filterVal === "all" || card.getAttribute("data-region") === filterVal) {
            card.style.display = "block";
            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "none"; }, 50);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 4. FAQ Accordion Handling
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        // Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove("active");
        });
        if (!isActive) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  });

  // 5. Interactive Checklist Assistant (for Schengen page)
  const checklistInputs = document.querySelectorAll(".checklist-checkbox");
  const checklistCounter = document.getElementById("checklistCompletedCount");
  const checklistProgressBar = document.getElementById("checklistProgressBar");

  function updateChecklist() {
    if (!checklistInputs.length) return;
    let checkedCount = 0;
    checklistInputs.forEach(box => {
      if (box.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / checklistInputs.length) * 100);
    if (checklistCounter) checklistCounter.textContent = `${checkedCount} / ${checklistInputs.length} Documents Ready (${percent}%)`;
    if (checklistProgressBar) checklistProgressBar.style.width = `${percent}%`;
  }

  checklistInputs.forEach(input => {
    input.addEventListener("change", updateChecklist);
  });
  updateChecklist();
});
