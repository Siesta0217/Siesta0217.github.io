const text = "Siesta on top";
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000;

let index = 0;
let isTyping = true;

function animateText() {
  const animatedElement = document.getElementById('animated-text');
  
  function updateText() {
    if (isTyping && index <= text.length) {
      animatedElement.textContent = text.slice(0, index);
      index++;
      setTimeout(updateText, typingDelay);
    } else if (!isTyping && index > 0) {
      animatedElement.textContent = text.slice(0, index - 1);
      index--;
      setTimeout(updateText, erasingDelay);
    } else {
      isTyping = !isTyping;
      setTimeout(updateText, newTextDelay);
    }
  }

  updateText();
}

document.addEventListener('DOMContentLoaded', animateText);

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.contact-images img');

  images.forEach(img => {
    img.addEventListener('mouseover', function() {
      img.style.transform = 'scale(1.1)';
      img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    img.addEventListener('mouseout', function() {
      img.style.transform = 'scale(1)';
      img.style.boxShadow = 'none';
    });
  });

  const discordImg = document.querySelector('.contact-images img.discord');
  const gmailImg = document.querySelector('.contact-images img.gmail');
  const githubImg = document.querySelector('.contact-images img.github');

  discordImg.addEventListener('mouseover', function() {
    discordImg.style.transform = 'translateY(-20px) scale(1.1)';
    discordImg.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
    discordImg.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });

  discordImg.addEventListener('mouseout', function() {
    discordImg.style.transform = 'translateY(-20px) scale(1)';
    discordImg.style.boxShadow = 'none';
  });

  gmailImg.addEventListener('mouseover', function() {
    gmailImg.style.transform = 'translateY(0) scale(1.1)';
    gmailImg.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
    gmailImg.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });

  gmailImg.addEventListener('mouseout', function() {
    gmailImg.style.transform = 'translateY(0) scale(1)';
    gmailImg.style.boxShadow = 'none';
  });

  githubImg.addEventListener('mouseover', function() {
    githubImg.style.transform = 'translateY(-20px) scale(1.1)';
    githubImg.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
    githubImg.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });

  githubImg.addEventListener('mouseout', function() {
    githubImg.style.transform = 'translateY(-20px) scale(1)';
    githubImg.style.boxShadow = 'none';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const downArrow = document.getElementById('down-arrow');
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;

  downArrow.addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // 向下滚动，隐藏导航栏
      navbar.style.top = '-80px'; // 确保导航栏完全隐藏
    } else {
      // 向上滚动，显示导航栏
      navbar.style.top = '20PX';
    }
    lastScrollTop = scrollTop;
  });

  // 为导航链接添加悬停动画
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const underline = document.createElement('div');
      underline.classList.add('underline');
      this.appendChild(underline);
      setTimeout(() => underline.style.width = '100%', 0);
    });

    link.addEventListener('mouseleave', function() {
      const underline = this.querySelector('.underline');
      if (underline) {
        underline.style.width = '0';
        underline.addEventListener('transitionend', () => underline.remove());
      }
    });
  });
});

