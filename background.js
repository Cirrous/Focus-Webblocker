chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // Blockierte Webseiten aus dem Speicher abrufen
        return new Promise(function(resolve) {
            chrome.storage.local.get('blocklist', function(data) {
                var blockedWebsites = data.blocklist || [];
                var currentURL = new URL(details.url).hostname;

                for (var i = 0; i < blockedWebsites.length; i++) {
                    var blocked = new URL(blockedWebsites[i]).hostname;
                    if (currentURL.includes(blocked)) {
                        // Redirect zur Google-Startseite
                        resolve({redirectUrl: 'https://www.google.com/'});
                        return;
                    }
                }
                resolve({});
            });
        });
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);
