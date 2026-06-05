// Nav Button Active State Toggles
(function(){
  const wrappers = Array.from(document.querySelectorAll('.home-wrapper10, .home-wrapper18, .home-wrapper21'));
  
  function clearActive(){ 
    wrappers.forEach(w => w.classList.remove('active')); 
  }
  
  document.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.home-wrapper10, .home-wrapper18, .home-wrapper21');
    if(wrapper){
      if(!wrapper.classList.contains('active')){
        clearActive();
        wrapper.classList.add('active');
      }
    } else {
      clearActive();
    }
  });
  
  wrappers.forEach(w => {
    w.addEventListener('focusin', () => { 
      clearActive(); 
      w.classList.add('active'); 
    });
  });
})();

// Count-up animation for stat counters
(function () {
  const DURATION = 2000;
  const PAUSE = 800;

  function animateCounter(el, target, duration, onComplete) {
    const start = performance.now();
    
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      el.textContent = Math.round(eased * target);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
        if (onComplete) onComplete();
      }
    }
    requestAnimationFrame(step);
  }

  function startLoop(el, target) {
    animateCounter(el, target, DURATION, function () {
      setTimeout(function () {
        startLoop(el, target);
      }, PAUSE);
    });
  }

  function setupCounter(locofyid, target) {
    const container = document.querySelector('[data-locofyid="' + locofyid + '"]');
    if (!container) return;
    
    const marksParent = container.querySelector(".empty-marks-parent");
    if (!marksParent) return;
    
    marksParent.innerHTML = '<b class="empty-marks10">0</b>';
    const el = marksParent.querySelector("b");
    startLoop(el, target);
  }

  function animateProjectNumbers(span5, span2, target, duration, pause) {
    const start = performance.now();
    
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      const str = String(current);
      
      if (str.length === 1) {
        span5.textContent = str;
        span2.textContent = "+";
      } else {
        span5.textContent = str.slice(0, -1);
        span2.textContent = str.slice(-1) + "+";
      }
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        span5.textContent = "5";
        span2.textContent = "0+";
        setTimeout(function () {
          animateProjectNumbers(span5, span2, target, duration, pause);
        }, pause);
      }
    }
    requestAnimationFrame(step);
  }

  // Initialize the counters once the page loads
  document.addEventListener("DOMContentLoaded", function () {
    // Basic Counters
    setupCounter("320:12064", 50);  // Projects Completed
    setupCounter("320:12067", 30);  // Happy Clients
    setupCounter("320:12073", 15);  // Years Experience
    setupCounter("320:12074", 5);   // Awards Won

    // Large "50+" hero display
    const projectNumbers = document.querySelector('[data-locofyid="320:12072"]');
    if (projectNumbers) {
      const span5 = projectNumbers.querySelector(".span");
      const span2 = projectNumbers.querySelector(".span2");
      if (span5 && span2) {
        animateProjectNumbers(span5, span2, 50, DURATION, PAUSE);
      }
    }
  });
})();
/* ========================================= */
/* ABOUT ME -> OMNIA DARWISH TEXT TOGGLE     */
/* ========================================= */
(function() {
  // 1. Find the two text elements from your HTML
  const aboutText = document.querySelector('.about3');
  const meText = document.querySelector('.me2');
  let showingOmnia = false;

  if (aboutText && meText) {
    // 2. Add a CSS transition via JS for a smooth fade effect
    aboutText.style.transition = "opacity 0.3s ease-in-out";
    meText.style.transition = "opacity 0.3s ease-in-out";

    // 3. Set a repeating loop (1600ms = 800ms per word)
    setInterval(() => {
      // Step A: Fade the text out
      aboutText.style.opacity = "0";
      meText.style.opacity = "0";

      // Step B: Wait 300ms for the fade to finish, then swap the text
      setTimeout(() => {
        if (showingOmnia) {
          aboutText.textContent = "About";
          meText.textContent = "Me";
        } else {
          aboutText.textContent = "Omnia";
          meText.textContent = "Darwish"; // <--- This now displays Darwish right under Omnia
        }
        
        showingOmnia = !showingOmnia;

        // Step C: Fade the new text back in
        aboutText.style.opacity = "1";
        meText.style.opacity = "1";
      }, 300);

    }, 1600); 
  }
  
})();
/* ========================================= */
/* INFINITE REWRITE TYPING EFFECT            */
/* ========================================= */
(function() {
  const container = document.querySelector('.omnias-exceptional-product');
  if (!container) return;

  // The text broken into lines
  const textLines = [
    "omnia’s Exceptional product design",
    "ensure our website’s success.",
    "Highly Recommended"
  ];

  // Convert the text into an array of characters and <br> tags
  let tokens = [];
  textLines.forEach((line, index) => {
    for (let char of line) {
      tokens.push(char);
    }
    if (index < textLines.length - 1) {
      tokens.push("<br />");
    }
  });

  let tokenIndex = 0;
  let isDeleting = false;

  function typeWriterLoop() {
    if (!isDeleting) {
      // 1. TYPING FORWARD
      if (tokenIndex < tokens.length) {
        tokenIndex++;
        container.innerHTML = tokens.slice(0, tokenIndex).join('');
        
        // Pause slightly longer at line breaks, otherwise type fast
        let delay = tokens[tokenIndex - 1] === "<br />" ? 300 : 50;
        setTimeout(typeWriterLoop, delay);
      } else {
        // Finished typing. Wait 3 seconds, then start deleting
        isDeleting = true;
        setTimeout(typeWriterLoop, 3000);
      }
    } else {
      // 2. DELETING BACKWARD
      if (tokenIndex > 0) {
        tokenIndex--;
        container.innerHTML = tokens.slice(0, tokenIndex).join('');
        
        // Delete faster than typing (20ms)
        let delay = tokens[tokenIndex] === "<br />" ? 50 : 20; 
        setTimeout(typeWriterLoop, delay);
      } else {
        // Finished deleting. Wait 1 second, then start typing again
        isDeleting = false;
        setTimeout(typeWriterLoop, 1000);
      }
    }
  }

  // Clear the container and start the infinite loop
  container.innerHTML = "";
  setTimeout(typeWriterLoop, 500);
})();
/* ========================================= */
/* ENDLESS MARQUEE SLIDER EFFECT (FRAME 12)  */
/* ========================================= */
(function() {
  const section = document.querySelector('.component-11');
  const img = document.querySelector('.image-icon');

  if (section && img) {
    // 1. Create a scrolling "track" wrapper
    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.width = 'max-content';
    track.style.position = 'absolute';
    track.style.top = '-128px'; /* Matches your original vertical position */
    track.style.left = '0';
    track.style.animation = 'marqueeSlider 35s linear infinite'; /* 35s controls the speed */
    
    // 2. Clone the image to create a seamless loop
    const clone = img.cloneNode(true);

    // 3. Remove absolute positioning from the images so they snap side-by-side
    img.style.position = 'static';
    clone.style.position = 'static';
    
    // 4. Place images in the track, and the track in the section
    track.appendChild(img);
    track.appendChild(clone);
    section.appendChild(track);
  }
})();
/* ========================================= */
/* DRAGGABLE "PULL" EFFECT FOR ALL 5 IMAGES  */
/* ========================================= */
(function() {
  // Added 07 and 08 to the list!
  const imageClasses = [
    '.whatsapp-image-2026-05-09-at-08',
    '.whatsapp-image-2026-05-09-at-04',
    '.whatsapp-image-2026-05-09-at-06',
    '.whatsapp-image-2026-05-09-at-0',
    '.whatsapp-image-2026-05-09-at-02',
    '.whatsapp-image-2026-05-09-at-07',
    '.whatsapp-image-2026-05-09-at-08' 
  ];

  imageClasses.forEach(selector => {
    const img = document.querySelector(selector);
    if (!img) return;

    let isDragging = false;
    let startY = 0;
    let currentTranslateY = 0;

    // Prevent the annoying default browser "ghost image" when dragging
    img.addEventListener('dragstart', (e) => e.preventDefault());

    // When you click down on the image
    img.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startY = e.clientY - currentTranslateY;
      
      img.style.cursor = 'grabbing';
      img.style.transition = 'none'; 
      img.setPointerCapture(e.pointerId); 
    });

    // When you move the mouse while holding down
    img.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      currentTranslateY = e.clientY - startY;
      img.style.transform = `translateY(${currentTranslateY}px)`;
    });

    // When you let go of the mouse
    img.addEventListener('pointerup', (e) => {
      isDragging = false;
      img.style.cursor = 'grab';
      img.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      img.releasePointerCapture(e.pointerId);
    });
  });
})();
/* ========================================= */
/* TYPING EFFECT FOR "HAVE AN AWSOME IDEA"   */
/* ========================================= */
(function() {
  // Target the exact container holding the text
  const container = document.querySelector('.have-an-awsome-container2');
  if (!container) return;

  // Split the text into two parts to protect the gradient class
  const part1 = "Have an Awsome Project Idea? ";
  const part2 = "Let’s Discuss";
  const totalLength = part1.length + part2.length;

  let index = 0;
  let isDeleting = false;

  function typeLoop() {
    let currentHTML = "";

    // If we are typing the first part (White text)
    if (index <= part1.length) {
      currentHTML = `<span>${part1.substring(0, index)}</span>`;
    } 
    // If we are typing the second part (Gradient text)
    else {
      currentHTML = `<span>${part1}</span><span class="lets-discuss">${part2.substring(0, index - part1.length)}</span>`;
    }

    container.innerHTML = currentHTML;

    // The Typing and Deleting Speed Logic
    if (!isDeleting) {
      // TYPING FORWARD
      if (index < totalLength) {
        index++;
        let delay = (index === part1.length) ? 400 : 50; // Pause slightly before typing "Let's Discuss"
        setTimeout(typeLoop, delay);
      } else {
        // Wait 3 seconds at the end before deleting
        isDeleting = true;
        setTimeout(typeLoop, 3000); 
      }
    } else {
      // DELETING BACKWARD
      if (index > 0) {
        index--;
        setTimeout(typeLoop, 20); // Fast delete speed
      } else {
        // Wait 1 second before starting over
        isDeleting = false;
        setTimeout(typeLoop, 1000); 
      }
    }
  }

  // Clear the original text and start the loop
  container.innerHTML = "";
  setTimeout(typeLoop, 500);
})();
/* ========================================= */
/* TYPING EFFECT FOR ".prtoflio"             */
/* ========================================= */
(function() {
  const prtoflio = document.querySelector('.prtoflio');
  if (!prtoflio) return;

  const text = "Prtoflio";
  let index = 0;
  let isDeleting = false;

  function typeLoop() {
    // Set the text content
    prtoflio.textContent = text.substring(0, index);

    if (!isDeleting) {
      if (index < text.length) {
        index++;
        setTimeout(typeLoop, 150); // Typing speed
      } else {
        isDeleting = true;
        setTimeout(typeLoop, 3000); // Pause at end
      }
    } else {
      if (index > 0) {
        index--;
        setTimeout(typeLoop, 100); // Deleting speed
      } else {
        isDeleting = false;
        setTimeout(typeLoop, 500); // Pause before restart
      }
    }
  }

  typeLoop();
})();
/* ========================================= */
/* INDEPENDENT CONTINUOUS STAR TWINKLE       */
/* ========================================= */
(function() {
  const stars = document.querySelectorAll('.iconstar, .iconstar6');

  stars.forEach((star) => {
    // Generate a random speed (between 1.5s and 3.5s)
    let randomDuration = (Math.random() * 2 + 1.5).toFixed(2); 
    
    // Generate a random start delay (between 0s and 2s)
    let randomDelay = (Math.random() * 2).toFixed(2); 

    // Apply the animation with the random math
    star.style.animation = `starTwinkle ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
  });
})();