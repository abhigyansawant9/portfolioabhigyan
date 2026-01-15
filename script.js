// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Active nav highlight on scroll
const sections = ["home", "about", "skills", "projects", "contact"].map(id => document.getElementById(id));
const navAnchors = Array.from(document.querySelectorAll(".nav-link"));

function setActiveLink() {
  const scrollPos = window.scrollY + 140;
  let current = "home";

  for (const sec of sections) {
    if (sec.offsetTop <= scrollPos) current = sec.id;
  }

  navAnchors.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${current}`);
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Project filter
const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
const projects = Array.from(document.querySelectorAll(".project"));

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.dataset.filter;
    projects.forEach(card => {
      const tags = (card.dataset.tags || "").toLowerCase();
      const show = f === "all" ? true : tags.includes(f);
      card.style.display = show ? "" : "none";
    });
  });
});

// Copy email
const emailLink = document.getElementById("emailLink");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");

copyEmailBtn.addEventListener("click", async () => {
  const email = (emailLink.textContent || "").trim();
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "✅ Email copied!";
    setTimeout(() => (copyStatus.textContent = ""), 1500);
  } catch {
    copyStatus.textContent = "Copy failed. You can manually copy the email.";
    setTimeout(() => (copyStatus.textContent = ""), 2000);
  }
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Case Study Modal
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const caseStudies = {
  p1: {
    title: "Sales & Revenue Dashboard — Case Study",
    html: `
      <h4>Problem</h4>
      <p>Stakeholders needed a quick way to track revenue trends, category performance, and growth across regions.</p>

      <h4>Approach</h4>
      <ul>
        <li>Prepared and cleaned data (SQL/Python)</li>
        <li>Defined KPIs: Total Revenue, Total Orders, AOV, Growth %</li>
        <li>Built interactive visuals and filters in Power BI</li>
      </ul>

      <h4>Key Insights</h4>
      <ul>
        <li>Top categories contributed the highest revenue share</li>
        <li>Some regions showed consistent growth momentum</li>
        <li>Clear seasonality patterns affected performance</li>
      </ul>

      <h4>Outcome</h4>
      <p>A dashboard that enables faster decisions with clear metrics and trends.</p>
    `
  },
  p2: {
    title: "Student Mental Health Analysis — Case Study",
    html: `
      <h4>Problem</h4>
      <p>Understand patterns and risk indicators related to student mental health using a real dataset.</p>

      <h4>Approach</h4>
      <ul>
        <li>Cleaned missing values and standardized fields</li>
        <li>Exploratory analysis (distributions, comparisons)</li>
        <li>Visualizations to communicate key patterns</li>
      </ul>

      <h4>Key Insights</h4>
      <ul>
        <li>Identified segments with higher stress indicators</li>
        <li>Noted relationships between factors and outcomes</li>
        <li>Summarized findings into actionable points</li>
      </ul>

      <h4>Outcome</h4>
      <p>A clear analysis report and visuals that explain the dataset.</p>
    `
  },
  p3: {
    title: "Operations & Delivery Analysis — Case Study",
    html: `
      <h4>Problem</h4>
      <p>Measure delivery performance and diagnose where delays happen to improve operational efficiency.</p>

      <h4>Approach</h4>
      <ul>
        <li>Created metrics: delivery time, delay days, on-time rate</li>
        <li>Segmented delays by region/category/time</li>
        <li>Prepared insights for stakeholders</li>
      </ul>

      <h4>Key Insights</h4>
      <ul>
        <li>Delay hotspots concentrated in specific segments</li>
        <li>Certain categories had higher delay risk</li>
        <li>Suggested improvements based on patterns</li>
      </ul>

      <h4>Outcome</h4>
      <p>Operational insights to support better planning and performance.</p>
    `
  }
};

function openModal(key) {
  const cs = caseStudies[key];
  if (!cs) return;

  document.getElementById("modalTitle").textContent = cs.title;
  modalBody.innerHTML = cs.html;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function hideModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.open));
});

closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) hideModal();
});
