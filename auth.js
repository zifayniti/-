let clickCount = 0;
let clickTimer;

const trigger = document.getElementById('admin-trigger');
if (trigger) {
    trigger.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
        if (clickCount === 5) {
            const pwd = prompt('Введите пароль администратора');
            if (pwd === 'admin123') {
                sessionStorage.setItem('admin', 'true');
                document.body.classList.add('admin-mode');
                alert('Режим администратора активирован. Обновите страницу для полного эффекта.');
                location.reload();
            } else {
                alert('Неверный пароль');
            }
            clickCount = 0;
        }
    });
}

// При загрузке — если уже админ, добавляем класс
if (sessionStorage.getItem('admin') === 'true') {
    document.body.classList.add('admin-mode');
}