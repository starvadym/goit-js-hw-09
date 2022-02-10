function getRandomHexColor() {
   let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
   return color;
}
let intervalId = null;

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.body;

function onStart() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    console.log(intervalId);
    btnStart.disabled = true;
    btnStop.disabled = false;

}

function onStop() {
    clearInterval(intervalId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}

btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", onStop);
