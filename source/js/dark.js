(function() {
    var isDark = localStorage.getItem('dark');
    var darkNav;

    function applyDark(value) {
        if (value.toString() === 'true') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }

    function findDarkNav() {
        darkNav = document.getElementById('dark-nav');
        if (!darkNav) {
            setTimeout(findDarkNav, 100);
        } else {
            darkNav.addEventListener('click', switchDark);
        }
    }

    function switchDark() {
        isDark = isDark ? isDark.toString() !== 'true' : true;
        applyDark(isDark);
        localStorage.setItem('dark', isDark);
    }

    findDarkNav();
    isDark && applyDark(isDark);

    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        document.body.classList.add('dark');
    }
    let callback = (e) => {
        let prefersDarkMode = e.matches;
        if (media.matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };
    if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', callback);
    } else if (typeof media.addListener === 'function') {
        media.addListener(callback);
    }

}());