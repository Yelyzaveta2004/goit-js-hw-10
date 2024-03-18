import iziToast from "izitoast";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const delayInput = document.querySelector("input[name='delay']");
    const delay = parseInt(delayInput.value);

    const stateRadio = document.querySelector("input[name='state']:checked");
    const state = stateRadio ? stateRadio.value : null;

    if (delay && state) {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === "fulfilled") {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      promise.then(
        (delay) => {
          iziToast.success({
            title: "Notification",
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
          });
        },
        (delay) => {
          iziToast.error({
            title: "Notification",
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight",
          });
        }
      );
    } else {
      iziToast.error({
        title: "Error",
        message: "Please enter delay and select state.",
        position: "topRight",
      });
    }
  });
});