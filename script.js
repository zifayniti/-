// Плавное появление блоков при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

const animatedBlocks = document.querySelectorAll(
  '.glass-block, .stat-card, .question-card, .practice-card, .team-card, .research-card'
);

animatedBlocks.forEach(block => {
  block.classList.add('hidden-block');
  observer.observe(block);
});

// Плавный hover-эффект карточек
const cards = document.querySelectorAll(
  '.stat-card, .question-card, .practice-card, .team-card, .research-card'
);

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// Анимация кнопок
const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-3px) scale(1.03)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0px) scale(1)';
  });
});

// Генератор случайного вопроса
const questions = [
  'Как познакомились ваши родители?',
  'Какая семейная традиция вам особенно дорога?',
  'О чем мечтали ваши бабушка и дедушка?',
  'Какое воспоминание о семье самое важное?',
  'Какое место в Тюмени связано с вашей семьей?',
  'Какая история семьи вас вдохновляет?',
  'Что бы вы хотели передать следующему поколению?',
  'Какие семейные ценности вы считаете самыми важными?'
];

const heroButton = document.querySelector('.primary-btn');

if (heroButton) {
  heroButton.addEventListener('click', (e) => {
    e.preventDefault();

    const randomQuestion = questions[
      Math.floor(Math.random() * questions.length)
    ];

    alert(`💬 Вопрос для семейного разговора:

${randomQuestion}`);
  });
}

// Параллакс hero-блока
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  const heroEmoji = document.querySelector('.hero-card');

  if (heroEmoji) {
    heroEmoji.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

console.log('Живая нить — demo ready');