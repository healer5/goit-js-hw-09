import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startButton.style = 'pointer-events:none; opacity:0.5;';

startButton.addEventListener('click', startСounting);

let presentTime = new Date().getTime();
let finalDate = 0;
let timeLeft = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finalDate = selectedDates[0].getTime();
    if (presentTime > finalDate) {
      startButton.style = 'pointer-events:none; opacity:0.5;';
      Notify.failure('Please choose a date in the future');
    } else {
      startButton.style = 'pointer-events:auto; opacity:1;';
    }
  },
};

flatpickr('#datetime-picker', options);

function startСounting() {
  Notify.success('Countdown started');
  setInterval(() => {
    presentTime = new Date().getTime();
    timeLeft = finalDate - presentTime;
    if (timeLeft < 0) return;
    renderTime(convertMs(timeLeft));
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderTime({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
