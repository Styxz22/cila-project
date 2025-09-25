const canvas = document.getElementById("bubble");
const ctx = canvas.getContext("2d");

let bubbles = [];
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Bubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = h + Math.random() * h;
    this.radius = 10 + Math.random() * 30;
    this.speed = 1 + Math.random() * 2;
    this.alpha = 0.2 + Math.random() * 0.5;
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.radius < 0) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.radius * 0.1,
      this.x, this.y, this.radius
    );
    gradient.addColorStop(0, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

for (let i = 0; i < 40; i++) {
  bubbles.push(new Bubble());
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  for (let b of bubbles) {
    b.update();
    b.draw();
  }
  requestAnimationFrame(animate);
}

animate();
