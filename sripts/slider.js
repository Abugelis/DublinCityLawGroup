const slider = document.querySelector(".slider-track-wrapper");
const prev = document.querySelector(".slider-arrow.prev");
const next = document.querySelector(".slider-arrow.next");

function getScrollAmount() {
  return slider.clientWidth * 0.9;
}

next.addEventListener("click", () => {
  slider.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth"
  });
});

prev.addEventListener("click", () => {
  slider.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth"
  });
});