import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("#start-btn");
const dateInput = document.querySelector("#datetime-picker");

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];
        if(pickedDate <= new Date()){
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            startBtn.disabled=true;
        } else{
            userSelectedDate = pickedDate;
            startBtn.disabled=false;
        }
    },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    dateInput.disabled = true;

    intervalId = setInterval(() => {
        const currentTime = new Date();
        const diffMS = userSelectedDate - currentTime;
    
        if(diffMS < 1000){
            clearInterval(intervalId);
            updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateInput.disabled = false;
            return;
        }

        const time = convertMs(diffMS);
        updateDisplay(time);
    }, 1000);
})

function updateDisplay({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

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
    return String(value).padStart(2, '0');
}
