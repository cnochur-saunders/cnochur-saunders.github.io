document.addEventListener("DOMContentLoaded", function () {
  const username = "cnochur-saunders";
  fetchConfigAndFetchRepos(username);
});

function fetchConfigAndFetchRepos(username) {
  fetch("./config.json")
    .then((response) => response.json())
    .then((config) => {
      const apiKey = config.api_key;
      fetchRepos(username, apiKey);
    })
    .catch((error) =>
      console.error("Error fetching configuration file:", error)
    );
}

document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector(".carousel-track");
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");
  let currentIndex = 0;

  // Fetch latest 3 GitHub repos
  document.addEventListener("DOMContentLoaded", function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    let currentIndex = 0;

    // Fetch latest 3 GitHub repos
    fetch('https://api.github.com/users/YOUR_GITHUB_USERNAME/repos?sort=updated&per_page=3')
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const card = document.createElement('li');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="https://via.placeholder.com/300" alt="Project Image">
                    <h3>${repo.name}</h3>
                    <div class="card-details">
                        <p>${repo.description}</p>
                        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                    </div>
                `;

                carouselTrack.appendChild(card);
            });
        });

    leftButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
        updateCarousel();
    });

    rightButton.addEventListener('click', () => {
        currentIndex = (currentIndex < 2) ? currentIndex + 1 : 2;
        updateCarousel();
    });

    function updateCarousel() {
        const trackWidth = carouselTrack.clientWidth;
        const cardWidth = trackWidth / 3;
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});

// Highlight active link in navigation
const links = document.querySelectorAll("nav ul li a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
