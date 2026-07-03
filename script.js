// ===============================
// START BUTTON SCROLL
// ===============================

const startButton = document.getElementById("startBtn");

if (startButton) {
    startButton.addEventListener("click", () => {
        document.querySelector("#bcis")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}

// ===============================
// SECTION OBSERVER
// ===============================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

sections.forEach(section => observer.observe(section));

// ===============================
// FLIP CARDS
// ===============================

document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});

// ===============================
// AI BIAS SIMULATOR
// ===============================

const slider = document.getElementById("biasSlider");
const accuracy = document.getElementById("accuracy");
const biasText = document.getElementById("biasText");

if (slider) {
    slider.addEventListener("input", () => {
        const value = Number(slider.value);
        const score = Math.round(50 + value * 0.48);

        if (accuracy) accuracy.textContent = `Accuracy: ${score}%`;

        if (biasText) {
            if (value > 80) {
                biasText.textContent = "The model performs well because the training data is diverse.";
            } else if (value > 50) {
                biasText.textContent = "Diversity is dropping. Performance may vary.";
            } else if (value > 25) {
                biasText.textContent = "Bias is becoming noticeable due to underrepresentation.";
            } else {
                biasText.textContent = "Highly biased dataset. Predictions are unreliable.";
            }
        }
    });
}

// ===============================
// TIMELINE PROGRESS
// ===============================

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".timeline-progress");

window.addEventListener("scroll", () => {
    if (!timeline || !progress) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const visible = windowHeight - rect.top;
    const total = rect.height;

    let percent = (visible / total) * 100;
    percent = Math.max(0, Math.min(percent, 100));

    progress.style.height = percent + "%";
});

// ===============================
// CURSOR GLOW + PARTICLES
// ===============================

const glow = document.querySelector(".cursor-glow");
const particleCanvas = document.getElementById("cursorParticles");

let pctx = null;
let particles = [];

if (particleCanvas) {
    pctx = particleCanvas.getContext("2d");
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

window.addEventListener("mousemove", (e) => {
    if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    }

    if (particles) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 4 + 1,
            life: 1
        });
    }
});

function animateParticles() {
    if (!pctx) return;

    pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(p => {
        pctx.fillStyle = `rgba(86,180,255,${p.life})`;
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pctx.fill();

        p.life -= 0.02;
        p.y -= 0.3;
    });

    particles = particles.filter(p => p.life > 0);

    requestAnimationFrame(animateParticles);
}

animateParticles();

// resize
window.addEventListener("resize", () => {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
});

// ===============================
// THEME TOGGLE
// ===============================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
        themeToggle.textContent =
            document.body.classList.contains("light") ? "☀️" : "🌙";
    });
}
// ===============================
// NEURAL NETWORK
// ===============================

const networkCanvas = document.getElementById("network");
const nctx = networkCanvas ? networkCanvas.getContext("2d") : null;

if (networkCanvas && nctx) {

    networkCanvas.width = window.innerWidth;
    networkCanvas.height = window.innerHeight;

    const nodes = [];
    const NODE_COUNT = 60;

    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * networkCanvas.width,
            y: Math.random() * networkCanvas.height,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            r: 2 + Math.random() * 2
        });
    }

    function animateNetwork() {
        nctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {

                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    nctx.beginPath();
                    nctx.strokeStyle = `rgba(86,180,255,${(1 - dist / 140) * 0.22})`;
                    nctx.moveTo(nodes[i].x, nodes[i].y);
                    nctx.lineTo(nodes[j].x, nodes[j].y);
                    nctx.stroke();
                }
            }
        }

        nodes.forEach(node => {
            nctx.beginPath();
            nctx.fillStyle = "#56b4ff";
            nctx.shadowBlur = 12;
            nctx.shadowColor = "#56b4ff";
            nctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            nctx.fill();

            node.x += node.dx;
            node.y += node.dy;

            if (node.x < 0 || node.x > networkCanvas.width) node.dx *= -1;
            if (node.y < 0 || node.y > networkCanvas.height) node.dy *= -1;
        });

        requestAnimationFrame(animateNetwork);
    }

    animateNetwork();

    window.addEventListener("resize", () => {
        networkCanvas.width = window.innerWidth;
        networkCanvas.height = window.innerHeight;
    });
}
// ===============================
// LOADER (ONLY ONCE)
// ===============================

const loader = document.getElementById("loader");
const loadingText = document.getElementById("loadingText");

const messages = [
    "Initializing Neural Network...",
    "Connecting Synapses...",
    "Loading AI Ethics Module...",
    "Preparing Brain-Computer Interface...",
    "Welcome to NeuroStrike."
];

let index = 0;

if (loadingText) {
    setInterval(() => {
        index++;
        if (index < messages.length) {
            loadingText.textContent = messages[index];
        }
    }, 600);
}

window.addEventListener("load", () => {
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 1500);
});

// ===============================
// 3D BRAIN TILT
// ===============================

const brain = document.querySelector(".brain-svg");

document.addEventListener("mousemove", (e) => {
    if (!brain) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    brain.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});