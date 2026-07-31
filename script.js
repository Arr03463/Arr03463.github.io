const projectList = document.querySelector("#project-list");
const projectStatus = document.querySelector("#project-status");
const dialog = document.querySelector("#case-study");
const caseContent = document.querySelector("#case-content");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
let projects = [];

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]);
const list = (items = []) => items.length ? `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";

function projectCard(project) {
  const links = [`<button class="card-link case-trigger" type="button" data-slug="${escapeHtml(project.slug)}">View case study <span aria-hidden="true">→</span></button>`];
  if (project.githubUrl) links.push(`<a class="card-link muted" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);
  return `<article class="project-card">
    <div class="project-visual"><img src="${escapeHtml(project.thumbnail || "assets/placeholders/technical-placeholder.svg")}" alt="${escapeHtml(project.imageAlt || "Abstract technical placeholder; authentic project media pending")}" width="720" height="405" loading="lazy"><span>${escapeHtml(project.projectType)}</span></div>
    <div class="project-body"><div class="card-meta"><span>${escapeHtml(project.categories[0])}</span><span class="status">${escapeHtml(project.status)}</span></div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><ul class="tool-list">${project.tools.slice(0, 5).map(tool => `<li>${escapeHtml(tool)}</li>`).join("")}</ul><div class="card-actions">${links.join("")}</div></div>
  </article>`;
}

function render(filter = "featured") {
  const filtered = projects.filter(project => filter === "all" || (filter === "featured" ? project.featured : project.projectType === filter || project.categories.includes(filter)));
  projectList.innerHTML = filtered.length ? filtered.map(projectCard).join("") : `<p class="empty-state">No projects match this filter yet.</p>`;
  projectStatus.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"} shown.`;
}

function section(title, content) { return content && (!Array.isArray(content) || content.length) ? `<section><h3>${title}</h3>${Array.isArray(content) ? list(content) : `<p>${escapeHtml(content)}</p>`}</section>` : ""; }

function openCaseStudy(slug) {
  const project = projects.find(item => item.slug === slug);
  if (!project) return;
  caseContent.innerHTML = `<header><p class="eyebrow">${escapeHtml(project.projectType)} · ${escapeHtml(project.status)}</p><h2 id="case-title">${escapeHtml(project.title)}</h2><p class="dialog-lead">${escapeHtml(project.summary)}</p></header><div class="dialog-tools">${project.tools.map(tool => `<span>${escapeHtml(tool)}</span>`).join("")}</div><div class="case-layout">${section("Challenge", project.challenge)}${section("My role", project.role)}${section("Constraints", project.constraints)}${section("Engineering process", project.process)}${section("Technical work", project.technicalDetails)}${section("Results", project.outcomes)}${section("Lessons learned", project.lessons)}${section("Next steps", project.nextSteps)}</div>${project.confidential ? `<aside class="confidentiality"><strong>Confidentiality</strong><p>This case study describes the engineering process and Aaron’s contributions at a generalized level. Proprietary product details, customer information, schematics, internal measurements, and confidential company information have been omitted.</p></aside>` : ""}`;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

document.querySelector(".filters").addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]"); if (!button) return;
  document.querySelectorAll(".filter").forEach(item => { item.classList.toggle("active", item === button); item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
  render(button.dataset.filter);
});
projectList.addEventListener("click", event => { const button = event.target.closest(".case-trigger"); if (button) openCaseStudy(button.dataset.slug); });
document.addEventListener("click", event => { const link = event.target.closest("[data-case-study]"); if (!link) return; event.preventDefault(); openCaseStudy(link.dataset.caseStudy); });
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
navToggle.addEventListener("click", () => { const open = navToggle.getAttribute("aria-expanded") === "true"; navToggle.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("open", !open); });
nav.addEventListener("click", event => { if (event.target.matches("a")) { nav.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false"); } });
document.querySelector("#year").textContent = new Date().getFullYear();

fetch("projects.json").then(response => { if (!response.ok) throw new Error(`Project data request failed: ${response.status}`); return response.json(); }).then(data => { projects = data; render(); }).catch(error => { console.error(error); projectList.innerHTML = `<p class="empty-state">Project data could not be loaded. Please view this site through its web address rather than opening the HTML file directly.</p>`; });
