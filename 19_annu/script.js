// Initial References
let cs019_draggableObjects;
let cs019_dropPoints;
const cs019_startButton = document.getElementById("cs019_start");
const cs019_result = document.getElementById("cs019_result");
const cs019_controls = document.querySelector(".cs019_controls-container");
const cs019_dragContainer = document.querySelector(".cs019_draggable-objects");
const cs019_dropContainer = document.querySelector(".cs019_drop-points");
const cs019_data = [
  "belgium",
  "bhutan",
  "brazil",
  "china",
  "cuba",
  "ecuador",
  "georgia",
  "germany",
  "hong-kong",
  "india",
  "iran",
  "myanmar",
  "norway",
  "spain",
  "sri-lanka",
  "sweden",
  "switzerland",
  "united-states",
  "uruguay",
  "wales",
];

let cs019_deviceType = "";
let cs019_initialX = 0,
  cs019_initialY = 0;
let cs019_currentElement = "";
let cs019_moveElement = false;

// Detect touch device
const cs019_isTouchDevice = () => {
  try {
    // We try to create Touch Event (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    cs019_deviceType = "touch";
    return true;
  } catch (e) {
    cs019_deviceType = "mouse";
    return false;
  }
};

let cs019_count = 0;

// Random value from Array
const cs019_randomValueGenerator = () => {
  return cs019_data[Math.floor(Math.random() * cs019_data.length)];
};

// Win Game Display
const cs019_stopGame = () => {
  cs019_controls.classList.remove("hide");
  cs019_startButton.classList.remove("hide");
};

// Drag & Drop Functions
function cs019_dragStart(e) {
  if (cs019_isTouchDevice()) {
    cs019_initialX = e.touches[0].clientX;
    cs019_initialY = e.touches[0].clientY;
    // Start movement for touch
    cs019_moveElement = true;
    cs019_currentElement = e.target;
  } else {
    // For non-touch devices set data to be transferred
    e.dataTransfer.setData("text", e.target.id);
  }
}

// Events fired on the drop target
function cs019_dragOver(e) {
  e.preventDefault();
}

// For touchscreen movement
const cs019_touchMove = (e) => {
  if (cs019_moveElement) {
    e.preventDefault();
    let cs019_newX = e.touches[0].clientX;
    let cs019_newY = e.touches[0].clientY;
    let cs019_currentSelectedElement = document.getElementById(e.target.id);
    cs019_currentSelectedElement.parentElement.style.top =
      cs019_currentSelectedElement.parentElement.offsetTop -
      (cs019_initialY - cs019_newY) +
      "px";
    cs019_currentSelectedElement.parentElement.style.left =
      cs019_currentSelectedElement.parentElement.offsetLeft -
      (cs019_initialX - cs019_newX) +
      "px";
    cs019_initialX = cs019_newX;
    cs019_initialY = cs019_newY;
  }
};

const cs019_drop = (e) => {
  e.preventDefault();
  // For touch screen
  if (cs019_isTouchDevice()) {
    cs019_moveElement = false;
    // Select country name div using the custom attribute
    const cs019_currentDrop = document.querySelector(
      `div[data-id='${e.target.id}']`
    );
    // Get boundaries of div
    const cs019_currentDropBound = cs019_currentDrop.getBoundingClientRect();
    // If the position of flag falls inside the bounds of the country name
    if (
      cs019_initialX >= cs019_currentDropBound.left &&
      cs019_initialX <= cs019_currentDropBound.right &&
      cs019_initialY >= cs019_currentDropBound.top &&
      cs019_initialY <= cs019_currentDropBound.bottom
    ) {
      cs019_currentDrop.classList.add("dropped");
      // Hide actual image
      cs019_currentElement.classList.add("hide");
      cs019_currentDrop.innerHTML = ``;
      // Insert new img element
      cs019_currentDrop.insertAdjacentHTML(
        "afterbegin",
        `<img src= "${cs019_currentElement.id}.png">`
      );
      cs019_count += 1;
    }
  } else {
    // Access data
    const cs019_draggedElementData = e.dataTransfer.getData("text");
    // Get custom attribute value
    const cs019_droppableElementData = e.target.getAttribute("data-id");
    if (cs019_draggedElementData === cs019_droppableElementData) {
      const cs019_draggedElement = document.getElementById(
        cs019_draggedElementData
      );
      // Dropped class
      e.target.classList.add("dropped");
      // Hide current img
      cs019_draggedElement.classList.add("hide");
      // Draggable set to false
      cs019_draggedElement.setAttribute("draggable", "false");
      e.target.innerHTML = ``;
      // Insert new img
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img src="${cs019_draggedElementData}.png">`
      );
      cs019_count += 1;
    }
  }
  // Win
  if (cs019_count == 3) {
    cs019_result.innerText = `You Won!`;
    cs019_stopGame();
  }
};

// Creates flags and countries
const cs019_creator = () => {
  cs019_dragContainer.innerHTML = "";
  cs019_dropContainer.innerHTML = "";
  let cs019_randomData = [];
  // for string random values in array
  for (let i = 1; i <= 3; i++) {
    let cs019_randomValue = cs019_randomValueGenerator();
    if (!cs019_randomData.includes(cs019_randomValue)) {
      cs019_randomData.push(cs019_randomValue);
    } else {
      // If value already exists then decrement i by 1
      i -= 1;
    }
  }
  for (let i of cs019_randomData) {
    const cs019_flagDiv = document.createElement("div");
    cs019_flagDiv.classList.add("draggable-image");
    cs019_flagDiv.setAttribute("draggable", true);
    if (cs019_isTouchDevice()) {
      cs019_flagDiv.style.position = "absolute";
    }
    cs019_flagDiv.innerHTML = `<img src="${i}.png" id="${i}">`;
    cs019_dragContainer.appendChild(cs019_flagDiv);
  }
  // Sort the array randomly before creating country divs
  cs019_randomData = cs019_randomData.sort(() => 0.5 - Math.random());
  for (let i of cs019_randomData) {
    const cs019_countryDiv = document.createElement("div");
    cs019_countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>
    `;
    cs019_dropContainer.appendChild(cs019_countryDiv);
  }
};

// Start Game
cs019_startButton.addEventListener("click", async () => {
  cs019_currentElement = "";
  cs019_controls.classList.add("hide");
  cs019_startButton.classList.add("hide");
  // This will wait for cs019_creator to create the images and then move forward
  await cs019_creator();
  cs019_count = 0;
  cs019_dropPoints = document.querySelectorAll(".countries");
  cs019_draggableObjects = document.querySelectorAll(".draggable-image");

  // Events
  cs019_draggableObjects.forEach((element) => {
    element.addEventListener("dragstart", cs019_dragStart);
    // for touch screen
    element.addEventListener("touchstart", cs019_dragStart);
    element.addEventListener("touchend", cs019_drop);
    element.addEventListener("touchmove", cs019_touchMove);
  });
  cs019_dropPoints.forEach((element) => {
    element.addEventListener("dragover", cs019_dragOver);
    element.addEventListener("drop", cs019_drop);
  });
});
