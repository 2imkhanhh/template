document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.value-content-item');
    const navItems = document.querySelectorAll('.values-nav-item');

    if (sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    const activeNav = document.querySelector(`.values-nav-item[data-target="${id}"]`);
                    if (activeNav) {
                        activeNav.classList.add('active');
                    }

                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    entry.target.classList.add('active');
                    
                    // Sync horizontal nav scrolling on mobile
                    if (window.innerWidth <= 768 && activeNav) {
                        const navContainer = document.querySelector('.values-nav');
                        if (navContainer) {
                            const scrollLeft = activeNav.offsetLeft - (navContainer.clientWidth / 2) + (activeNav.clientWidth / 2);
                            // Avoid setting active class again to prevent loop, just scroll
                            navContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Handle horizontal swiping on mobile to highlight items
        const navContainer = document.querySelector('.values-nav');
        if (navContainer) {
            let scrollTimeout;
            navContainer.addEventListener('scroll', () => {
                if (window.innerWidth <= 768) {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        let closestItem = null;
                        let minDistance = Infinity;
                        const containerCenter = navContainer.scrollLeft + navContainer.clientWidth / 2;
                        
                        navItems.forEach(item => {
                            const itemCenter = item.offsetLeft + item.clientWidth / 2;
                            const distance = Math.abs(itemCenter - containerCenter);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestItem = item;
                            }
                        });
                        
                        if (closestItem && !closestItem.classList.contains('active')) {
                            navItems.forEach(item => item.classList.remove('active'));
                            closestItem.classList.add('active');
                        }
                    }, 50); // Debounce to avoid excessive updates
                }
            });
        }

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-target');
                const targetSection = document.getElementById(id);
                if (targetSection) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight || 85;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 40;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    }
});
