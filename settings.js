document.getElementById('save').addEventListener('click', function() {
    const selectedBaseUrl = document.getElementById('baseUrlSelect').value;
    saveUrl(selectedBaseUrl);
    refreshPage();
});

chrome.storage.sync.get(['baseUrl'], function(result) {
    if (result.baseUrl) {
        document.getElementById('baseUrlSelect').value = result.baseUrl;
    } else {
        console.log('No base URL found');
    }
});

function saveUrl(selectedBaseUrl) {
    chrome.storage.sync.set({ baseUrl: selectedBaseUrl }, function() {
        console.log('Base URL is set to ' + selectedBaseUrl);
    });
}

function refreshPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        if (currentTab) {
            chrome.tabs.reload(currentTab.id);
        }
    });
}