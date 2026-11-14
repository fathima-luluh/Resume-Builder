
const fields = [
    "name",
    "jobTitle",
    "email",
    "phone",
    "location",
    "summary",
    "skills",
    "education",
    "projects",
    "experience"
];

const previewFields = {
    name: "previewName",
    jobTitle: "previewTitle",
    summary: "previewSummary",
    skills: "previewSkills",
    education: "previewEducation",
    projects: "previewProjects",
    experience: "previewExperience"
};

const preview = document.getElementById("resumePreview");
const templateSelect = document.getElementById("template");

function updatePreview() {
    fields.forEach(field => {
        const input = document.getElementById(field);
        const value = input.value.trim();

        if (previewFields[field]) {
            const target = document.getElementById(previewFields[field]);

            const defaults = {
                name: "Your Name",
                jobTitle: "Professional Title",
                summary: "Your professional summary will appear here.",
                skills: "Your skills will appear here.",
                education: "Your education will appear here.",
                projects: "Your projects will appear here.",
                experience: "Your experience will appear here."
            };

            target.textContent = value || defaults[field];
        }
    });

    const contact = [
        document.getElementById("email").value.trim(),
        document.getElementById("phone").value.trim(),
        document.getElementById("location").value.trim()
    ].filter(Boolean);

    document.getElementById("previewContact").textContent =
        contact.length ? contact.join(" | ") : "Email | Phone | Location";
}

fields.forEach(field => {
    document.getElementById(field).addEventListener("input", updatePreview);
});

templateSelect.addEventListener("change", () => {
    preview.classList.remove("classic", "modern", "minimal");
    preview.classList.add(templateSelect.value);
});

// Save resume as JSON file

document.getElementById("saveBtn").addEventListener("click", () => {
    const data = {};

    fields.forEach(field => {
        data[field] = document.getElementById(field).value;
    });

    data.template = templateSelect.value;
    data.sectionOrder = [...document.querySelectorAll(".resume-section")]
        .map(section => section.dataset.section);

    const file = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "my-resume.json";
    link.click();

    URL.revokeObjectURL(url);
});

// Load resume from JSON file

const loadInput = document.createElement("input");
loadInput.type = "file";
loadInput.accept = ".json,application/json";
loadInput.hidden = true;
document.body.appendChild(loadInput);

const loadButton = document.createElement("button");
loadButton.textContent = "Load Resume";
loadButton.className = "secondary-btn";
document.querySelector(".header-actions").prepend(loadButton);

loadButton.addEventListener("click", () => loadInput.click());

loadInput.addEventListener("change", async () => {
    const file = loadInput.files[0];
    if (!file) return;

    try {
        const data = JSON.parse(await file.text());

        fields.forEach(field => {
            document.getElementById(field).value = data[field] || "";
        });

        if (["classic", "modern", "minimal"].includes(data.template)) {
            templateSelect.value = data.template;
        }

        preview.classList.remove("classic", "modern", "minimal");
        preview.classList.add(templateSelect.value);

        if (Array.isArray(data.sectionOrder)) {
            restoreSectionOrder(data.sectionOrder);
        }

        updatePreview();
        alert("Resume loaded successfully!");
    } catch (error) {
        alert("Could not load this file. Please select a valid resume JSON file.");
    }

    loadInput.value = "";
});

// Drag and drop section ordering

let draggedSection = null;

function setupDragAndDrop() {
    document.querySelectorAll(".resume-section").forEach(section => {
        section.draggable = true;

        section.addEventListener("dragstart", () => {
            draggedSection = section;
            section.style.opacity = "0.4";
        });

        section.addEventListener("dragend", () => {
            section.style.opacity = "1";
            draggedSection = null;
        });

        section.addEventListener("dragover", event => {
            event.preventDefault();
        });

        section.addEventListener("drop", event => {
            event.preventDefault();

            if (!draggedSection || draggedSection === section) return;

            const sections = [...document.querySelectorAll(".resume-section")];
            const from = sections.indexOf(draggedSection);
            const to = sections.indexOf(section);

            if (from < to) {
                section.after(draggedSection);
            } else {
                section.before(draggedSection);
            }
        });
    });
}

function restoreSectionOrder(order) {
    const container = preview;
    const sectionMap = {};

    document.querySelectorAll(".resume-section").forEach(section => {
        sectionMap[section.dataset.section] = section;
    });

    order.forEach(name => {
        if (sectionMap[name]) {
            container.appendChild(sectionMap[name]);
        }
    });
}

setupDragAndDrop();

// Export PDF using browser print

document.getElementById("exportBtn").addEventListener("click", () => {
    window.print();
});

updatePreview();
