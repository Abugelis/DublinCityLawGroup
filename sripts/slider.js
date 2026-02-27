const sliderTrack = document.querySelector('.slider-track');
const trackWrapper = document.querySelector('.slider-track-wrapper');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

const cards = document.querySelectorAll('.light-card');

let currentIndex = 0;

// Get card width dynamically (handles responsive)
function getCardWidth() {
  const gap = parseInt(getComputedStyle(sliderTrack).gap) || 0;
  return cards[0].offsetWidth + gap;
}

// How many cards fit in view
function getVisibleCards() {
  return Math.floor(trackWrapper.offsetWidth / getCardWidth());
}

// Correct max index (prevents empty space)
function getMaxIndex() {
  const cardWidth = getCardWidth();
  const wrapperWidth = trackWrapper.offsetWidth;

  const totalWidth = cards.length * cardWidth;

  const extraOffset = 2; // 👈 2rem space at end (adjust if needed)

  const maxTranslate = totalWidth - wrapperWidth - extraOffset;

  return Math.max(0, Math.ceil(maxTranslate / cardWidth));
}

// Update slider position
function updateSlider() {
  const cardWidth = getCardWidth();

  const maxTranslate = sliderTrack.scrollWidth - trackWrapper.clientWidth;

  let translate = currentIndex * cardWidth;

  // 🔴 HARD STOP — prevents empty space
  if (translate > maxTranslate) {
    translate = maxTranslate;
    currentIndex = Math.floor(maxTranslate / cardWidth);
  }

  if (translate < 0) {
    translate = 0;
    currentIndex = 0;
  }

  sliderTrack.style.transform = `translateX(-${translate}px)`;

  // Optional: disable arrows
  prevBtn.disabled = translate === 0;
  nextBtn.disabled = translate >= maxTranslate;
}

// Arrow clicks
nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
});

// Swipe support
let startX = 0;
let isDragging = false;

sliderTrack.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderTrack.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  const diff = e.touches[0].clientX - startX;
  sliderTrack.style.transform = `translateX(${-currentIndex * getCardWidth() + diff}px)`;
});

sliderTrack.addEventListener('touchend', (e) => {
  isDragging = false;

  const diff = e.changedTouches[0].clientX - startX;

  if (diff < -50) currentIndex++;
  if (diff > 50) currentIndex--;

  updateSlider();
});

// Handle resize (VERY important for responsiveness)
window.addEventListener('resize', updateSlider);

// Initial setup
updateSlider();