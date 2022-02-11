import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};


function onFormSubmit(e) {
  e.preventDefault();
  let delayRef = Number(refs.form.elements.delay.value);
  const step = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);
  console.log(delayRef, step, amount);

  for (let i = 1; i <= amount; i += 1) {

    let position = i;
    let delay = delayRef + (step * (i - 1));

  createPromise(position, delay)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

  });
  }
}

refs.form.addEventListener("submit", onFormSubmit);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
       }, delay);
  });
};
//------------------------------------------------------------------------------





