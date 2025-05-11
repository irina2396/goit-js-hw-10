import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === 'fulfilled') {
                resolve(delay);
            }else{
                reject(delay);
            }
        }, delay);
    })

    .then((delay) =>{
        iziToast.success({
            title: '✅ Success',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight'
        });
        form.reset();
    })
    .catch((delay) =>{
        iziToast.error({
            title: '❌ Error',
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight'  
        });
        form.reset();
    });
});