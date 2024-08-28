document.addEventListener("DOMContentLoaded", function() {
  // Simulate loading time (1.5 seconds in this case)
  setTimeout(function() {
    // Hide the loader
    document.getElementById("loader").style.display = "none";
    // Show the content
    document.getElementById("content").classList.add("display-content");
  }, 1500); // 1500 milliseconds = 1.5 seconds
});

// Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
const imageContainer = document.querySelector('.image-modal');
const imageModal = document.getElementById('gallery-content');
const modalImage = document.getElementById('modalImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modalClose = document.getElementById('modalClose');
let currentImageIndex;

// Function to open the modal and display the selected image
function openModal(index) {
  currentImageIndex = index;
  modalImage.src = galleryItems[index].querySelector('img').src;

  if (window.innerWidth > 768) { // Adjust this value as per your desktop screen breakpoint
    document.body.classList.add('stop-scrolling');
    document.body.style.paddingRight = `${getScrollbarWidth()}px`; // Adjust padding to prevent content shift
  }
  if (window.innerWidth < 768) {
    document.body.classList.add('stop-scrolling');
  }

  // Show modal elements with animation
  setTimeout(() => {
    imageModal.classList.remove('hidden');
  }, 50); // Adjust delay as needed

  overlay.classList.remove('hidden');
  
  // Trigger slide-down animation on imageContainer
  setTimeout(() => {
    imageContainer.classList.add('slide-down');
  }, 50); // Adjust delay as needed
  
  // Fade in overlay
  setTimeout(() => {
    overlay.classList.add('opacity-80');
  }, 50);
}

// Function to close the modal
function closeModal() {
  imageModal.classList.add('hidden');
  imageContainer.classList.remove('slide-right', 'slide-left', 'slide-down');
  modalImage.classList.remove('slide-right', 'slide-left', 'slide-down');
  overlay.classList.remove('opacity-80');

  if (window.innerWidth > 768) { // Adjust this value as per your desktop screen breakpoint
    document.body.classList.remove('stop-scrolling');
    document.body.style.paddingRight = '';
  }
  if (window.innerWidth < 768) {
    document.body.classList.remove('stop-scrolling');
  }

  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300); // Match the transition duration
}

// Function to get scrollbar width
function getScrollbarWidth() {
  // Create a div element to measure scrollbar width
  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

// Event listeners for each gallery item
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    openModal(index);
  });
});

// Event listener for previous button
prevBtn.addEventListener('click', () => {
  const previousIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;

  // Remove any existing animation classes
  imageContainer.classList.remove('slide-right', 'slide-left', 'slide-down');
  modalImage.classList.remove('slide-right', 'slide-left', 'slide-down');

  // Force reflow to reset animation
  void imageContainer.offsetWidth;

  // Add slide-out animation class to current image
  imageContainer.classList.add('slide-out-right');

  // Set new image source after slide-out animation completes
  setTimeout(() => {
    modalImage.src = galleryItems[previousIndex].querySelector('img').src;
  }, 300); // Delay before setting new image source

  // Add slide-in animation class to new image after a short delay
  setTimeout(() => {
    imageContainer.classList.remove('slide-out-right');
    imageContainer.classList.add('slide-right');
  }, 300); // Delay before starting animation

  // Update currentImageIndex
  currentImageIndex = previousIndex;
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
  const nextIndex = (currentImageIndex + 1) % galleryItems.length;

  // Remove any existing animation classes
  imageContainer.classList.remove('slide-right', 'slide-left', 'slide-down');
  modalImage.classList.remove('slide-right', 'slide-left', 'slide-down');

  // Force reflow to reset animation
  void imageContainer.offsetWidth;

  // Add slide-out animation class to current image
  imageContainer.classList.add('slide-out-left');

  // Set new image source after slide-out animation completes
  setTimeout(() => {
    modalImage.src = galleryItems[nextIndex].querySelector('img').src;
  }, 300); // Delay before setting new image source

  // Add slide-in animation class to new image after a short delay
  setTimeout(() => {
    imageContainer.classList.remove('slide-out-left');
    imageContainer.classList.add('slide-left');
  }, 300); // Delay before starting animation

  // Update currentImageIndex
  currentImageIndex = nextIndex;
});

// Event listener to close modal on modal close button click
modalClose.addEventListener('click', () => {
  closeModal();
});

// Event listener to close modal on outside click
imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    closeModal();
  }
});

// Event listener for keyboard navigation (optional)
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    prevBtn.click();
  } else if (event.key === 'ArrowRight') {
    nextBtn.click();
  } else if (event.key === 'Escape') {
    closeModal();
  }
});

/* Sidebar with overlay */

// Get sidebar elements
const sidebarToggle = document.getElementById('sidebar-open');
const sidebarClose = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Open sidebar and show overlay
sidebarToggle.addEventListener('click', () => {
  document.body.classList.add('stop-scrolling');
  sidebar.classList.add('sidebar-open');
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.add('opacity-60');
  }, 50); // Delay to ensure smooth transition starts
});

// Close sidebar and hide overlay
sidebarClose.addEventListener('click', () => {
  document.body.classList.remove('stop-scrolling');
  sidebar.classList.remove('sidebar-open');
  overlay.classList.remove('opacity-60');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300); // Match transition duration for hiding overlay
});

// Close sidebar and hide overlay when overlay is clicked
overlay.addEventListener('click', () => {
  document.body.classList.remove('stop-scrolling');
  sidebar.classList.remove('sidebar-open');
  overlay.classList.remove('opacity-60');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300); // Match transition duration for hiding overlay
});

// Show or hide the back-to-top button based on scroll position
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  var backToTopButton = document.getElementById("back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// Smooth scroll back to top
function topFunction() {
  // For Chrome, Firefox, IE, and Opera
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  // For Safari
  document.body.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* Sticky Navbar */
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  var navbarPlaceholder = document.getElementById('navbar-placeholder');
  var scrollPosition = window.scrollY;
  var isSticky = false;

  // Add or remove sticky class based on scroll position
  if (scrollPosition > navbar.offsetTop) {
    navbar.classList.add('sticky');
    navbarPlaceholder.style.display = 'block';
    isSticky = true;
  } else {
    navbar.classList.remove('sticky');
    navbarPlaceholder.style.display = 'none';
    isSticky = false;
  }
});
