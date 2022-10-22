function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
const NOTIFICATION_DELAY = 3000; //Через скільки закривати
let timeoutId = null; //Потрібно ставити null, хороший тон

const refs = {
  notification: document.querySelector('.js-alert'),
};

refs.notification.addEventListener('click', onNotificationClick);

showNotification();

function onNotificationClick() {
  hideNotification();
  clearTimeout(timeoutId);
}

function showNotification() {
  refs.notification.classList.add('is-visible');

  timeoutId = setTimeout(() => {
    hideNotification();
  }, NOTIFICATION_DELAY);
}

function hideNotification() {
  refs.notification.classList.remove('is-visible');
}
