document.addEventListener('DOMContentLoaded', function() {
    const switchElement = document.getElementById('extensionSwitch');

    // Request the current state from the background script
    chrome.runtime.sendMessage({ requestState: true }, function(response) {
        switchElement.checked = response.isActive;
    });

    // Add event listener to the switch
    switchElement.addEventListener('change', function() {
        const isActive = switchElement.checked;
        // Send message to background script to update state
        chrome.runtime.sendMessage({ isActive: isActive });
    });
});