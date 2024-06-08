let currentStage = 0;
let currentIndex = 0; // Starting index of visible gallery item
let currentItemIndex = 0;
var mobileWidthThreshold = 768;
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



document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".form-toggle-button");
  const formContainer = document.querySelector(".form-container");
  const col = document.querySelector(".col-lg-4");
  const formP = document.querySelector(".form-header p");
  const formHeader = document.querySelector(".form-header");
  const contactForm = document.querySelector(".contact-form");

  toggleButton.addEventListener("click", function () {
    if (formContainer.style.display === "none" || formContainer.style.display === "") {
      formContainer.style.display = "block";
      formP.style.display = "block";
      col.style.zIndex = "20000000"; // Set a high z-index to bring the form to the foreground
      contactForm.style.flexDirection  = "column";
      contactForm.style.paddingTop = "20px";
      formHeader.style.order = "0";
    } else {
      formContainer.style.display = "none";
      formP.style.display = "none";
      formContainer.style.zIndex = "0"; // Reset z-index when hiding the form
      col.styledisplay = "flex";
      
      contactForm.style.paddingTop = "0px";
      formHeader.style.order = "1";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".lang-select");
  const options = select.querySelectorAll("option");

  // Set initial icon based on the selected option or default
  const initialIcon = options[select.selectedIndex].getAttribute("data-icon");
  select.style.backgroundImage = `url(${initialIcon})`;
  select.style.backgroundRepeat = "no-repeat";
  select.style.backgroundPosition = "center";
  select.style.backgroundSize = "contain";

  options.forEach((option) => {
    const icon = option.getAttribute("data-icon");
    if (icon) {
      const img = new Image();
      img.src = icon;
      img.style.width = "20px";
      img.style.height = "20px";
      img.style.objectFit = "cover";
      option.appendChild(img);
    }
  });

  select.addEventListener("change", (e) => {
    const selectedOption = options[select.selectedIndex];
    const icon = selectedOption.getAttribute("data-icon");
    select.style.backgroundImage = `url(${icon})`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll("select");

  // Проверка начального значения каждого select
  selects.forEach((select) => {
    updateSelectColor(select);
    select.addEventListener("change", function () {
      updateSelectColor(this);
    });
  });

  function updateSelectColor(selectElement) {
    if (selectElement.value) {
      selectElement.classList.add("color-selected");
    } else {
      selectElement.classList.remove("color-selected");
    }
  }
});
// Инициализация первоначальной формы при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  showForm("buy"); // По умолчанию показываем форму 'Buy a Car'
  resetNeedle(); // Reset needle position when the page is fully loaded
});

function next() {
  const items = document.querySelectorAll(".gallery-item");
  const container = document.querySelector(".gallery-container");

  if (currentItemIndex < items.length - 1) {
    currentItemIndex++;
    const item = items[currentItemIndex];
    container.scroll({
      left: item.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
    updateIndexDisplay(currentItemIndex + 1, items.length);
  }
}

function previous() {
  const items = document.querySelectorAll(".gallery-item");
  const container = document.querySelector(".gallery-container");

  if (currentItemIndex > 0) {
    currentItemIndex--;
    const item = items[currentItemIndex];
    container.scroll({
      left: item.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
    updateIndexDisplay(currentItemIndex + 1, items.length);
  }
}

function updateIndexDisplay(current, total) {
  document.getElementById("gallery-index").textContent = `${current}/${total}`;
}

// Hero
function endQuiz() {
  // Implement any actions to take place when the quiz ends, such as hiding the quiz container or showing a message
  const faqSection = document.querySelector(".container-fluid.mt-5");
  faqSection.scrollIntoView({ behavior: "smooth" });
}

// Hero

// Initial setup

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
    updateProgress((currentStage / totalStages) * 100);
  } else {
    console.log("Quiz completed");
    // Here you might finalize the quiz, show results, etc.
  }
}

function toggleDropdown(element) {
  element.querySelector(".select-items").classList.toggle("select-hide");
}

function selectItem(element, value) {
  var selected = element
    .closest(".custom-select")
    .querySelector(".select-selected");
  selected.innerHTML = element.innerHTML; // Update the displayed value
  toggleDropdown(element.closest(".custom-select"));

  var hiddenInput = document.getElementById("language-input");
  hiddenInput.value = value; // Update the hidden input value

  // Optionally trigger other actions when language changes
  updateQuizLanguage(value); // Example function to handle language-specific logic
}

function updateQuizLanguage(language) {
  console.log("Language selected: " + language);
  // Implement any additional logic needed for language change
}

function updateProgress(percent) {
  const progressBarFill = document.querySelector(".progress-fill");
  progressBarFill.style.width = percent + "%";
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
    description:
      "Spacious, advanced, luxurious and timeless, the G550 is an icon of capability and pure design. Crafted by hand, with an exceptional variety of ways to personalize it, you can take your G virtually anywhere you want.",
    images: [
      "../assets/images/venicle-galery/1/1-mercedes-g550.png",
      "../assets/images/venicle-galery/1/2-mercedes-g550.png",
      "../assets/images/venicle-galery/1/3-mercedes-g550.png",
      "../assets/images/venicle-galery/1/4-mercedes-g550.png",
      "../assets/images/venicle-galery/1/5-mercedes-g550.png",
      "../assets/images/venicle-galery/1/6-mercedes-g550.png",
    ],
  },
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
            <p>${car.description}</p>  <!-- Вставка описания из константы -->
            <div class="contact-info">
  <h3>Contact our manager for more info</h3>
  <div class="contact-btns">
    <button class="contact-btn telegram">TELEGRAM</button>
    <button class="contact-btn whatsapp">WHATSAPP</button>
  </div>
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
  const mainImage = modal.querySelector(".main-image");
  const thumbnails = Array.from(modal.querySelectorAll(".thumbnail img"));
  const images = thumbnails.map((img) => img.src);
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
  const mainImage = modal.querySelector(".main-image");
  mainImage.src = imgSrc;
}

document.addEventListener("DOMContentLoaded", () => {
  cars.forEach((car) => createModal(car));
});

// interactive block

function showText(id) {
  document.getElementById(id).style.opacity = "1";
}

function hideText(id) {
  document.getElementById(id).style.opacity = "0";
}

// Instagram
document.addEventListener("DOMContentLoaded", (event) => {
  const instagramPostsContainer = document.querySelector(".instagram-posts");

  let isDown = false;
  let startX;
  let scrollLeft;
  let requestId;
  let autoScrollTimeout;

  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  const smoothScroll = (start, end, duration) => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      instagramPostsContainer.scrollLeft = lerp(start, end, progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  instagramPostsContainer.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
    isDown = true;
    startX = e.pageX - instagramPostsContainer.offsetLeft;
    scrollLeft = instagramPostsContainer.scrollLeft;
    cancelAnimationFrame(requestId); // Остановить автоматическую прокрутку
    clearTimeout(autoScrollTimeout); // Очистить таймаут автопрокрутки
  });

  instagramPostsContainer.addEventListener("mouseleave", () => {
    isDown = false;
  });

  instagramPostsContainer.addEventListener("mouseup", () => {
    isDown = false;
    startAutoScrollWithDelay(); // Начать автопрокрутку с задержкой
  });

  instagramPostsContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - instagramPostsContainer.offsetLeft;
    const walk = (x - startX) * 2; // Увеличиваем скорость скроллинга
    instagramPostsContainer.scrollLeft = scrollLeft - walk;
  });

  let scrollAmount = 1; // Шаг автопрокрутки
  const autoScroll = () => {
    instagramPostsContainer.scrollLeft = lerp(
      instagramPostsContainer.scrollLeft,
      instagramPostsContainer.scrollLeft + scrollAmount,
      0.1
    );
    if (
      instagramPostsContainer.scrollLeft >=
      instagramPostsContainer.scrollWidth - instagramPostsContainer.clientWidth
    ) {
      instagramPostsContainer.scrollLeft = 0;
    }
    requestId = requestAnimationFrame(autoScroll);
  };

  const startAutoScroll = () => {
    requestId = requestAnimationFrame(autoScroll);
  };

  const stopAutoScroll = () => {
    cancelAnimationFrame(requestId);
  };

  const startAutoScrollWithDelay = () => {
    autoScrollTimeout = setTimeout(startAutoScroll, 3000); // Задержка 3 секунды
  };

  instagramPostsContainer.addEventListener("mouseenter", stopAutoScroll);
  instagramPostsContainer.addEventListener(
    "mouseleave",
    startAutoScrollWithDelay
  );
});

document.addEventListener("DOMContentLoaded", function() {
  // Функция для удаления класса 'text-end'
  function removeTextEnd() {
    var elements = document.querySelectorAll('.col-md-9.text-end');
    elements.forEach(function(element) {
      element.classList.remove('text-end');
    });
  }

  // Выполнение функции при загрузке, если ширина экрана меньше или равна 768 пикселей
  if (window.innerWidth <= mobileWidthThreshold) {
    removeTextEnd();
  }

  // Добавляем слушатель событий на изменение размера окна, чтобы повторно проверять при изменении размера
  window.addEventListener('resize', function() {
    if (window.innerWidth <= mobileWidthThreshold) {
      removeTextEnd();
    }
  });
});



jQuery(document).ready(function($) {
  const ignoreValidationValues = ["", "Messenger", "Color", "Year", "Type your comment here..."];
  const optionalFields = ["color", "year"];

  function validateField(field) {
      if (field.val() === "" && !optionalFields.includes(field.attr('name'))) {
          field.css({
              'border': '2px solid red',
              'background-color': '#FF001F1A',
              'color': 'red'
          });
          return false;
      } else {
          field.css({
              'border': '',
              'background-color': '',
              'color': ''
          });
          return true;
      }
  }

  function validateSelect(field) {
      var newSelect = field.next('.new-select');
        var selectedValue = field.val();
    

      if ((!selectedValue || ignoreValidationValues.includes(selectedValue)) && !optionalFields.includes(field.attr('name')) || selectedValue == null) {
          newSelect.css({
              'border': '2px solid red',
              'background-color': '#FF001F1A',
              'color': 'red'
          });

          return false;
      } else {
          newSelect.css({
              'border': '',
              'background-color': '',
              'color': ''
          });
          console.log('neКРАСНО', selectedValue);
          return true;
      }
  }

  // Вызов функции валидации при отправке формы
  $('form').on('submit', function(event) {
      let isValid = true;

      // Валидация текстовых полей
      $(this).find('input[type="text"], input[type="tel"], textarea').each(function() {
          if (!validateField($(this))) {
              isValid = false;
          }
      });

      // Валидация селектов
      $(this).find('select').each(function() {
          if (!validateSelect($(this))) {
              isValid = false;
          }
      });

      if (!isValid) {
          event.preventDefault(); // Остановить отправку формы, если есть ошибки
      }
  });

  // Валидация при изменении полей
  $('select').on('change', function() {
      validateSelect($(this));
  });

  $('input[type="text"], input[type="tel"], textarea').on('input', function() {
      validateField($(this));
  });





  // Ваш существующий код для кастомного селекта
  $('.select').each(function() {
      const _this = $(this),
          selectOption = _this.find('option'),
          selectOptionLength = selectOption.length,
          selectedOption = selectOption.filter(':selected'),
          duration = 450; // длительность анимации 

      _this.hide();
      _this.wrap('<div class="select"></div>');
      $('<div>', {
          class: 'new-select',
          text: _this.children('option:disabled').text()
      }).insertAfter(_this);

      const selectHead = _this.next('.new-select');
      $('<div>', {
          class: 'new-select__list'
      }).insertAfter(selectHead);

      const selectList = selectHead.next('.new-select__list');
      for (let i = 1; i < selectOptionLength; i++) {
          $('<div>', {
              class: 'new-select__item',
              html: $('<span>', {
                  text: selectOption.eq(i).text()
              })
          })
          .attr('data-value', selectOption.eq(i).val())
          .appendTo(selectList);
      }

      const selectItem = selectList.find('.new-select__item');
      selectList.slideUp(0);
      selectHead.on('click', function() {
          if (!$(this).hasClass('on')) {
              $(this).addClass('on');
              selectList.slideDown(duration);

              selectItem.on('click', function() {
                  let chooseItem = $(this).data('value');

                  _this.val(chooseItem).attr('selected', 'selected');
                  selectHead.text($(this).find('span').text());

                  selectList.slideUp(duration);
                  selectHead.removeClass('on');

                  // Вызов валидации после выбора значения
                  validateSelect(_this);
              });

          } else {
              $(this).removeClass('on');
              selectList.slideUp(duration);
          }
      });
  });
});
