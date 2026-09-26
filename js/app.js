const navMenu = document.querySelector('.nav-menu');
const magicLine = document.querySelector('.magic-line');
const navItems = document.querySelectorAll('.nav-menu > a, .nav-menu > .nav-item');

if (navMenu && magicLine && navItems.length > 0) {
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') {
        currentPath = 'index.html';
    }

    let activeItem = null;

    navItems.forEach(item => {
        let itemPath = item.getAttribute('href') || item.getAttribute('data-path');
        if (itemPath === '/san-pham') itemPath = 'products.html';

        if (itemPath === currentPath || (itemPath === 'products.html' && currentPath.startsWith('product-detail.html'))) {
            activeItem = item;
            item.classList.add('active-nav');
        }
    });

    function resetMagicLine() {
        if (activeItem) {
            const { offsetLeft, offsetWidth } = activeItem;
            magicLine.style.left = `${offsetLeft}px`;
            magicLine.style.width = `${offsetWidth}px`;
            magicLine.style.opacity = '1';
        } else {
            magicLine.style.opacity = '0';
        }
    }

    setTimeout(resetMagicLine, 100);
    window.addEventListener('resize', resetMagicLine);

    navItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const { offsetLeft, offsetWidth } = e.currentTarget;
            magicLine.style.left = `${offsetLeft}px`;
            magicLine.style.width = `${offsetWidth}px`;
            magicLine.style.opacity = '1';
        });
    });

    navMenu.addEventListener('mouseleave', resetMagicLine);
}

const categoryLinks = document.querySelectorAll('.cat-link');
const productGroups = document.querySelectorAll('.mega-product-group');
const megaNavItem = document.querySelector('.nav-item');

if (categoryLinks.length > 0 && productGroups.length > 0) {
    categoryLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            productGroups.forEach(group => group.classList.remove('active'));
            const targetId = e.target.getAttribute('data-target');
            const targetGroup = document.getElementById(targetId);
            if (targetGroup) {
                targetGroup.classList.add('active');
            }
        });
    });

    if (megaNavItem) {
        megaNavItem.addEventListener('mouseleave', () => {
            setTimeout(() => {
                categoryLinks.forEach(l => l.classList.remove('active'));
                productGroups.forEach(group => group.classList.remove('active'));

                categoryLinks[0].classList.add('active');
                productGroups[0].classList.add('active');
            }, 300);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close-btn');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    function toggleMenu() {
        if (navMenu && overlay) {
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        }
    }

    if (menuToggle && menuClose && navMenu && overlay) {
        menuToggle.addEventListener('click', toggleMenu);
        menuClose.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            if (window.innerWidth <= 1024) {
                this.classList.toggle('open');
            }
        });
    });
});

const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.btn-add');
        if (addBtn) {
            return;
        }
        window.location.href = 'product-detail.html';
    });
});
