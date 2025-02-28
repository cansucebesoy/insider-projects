// maxlength of input is two
document.querySelectorAll(".time-boxes input").forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  });
});

document.querySelectorAll("input[type='number']").forEach((input) => {
  input.addEventListener("focus", function () {
    if (this.value === "00") {
      this.value = "";
    }
  });

  input.addEventListener("blur", function () {
    if (this.value === "") {
      this.value = "00";
    }
  });
});

const hourField = document.querySelector(".hour input");
const minField = document.querySelector(".min input");
const secField = document.querySelector(".sec input");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");

let countdown = 0;

const getCountdownInSeconds = () => {
  const hours = parseInt(hourField.value, 10) || 0;
  const minutes = parseInt(minField.value, 10) || 0;
  const seconds = parseInt(secField.value, 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
};

const startCountdown = () => {
  let totalSeconds = getCountdownInSeconds();

  if (totalSeconds <= 0) {
    alert("Please enter a valid period!");
    return;
  }
  clearInterval(countdown);

  countdown = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      alert("Time's up!");
      return;
    }

    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    hourField.value = String(hours).padStart(2, "0");
    minField.value = String(minutes).padStart(2, "0");
    secField.value = String(seconds).padStart(2, "0");
  }, 1000);
};

const resetCountdown = () => {
  clearInterval(countdown);
  hourField.value = "00";
  minField.value = "00";
  secField.value = "00";
};

startButton.addEventListener("click", startCountdown);
resetButton.addEventListener("click", resetCountdown);
