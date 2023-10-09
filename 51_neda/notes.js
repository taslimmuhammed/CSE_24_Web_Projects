const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="note-content" id="note-${index}">
                <span>${note}</span>
                
            </div>
            <div class="note-buttons">
                    <button class="edit-button button" data-index="${index}">Edit</button>
                    <button class="save-button button" data-index="${index}" style="display:none;">Save</button>
                    <button class="delete-button button" data-index="${index}">Delete</button>
                </div>
        `;
        notesList.appendChild(listItem);

        // Add click event listener to edit button
        const editButton = listItem.querySelector(".edit-button");
        const saveButton = listItem.querySelector(".save-button");
        editButton.addEventListener("click", () => toggleEditMode(index, editButton, saveButton));
        saveButton.addEventListener("click", () => saveEditedNote(index, editButton, saveButton));
    });
}

function toggleEditMode(index, editButton, saveButton) {
    const noteContent = document.getElementById(`note-${index}`);
    const noteSpan = noteContent.querySelector("span");

    if (noteSpan.contentEditable === "true") {
        // Disable editing mode
        noteSpan.contentEditable = "false";
        noteSpan.style.border = "none";

        // Hide Save button, show Edit button
        editButton.style.display = "inline-block";
        saveButton.style.display = "none";

        // Save the edited content and update the notes array
        notes[index] = noteSpan.textContent;
        saveNotes();
    } else {
        // Enable editing mode
        noteSpan.contentEditable = "true";
        noteSpan.style.border = "1px solid #ccc";
        noteSpan.focus();

        // Show Save button, hide Edit button
        editButton.style.display = "none";
        saveButton.style.display = "inline-block";
    }
}

function saveEditedNote(index, editButton, saveButton) {
    toggleEditMode(index, editButton, saveButton);
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

addNoteButton.addEventListener("click", function () {
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        notes.push(noteText);
        saveNotes();
        noteInput.value = "";
        renderNotes();
    }
});

notesList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        const confirmDelete = confirm("Are you sure you want to delete this note?");

        if (confirmDelete) {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        }
    }
});

renderNotes();
