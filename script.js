
const text = "Java Full Stack Developer";
let i = 0;

function typing() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 100);
  }
}
typing();



const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  toggleBtn.innerHTML = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.innerHTML = "🌙";
  }
});



fetch("https://api.github.com/users/adarshgadekar/repos")
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("github-projects");

    if (container) {
      container.innerHTML = ""; // clear before adding

      data.slice(0, 6).forEach(repo => {
        container.innerHTML += `
        <div class="project">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View Code</a>
        </div>
        `;
      });
    }
  })
  .catch(err => console.log("GitHub Error:", err));



if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true
  });
}



if (typeof tsParticles !== "undefined") {
  tsParticles.load("particles-js", {
    particles: {
      number: { value: 80 },
      size: { value: 3 },
      move: { speed: 2 },
      links: {
        enable: true,
        distance: 150
      }
    }
  });
}



const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});



document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
function openModal(src){
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal(){
  document.getElementById("imageModal").style.display = "none";
}
function openProjectModal(title, tech, desc, img) {
  document.getElementById("projectModal").style.display = "flex";

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalTech").innerText = "Tech: " + tech;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalProjectImg").src = img;
}

function closeProjectModal() {
  document.getElementById("projectModal").style.display = "none";
}
// 🔥 FIRE MOUSE EFFECT
const fire = document.getElementById("fireCursor");

document.addEventListener("mousemove", (e) => {
  fire.style.left = e.clientX + "px";
  fire.style.top = e.clientY + "px";
});
