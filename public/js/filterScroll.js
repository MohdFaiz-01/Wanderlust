// Select the scroll container and the arrows
const scrollContainer = document.getElementById('filters');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Function to toggle arrow visibility based on overflow
function checkOverflow() {
  // Check if the container has overflow in the horizontal direction
  if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
    leftArrow.style.display = 'block';  // Show left arrow
    rightArrow.style.display = 'block'; // Show right arrow
  } else {
    leftArrow.style.display = 'none';   // Hide left arrow
    rightArrow.style.display = 'none';  // Hide right arrow
  }
}

// Call the checkOverflow function when the page loads and when the window is resized
window.addEventListener('load', checkOverflow);
window.addEventListener('resize', checkOverflow);

// Add click event to scroll left
leftArrow.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -200, // Scroll left by 200px (adjust as needed)
    behavior: 'smooth' // Smooth scrolling
  });
});

// Add click event to scroll right
rightArrow.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 200, // Scroll right by 200px (adjust as needed)
    behavior: 'smooth' // Smooth scrolling
  });
});