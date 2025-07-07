const clock = document.getElementById('clock');
const numbersContainer = clock.querySelector('.numbers');
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalClock = document.getElementById('digitalClock');
const clockContainer = document.getElementById('clockContainer');

const themes = ['theme-light', 'theme-dark', 'theme-blue'];
let currentThemeIndex = 0;

function toggleTheme() {
  document.body.classList.remove(themes[currentThemeIndex]);
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.body.classList.add(themes[currentThemeIndex]);
}

function toggleMinimize() {
  clockContainer.classList.toggle('minimized');
}

const clockRadius = parseInt(getComputedStyle(clock).width) / 2;
const numberRadius = clockRadius - 40;

// Створення цифр на циферблаті
for (let i = 1; i <= 12; i++) {
  const angle = (i - 3) * (Math.PI * 2) / 12;
  const x = clockRadius + numberRadius * Math.cos(angle) - 14;
  const y = clockRadius + numberRadius * Math.sin(angle) - 14;
  const numberEl = document.createElement('div');
  numberEl.className = 'number';
  numberEl.textContent = i;
  numberEl.style.left = x + 'px';
  numberEl.style.top = y + 'px';
  numbersContainer.appendChild(numberEl);
}

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondsAngle = seconds * 6;
  const minutesAngle = (minutes + seconds / 60) * 6;
  const hoursAngle = (hours + minutes / 60 + seconds / 3600) * 30;

  hourHand.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`;

  digitalClock.textContent = now.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

setInterval(updateClock, 1000);
updateClock();
