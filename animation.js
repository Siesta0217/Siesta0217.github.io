document.addEventListener('DOMContentLoaded', function() {
  // 文字加载时图片移动动画
  const heroImage = document.querySelector('.hero-content');
  heroImage.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
  heroImage.style.transform = 'translateY(-20px)';
  heroImage.style.opacity = '0';

  setTimeout(() => {
    heroImage.style.transform = 'translateY(0)';
    heroImage.style.opacity = '1';
  }, 500);

  // 按钮悬停效果
  const buttons = document.querySelectorAll('.my-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
      this.style.boxShadow = '0 0 0 1px white'; // 确保边框样式存在
    });

    // 按钮点击时的缩放效果
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });


  // 滚动时背景图片视差效果
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    mouseMoveEnabled = false; // 禁用鼠标移动效果
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      mouseMoveEnabled = true; // 恢复鼠标移动效果
    }, 100); // 滚动结束后100ms恢复鼠标移动效果

    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  });
});

// 加载动画
document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  const loadingContent = document.querySelector('.loading-content');
  const loadingProgressBar = document.querySelector('.loading-progress-bar');
  const loadingProgressPercentage = document.querySelector('.loading-progress-percentage');
  
  let progress = 0;
  const interval = setInterval(function() {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
      const roundedProgress = Math.round(progress);
      loadingProgressBar.style.width = roundedProgress + '%';
      loadingProgressPercentage.textContent = roundedProgress + '%';
      
      if (progress === 100) {
          clearInterval(interval);
          setTimeout(function() {
              // 向上飞出动画
              loadingContent.style.transform = 'translateY(-100vh)';
              loadingContent.style.opacity = '0';
              
              // 背景开幕动画
              loadingOverlay.classList.add('opening');
              
              setTimeout(function() {
                  loadingOverlay.classList.add('hidden');
              }, 1000); // 等待开幕动画完成
          }, 500);
      }
  }, 200);
  
  window.addEventListener('load', function() {
      progress = 100;
      loadingProgressBar.style.width = '100%';
      loadingProgressPercentage.textContent = '100%';
  });
});

// 添加滾動動畫
function animateContactItems() {
  const contactSection = document.querySelector('.contact');
  const contactItems = document.querySelectorAll('.contact-item');
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      contactItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 200);
      });
      observer.unobserve(contactSection);
    }
  }, { threshold: 0.5 });

  observer.observe(contactSection);
}

// 頁面加載完成後執行動畫函數
window.addEventListener('load', animateContactItems);

function animateGoalItems() {
  const goalsSection = document.querySelector('.goals');
  const goalItems = document.querySelectorAll('.goal-item');
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      goalItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 200);
      });
      observer.unobserve(goalsSection);
    }
  }, { threshold: 0.3 });

  observer.observe(goalsSection);
}

// 頁面加載完成後執行動畫函數
window.addEventListener('load', () => {
  animateContactItems();
  animateGoalItems();
});

// 確保頁面載入時滾動到頂部
window.onload = function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 0);
};

// 阻止瀏覽器記住滾動位置
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function updateRGBLine() {
  const rgbLine = document.querySelector('.rgb-line');
  let hue = 0;
  let animationSpeed = 1; // 控制動畫速度
  let isAnimating = true; // 控制動畫狀態

  function animate() {
    if (isAnimating) {
      hue = (hue + animationSpeed) % 360;
      const color1 = `hsl(${hue}, 100%, 50%)`;
      const color2 = `hsl(${(hue + 120) % 360}, 100%, 50%)`;
      const color3 = `hsl(${(hue + 240) % 360}, 100%, 50%)`;
      
      rgbLine.style.background = `linear-gradient(to right, ${color1}, ${color2}, ${color3}, ${color1})`;
      rgbLine.style.backgroundSize = '200% 100%';
    }
    
    requestAnimationFrame(animate);
  }

  animate();

  // 提供控制動畫的方法
  return {
    setSpeed: (speed) => { animationSpeed = 0.5; },
    pause: () => { isAnimating = false; },
    resume: () => { isAnimating = true; },
  };
}

function createInteractiveBackground() {
  const contact = document.querySelector('.contact');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = contact.offsetWidth;
  canvas.height = contact.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  
  contact.insertBefore(canvas, contact.firstChild);

  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
    }
  }

  draw();
}

window.addEventListener('load', createInteractiveBackground);

function createHalftoneDots() {
  const container = document.querySelector('.goals');
  const dotContainer = document.createElement('div');
  dotContainer.classList.add('halftone-container');
  container.appendChild(dotContainer);

  const dotCount = 50; // 調整點的數量
  const dotSize = 20; // 調整點的大小

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('halftone-dot');
    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 4}s`; // 隨機延遲以創造更自然的效果

    dotContainer.appendChild(dot);
  }
}

// 在頁面加載完成後創建半色調點
window.addEventListener('load', createHalftoneDots);