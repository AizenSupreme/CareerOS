"use strict";

/* ================================================================
   CareerOS — Week 1 practice prototype
   Vanilla JavaScript, no dependencies, no server.
   Data lives only in this browser (localStorage) — disclosed in the UI.
   ================================================================ */

/* ---------- 1. Constants (the catalogue placeholders) ---------- */

// Demo career list for this exercise. The real career catalogue
// (FR-CR-01) arrives with the database phase.
const CAREERS = [
  "Data Analyst",
  "Frontend Developer",
  "Backend Developer",
  "QA Engineer",
  "Product Analyst",
];

// Canonical skill records (FR-UP-02): we store the id, display the name.
const SKILLS = [
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "javascript", name: "JavaScript" },
  { id: "git", name: "Git" },
  { id: "python", name: "Python" },
  { id: "sql", name: "SQL" },
  { id: "communication", name: "Communication" },
  { id: "excel", name: "Excel" },
];

// Proficiency scale — ratified decision D1.
// null = "Not assessed": no evidence. It is NOT a low level.
const LEVELS = [
  { value: 1, label: "Novice" },
  { value: 2, label: "Beginner" },
  { value: 3, label: "Competent" },
  { value: 4, label: "Advanced" },
];

// Required profile fields (FR-UP-06). Used for validation,
// completion counting, and next steps — all derived from real data.
const REQUIRED_FIELDS = [
  { key: "name", inputId: "name", message: "Enter your name." },
  { key: "education", inputId: "education", message: "Select your education." },
  { key: "targetCareer", inputId: "targetCareer", message: "Select a target career." },
  { key: "weeklyTime", inputId: "weeklyTime", message: "Select your weekly learning time." },
];

const SCHEMA_VERSION = 1;
const STORAGE_KEY = "careeros.profile.v" + SCHEMA_VERSION;

/* ---------- 2. State ---------- */

let profile = { name: "", education: "", interests: [], targetCareer: "", weeklyTime: "" };
let skills = []; // { skillId, level: null | 1..4, source: "self-reported" }
let dirty = false;
let storageOk = false;

/* ---------- 3. Helpers ---------- */

function $(id) { return document.getElementById(id); }

function levelLabel(value) {
  if (value === null) return "Not assessed";
  const found = LEVELS.find(function (l) { return l.value === value; });
  return found ? found.label : "Not assessed";
}

function storageAvailable() {
  try {
    window.localStorage.setItem("careeros-test", "1");
    window.localStorage.removeItem("careeros-test");
    return true;
  } catch (err) {
    return false;
  }
}

function setDirty() {
  dirty = true;
  $("dirty-pill").hidden = false;
  $("dirty-ok").hidden = true;
}

function clearDirty() {
  dirty = false;
  $("dirty-pill").hidden = true;
  $("dirty-ok").hidden = false;
}

// Show a save/validation message under the heading (UI-02 states).
function status(message, kind) {
  const el = $("form-status");
  if (!message) { el.hidden = true; el.textContent = ""; return; }
  el.textContent = message;
  el.className = "status " + (kind === "error" ? "error" : "ok");
  el.hidden = false;
}

/* ---------- 4. Load / persist ---------- */

function load() {
  if (!storageOk) return;
  let raw = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (err) { return; }
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data && data.schema === SCHEMA_VERSION) {
      if (data.profile) {
        profile = {
          name: String(data.profile.name || ""),
          education: String(data.profile.education || ""),
          interests: Array.isArray(data.profile.interests) ? data.profile.interests : [],
          targetCareer: String(data.profile.targetCareer || ""),
          weeklyTime: String(data.profile.weeklyTime || ""),
        };
      }
      skills = Array.isArray(data.skills) ? data.skills : [];
    }
  } catch (err) {
    // Corrupted data: start empty rather than fail the page (NFR-05).
  }
}

function savedCopyExists() {
  if (!storageOk) return false;
  try { return window.localStorage.getItem(STORAGE_KEY) !== null; }
  catch (err) { return false; }
}

/* ---------- 5. Rendering ---------- */

function fillSelect(id, items, placeholder) {
  const select = $(id);
  select.innerHTML =
    '<option value="">' + placeholder + "</option>" +
    items.map(function (item) {
      const value = item.id || item;
      const label = item.name || item;
      return '<option value="' + value + '">' + label + "</option>";
    }).join("");
}

function levelOptionsHtml(selected) {
  const washed = selected === null || selected === undefined ? null : Number(selected);
  return LEVELS.map(function (l) {
    const selectedAttr = l.value === washed ? " selected" : "";
    return '<option value="' + l.value + '"' + selectedAttr + ">" + l.label + "</option>";
  }).join("");
}

// Reflect the state into the profile form controls.
function reflectProfileToForm() {
  $("name").value = profile.name;
  $("education").value = profile.education;
  $("targetCareer").value = profile.targetCareer;
  $("weeklyTime").value = profile.weeklyTime;
  const checks = document.querySelectorAll('input[name="interests"]');
  checks.forEach(function (checkbox) {
    checkbox.checked = profile.interests.indexOf(checkbox.value) !== -1;
  });
}

function renderSkills() {
  const list = $("skills-list");
  if (skills.length === 0) {
    list.innerHTML =
      '<li class="skill-row empty">No skills yet — that is allowed. Add one below if you want.</li>';
    return;
  }
  list.innerHTML = skills.map(function (skillRow, index) {
    const record = SKILLS.find(function (k) { return k.id === skillRow.skillId; });
    const name = record ? record.name : skillRow.skillId;
    return (
      '<li class="skill-row">' +
        '<span class="skill-main">' +
          '<span class="skill-name">' + name + "</span>" +
          '<span class="source-badge">self-reported</span>' +
        "</span>" +
        '<label class="compact-label">Level ' +
          '<select class="level" data-idx="' + index + '" aria-label="Level for ' + name + '">' +
            '<option value="">Not assessed</option>' +
            levelOptionsHtml(skillRow.level) +
          "</select>" +
        "</label>" +
        '<button type="button" class="btn btn-ghost btn-remove" data-idx="' + index +
          '" aria-label="Remove ' + name + '">Remove</button>' +
      "</li>"
    );
  }).join("");

  list.querySelectorAll("select.level").forEach(function (select) {
    select.addEventListener("change", onLevelChange);
  });
  list.querySelectorAll("button.btn-remove").forEach(function (button) {
    button.addEventListener("click", onRemoveSkill);
  });
}

function completion() {
  let done = 0;
  REQUIRED_FIELDS.forEach(function (field) {
    if (String(profile[field.key]).trim() !== "") done++;
  });
  return { done: done, total: REQUIRED_FIELDS.length };
}

function renderCompletion() {
  const result = completion();
  $("completion-text").textContent = result.done + " of " + result.total + " required fields complete";
  $("meter").setAttribute("aria-label", result.done + " of " + result.total + " required fields complete");
  $("meter-fill").style.width = Math.round((result.done / result.total) * 100) + "%";
}

// Next steps are derived ONLY from the current state. No invented data.
function renderNextSteps() {
  const steps = [];

  REQUIRED_FIELDS.forEach(function (field) {
    if (String(profile[field.key]).trim() === "") {
      const labels = {
        name: "your name",
        education: "your education",
        targetCareer: "a target career",
        weeklyTime: "your weekly learning time",
      };
      steps.push('<li><a href="#field-' + field.key + '">Add ' + labels[field.key] + "</a></li>");
    }
  });

  if (skills.length === 0) {
    steps.push("<li>Add your first skill — optional, skip it if you prefer.</li>");
  }

  const unassessed = skills.filter(function (s) { return s.level === null; });
  unassessed.forEach(function (row) {
    const record = SKILLS.find(function (k) { return k.id === row.skillId; });
    const name = record ? record.name : row.skillId;
    steps.push('<li><a href="#skills-h">Assess ' + name +
      " — currently Not assessed</a></li>");
  });

  if (steps.length === 0) {
    steps.push('<li class="done">Profile complete. Career recommendations arrive in a later phase — not built yet.</li>');
  }

  $("next-steps").innerHTML = steps.join("");
}

function updateSavedPanel() {
  const exists = savedCopyExists();
  const note = storageOk
    ? (exists
        ? "A saved copy exists in this browser. Saving overwrites it."
        : "No saved copy yet. Saving writes to this browser only.")
    : "Storage is unavailable in this browser or context — the page works, saving is disabled.";
  $("storage-note").textContent = note;
  $("clear-btn").disabled = !storageOk || !exists;
}

/* ---------- 6. Events ---------- */

function onProfileFieldChange(event) {
  const target = event.target;
  if (target.name === "interests") {
    const checks = document.querySelectorAll('input[name="interests"]');
    profile.interests = [];
    checks.forEach(function (checkbox) {
      if (checkbox.checked) profile.interests.push(checkbox.value);
    });
  } else if (profile.hasOwnProperty(target.name)) {
    profile[target.name] = target.value;
    clearFieldError(target.name);
  }
  setDirty();
  renderCompletion();
  renderNextSteps();
}

function onLevelChange(event) {
  const index = Number(event.target.getAttribute("data-idx"));
  const value = event.target.value;
  skills[index].level = value === "" ? null : Number(value);
  setDirty();
  renderNextSteps();
}

function onRemoveSkill(event) {
  const index = Number(event.currentTarget.getAttribute("data-idx"));
  skills.splice(index, 1);
  setDirty();
  renderSkills();
  renderNextSteps();
}

function onAddSkill(event) {
  event.preventDefault();
  const errorBox = $("skill-error");
  errorBox.hidden = true;

  const skillId = $("skill-name").value;
  const levelValue = $("skill-level").value;

  if (!skillId) {
    errorBox.textContent = "Choose a skill first.";
    errorBox.hidden = false;
    return;
  }
  const duplicate = skills.some(function (s) { return s.skillId === skillId; });
  if (duplicate) {
    errorBox.textContent = "That skill is already in your list.";
    errorBox.hidden = false;
    return;
  }

  skills.push({
    skillId: skillId,
    level: levelValue === "" ? null : Number(levelValue),
    source: "self-reported",
  });
  $("skill-name").value = "";
  $("skill-level").value = "";
  setDirty();
  renderSkills();
  renderNextSteps();
}

function clearFieldError(key) {
  const input = $(key);
  const wrapper = $("field-" + key);
  const message = $("error-" + key);
  if (input) input.removeAttribute("aria-invalid");
  if (wrapper) wrapper.classList.remove("invalid");
  if (message) { message.hidden = true; message.textContent = ""; }
}

function showFieldErrors(errors) {
  const summaryList = $("error-summary-list");
  summaryList.innerHTML = errors.map(function (err) {
    return '<li><a href="#field-' + err.key + '">' + err.message + "</a></li>";
  }).join("");
  $("error-summary").hidden = false;

  errors.forEach(function (err) {
    const input = $(err.inputId);
    const wrapper = $("field-" + err.key);
    const message = $("error-" + err.key);
    if (input) input.setAttribute("aria-invalid", "true");
    if (wrapper) wrapper.classList.add("invalid");
    if (message) { message.textContent = err.message; message.hidden = false; }
  });

  const first = errors[0];
  if (first) {
    const firstInput = $(first.inputId);
    if (firstInput) firstInput.focus();
  }
}

function onSave(event) {
  event.preventDefault();
  status("");

  // Start clean: any field that passes now loses its old red styling.
  REQUIRED_FIELDS.forEach(function (field) { clearFieldError(field.key); });

  const errors = REQUIRED_FIELDS.filter(function (field) {
    return String(profile[field.key]).trim() === "";
  }).map(function (field) {
    return { key: field.key, inputId: field.inputId, message: field.message };
  });

  if (errors.length > 0) {
    showFieldErrors(errors);
    return;
  }

  if (!storageOk) {
    $("error-summary").hidden = true;
    status("Cannot save: browser storage is unavailable in this context. Your edits exist only on this screen.", "error");
    return;
  }

  let saved = false;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ schema: SCHEMA_VERSION, profile: profile, skills: skills })
    );
    saved = true;
  } catch (err) {
    status("Saving failed: " + (err && err.message ? err.message : "storage error") + ".", "error");
  }
  if (!saved) return;

  $("error-summary").hidden = true;
  clearDirty();
  status("Profile saved in this browser. It is not sent anywhere else.", "ok");
  updateSavedPanel();
}

function onClearSaved() {
  if (!window.confirm("Clear the saved profile from this browser?")) return;
  try { window.localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
  profile = { name: "", education: "", interests: [], targetCareer: "", weeklyTime: "" };
  skills = [];
  reflectProfileToForm();
  renderSkills();
  renderCompletion();
  renderNextSteps();
  updateSavedPanel();
  clearDirty();
  status("Saved data cleared.", "ok");
}

/* ---------- 7. Boot ---------- */

function init() {
  storageOk = storageAvailable();

  fillSelect("targetCareer", CAREERS, "Choose…");
  fillSelect("skill-name", SKILLS, "Choose a skill…");

  load();
  reflectProfileToForm();
  renderSkills();
  renderCompletion();
  renderNextSteps();
  updateSavedPanel();

  const form = $("profile-form");
  form.addEventListener("submit", onSave);
  form.addEventListener("change", onProfileFieldChange);
  form.addEventListener("input", onProfileFieldChange);

  $("skill-form").addEventListener("submit", onAddSkill);
  $("clear-btn").addEventListener("click", onClearSaved);

  // Warn before leaving with unsaved edits.
  window.addEventListener("beforeunload", function (event) {
    if (dirty) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
