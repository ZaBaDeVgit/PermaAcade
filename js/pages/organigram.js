(function () {
    const organigrams = AcademyContent.organigrams || [];
    let activeId = organigrams[0]?.id || null;

    function updateDetailPanel(panel, node) {
        if (!panel || !node) return;
        const titleEl = panel.querySelector("[data-detail-title]");
        const roleEl = panel.querySelector("[data-detail-role]");
        const notesEl = panel.querySelector("[data-detail-notes]");
        if (titleEl) {
            titleEl.textContent = node.name;
        }
        if (roleEl) {
            roleEl.textContent = node.role || "Rol no descrito";
        }
        if (notesEl) {
            notesEl.textContent = node.notes || "Mantén el cursor sobre un nodo o toca para ver su función y notas detalladas.";
        }
    }

    function createNode(node, detailPanel) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "organigram-node";
        button.textContent = node.name;
        button.dataset.role = node.role || "Rol no descrito";
        button.addEventListener("mouseenter", () => updateDetailPanel(detailPanel, node));
        button.addEventListener("focus", () => updateDetailPanel(detailPanel, node));

        if (node.children && node.children.length) {
            const childList = document.createElement("ul");
            childList.className = "organigram-children hidden";
            node.children.forEach((child) => childList.appendChild(createNode(child, detailPanel)));
            li.appendChild(button);
            li.appendChild(childList);

            button.addEventListener("click", () => {
                childList.classList.toggle("hidden");
                button.classList.toggle("organigram-node--expanded", !childList.classList.contains("hidden"));
            });
        } else {
            li.appendChild(button);
        }

        return li;
    }

    function renderTree(org, detailPanel) {
        const grid = document.getElementById("organigramaGrid");
        if (!grid || !org) return;
        grid.innerHTML = "";
        org.tree.forEach((node) => grid.appendChild(createNode(node, detailPanel)));
        updateDetailPanel(detailPanel, org.tree[0]);
    }

    function renderLegend(org) {
        const legend = document.getElementById("organigramLegend");
        if (!legend || !org) return;
        legend.innerHTML = `<strong>Leyenda</strong><ul>${org.legend.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    }

    function renderResources(org) {
        const resources = document.getElementById("organigramResources");
        if (!resources || !org) return;
        resources.innerHTML = `<strong>Referencias</strong><ul>${org.resources
            .map((entry) => `<li><a href="${entry.url}" target="_blank" rel="noopener noreferrer">${entry.label}</a></li>`)
            .join("")}</ul>`;
    }

    function setActiveOrganigram(id) {
        activeId = id;
        const detailPanel = document.getElementById("organigramDetailPanel");
        const selectorButtons = document.querySelectorAll("[data-org-selector]");
        selectorButtons.forEach((button) => {
            button.dataset.active = button.dataset.orgSelector === id ? "true" : "false";
        });
        const org = organigrams.find((entry) => entry.id === activeId);
        renderTree(org, detailPanel);
        renderLegend(org);
        renderResources(org);
    }

    function renderSelector() {
        const container = document.getElementById("organigramSelector");
        if (!container || !organigrams.length) return;
        container.innerHTML = "";
        organigrams.forEach((org) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = org.title;
            btn.dataset.orgSelector = org.id;
            btn.dataset.active = org.id === activeId ? "true" : "false";
            btn.addEventListener("click", () => setActiveOrganigram(org.id));
            container.appendChild(btn);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const user = App.initProtectedPage();
        if (!user || !organigrams.length) return;
        renderSelector();
        setActiveOrganigram(activeId);
    });
})();
