(function () {
    var photos = [
        'images/IMG_1283.jpg', 'images/IMG_1611.jpg',
        'images/IMG_1719.jpg', 'images/IMG_1775.jpg', 'images/IMG_1866.jpg',
        'images/IMG_1927.jpg', 'images/IMG_2090.jpg', 'images/IMG_2103.jpg',
        'images/IMG_2157.jpg'
    ];

    var overlay = document.getElementById('slideshowOverlay');
    var message = overlay && overlay.querySelector('.slideshow-message');
    if (!overlay) return;
    overlay.style.display = 'flex';

    // Create grid container
    var grid = document.createElement('div');
    grid.className = 'slideshow-grid';
    // Insert grid before the message
    overlay.insertBefore(grid, message);

    var tiles = [];

    // Preload all images, then animate
    var loaded = 0;
    photos.forEach(function (src) {
        var img = new Image();
        img.onload = img.onerror = function () {
            loaded++;
            if (loaded === photos.length) startAnimation();
        };
        img.src = src;
    });

    function startAnimation() {
        photos.forEach(function (src, i) {
            var tile = document.createElement('div');
            tile.className = 'glass-tile';
            var rot = (Math.random() * 6 - 3);
            tile.style.setProperty('--rot', rot + 'deg');

            var img = document.createElement('img');
            img.src = src;
            img.alt = '';
            tile.appendChild(img);
            grid.appendChild(tile);
            tiles.push(tile);
        });

        // Stagger pop-in
        var popDelay = 180;
        tiles.forEach(function (tile, i) {
            setTimeout(function () {
                tile.classList.add('pop-in');
            }, i * popDelay);
        });

        // Show message after all tiles
        var allInTime = tiles.length * popDelay + 300;
        setTimeout(function () {
            if (message) message.classList.add('visible');
        }, allInTime);

        // Auto-end
        autoTimer = setTimeout(endSlideshow, allInTime + 2000);
    }

    var autoTimer;

    function endSlideshow() {
        tiles.forEach(function (tile, i) {
            setTimeout(function () {
                tile.classList.remove('pop-in');
                tile.classList.add('fly-out');
            }, i * 50);
        });
        if (message) {
            message.style.transition = 'opacity 0.4s ease';
            message.style.opacity = '0';
        }
        setTimeout(function () {
            overlay.classList.add('fade-out');
            setTimeout(function () { overlay.remove(); }, 600);
        }, tiles.length * 50 + 300);
    }

    // Skip
    var skipBtn = overlay.querySelector('.slideshow-skip');
    if (skipBtn) {
        skipBtn.addEventListener('click', function () {
            clearTimeout(autoTimer);
            endSlideshow();
        });
    }
})();
