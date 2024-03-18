
import flatpickr from 'flatpickr';
// Імпорт стилів для flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт бібліотеки izitoast для відображення повідомлень
import iziToast from 'izitoast';
// Імпорт стилів для izitoast
import 'izitoast/dist/css/iziToast.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

onClose(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate <= new Date()) {
    alert("Please choose a date in the future");
    document.querySelector('[data-start]').disabled = true;
  } else {
    userSelectedDate = selectedDate;
    document.querySelector('[data-start]').disabled = false;
  }

}};
flatpickr("#datetime-picker", options);

document.getElementById('start-button').disabled = true;

document.getElementById('start-button').addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = new Date(document.getElementById('datetime-picker').value);
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future'
    });
    return;
  }
  document.getElementById('datetime-picker').disabled = true;
  document.getElementById('start-button').disabled = true;
  const timerInterval = setInterval(() => updateTimer(selectedDate, timerInterval), 1000);
  updateTimer(selectedDate, timerInterval);
}

function updateTimer(selectedDate, timerInterval) {
  const difference = selectedDate - new Date();
  if (difference <= 0) {
    clearInterval(timerInterval);
    iziToast.success({
      title: 'Time Up',
      message: 'Countdown timer has finished!'
    });
    document.getElementById('datetime-picker').disabled = false;
    document.getElementById('start-button').disabled = true;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(difference);
  document.getElementById('days').textContent = addLeadingZero(days);
  document.getElementById('hours').textContent = addLeadingZero(hours);
  document.getElementById('minutes').textContent = addLeadingZero(minutes);
  document.getElementById('seconds').textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
