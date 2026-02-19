(function () {
    var photos = [
        'images/IMG_1229.jpg', 'images/IMG_1283.jpg', 'images/IMG_1611.jpg',
        'images/IMG_1719.jpg', 'images/IMG_1775.jpg', 'images/IMG_1866.jpg',
        'images/IMG_1927.jpg', 'images/IMG_2090.jpg', 'images/IMG_2103.jpg',
        'images/IMG_2157.jpg', 'images/IMG_2217.jpg'
    ];

    var overlay = document.getElementById('slideshowOverlay');
    var message = overlay && overlay.querySelector('.slideshow-message');
    if (!overlay) return;
    overlay.style.display = 'flex';

    // Shuffle
    for (var i = photos.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = photos[i]; photos[i] = photos[j]; photos[j] = tmp;
    }

    var isMobile = window.innerWidth < 768;
    var tileW = isMobile ? 140 : 200;
    var tileH = isMobile ? 180 : 250;
    var tiles = [];
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    // Preload all images first, then start animation
    var loaded = 0;
    var imgElements = [];

    photos.forEach(function (src, i) {
        var img = new Image();
        img.onload = img.onerror = function () {
            loaded++;
            if (loaded === photos.length) startAnimation();
        };
        img.src = src;
        imgElements.push(img);
    });

    function startAnimation() {
        photos.forEach(function (src, i) {
            var tile = document.createElement('div');
            tile.className = 'glass-tile';
            var rot = (Math.random() * 14 - 7);
            tile.style.setProperty('--rot', rot + 'deg');
            tile.style.width = tileW + 'px';
            tile.style.height = tileH + 'px';

            // Spread across screen avoiding dead center
            var x = Math.random() * (vw - tileW - 40) + 20;
            var y = Math.random() * (vh - tileH - 40) + 20;
            tile.style.left = x + 'px';
            tile.style.top = y + 'px';

            var img = document.createElement('img');
            img.src = src;
            img.alt = '';
            tile.appendChild(img);
            overlay.appendChild(tile);
            tiles.push(tile);
        });

        // Pop in one by one
        var popDelay = 200;
        tiles.forEach(function (tile, i) {
            setTimeout(function () {
                tile.classList.add('pop-in');
            }, i * popDelay);
        });

        // Show message after tiles
        var allInTime = tiles.length * popDelay + 400;
        setTimeout(function () {
            if (message) message.classList.add('visible');
        }, allInTime);

        // Auto-end after holding
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
