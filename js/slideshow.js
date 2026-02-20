(function () {
    var photos = [
        'images/IMG_1283.jpg', 'images/IMG_1611.jpg',
        'images/IMG_1719.jpg', 'images/IMG_1775.jpg', 'images/IMG_1866.jpg',
        'images/IMG_1927.jpg', 'images/IMG_2090.jpg', 'images/IMG_2103.jpg',
        'images/IMG_2157.jpg', 'images/IMG_2217.jpg'
    ];

    var ENTER_MS = 250;
    var HOLD_MS = 250;
    var EXIT_MS = 150;
    var MESSAGE_HOLD_MS = 1000;

    var enterStyles = ['scale', 'slide-left', 'slide-right', 'zoom', 'rotate'];
    var exitStyles = ['scale', 'slide-left', 'slide-right', 'zoom', 'rotate'];

    var overlay = document.getElementById('slideshowOverlay');
    var message = overlay && overlay.querySelector('.slideshow-message');
    if (!overlay) return;
    overlay.style.display = 'flex';

    // Create counter
    var counter = document.createElement('div');
    counter.className = 'slideshow-counter';
    overlay.appendChild(counter);

    var autoTimer;
    var cancelled = false;

    // Preload all images, then start
    var loaded = 0;
    photos.forEach(function (src) {
        var img = new Image();
        img.onload = img.onerror = function () {
            loaded++;
            if (loaded === photos.length) startSlideshow();
        };
        img.src = src;
    });

    function pickRandom(arr, avoid) {
        var choice;
        do {
            choice = arr[Math.floor(Math.random() * arr.length)];
        } while (choice === avoid && arr.length > 1);
        return choice;
    }

    function startSlideshow() {
        var index = 0;
        var lastEnter = '';

        function showNext() {
            if (cancelled || index >= photos.length) {
                showMessage();
                return;
            }

            var enterType = pickRandom(enterStyles, lastEnter);
            lastEnter = enterType;
            var exitType = pickRandom(exitStyles);

            // Update counter
            counter.textContent = (index + 1) + ' / ' + photos.length;
            counter.classList.add('visible');

            // Create photo element
            var img = document.createElement('img');
            img.className = 'slideshow-photo';
            img.src = photos[index];
            img.alt = '';
            overlay.appendChild(img);

            // Enter
            img.classList.add('photo-enter-' + enterType);

            // After enter done, hold, then exit
            setTimeout(function () {
                if (cancelled) { img.remove(); return; }
                // Hold phase — photo is visible

                setTimeout(function () {
                    if (cancelled) { img.remove(); return; }
                    // Exit
                    img.classList.remove('photo-enter-' + enterType);
                    img.classList.add('photo-exit-' + exitType);

                    setTimeout(function () {
                        img.remove();
                        index++;
                        showNext();
                    }, EXIT_MS);
                }, HOLD_MS);
            }, ENTER_MS);
        }

        showNext();
    }

    function showMessage() {
        if (cancelled) return;
        counter.classList.remove('visible');
        if (message) message.classList.add('visible');
        autoTimer = setTimeout(endSlideshow, MESSAGE_HOLD_MS);
    }

    function endSlideshow() {
        cancelled = true;
        if (message) {
            message.style.transition = 'opacity 0.4s ease';
            message.style.opacity = '0';
        }
        counter.classList.remove('visible');
        // Remove any lingering photos
        var leftover = overlay.querySelectorAll('.slideshow-photo');
        for (var i = 0; i < leftover.length; i++) leftover[i].remove();

        setTimeout(function () {
            overlay.classList.add('fade-out');
            setTimeout(function () { overlay.remove(); }, 600);
        }, 300);
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
