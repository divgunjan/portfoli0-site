(function () {
    const photo = document.getElementById('profile-photo');
    const toggleLink = document.getElementById('photo-toggle');
    const tabs = document.querySelectorAll('.tabs .tab[data-tab]');
    const panels = document.querySelectorAll('.tab-panel');
    const logoutLink = document.getElementById('logout-link');
    const loginHint = document.getElementById('login-hint');
    const loginInput = document.getElementById('login-input');
    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');
    const challengeSentences = [
        'code shapes ideas into systems',
        'small steps compound into mastery',
        'learning never stops in tech',
        'ship fast then refine calmly',
        'curiosity powers meaningful engineering'
    ];
    let expectedSentence = '';

    function normalizeText(value) {
        return value.trim().replace(/\s+/g, ' ').toLowerCase();
    }

    function wordCount(value) {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            return 0;
        }

        return trimmedValue.split(/\s+/).length;
    }

    function lockSession() {
        if (!loginHint || !loginInput || !loginError) {
            return;
        }

        expectedSentence = challengeSentences[Math.floor(Math.random() * challengeSentences.length)];
        loginHint.textContent = '"' + expectedSentence + '"';
        loginInput.value = '';
        loginError.textContent = '';
        document.body.classList.add('logged-out');
        loginInput.focus();
    }

    function attemptLogin() {
        if (!loginInput || !loginError) {
            return;
        }

        const enteredSentence = loginInput.value.trim();

        if (!enteredSentence) {
            loginError.textContent = 'Input required.';
            return;
        }

        if (wordCount(enteredSentence) > 10) {
            loginError.textContent = 'Please keep it to 10 words or fewer.';
            return;
        }

        if (normalizeText(enteredSentence) !== normalizeText(expectedSentence)) {
            loginError.textContent = 'Input does not match. Try again.';
            return;
        }

        loginError.textContent = '';
        document.body.classList.remove('logged-out');
    }

    let isFirstPhoto = true;

    if (photo && toggleLink) {
        toggleLink.addEventListener('click', function (event) {
            event.preventDefault();

            if (isFirstPhoto) {
                photo.src = 'myphoto2.jpeg';
                toggleLink.textContent = 'my photos(2/2)';
            } else {
                photo.src = 'myphoto.jpeg';
                toggleLink.textContent = 'my photos(1/2)';
            }

            isFirstPhoto = !isFirstPhoto;
        });
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            const tabName = tab.getAttribute('data-tab');
            const activePanelId = 'tab-' + tabName;

            tabs.forEach(function (tabItem) {
                tabItem.classList.remove('active');
            });

            panels.forEach(function (panel) {
                panel.classList.remove('active');
            });

            tab.classList.add('active');

            const activePanel = document.getElementById(activePanelId);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            lockSession();
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            attemptLogin();
        });
    }

    if (loginInput) {
        loginInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                attemptLogin();
            }
        });
    }

    lockSession();
})();
