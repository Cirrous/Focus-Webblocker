document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    const button = document.getElementById('generateButton') as HTMLButtonElement;
    const blocklistUl = document.getElementById('blocklist') as HTMLUListElement;
    const editLink = document.getElementById('editLink') as HTMLAnchorElement;
    const blocklistContainer = document.getElementById('blocklistContainer') as HTMLDivElement;

    // Function to add website to the blocklist
    function addWebsiteToBlocklist() {
        const website = input.value.trim();
        if (website) {
            const li = document.createElement('li');
            li.textContent = website;
            blocklistUl.appendChild(li);

            saveBlocklist();

            input.value = '';
        }
    }

    // Function to save blocklist to localStorage
    function saveBlocklist() {
        const websites: string[] = [];
        blocklistUl.querySelectorAll('li').forEach(li => websites.push(li.textContent!));
        localStorage.setItem('blocklist', JSON.stringify(websites));
    }

    // Function to load blocklist from localStorage
    function loadBlocklist() {
        const websites = JSON.parse(localStorage.getItem('blocklist') || '[]') as string[];
        websites.forEach(website => {
            const li = document.createElement('li');
            li.textContent = website;
            blocklistUl.appendChild(li);
        });
    }

    // Function to toggle blocklist visibility
    function toggleBlocklist() {
        if (blocklistContainer.style.display === 'none' || blocklistContainer.style.display === '') {
            blocklistContainer.style.display = 'block';
        } else {
            blocklistContainer.style.display = 'none';
        }
    }

    button.addEventListener('click', addWebsiteToBlocklist);
    editLink.addEventListener('click', function(event) {
        event.preventDefault();
        toggleBlocklist();
    });

    // Load blocklist on page load
    loadBlocklist();
});
