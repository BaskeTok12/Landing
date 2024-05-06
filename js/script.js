function showForm(formType) {
    // Получаем доступ к элементам формы
    var buyForm = document.getElementById('buy-form');
    var consultForm = document.getElementById('consult-form');
    var tabBtns = document.querySelectorAll('.tab-btn');

    // Скрываем все формы
    buyForm.style.display = 'none';
    consultForm.style.display = 'none';

    // Убираем активный класс у всех кнопок
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // Отображаем нужную форму и добавляем активный класс к соответствующей кнопке
    if (formType === 'buy') {
        buyForm.style.display = 'block';
        tabBtns[0].classList.add('active');
    } else if (formType === 'consult') {
        consultForm.style.display = 'block';
        tabBtns[1].classList.add('active');
    }
}

// Инициализация первоначальной формы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    showForm('buy'); // По умолчанию показываем форму 'Buy a Car'
});


let currentIndex = 0; // Starting index of visible gallery item

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

function updateNeedle(position) {
    const degrees = -120 + position * 120; // Примерное вычисление угла вращения
    document.querySelector('.needle').style.transform = `rotate(${degrees}deg)`;
}

