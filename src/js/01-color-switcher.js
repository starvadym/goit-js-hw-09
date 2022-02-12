let intervalId = null;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.body;

btnDisable(btnStop);

function onStart() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnDisable(btnStart);
    btnDisable(btnStop);
}

function onStop() {
    clearInterval(intervalId);
    btnDisable(btnStart);
    btnDisable(btnStop);
}

function getRandomHexColor() {
   let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
   return color;
}

function btnDisable(button) {
  button.disabled = !button.disabled;
}

btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", onStop);
