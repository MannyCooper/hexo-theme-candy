(function () {
    function switchMode() {
        if (media.matches) {
            document.body.classList.add("dark");
            localStorage.setItem("dark", true);
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("dark", false);
        }
        var darkLight = {true: 'dark', false: 'light'};
        setPicturesThemed(darkLight[media.matches]);
    }

    let media = window.matchMedia("(prefers-color-scheme: dark)");
    switchMode();
    let callback = (e) => {
        switchMode();
    };

    if (typeof media.addEventListener === "function") {
        media.addEventListener("change", callback);
    } else if (typeof media.addListener === "function") {
        media.addListener(callback);
    }

    var isDark = localStorage.getItem("dark");
    var darkNav;

    function applyDark(value) {
        if (value.toString() === "true") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }

    function findDarkNav() {
        darkNav = document.getElementById("dark-nav");
        if (!darkNav) {
            setTimeout(findDarkNav, 100);
        } else {
            darkNav.addEventListener("click", switchDark);
            var darkLight = {true: 'dark', false: 'light'};
            setPicturesThemed(darkLight[isDark]);
        }
    }

    function switchDark() {
        isDark = isDark ? isDark.toString() !== "true" : true;
        applyDark(isDark);
        localStorage.setItem("dark", isDark);
        var darkLight = {true: 'dark', false: 'light'};
        setPicturesThemed(darkLight[isDark]);
    }


    function setPicturesThemed(colorScheme = undefined) {
        document.querySelectorAll('picture > source[data-cloned-theme]').forEach(el => {
        el.remove();
        });
        
        if (colorScheme) {
        document.querySelectorAll(`picture > source[media*="(prefers-color-scheme: ${colorScheme})"]`).forEach(el => {
        const cloned = el.cloneNode();
        cloned.removeAttribute('media');
        cloned.setAttribute('data-cloned-theme', colorScheme);
        cloned.setAttribute('class', 'lg_img');
        el.parentNode.prepend(cloned);

        var checkExist = setInterval(function() {
            if (el.parentNode.parentNode.classList.value === 'gallery-item') {
                el.parentNode.parentNode.setAttribute('href',cloned.srcset);
               clearInterval(checkExist);
            }
         }, 100);
        });
        }
        }

    findDarkNav();
    isDark && applyDark(isDark);
})();

