// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  refs.startBtnElem.disabled = true;
});
let userSelectedDate;
let autoCloseErrorTimeOutId;
const refs = {
  spanSecondsElem: document.querySelector('span[data-seconds]'),
  spanMinutesElem: document.querySelector('span[data-minutes]'),
  spanHoursElem: document.querySelector('span[data-hours]'),
  spanDaysElem: document.querySelector('span[data-days]'),
  startBtnElem: document.querySelector('button[data-start]'),
  errorElement: document.querySelector('.js-error'),
  closeErrorElem: document.querySelector('.close-error'),
  datePickerElem: document.querySelector('#datetime-picker'),
};
const config = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', config);
let selectedDates;
function checkDate(userPickedDate) {
  const currentDate = new Date();
  if (userPickedDate - currentDate > 1000) {
    userSelectedDate = userPickedDate;
    refs.startBtnElem.disabled = false;
  } else {
    iziToast.show({
      close: false,
      messageColor: '#FFFFFF',
      message: `Please choose a date in the future`,
      position: 'topRight',
      progressBar: true,
      progressBarColor: 'rgb(181, 27, 27)',
      color: '#EF4040',
    });
    refs.startBtnElem.disabled = true;
    return 'error';
  }
}
refs.startBtnElem.addEventListener('click', () => {
  if (checkDate(userSelectedDate) === 'error') {
    return;
  }
  refs.datePickerElem.disabled = true;
  const timerId = setInterval(() => {
    const timerData = new Date();
    const msToDate = convertMs(userSelectedDate - timerData);
    refs.spanDaysElem.textContent = msToDate.days.toString().padStart(2, '0');
    refs.spanHoursElem.textContent = msToDate.hours.toString().padStart(2, '0');
    refs.spanMinutesElem.textContent = msToDate.minutes
      .toString()
      .padStart(2, '0');
    refs.spanSecondsElem.textContent = msToDate.seconds
      .toString()
      .padStart(2, '0');
    if (userSelectedDate - timerData < 1000) {
      refs.startBtnElem.disabled = true;
      refs.datePickerElem.disabled = false;
      clearInterval(timerId);
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
refs.closeErrorElem.addEventListener('click', () => {
  refs.errorElement.classList.remove('open');
  clearTimeout(autoCloseErrorTimeOutId);
});
