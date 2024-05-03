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
