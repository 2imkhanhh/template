document.addEventListener('DOMContentLoaded', () => {
    // --- Gallery Logic (Infinite Slider) ---
    const track = document.getElementById('main-image-track');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.gallery-main .prev-arrow');
    const nextBtn = document.querySelector('.gallery-main .next-arrow');
    
    if (track && prevBtn && nextBtn) {
        let transitioning = false;
        let currentIndex = 0;
        const totalImages = thumbnails.length;
        
        function updateThumbnails() {
            if (thumbnails.length > 0) {
                thumbnails.forEach(t => t.classList.remove('active'));
                let activeIndex = ((currentIndex % totalImages) + totalImages) % totalImages;
                if (thumbnails[activeIndex]) {
                    thumbnails[activeIndex].classList.add('active');
                }
            }
        }
        
        nextBtn.addEventListener('click', () => {
            if (transitioning) return;
            transitioning = true;
            
            currentIndex++;
            updateThumbnails();
            
            const cardWidth = track.firstElementChild.offsetWidth;
            
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = `translateX(-${cardWidth}px)`;
            
            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                track.style.transition = 'none';
                track.appendChild(track.firstElementChild);
                track.style.transform = 'translateX(0)';
                transitioning = false;
            });
        });
        
        prevBtn.addEventListener('click', () => {
            if (transitioning) return;
            transitioning = true;
            
            currentIndex--;
            updateThumbnails();
            
            const cardWidth = track.lastElementChild.offsetWidth;
            
            track.prepend(track.lastElementChild);
            track.style.transition = 'none';
            track.style.transform = `translateX(-${cardWidth}px)`;
            
            track.offsetHeight; // trigger layout
            
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = 'translateX(0)';
            
            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                transitioning = false;
            });
        });
        
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                if (transitioning) return;
                
                let currentVisualIndex = ((currentIndex % totalImages) + totalImages) % totalImages;
                if (index === currentVisualIndex) return;
                
                let diff = index - currentVisualIndex;
                
                // If the difference is negative but going forward is shorter (e.g. 2 -> 0), optimize it? 
                // In a 3-item gallery, jumping is easy. Let's just use the direct diff.
                
                transitioning = true;
                currentIndex += diff;
                updateThumbnails();
                
                const cardWidth = track.firstElementChild.offsetWidth;
                
                if (diff > 0) {
                    track.style.transition = 'transform 0.4s ease-in-out';
                    track.style.transform = `translateX(-${cardWidth * diff}px)`;
                    
                    track.addEventListener('transitionend', function handler() {
                        track.removeEventListener('transitionend', handler);
                        track.style.transition = 'none';
                        for (let i = 0; i < diff; i++) {
                            track.appendChild(track.firstElementChild);
                        }
                        track.style.transform = 'translateX(0)';
                        transitioning = false;
                    });
                } else {
                    let absDiff = Math.abs(diff);
                    for (let i = 0; i < absDiff; i++) {
                        track.prepend(track.lastElementChild);
                    }
                    track.style.transition = 'none';
                    track.style.transform = `translateX(-${cardWidth * absDiff}px)`;
                    
                    track.offsetHeight; // trigger layout
                    
                    track.style.transition = 'transform 0.4s ease-in-out';
                    track.style.transform = 'translateX(0)';
                    
                    track.addEventListener('transitionend', function handler() {
                        track.removeEventListener('transitionend', handler);
                        transitioning = false;
                    });
                }
            });
        });
    }


    // --- Quantity Selector Logic ---
    const qtyInput = document.querySelector('.qty-input');
    const btnMinus = document.querySelector('.qty-minus');
    const btnPlus = document.querySelector('.qty-plus');
    
    if (qtyInput && btnMinus && btnPlus) {
        btnMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) {
                qtyInput.value = val - 1;
            }
        });
        
        btnPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
        });
    }
    
    
    // --- Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const icon = header.querySelector('.accordion-icon');
            
            const isOpen = item.classList.contains('open');
            
            if (isOpen) {
                // Close it
                icon.textContent = 'add';
                item.classList.remove('open');
            } else {
                // Open it
                icon.textContent = 'remove';
                item.classList.add('open');
            }
        });
    });
});

// Product Showcase Slider
const showcaseTrack = document.querySelector('.showcase-track');
const showcaseNext = document.querySelector('.showcase-next');
const showcasePrev = document.querySelector('.showcase-prev');
const showcaseDots = document.querySelectorAll('.showcase-pagination .dot');

if (showcaseTrack && showcaseNext && showcasePrev) {
    let showcaseTransitioning = false;
    let currentIndex = 0;
    const totalItems = 4; // 4 unique products mapped to 4 dots

    function updateDots() {
        if (showcaseDots.length > 0) {
            showcaseDots.forEach(dot => dot.classList.remove('active'));
            let activeIndex = ((currentIndex % totalItems) + totalItems) % totalItems;
            if (showcaseDots[activeIndex]) {
                showcaseDots[activeIndex].classList.add('active');
            }
        }
    }

    showcaseNext.addEventListener('click', () => {
        if (showcaseTransitioning) return;
        showcaseTransitioning = true;
        
        currentIndex++;
        updateDots();
        
        const card = showcaseTrack.firstElementChild;
        const cardWidth = card.offsetWidth;
        const gap = parseInt(window.getComputedStyle(showcaseTrack).gap) || 24;
        const slideDistance = cardWidth + gap;

        showcaseTrack.style.transition = 'transform 0.4s ease-in-out';
        showcaseTrack.style.transform = `translateX(-${slideDistance}px)`;
        
        showcaseTrack.addEventListener('transitionend', function handler() {
            showcaseTrack.removeEventListener('transitionend', handler);
            showcaseTrack.style.transition = 'none';
            showcaseTrack.appendChild(showcaseTrack.firstElementChild);
            showcaseTrack.style.transform = 'translateX(0)';
            showcaseTransitioning = false;
        });
    });

    showcasePrev.addEventListener('click', () => {
        if (showcaseTransitioning) return;
        showcaseTransitioning = true;
        
        currentIndex--;
        updateDots();
        
        const card = showcaseTrack.lastElementChild;
        const cardWidth = card.offsetWidth;
        const gap = parseInt(window.getComputedStyle(showcaseTrack).gap) || 24;
        const slideDistance = cardWidth + gap;

        showcaseTrack.prepend(showcaseTrack.lastElementChild);
        showcaseTrack.style.transition = 'none';
        showcaseTrack.style.transform = `translateX(-${slideDistance}px)`;
        
        // Trigger layout
        showcaseTrack.offsetHeight;
        
        showcaseTrack.style.transition = 'transform 0.4s ease-in-out';
        showcaseTrack.style.transform = 'translateX(0)';
        
        showcaseTrack.addEventListener('transitionend', function handler() {
            showcaseTrack.removeEventListener('transitionend', handler);
            showcaseTransitioning = false;
        });
    });
}
