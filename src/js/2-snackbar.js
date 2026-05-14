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
        resolve(`✅ Fulfilled promise in ${userData.delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${userData.delay}ms`);
      }
    }, userData.delay);
  });

  promise
    .then(value => {
      iziToast.show({
        close: false,
        messageColor: '#FFFFFF',
        message: value,
        position: 'topRight',
        progressBar: true,
        progressBarColor: '#326101',
        color: '#59A10D',
      });
    })
    .catch(error => {
      iziToast.show({
        close: false,
        messageColor: '#FFFFFF',
        message: error,
        position: 'topRight',
        progressBar: true,
        progressBarColor: 'rgb(181, 27, 27)',
        color: '#EF4040',
      });
    });
}
