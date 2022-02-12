import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const pRef = document.querySelector('p');
const myInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('[data-start]');
const daysSpanRef = document.querySelector(`[data-days]`);
const hoursSpanRef = document.querySelector(`[data-hours]`);
const minutesSpanRef = document.querySelector(`[data-minutes]`);
const secondsSpanRef = document.querySelector(`[data-seconds]`);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr(myInput, options)  // flatpickr
let targetDate = null;
let msTargetDate = null;
btnStart.disabled = true;

wrapper();

function onInput() {

   targetDate = myInput.value;
   let date = new Date(targetDate);
   const delta = date.getTime() - Date.now();

   if (delta < 0) {
       Notiflix.Notify.failure('Please choose a date in the future');
       return;
   } else {
       btnStart.disabled = false;
   }
  return  msTargetDate = date.getTime();
}


myInput.addEventListener("input", onInput);

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

function addLeadingZero(value) {
 return String(value).padStart(2, 0);
}

function countdownTimer() {

  const intervalId = setInterval(() => {
       const currentTime = Date.now();
       const delta = msTargetDate - currentTime;
    if (delta < 0) {
      clearInterval(intervalId);
      countdownValues(convertMs(0));
      return;
    }
      countdownValues(convertMs(delta));
   }, 1000);
};

function countdownValues({ days, hours, minutes, seconds }) {
  daysSpanRef.textContent = days;
  hoursSpanRef.textContent = addLeadingZero(hours);
  minutesSpanRef.textContent = addLeadingZero(minutes);
  secondsSpanRef.textContent = addLeadingZero(seconds);
}

function onClick() {
    btnStart.disabled = true;
    myInput.disabled = true;
    countdownTimer();
}


btnStart.addEventListener('click', onClick);


function wrapper() {

  const wrapper = document.createElement("div");
  wrapper.classList.add('wrapper');
  pRef.after(wrapper);
  wrapper.appendChild(myInput);
  wrapper.appendChild(btnStart);
}



