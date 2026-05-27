// Get saved font preference from storage
chrome.storage.sync.get(['selectedFont', 'useGoogleFont'], (data) => {
  const font = data.selectedFont || 'Arial';
  const useGoogle = data.useGoogleFont !== false;

  // If using Google Font, inject it
  if (useGoogle) {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Apply font to all elements
  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: '${font}', serif, sans-serif !important;
      font-weight: inherit !important;
      font-style: inherit !important;
    }
  `;
  document.head.appendChild(style);
});

// Listen for changes from popup
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.selectedFont) {
    location.reload();
  }
});
