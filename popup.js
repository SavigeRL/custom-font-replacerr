// Load saved font on popup open
chrome.storage.sync.get(['selectedFont'], (data) => {
  document.getElementById('fontSelect').value = data.selectedFont || 'Arial';
});

// Save font when button is clicked
document.getElementById('saveBtn').addEventListener('click', () => {
  const selectedFont = document.getElementById('fontSelect').value;
  const btn = document.getElementById('saveBtn');
  
  chrome.storage.sync.set({ selectedFont: selectedFont }, () => {
    // Visual feedback
    const originalText = btn.textContent;
    btn.textContent = '✓ Font Applied!';
    btn.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  });
});
