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
            li.classList.add('listElement');
            li.textContent = website;

            // Erstellen des "X"-Elements
            var removeBtn = document.createElement('span');
            removeBtn.textContent = 'X';
            removeBtn.className = 'remove-btn';

            // Hinzufügen des "X"-Elements zum Listeneintrag
            li.appendChild(removeBtn);

            // Hinzufügen des Listeneintrags zur Liste
            blocklistUl.appendChild(li);

            // Event Listener für das Entfernen des Listeneintrags
            removeBtn.addEventListener('click', function() {
                blocklistUl.removeChild(li);
                saveBlocklist(); // Speichern der Liste im LocalStorage
            });

            input.value = ''; // Eingabefeld zurücksetzen
            saveBlocklist(); // Speichern der Liste im LocalStorage
        } else {
            alert('Please enter a valid website URL');
        }
    }

    // Funktion zum Speichern der Blockliste in localStorage
    function saveBlocklist() {
        var websites = [];
        blocklistUl.querySelectorAll('li').forEach(function (li) {
            websites.push(li.textContent.replace('X', '').trim());
        });
        localStorage.setItem('blocklist', JSON.stringify(websites));
    }

    // Funktion zum Laden der Blockliste aus localStorage
    function loadBlocklist() {
        var websites = JSON.parse(localStorage.getItem('blocklist') || '[]');
        websites.forEach(function (website) {
            var li = document.createElement('li');
            li.classList.add('listElement');
            li.textContent = website;

            var removeBtn = document.createElement('span');
            removeBtn.textContent = 'X';
            removeBtn.className = 'remove-btn';

            li.appendChild(removeBtn);
            blocklistUl.appendChild(li);

            removeBtn.addEventListener('click', function() {
                blocklistUl.removeChild(li);
                saveBlocklist();
            });
        });
    }

    // Event-Listener zum Hinzufügen von Webseiten zur Blockliste
    button.addEventListener('click', addWebsiteToBlocklist);

    // Blockliste bei Seitenladezeit laden
    loadBlocklist();
});
