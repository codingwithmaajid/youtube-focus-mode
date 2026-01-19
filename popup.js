document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('focusToggle');
  const statusText = document.getElementById('statusText');

  // Load saved state
  chrome.storage.local.get(['focusMode'], (result) => {
    // Default to true (enabled) if not set, or respect saved value
    const isEnabled = result.focusMode !== false; // Default true
    toggle.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Listen for changes
  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    chrome.storage.local.set({ focusMode: isEnabled }, () => {
      updateStatus(isEnabled);
    });
  });

  function updateStatus(enabled) {
    statusText.textContent = enabled ? 'Focus Mode Active' : 'Focus Mode Disabled';
    statusText.style.color = enabled ? '#ffffff' : '#aaaaaa';
  }
});
