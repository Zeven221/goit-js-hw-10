// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.js-form'),
};
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(refs.form);
  const userData = Object.fromEntries(formData);
  createPromise(userData);
});
function createPromise(userData) {
  const isSuccess = userData.state === 'fulfilled' ? true : false;
  console.log(isSuccess);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(userData.delay);
      } else {
        reject(userData.delay);
      }
    }, userData.delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        close: false,
        messageColor: '#FFFFFF',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        progressBar: true,
        progressBarColor: '#326101',
        color: '#59A10D',
      });
    })
    .catch(delay => {
      iziToast.show({
        close: false,
        messageColor: '#FFFFFF',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        progressBar: true,
        progressBarColor: 'rgb(181, 27, 27)',
        color: '#EF4040',
      });
    });
}
