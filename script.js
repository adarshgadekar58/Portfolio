// typing animation
const text = "Java Full Stack Developer";
let i = 0;

function typing(){
if(i < text.length){
document.getElementById("typing").innerHTML += text.charAt(i);
i++;
setTimeout(typing,100);
}
}
typing();


// dark mode
document.getElementById("themeToggle").onclick = () => {
document.body.classList.toggle("dark");
};


// github projects
fetch("https://api.github.com/users/adarshgadekar/repos")
.then(res => res.json())
.then(data => {
let container = document.getElementById("github-projects");
if(container){
data.slice(0,6).forEach(repo => {
container.innerHTML += `
<div class="project">
<h3>${repo.name}</h3>
<p>${repo.description || "No description"}</p>
<a href="${repo.html_url}" target="_blank">View Code</a>
</div>
`;
});
}
});


// scroll animation
AOS.init({
duration:1000
});


// particle background
tsParticles.load("particles-js", {
particles: {
number:{value:80},
size:{value:3},
move:{speed:2},
links:{
enable:true,
distance:150
}
}
});


/* =========================
   🔥 ADD NAVBAR JS HERE (BOTTOM)
========================= */

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if(menuToggle && navMenu){
menuToggle.addEventListener("click", () => {
navMenu.classList.toggle("active");
});
}

// ACTIVE LINK SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
let current = "";

sections.forEach(section => {
const sectionTop = section.offsetTop - 100;
if (scrollY >= sectionTop) {
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

// SMOOTH SCROLL
document.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior: 'smooth'
});
});
});