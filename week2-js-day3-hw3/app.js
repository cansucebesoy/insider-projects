// maxlength of input is two
document.querySelectorAll(".time-boxes input").forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  });
});
