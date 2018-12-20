let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);
  // setInterval(function() {
  // seconds--;
  // }, 1000);
  // can be janky when scrolling or other actions
  const now = Date.now();
  const then = now + seconds * 1000;
  console.log({ now, then });
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    // const secondsLeft = (then - Date.now()) / 1000; // not whole numbers
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds} `;
  console.log({ minutes, remainderSeconds });
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  //   const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  //   endTime.textContent = `Be Back At ${adjustedHour}:${
  //     minutes < 10 ? "0" : ""
  //   }${minutes}`;

  endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  console.log("this in startTimer: ", this);
  const seconds = parseInt(this.dataset.time);
  console.log(seconds);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
//dont need to select customForm because the element has a name attribute
//similarly nested elements can be called as well
document.customForm.addEventListener("submit", function(e) {
  e.preventDefault(); // prevents reload and sending the data over get
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
