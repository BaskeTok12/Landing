let currentStage = 0;
let currentIndex = 0; // Starting index of visible gallery item

const totalStages = 4; // Общее количество вопросов

function showForm(formType) {
    var buyForm = document.getElementById('buy-form');
    var consultForm = document.getElementById('consult-form');
    var tabBtns = document.querySelectorAll('.tab-btn');
    var indicator = document.querySelector('.tab-indicator');
  
    buyForm.style.display = 'none';
    consultForm.style.display = 'none';
    tabBtns.forEach(btn => {
      btn.classList.remove('active');
    });
  
    if (formType === 'buy') {
      buyForm.style.display = 'block';
      tabBtns[0].classList.add('active');
      indicator.style.left = '0%'; // Move indicator under the first tab
    } else {
      consultForm.style.display = 'block';
      tabBtns[1].classList.add('active');
      indicator.style.left = '50%'; // Move indicator under the second tab
    }
  }
  

// Инициализация первоначальной формы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    showForm('buy'); // По умолчанию показываем форму 'Buy a Car'
    resetNeedle();  // Reset needle position when the page is fully loaded
});



function next() {
    const items = document.querySelectorAll('.gallery-item');
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateGalleryPosition();
    }
}

function previous() {
    if (currentIndex > 0) {
        currentIndex--;
        updateGalleryPosition();
    }
}

function updateGalleryPosition() {
    const slider = document.querySelector('.gallery-slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function openModal(vehicleId) {
    // Logic to open modal window with more info about the vehicle
    console.log(`More info about: ${vehicleId}`);
    // You will need to implement modal functionality
}

function startQuiz() {
    console.log('Quiz started');
    document.querySelector('.quiz-intro').style.display = 'none'; // Hide intro
    showStage(1);  // Show the first quiz stage
    updateNeedle(1);  // Set progress so that the needle points to 15 degrees
}


function updateNeedle(stage) {
    let degrees;
    switch(stage) {
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
    document.querySelector('.needle').style.transform = `rotate(${degrees}deg)`;
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
            stageDiv.style.display = 'none';
        }
    }

    // Показываем текущий этап
    const currentStageDiv = document.getElementById(`quiz-stage-${stage}`);
    if (currentStageDiv) {
        currentStageDiv.style.display = 'flex'; // Используем flex, если это необходимо для вашей верстки
    }

    // Обновляем спидометр
    updateNeedle(stage);  // Update the needle based on the current stage
    currentStage = stage;
}


// Add a new stage to the HTML structure


function updateQuizProgress(progress) {
    // Example: if progress is a number between 0 and 100
    const degrees = progress * 1.8 - 90;  // Scale 0-100 to degrees (-90 to 90 for a 180-degree range)
    updateNeedle(degrees);
}

document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for quiz stages and needle
    resetNeedle();
    for (let i = 1; i <= totalStages; i++) {
        const stageDiv = document.getElementById(`quiz-stage-${i}`);
        if (stageDiv) {
            stageDiv.style.display = 'none';
        }
    }
});
function resetNeedle() {
    document.querySelector('.needle').style.transform = 'rotate(-90deg)';
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

document.querySelectorAll('.quiz-answers .answer-button').forEach(button => {
    button.addEventListener('click', function() {
        const parent = this.parentNode;
        // Remove active class from all buttons in this group
        parent.querySelectorAll('.answer-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to the clicked button
        this.classList.add('active');

        // Save the answer, depending on your application's needs
        // For example, storing the answer in a global object or array:
        const questionId = parent.getAttribute('data-question-id'); // Ensure your div has an id
        answers[questionId] = this.textContent; // Or any identifier for the answer
    });
});

document.querySelector('.answer-dropdown').addEventListener('change', function() {
    this.classList.toggle('open', this.value !== '');
});
