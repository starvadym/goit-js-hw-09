import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';


const myInput = document.querySelector("input#datetime-picker");
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


function onInput() {

   targetDate = myInput.value;
   let date = new Date(targetDate);
   msTargetDate = date.getTime();
   const delta = msTargetDate - Date.now();

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

function CountdownTimer() {

    setInterval(() => {
       const currentTime = Date.now();
       const delta = msTargetDate - currentTime;
       if (delta < 0) {
           return;
       }
       const { days, hours, minutes, seconds } = convertMs(delta);
       daysSpanRef.textContent = days;
    //    hoursSpanRef.textContent = String(hours).padStart(2, 0);
       hoursSpanRef.textContent = addLeadingZero(hours);
    //    minutesSpanRef.textContent = String(minutes).padStart(2, 0);
       minutesSpanRef.textContent = addLeadingZero(minutes);
    //    secondsSpanRef.textContent = String(seconds).padStart(2, 0);
       secondsSpanRef.textContent = addLeadingZero(seconds);
   }, 1000);
}


function onClick() {
    btnStart.disabled = true;
    myInput.disabled = true;
    CountdownTimer();
}


btnStart.addEventListener('click', onClick);





