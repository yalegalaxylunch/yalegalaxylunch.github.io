  // scripts.js
window.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("header-container").innerHTML = html;
    });
  // Load schedule if applicable
  if (document.getElementById("schedule-body")) {
    const jsonPath = window.scheduleJsonPath || `schedule.json`;
    loadSchedule(jsonPath);
  }

});

  function includeHTML(id, file) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch ${file}`);
        return response.text();
      })
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(err => console.error(err));
  }

document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll("details.abstract-toggle");

    toggles.forEach((toggle, index) => {
    const abstractRow = toggle.closest("tr").nextElementSibling;

    toggle.addEventListener("toggle", () => {
        if (toggle.open) {
        abstractRow.classList.remove("hidden");
        } else {
        abstractRow.classList.add("hidden");
        }
    });
    });
});


function loadSchedule(jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("schedule-body");
      data.forEach((entry, index) => {
        // Row for the main talk entry
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.date}</td>
          <td>${entry.speaker}</td>
          <td>${entry.institution}</td>
          <td>
            ${entry.title}
            <details class="abstract-toggle">
              <summary>Abstract</summary>
            </details>
          </td>
        `;
        tbody.appendChild(row);

        // Row for the abstract
        const abstractRow = document.createElement("tr");
        abstractRow.classList.add("abstract-row", "hidden");
        abstractRow.innerHTML = `
          <td colspan="4">
            <p>${entry.abstract}</p>
          </td>
        `;
        tbody.appendChild(abstractRow);

        // Enable toggling on click
        const summary = row.querySelector("summary");
        summary.addEventListener("click", () => {
          abstractRow.classList.toggle("hidden");
        });
      });
    });
}
