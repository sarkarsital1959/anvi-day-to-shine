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

    // Shuffle photos
    for (var i = photos.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = photos[i]; photos[i] = photos[j]; photos[j] = tmp;
    }

    // Tile placement positions — scattered but balanced
    var isMobile = window.innerWidth < 768;
    var tileSize = isMobile ? 110 : 160;
    var tiles = [];

    function randomPos() {
        return {
            x: Math.random() * (window.innerWidth - tileSize - 20) + 10,
            y: Math.random() * (window.innerHeight - tileSize - 20) + 10
        };
    }

    // Create tiles (hidden initially)
    photos.forEach(function (src, i) {
        var tile = document.createElement('div');
        tile.className = 'glass-tile';
        var rot = (Math.random() * 16 - 8);
        tile.style.setProperty('--rot', rot + 'deg');
        tile.style.width = tileSize + 'px';
        tile.style.height = tileSize + 'px';

        var pos = randomPos();
        tile.style.left = pos.x + 'px';
        tile.style.top = pos.y + 'px';

        var img = document.createElement('img');
        img.src = src;
        img.alt = '';
        tile.appendChild(img);
        overlay.appendChild(tile);
        tiles.push(tile);
    });

    // Stagger pop-in: each tile pops in 150ms apart
    var popDelay = 150;
    tiles.forEach(function (tile, i) {
        setTimeout(function () {
            tile.classList.add('pop-in');
        }, i * popDelay);
    });

    // Show message after all tiles are in
    var allInTime = tiles.length * popDelay + 300;
    setTimeout(function () {
        if (message) message.classList.add('visible');
    }, allInTime);

    // After a beat, fly everything out
    var holdTime = 1500;
    var flyOutStart = allInTime + holdTime;

    function endSlideshow() {
        // Fly out tiles
        tiles.forEach(function (tile, i) {
            setTimeout(function () {
                tile.classList.remove('pop-in');
                tile.classList.add('fly-out');
            }, i * 60);
        });
        // Fade message
        if (message) message.style.opacity = '0';
        // Fade overlay
        setTimeout(function () {
            overlay.classList.add('fade-out');
            setTimeout(function () { overlay.remove(); }, 600);
        }, tiles.length * 60 + 400);
    }

    // Auto-end
    var autoTimer = setTimeout(endSlideshow, flyOutStart);

    // Skip button
    var skipBtn = overlay.querySelector('.slideshow-skip');
    if (skipBtn) {
        skipBtn.addEventListener('click', function () {
            clearTimeout(autoTimer);
            endSlideshow();
        });
    }
})();
