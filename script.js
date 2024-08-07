document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('input[type="text"]');
    var button = document.getElementById('generateButton');
    var blocklistUl = document.getElementById('blocklist');
    var editLink = document.getElementById('editLink');
    var blocklistContainer = document.getElementById('blocklistContainer');
    // Function to add website to the blocklist
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
    // Function to save blocklist to localStorage
    function saveBlocklist() {
        var websites = [];
        blocklistUl.querySelectorAll('li').forEach(function (li) { return websites.push(li.textContent); });
        localStorage.setItem('blocklist', JSON.stringify(websites));
    }
    // Function to load blocklist from localStorage
    function loadBlocklist() {
        var websites = JSON.parse(localStorage.getItem('blocklist') || '[]');
        websites.forEach(function (website) {
            var li = document.createElement('li');
            li.textContent = website;
            blocklistUl.appendChild(li);
        });
    }
    // Function to toggle blocklist visibility
    function toggleBlocklist() {
        if (blocklistContainer.style.display === 'none' || blocklistContainer.style.display === '') {
            blocklistContainer.style.display = 'block';
        }
        else {
            blocklistContainer.style.display = 'none';
        }
    }
    button.addEventListener('click', addWebsiteToBlocklist);
    editLink.addEventListener('click', function (event) {
        event.preventDefault();
        toggleBlocklist();
    });
    // Load blocklist on page load
    loadBlocklist();
});
