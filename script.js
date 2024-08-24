document.addEventListener('DOMContentLoaded', function () {
    // HTML-Elemente abrufen
    var input = document.querySelector('input[type="text"]');
    var button = document.getElementById('generateButton');
    var blocklistUl = document.getElementById('blocklist');
    var homeView = document.getElementById('homeView');
    var editView = document.getElementById('editView');
    var homeLink = document.getElementById('homeLink');
    var editLink = document.getElementById('editLink');

    // Funktion zum Umschalten der Ansichten
    function showView(view) {
        if (view === 'home') {
            homeView.style.display = 'block';
            editView.style.display = 'none';
        } else if (view === 'edit') {
            editView.style.display = 'block';
            homeView.style.display = 'none';
        }
    }

    // Event-Listener für die Navigation
    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        showView('home');
    });

    editLink.addEventListener('click', function (event) {
        event.preventDefault();
        showView('edit');
    });

    // Standardansicht festlegen
    showView('home');

    // Funktion zum Hinzufügen einer Webseite zur Blockliste
    function addWebsiteToBlocklist() {
        var website = input.value.trim();
        if (website) {
            var li = document.createElement('li');
            li.textContent = website;
            blocklistUl.appendChild(li);
            saveBlocklist();
            input.value = '';
        }
    }

    // Funktion zum Speichern der Blockliste in localStorage
    function saveBlocklist() {
        var websites = [];
        blocklistUl.querySelectorAll('li').forEach(function (li) {
            websites.push(li.textContent);
        });
        localStorage.setItem('blocklist', JSON.stringify(websites));
    }

    // Funktion zum Laden der Blockliste aus localStorage
    function loadBlocklist() {
        var websites = JSON.parse(localStorage.getItem('blocklist') || '[]');
        websites.forEach(function (website) {
            var li = document.createElement('li');
            li.textContent = website;
            blocklistUl.appendChild(li);
        });
    }

    // Blockliste bei Seitenladezeit laden
    loadBlocklist();

    // Event-Listener zum Hinzufügen von Webseiten zur Blockliste
    button.addEventListener('click', addWebsiteToBlocklist);
});
