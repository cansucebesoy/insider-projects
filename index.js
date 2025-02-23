const text =
  "Imagine working at a small-town paper company where the boss thinks he's a comedic genius, the receptionist is stuck in a never-ending engagement, and the assistant regional manager (sorry, assistant to the regional manager) is obsessed with power, beets, and karate. Welcome to Dunder Mifflin Scranton, the weirdest, most chaotic, yet somehow lovable office you’ll ever see.";
const speed = 25;
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("animated-text").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    document.getElementById("animated-text").style.borderRight = "none";
  }
}

window.onload = typeWriter;

const image = document.querySelector(".main-photo img");

window.addEventListener("load", () => {
  image.classList.add("animate__animated", "animate__bounceIn");
  image.style.opacity = 1;
});

const heartIcon = document.getElementById("heart-icon");

heartIcon.addEventListener("mouseenter", () => {
  heartIcon.style.color = "white";
});

heartIcon.addEventListener("mouseleave", () => {
  heartIcon.style.color = "#b197fc";
});
