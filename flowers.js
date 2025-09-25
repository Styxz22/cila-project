window.addEventListener("load", () => {
    const canvas = document.getElementById("flowers");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Bunga muncul setelah semua teks (delay sesuai animasi di CSS)
    setTimeout(() => {
      canvas.style.display = "block";
      startFlowers();
    }, 33000); // 33 detik (setelah animasi teks selesai)
  
    class Flower {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      }
      update() {
        this.y -= this.speedY;
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          let angle = (i * 2 * Math.PI) / 5;
          let petalX = this.x + this.size * Math.cos(angle);
          let petalY = this.y + this.size * Math.sin(angle);
          ctx.lineTo(petalX, petalY);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
  
    let flowers = [];
    for (let i = 0; i < 50; i++) {
      flowers.push(new Flower());
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flowers.forEach((flower) => {
        flower.update();
        flower.draw();
      });
      requestAnimationFrame(animate);
    }
  
    function startFlowers() {
      animate();
    }
  
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });
  