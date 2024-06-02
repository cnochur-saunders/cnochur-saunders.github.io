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

function fetchRepos(username, apiKey) {
  const repoContainer = document.getElementById("repo-container");
  fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`,
    {
      headers: {
        Authorization: `token ${apiKey}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the response to inspect its structure

      if (Array.isArray(data)) {
        data.forEach((repo) => {
          const repoElement = document.createElement("div");
          repoElement.classList.add("repo");
          repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          repoContainer.appendChild(repoElement);
        });
      } else {
        console.error("Unexpected response structure:", data);
      }
    })
    .catch((error) => console.error("Error fetching repositories:", error));
}

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
