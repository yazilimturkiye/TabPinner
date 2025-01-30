let isActive = true; // Default state

// Listener to react to changes from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.requestState) {
        // Respond with the current state
        sendResponse({ isActive: isActive });
    } else if (typeof request.isActive === 'boolean') {
        isActive = request.isActive;
        updateListeners();
    }
});

// Function to add or remove listeners based on isActive
function updateListeners() {
    if (isActive) {
        chrome.tabs.onCreated.addListener(onTabCreated);
        chrome.tabs.onUpdated.addListener(onTabUpdated);
    } else {
        chrome.tabs.onCreated.removeListener(onTabCreated);
        chrome.tabs.onUpdated.removeListener(onTabUpdated);
    }
}

// Add listeners initially
updateListeners();

function onTabCreated(tab) {
    if (isActive) {
        chrome.tabs.update(tab.id, { pinned: true });
    }
}

function onTabUpdated(tabId, changeInfo, tab) {
    if (isActive && changeInfo.status === 'complete') {
        chrome.tabs.update(tabId, { pinned: true });
    }
}