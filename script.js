/*=========================================
            GSAP SETUP + FALLBACK
=========================================*/
const hasGSAP = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
} else {
    document.documentElement.classList.add("no-gsap");
}

/*=========================================
            LOADER
=========================================*/
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.transition = ".8s";
});

/*=========================================
            CUSTOM CURSOR
=========================================*/
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
});
(function ringLoop(){
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(ringLoop);
})();
document.addEventListener("mouseover", e => {
    if(e.target.closest("a, button, .skill-card, .project-box, input, textarea")) ring.classList.add("hovered");
});
document.addEventListener("mouseout", e => {
    if(e.target.closest("a, button, .skill-card, .project-box, input, textarea")) ring.classList.remove("hovered");
});

/*=========================================
            MOBILE MENU
=========================================*/
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

/*=========================================
            STICKY HEADER
=========================================*/
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 100);
});

/*=========================================
        REMOVE MENU AFTER CLICK
=========================================*/
document.querySelectorAll(".navbar a").forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove("bx-x");
        navbar.classList.remove("active");
    };
});

/*=========================================
        ACTIVE NAV LINK
=========================================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove("active"));
            const active = document.querySelector('header nav a[href*="' + id + '"]');
            if (active) active.classList.add("active");
        }
    });
});

/*=========================================
        REVEAL ON SCROLL (GSAP ScrollTrigger)
=========================================*/
if (hasGSAP) {
    // Hero content is animated by its own choreographed timeline below —
    // exclude it from the generic scroll-batch reveal.
    const scrollReveals = gsap.utils.toArray(".reveal").filter(el => !el.closest(".home"));

    ScrollTrigger.batch(scrollReveals, {
        start: "top 88%",
        onEnter: (batch) => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
            });
        },
        once: true,
    });
} else {
    // No-GSAP fallback: just show everything immediately (handled via .no-gsap CSS)
}

/*=========================================
        HERO ENTRANCE TIMELINE
=========================================*/
if (hasGSAP) {
    const heroTl = gsap.timeline({ delay: 0.3, defaults: { ease: "power3.out" } });
    heroTl
        .to(".home-content .eyebrow", { opacity: 1, y: 0, duration: 0.7 })
        .to(".home-content > h3:not(.role-line)", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(".home-content > h1", { opacity: 1, y: 0, duration: 0.9 }, "-=0.45")
        .to(".home-content > h3.role-line", { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(".home-content > p", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(".home-content > .social-media", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(".home-content > .buttons", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .from(".home-img .orbit-stage", { opacity: 0, scale: 0.75, rotate: -12, duration: 1.2, ease: "back.out(1.5)" }, "-=1.3");
}

/*=========================================
        TYPEWRITER EFFECT
=========================================*/
const words = [
    "Java Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Oracle SQL Developer"
];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typing = document.querySelector(".multiple-text");

function typeEffect() {
    if (!typing) return;
    const current = words[wordIndex];
    if (!isDeleting) {
        typing.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) { isDeleting = true; setTimeout(typeEffect, 1300); return; }
    } else {
        typing.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
    }
    setTimeout(typeEffect, isDeleting ? 55 : 110);
}
typeEffect();

/*=========================================
        SMOOTH SCROLL
=========================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/*=========================================
        BUTTON RIPPLE EFFECT
=========================================*/
document.querySelectorAll(".btn").forEach(btn => {
    btn.style.position = btn.style.position || "relative";
    btn.style.overflow = "hidden";
    btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const r = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - r.left) + "px";
        ripple.style.top = (e.clientY - r.top) + "px";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/*=========================================
        MAGNETIC BUTTONS
=========================================*/
if (hasGSAP) {
    document.querySelectorAll(".btn").forEach(btn => {
        const strength = 22;
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

        btn.addEventListener("mousemove", (e) => {
            const r = btn.getBoundingClientRect();
            const relX = e.clientX - (r.left + r.width / 2);
            const relY = e.clientY - (r.top + r.height / 2);
            xTo((relX / r.width) * strength);
            yTo((relY / r.height) * strength);
        });
        btn.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
}

/*=========================================
        PROJECT CARD 3D TILT + CURSOR GLOW
=========================================*/
if (hasGSAP) {
    document.querySelectorAll(".tilt-card").forEach(card => {
        const glow = card.querySelector(".card-glow");
        const maxTilt = 10;

        const rotXTo = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const rotYTo = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const liftTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" });

        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;

            rotYTo((px - 0.5) * maxTilt * 2);
            rotXTo(-(py - 0.5) * maxTilt * 2);
            liftTo(-6);

            if (glow) {
                glow.style.setProperty("--mx", `${px * 100}%`);
                glow.style.setProperty("--my", `${py * 100}%`);
            }
        });

        card.addEventListener("mouseleave", () => {
            rotXTo(0); rotYTo(0); liftTo(0);
        });
    });
}

/*=========================================
        TIMELINE LINE DRAW ON SCROLL
=========================================*/
if (hasGSAP) {
    const timelineLine = document.querySelector(".timeline-line");
    if (timelineLine) {
        gsap.to(timelineLine, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 75%",
                end: "bottom 60%",
                scrub: 0.6,
            },
        });
    }

    // Note: .timeline-item already carries the .reveal class, so its fade/rise
    // is handled by the generic ScrollTrigger.batch reveal above — only the
    // connecting line needs its own scroll-scrubbed animation here.
}

/*=========================================
        SCROLL PROGRESS BAR
=========================================*/
const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressWidth = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    progress.style.width = progressWidth + "%";
});

/*=========================================
        CURRENT YEAR
=========================================*/
const year = document.querySelector(".year");
if (year) year.textContent = new Date().getFullYear();

/*=========================================
        AVATAR PARALLAX TILT
=========================================*/
const avatarBox = document.querySelector("#avatar-box");
if (avatarBox) {
    if (hasGSAP) {
        const rotYTo = gsap.quickTo(avatarBox, "rotationY", { duration: 0.7, ease: "power3.out" });
        const rotXTo = gsap.quickTo(avatarBox, "rotationX", { duration: 0.7, ease: "power3.out" });
        window.addEventListener("mousemove", e => {
            const x = (window.innerWidth / 2 - e.pageX) / 55;
            const y = (window.innerHeight / 2 - e.pageY) / 55;
            rotYTo(x);
            rotXTo(-y);
        });
    } else {
        window.addEventListener("mousemove", e => {
            let x = (window.innerWidth / 2 - e.pageX) / 55;
            let y = (window.innerHeight / 2 - e.pageY) / 55;
            avatarBox.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }
}

/*=========================================
        ORBITING SKILL CHIPS (3D)
=========================================*/
(function buildOrbit(){
    const layer = document.querySelector("#orbit-layer");
    if (!layer) return;
    const icons = ["bxl-html5", "bxl-css3", "bxl-javascript", "bxl-java", "bxl-react", "bx-data"];
    const count = icons.length;
    const radius = 210;
    icons.forEach((icon, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const chip = document.createElement("div");
        chip.className = "orbit-chip";
        chip.style.transform = `translate(${x}px, ${y}px)`;
        chip.innerHTML = `<i class='bx ${icon}'></i>`;
        layer.appendChild(chip);
    });
})();

/*=========================================
        THREE.JS AMBIENT BACKGROUND
=========================================*/
(function heroScene(){
    const canvas = document.getElementById("bg-canvas");
    if (!canvas || typeof THREE === "undefined") return;

    let w = window.innerWidth, h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);

    const group = new THREE.Group();
    scene.add(group);

    // floating wireframe icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.16 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(3.4, 1, 0);
    group.add(core);

    const coreGeo2 = new THREE.OctahedronGeometry(1.3, 0);
    const coreMat2 = new THREE.MeshBasicMaterial({ color: 0xffb648, wireframe: true, transparent: true, opacity: 0.13 });
    const core2 = new THREE.Mesh(coreGeo2, coreMat2);
    core2.position.set(-4, -1.6, -2);
    group.add(core2);

    // torus knot — adds structural variety to the ambient scene
    const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.28, 100, 12);
    const knotMat = new THREE.MeshBasicMaterial({ color: 0x8b7dff, wireframe: true, transparent: true, opacity: 0.14 });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(0.5, -2.6, -4);
    group.add(knot);

    // soft glow sprite behind the main icosahedron — cheap bloom-like effect
    // without a full post-processing pipeline
    function makeGlowTexture() {
        const size = 256;
        const c = document.createElement("canvas");
        c.width = c.height = size;
        const ctx = c.getContext("2d");
        const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grad.addColorStop(0, "rgba(0,194,255,0.55)");
        grad.addColorStop(0.5, "rgba(0,194,255,0.12)");
        grad.addColorStop(1, "rgba(0,194,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(c);
    }
    const glowTexture = makeGlowTexture();
    const glowMat = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending });
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(7, 7, 1);
    glowSprite.position.copy(core.position);
    group.add(glowSprite);

    // starfield / particle dust
    const starCount = 220;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x8b7dff, size: 0.03, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starGeo, starMat);
    group.add(stars);

    let targetX = 0, targetY = 0;
    window.addEventListener("mousemove", e => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.4;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    });

    // Scroll-tied depth: smoothly driven by GSAP ScrollTrigger when available
    // (falls back to a raw scroll-position factor otherwise)
    let scrollFactor = 0;
    if (hasGSAP) {
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            onUpdate: (self) => { scrollFactor = self.progress * 3.4; },
        });
    } else {
        window.addEventListener("scroll", () => {
            scrollFactor = window.scrollY / (window.innerHeight * 1.2);
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        core.rotation.y += 0.0018;
        core.rotation.x += 0.0007;
        core2.rotation.y -= 0.0014;
        core2.rotation.x += 0.001;
        knot.rotation.x += 0.0012;
        knot.rotation.y += 0.0016;
        stars.rotation.y += 0.0004;

        group.position.y = -scrollFactor * 2.2;
        group.rotation.y += (targetX - group.rotation.y) * 0.03;
        group.rotation.x += (targetY - group.rotation.x) * 0.03;
        camera.position.z = 9 - scrollFactor * 0.6;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
        w = window.innerWidth; h = window.innerHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
})();

/*=========================================
        CONTACT FORM SUBMISSION
=========================================*/
(function handleContactForm(){
    const form = document.querySelector("#contact-form");
    if (!form) return;
    const statusEl = document.querySelector("#form-status");
    const submitBtn = document.querySelector("#submit-btn");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        submitBtn.value = "Sending...";
        submitBtn.disabled = true;
        statusEl.className = "form-status";
        statusEl.textContent = "";

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/ajax/adarshgadekar58@gmail.com", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData
            });

            if (response.ok) {
                statusEl.textContent = "✓ Message sent successfully! I'll get back to you soon.";
                statusEl.classList.add("show", "success");
                form.reset();
            } else {
                throw new Error("Failed to send");
            }
        } catch (err) {
            statusEl.textContent = "✗ Something went wrong. Please email me directly at adarshgadekar58@gmail.com";
            statusEl.classList.add("show", "error");
        } finally {
            submitBtn.value = "Send Message";
            submitBtn.disabled = false;
        }
    });
})();
