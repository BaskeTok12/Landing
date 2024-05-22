let currentStage = 0;
let currentIndex = 0; // Starting index of visible gallery item
let currentItemIndex = 0;
const totalStages = 4; // Общее количество вопросов

function showForm(formType) {
  var buyForm = document.getElementById("buy-form");
  var consultForm = document.getElementById("consult-form");
  var tabBtns = document.querySelectorAll(".tab-btn");
  var indicator = document.querySelector(".tab-indicator");

  buyForm.style.display = "none";
  consultForm.style.display = "none";
  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  if (formType === "buy") {
    buyForm.style.display = "block";
    tabBtns[0].classList.add("active");
    indicator.style.left = "0%"; // Move indicator under the first tab
  } else {
    consultForm.style.display = "block";
    tabBtns[1].classList.add("active");
    indicator.style.left = "50%"; // Move indicator under the second tab
  }
}

// Инициализация первоначальной формы при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  showForm("buy"); // По умолчанию показываем форму 'Buy a Car'
  resetNeedle(); // Reset needle position when the page is fully loaded
});

function next() {
  const items = document.querySelectorAll(".gallery-item");
  if (currentItemIndex < items.length - 1) {
    currentItemIndex++;
    items[currentItemIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    updateIndexDisplay(currentItemIndex + 1, items.length);
  }
}

// Function to scroll to the previous item
function previous() {
  if (currentItemIndex > 0) {
    currentItemIndex--;
    const items = document.querySelectorAll(".gallery-item");
    items[currentItemIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    updateIndexDisplay(currentItemIndex + 1, items.length);
  }
}

function updateIndexDisplay(current, total) {
  document.getElementById("gallery-index").textContent = `${current}/${total}`;
}

// Initial setup
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".gallery-item");
  if (items.length > 0) {
    items[0].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    updateIndexDisplay(1, items.length);
  }
});

function updateGalleryPosition() {
  const slider = document.querySelector(".gallery-slider");
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function openModal(vehicleId) {
  // Logic to open modal window with more info about the vehicle
  console.log(`More info about: ${vehicleId}`);
  // You will need to implement modal functionality
}

function startQuiz() {
  console.log("Quiz started");
  document.querySelector(".quiz-intro").style.display = "none"; // Hide intro
  showStage(1); // Show the first quiz stage
  updateNeedle(1); // Set progress so that the needle points to 15 degrees
}

function updateNeedle(stage) {
  let degrees;
  switch (stage) {
    case 1:
      degrees = -65;
      break;
    case 2:
      degrees = -25;
      break;
    case 3:
      degrees = 25;
      break;
    case 4:
      degrees = 65;
      break;
    default:
      degrees = -90; // Default to starting position
  }
  document.querySelector(".needle").style.transform = `rotate(${degrees}deg)`;
}

function showStage(stage) {
  if (stage > totalStages) {
    console.log("Квиз завершен");
    return;
  }

  // Скрываем все этапы
  for (let i = 1; i <= totalStages; i++) {
    const stageDiv = document.getElementById(`quiz-stage-${i}`);
    if (stageDiv) {
      stageDiv.style.display = "none";
    }
  }

  // Показываем текущий этап
  const currentStageDiv = document.getElementById(`quiz-stage-${stage}`);
  if (currentStageDiv) {
    currentStageDiv.style.display = "flex"; // Используем flex, если это необходимо для вашей верстки
  }

  // Обновляем спидометр
  updateNeedle(stage); // Update the needle based on the current stage
  currentStage = stage;
}

// Add a new stage to the HTML structure

function updateQuizProgress(progress) {
  // Example: if progress is a number between 0 and 100
  const degrees = progress * 1.8 - 90; // Scale 0-100 to degrees (-90 to 90 for a 180-degree range)
  updateNeedle(degrees);
}

document.addEventListener("DOMContentLoaded", function () {
  // Set initial state for quiz stages and needle
  resetNeedle();
  for (let i = 1; i <= totalStages; i++) {
    const stageDiv = document.getElementById(`quiz-stage-${i}`);
    if (stageDiv) {
      stageDiv.style.display = "none";
    }
  }
});
function resetNeedle() {
  document.querySelector(".needle").style.transform = "rotate(-90deg)";
}

function nextStage() {
  currentStage++;
  if (currentStage <= totalStages) {
    showStage(currentStage);
  } else {
    console.log("Quiz completed");
    // Here you might finalize the quiz, show results, etc.
  }
}

document.querySelectorAll(".quiz-answers .answer-button").forEach((button) => {
  button.addEventListener("click", function () {
    const parent = this.parentNode;
    // Remove active class from all buttons in this group
    parent.querySelectorAll(".answer-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the clicked button
    this.classList.add("active");

    // Save the answer, depending on your application's needs
    // For example, storing the answer in a global object or array:
    const questionId = parent.getAttribute("data-question-id"); // Ensure your div has an id
    answers[questionId] = this.textContent; // Or any identifier for the answer
  });
});

const cars = [
  {
    id: 1,
    name: "2024 Mercedes Benz G550",
    package: "Night",
    manufactureDate: "11/2023",
    color: "Polar White",
    engine: "4L",
    power: "416 HP",
    fuelRating: "12/6/2.4",
    description: "Spacious, advanced, luxurious and timeless, the G550 is an icon of capability and pure design. Crafted by hand, with an exceptional variety of ways to personalize it, you can take your G virtually anywhere you want.",
    images: ["Landing/assets/images/venicle-galery/1/1-mercedes-g550.png", "Landing/assets/images/venicle-galery/1/2-mercedes-g550.jpg", "Landing/assets/images/venicle-galery/1/3-mercedes-g550.png", "Landing/assets/images/venicle-galery/1/4-mercedes-g550.png", "Landing/assets/images/venicle-galery/1/5-mercedes-g550.png", "Landing/assets/images/venicle-galery/1/6-mercedes-g550.png"],
  }
  // other cars...
];

function createModal(car) {
  const modalHTML = `
    <div id="modal${car.id}" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal(${car.id})">&times;</span>
        <div class="modal-body">
          <div class="gallery">
            <div class="main-image-container">
              <img src="${car.images[0]}" alt="${car.name} main image" class="main-image" style="object-fit: cover; object-position: center;" loading="lazy">
              <button class="gallery-prev" onclick="changeImage(${car.id}, -1)">&#10094;</button>
              <button class="gallery-next" onclick="changeImage(${car.id}, 1)">&#10095;</button>
            </div>
            <div class="thumbnails-container">
              <div class="thumbnail-row">
                ${car.images.slice(0, 3).map(img => `
                  <div class="thumbnail" onclick="setImage(${car.id}, '${img}')">
                    <img src="${img}" alt="Thumbnail" loading="lazy">
                  </div>
                `).join('')}
              </div>
              <div class="thumbnail-row">
                ${car.images.slice(3, 6).map(img => `
                  <div class="thumbnail" onclick="setImage(${car.id}, '${img}')">
                    <img src="${img}" alt="Thumbnail" loading="lazy">
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="info">
            <h1>2024 MERCEDES BENZ</h1>
            <h2>G550</h2>
            <ul class="specs">
              <li><span>Manufacture date:</span> 11/2023</li>
              <li><span>Package:</span> Night</li>
              <li><span>Color:</span> Polar White</li>
              <li><span>Engine:</span> 4L</li>
              <li><span>Power:</span> 416 HP</li>
              <li><span>Fuel Rating:</span> 12/6/2.4</li>
            </ul>
            <p>Spacious, advanced, luxurious and timeless, the G550 is an icon of capability and pure design. Crafted by hand, with an exceptional variety of ways to personalize it, you can take your G virtually anywhere you want.</p>
            <div class="contact-info">
              <p>Contact our manager for more info</p>
              <button class="contact-btn telegram">TELEGRAM</button>
              <button class="contact-btn whatsapp">WHATSAPP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}



function openModal(carId) {
  const modal = document.getElementById(`modal${carId}`);
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal with ID modal" + carId + " does not exist.");
  }
}

function closeModal(id) {
  const modal = document.getElementById(`modal${id}`);
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error("Modal with ID " + `modal${id}` + " does not exist.");
  }
}

function changeImage(carId, direction) {
  const modal = document.getElementById(`modal${carId}`);
  const mainImage = modal.querySelector('.main-image');
  const thumbnails = Array.from(modal.querySelectorAll('.thumbnail img'));
  const images = thumbnails.map(img => img.src);
  let currentIndex = images.indexOf(mainImage.src);

  currentIndex += direction;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  mainImage.src = images[currentIndex];
}

function setImage(carId, imgSrc) {
  const modal = document.getElementById(`modal${carId}`);
  const mainImage = modal.querySelector('.main-image');
  mainImage.src = imgSrc;
}

document.addEventListener("DOMContentLoaded", () => {
  cars.forEach(car => createModal(car));
});

function showText(id) {
  document.getElementById(id).style.opacity = '1';
}

function hideText(id) {
  document.getElementById(id).style.opacity = '0';
}
