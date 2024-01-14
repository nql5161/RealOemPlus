let selectedBaseUrl = null;

// Add event listeners to option buttons
const optionButtons = document.querySelectorAll('.option-button');
optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove the 'selected' class from all buttons
        optionButtons.forEach(btn => btn.classList.remove('selected'));

        // Add the 'selected' class to the clicked button
        this.classList.add('selected');

        // Save the selected URL immediately
        const selectedBaseUrl = this.getAttribute('data-url');
        saveUrl(selectedBaseUrl);
        refreshPage();
    });
});

function saveUrl(selectedBaseUrl) {
    chrome.storage.sync.set({ baseUrl: selectedBaseUrl });
}

function getUrl() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['baseUrl'], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result.baseUrl);
            }
        });
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

function highlightSelectedButton() {
    getUrl().then(url => {
        optionButtons.forEach(button => {
            if (button.getAttribute('data-url') === url) {
                button.classList.add('selected');
            }
        });
    }).catch(error => {
        console.error('Error retrieving selected URL:', error);
    });
}

document.addEventListener('DOMContentLoaded', highlightSelectedButton);
