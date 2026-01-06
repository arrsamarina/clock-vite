import "bootstrap/dist/css/bootstrap.min.css";
import { DateTime } from "luxon";

const hh = document.getElementById("hh");
const showBtn = document.getElementById("showBtn");

const modal = document.getElementById("timeModal");
const backdrop = document.getElementById("backdrop");

const closeX = document.getElementById("closeX");
const closeBtn = document.getElementById("closeBtn");

let timerId = null;

function renderTime() {
  hh.textContent = DateTime.local()
    .setLocale("ru")
    .toFormat("dd.LL.y HH:mm:ss");
}

function openModal() {
  backdrop.classList.add("show");
  backdrop.style.display = "block";

  modal.style.display = "block";
  modal.classList.add("show");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");

  renderTime();
  timerId = setInterval(renderTime, 1000);
}

function closeModal() {
  if (timerId) clearInterval(timerId);
  timerId = null;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.style.display = "none";

  backdrop.classList.remove("show");
  backdrop.style.display = "none";
}

showBtn.addEventListener("click", openModal);
closeX.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

closeModal();

