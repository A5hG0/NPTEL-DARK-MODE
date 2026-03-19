// Content script for NPTEL/SWAYAM Dark Mode
(function() {
  'use strict';

  // Apply dark mode immediately to prevent flash
  let darkModeEnabled = true; // Default to true

  // Enable dark mode
  function enableDarkMode() {
    document.documentElement.classList.add('dark-mode-enabled');
    document.body.classList.add('dark-mode-enabled');
  }

  // Disable dark mode
  function disableDarkMode() {
    document.documentElement.classList.remove('dark-mode-enabled');
    document.body.classList.remove('dark-mode-enabled');
  }

  // Apply immediately to prevent white flash
  enableDarkMode();

  // Then check stored preference
  chrome.storage.sync.get(['darkModeEnabled'], function(result) {
    darkModeEnabled = result.darkModeEnabled !== false; // Default to true
    
    if (darkModeEnabled) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleDarkMode') {
      darkModeEnabled = request.enabled;
      if (request.enabled) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      sendResponse({ success: true });
    } else if (request.action === 'getDarkModeStatus') {
      sendResponse({ enabled: darkModeEnabled });
    }
    return true; // Keep channel open for async response
  });

  // Handle dynamic content (for single-page apps)
  const observer = new MutationObserver(function(mutations) {
    if (darkModeEnabled) {
      // Reapply class if removed by page scripts
      if (!document.body.classList.contains('dark-mode-enabled')) {
        enableDarkMode();
      }
      
      // Fix newly added course cards and images on SWAYAM
      if (window.location.hostname.includes('swayam.gov.in')) {
        fixSwayamElements();
      }
    }
  });

  // Special fixes for SWAYAM course cards
  function fixSwayamElements() {
    // Fix bright course card images
    const courseImages = document.querySelectorAll('img[src*="course"], img[src*="thumbnail"], .course-card img, [class*="Card"] img');
    courseImages.forEach(img => {
      if (!img.style.filter || !img.style.filter.includes('brightness')) {
        img.style.filter = 'brightness(0.7) contrast(1.1)';
        img.style.opacity = '0.85';
      }
    });
    
    // Fix white backgrounds in cards
    const whiteElements = document.querySelectorAll('.bg-white, .bg-light, [class*="bg-white"], [class*="bg-light"]');
    whiteElements.forEach(el => {
      el.style.backgroundColor = '#2d2d2d';
    });
  }

  // Start observing once body is available
  if (document.body) {
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    });
    
    // Initial fix for SWAYAM
    if (window.location.hostname.includes('swayam.gov.in') && darkModeEnabled) {
      setTimeout(fixSwayamElements, 500);
      setTimeout(fixSwayamElements, 1500);
    }
  } else {
    // Wait for body if not ready yet
    const bodyObserver = new MutationObserver(function() {
      if (document.body) {
        observer.observe(document.body, { 
          attributes: true, 
          attributeFilter: ['class'],
          childList: true,
          subtree: true
        });
        bodyObserver.disconnect();
        if (darkModeEnabled) {
          enableDarkMode();
          if (window.location.hostname.includes('swayam.gov.in')) {
            setTimeout(fixSwayamElements, 500);
          }
        }
      }
    });
    bodyObserver.observe(document.documentElement, { childList: true });
  }

})();
