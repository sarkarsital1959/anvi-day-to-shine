(function () {
    const STORAGE_KEY = 'anvi_slideshow_seen';
    if (localStorage.getItem(STORAGE_KEY)) return;

    const photos = [
        'images/IMG_1229.jpg',
        'images/IMG_1283.jpg',
        'images/IMG_1611.jpg',
        'images/IMG_1719.jpg',
        'images/IMG_1775.jpg',
        'images/IMG_1866.jpg',
        'images/IMG_1927.jpg',
        'images/IMG_2090.jpg',
        'images/IMG_2103.jpg',
        'images/IMG_2157.jpg',
        'images/IMG_2217.jpg'
    ];

    const overlay = document.getElementById('slideshowOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';

    // Place polaroids at scattered positions
    const positions = [
        { top: '5%', left: '3%', w: 140 },
        { top: '8%', right: '5%', w: 130 },
        { top: '55%', left: '2%', w: 120 },
        { top: '60%', right: '3%', w: 135 },
        { bottom: '5%', left: '8%', w: 125 },
        { bottom: '8%', right: '8%', w: 130 },
        { top: '25%', left: '1%', w: 115 },
        { top: '30%', right: '2%', w: 125 },
        { bottom: '25%', left: '3%', w: 120 },
        { bottom: '30%', right: '5%', w: 130 },
        { top: '45%', left: '6%', w: 110 }
    ];

    photos.forEach(function (src, i) {
        var card = document.createElement('div');
        card.className = 'polaroid';
        var rot = (Math.random() * 20 - 10);
        card.style.setProperty('--rot', rot + 'deg');
        card.style.transform = 'rotate(' + rot + 'deg)';

        var pos = positions[i] || {};
        if (pos.top) card.style.top = pos.top;
        if (pos.bottom) card.style.bottom = pos.bottom;
        if (pos.left) card.style.left = pos.left;
        if (pos.right) card.style.right = pos.right;

        var size = pos.w || 120;
        card.style.width = size + 'px';
        card.style.height = (size * 1.1) + 'px';
        card.style.animationDelay = (i * 0.15) + 's, ' + (i * 0.15 + 0.8) + 's';

        var img = document.createElement('img');
        img.src = src;
        img.alt = 'Photo ' + (i + 1);
        img.loading = 'eager';
        card.appendChild(img);
        overlay.appendChild(card);
    });

    function endSlideshow() {
        localStorage.setItem(STORAGE_KEY, '1');
        overlay.classList.add('fade-out');
        setTimeout(function () {
            overlay.remove();
        }, 800);
    }

    // Skip button
    var skipBtn = overlay.querySelector('.slideshow-skip');
    if (skipBtn) skipBtn.addEventListener('click', endSlideshow);

    // Auto-end after 8 seconds
    setTimeout(endSlideshow, 8000);
})();
