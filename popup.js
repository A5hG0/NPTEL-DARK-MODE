// Popup script for NPTEL/SWAYAM Dark Mode
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');
  const statusDiv = document.getElementById('status');
  const statusText = document.getElementById('statusText');

  // Load current state
  chrome.storage.sync.get(['darkModeEnabled'], function(result) {
    const isEnabled = result.darkModeEnabled !== false; // Default to true
    toggle.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Handle toggle change
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;
    
    // Save to storage
    chrome.storage.sync.set({ darkModeEnabled: isEnabled }, function() {
      updateStatus(isEnabled);
      
      // Send message to content script on current tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleDarkMode',
            enabled: isEnabled
          });
        }
      });
    });
  });

  function updateStatus(isEnabled) {
    if (isEnabled) {
      statusText.textContent = '✓ Dark Mode Active';
      statusDiv.className = 'status active';
    } else {
      statusText.textContent = '○ Dark Mode Inactive';
      statusDiv.className = 'status inactive';
    }
  }
});
