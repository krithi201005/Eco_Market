document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(n) {
        currentSlide = n;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    let slideInterval = setInterval(nextSlide, 5000);

    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Header Functionality
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    function performSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        if (searchTerm.includes('ivillage') || searchTerm.includes('tote') || searchTerm.includes('bag') || searchTerm.includes('cotton')) {
            window.location.href = 'clothb.html';
        } else {
            alert("Product not found. Try searching with different keywords.");
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Cart Counter Functionality
    let cartCount = 0;
    const cartLink = document.querySelector('a[href="cart.html"]');

    const cartCounter = document.createElement('span');
    cartCounter.className = 'cart-counter';
    cartCounter.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #ff4444;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        display: none;
    `;
    cartLink.style.position = 'relative';
    cartLink.appendChild(cartCounter);

    function updateCartCount(count) {
        cartCount = count;
        cartCounter.textContent = count;
        cartCounter.style.display = count > 0 ? 'block' : 'none';
    }

    // Language Switcher Functionality
    const languageSwitch = document.querySelector('.language-switch');
    let currentLang = 'EN';

    languageSwitch.addEventListener('click', function(e) {
        e.preventDefault();
        currentLang = currentLang === 'EN' ? 'ES' : 'EN';
        this.querySelector('span').textContent = currentLang;
        console.log('Language switched to:', currentLang);
    });

    // Navigation Hover Effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Product Card Click Event
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            console.log(`Clicked on ${category} category`);
        });
    });
    function searchProduct() {
        let query = document.getElementById("searchBar").value.trim().toLowerCase();
    
        if (query === "ivillage durable and reusable tote bags 100% cotton shopping bag") {
            window.location.href = "clothb.html";  // Redirect to clothb.html
        } else {
            alert("Product not found. Try another search.");
        }
    } 

    // User Login Check
    let username = localStorage.getItem("username");
    if (username) {
        document.getElementById("welcome-msg").innerText = "Welcome, " + username + "!";
    }
});
