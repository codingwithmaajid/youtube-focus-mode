(function () {
    const STYLE_ID = 'yt-focus-mode-style';

    // CSS to hide distracting elements
    // We use !important to override YouTube's specific styles
    const CSS_RULES = `
        /* Hide Shorts Shelf on Home and Results */
        ytd-rich-shelf-renderer[is-shorts], 
        ytd-reel-shelf-renderer, 
        ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),
        
        /* Hide Shorts Tab in Sidebar (Desktop) */
        ytd-guide-entry-renderer a[href^="/shorts"],
        ytd-guide-entry-renderer a[href^="/shorts"] tp-yt-paper-item,
        
        /* Hide Shorts Tab in Mini Sidebar */
        ytd-mini-guide-entry-renderer a[href^="/shorts"],
        ytd-mini-guide-entry-renderer[aria-label="Shorts"], /* Keep as fallback/legacy */
        
        /* Hide Home Feed Recommendations (The Grid) */
        /* ytd-browse[page-subtype="home"] #primary, */ /* This might be too aggressive, hiding the grid is better */
        ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,

        /* Hide Sidebar Recommendations (Watch Page) */
        #secondary #related, 
        ytd-watch-next-secondary-results-renderer,

        /* Hide End Screen Suggestions */
        .ytp-endscreen-content,
        .ytp-ce-element
        
        {
            display: none !important;
        }
    `;

    function applyFocusMode(enabled) {
        const existingStyle = document.getElementById(STYLE_ID);

        if (enabled) {
            if (!existingStyle) {
                const style = document.createElement('style');
                style.id = STYLE_ID;
                style.textContent = CSS_RULES;
                document.documentElement.appendChild(style);
                console.log('YouTube Focus Mode: Enabled');
            }
        } else {
            if (existingStyle) {
                existingStyle.remove();
                console.log('YouTube Focus Mode: Disabled');
            }
        }
    }

    // Initialize
    chrome.storage.local.get(['focusMode'], (result) => {
        // Default to true
        const isEnabled = result.focusMode !== false;
        applyFocusMode(isEnabled);
    });

    // Listen for changes from popup
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.focusMode) {
            applyFocusMode(changes.focusMode.newValue);
        }
    });
})();
