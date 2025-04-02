console.log("🚀 Safe Browsing Guard Active");

// Load protection setting
chrome.storage.local.get("protectionEnabled", (data) => {
    if (data.protectionEnabled === false) {
        console.log("🔕 The Protection is DISABLED.");
    } else {
        console.log("🛡️ The Protection is ENABLED.");
    }
});

// Initialize badge count on startup
chrome.storage.local.get("blockedCount", (data) => {
    let count = data.blockedCount || 0;
    chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
    chrome.action.setBadgeBackgroundColor({ color: "#FF0000" }); // Red badge
});

// Function to update the badge count
function updateBadgeCount() {
    chrome.storage.local.get("blockedCount", (data) => {
        let count = (data.blockedCount || 0) + 1;
        chrome.storage.local.set({ blockedCount: count }, () => {
            chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
        });
    });
}

// Function to check if a URL is a threat
async function checkURL(url) {
    try {
        return new Promise(async (resolve) => {
            chrome.storage.local.get("apiKey", async (data) => {
                const API_KEY = "AIzaSyCW1XE23Mdu5UxrUbamAE1pZN72NEOARL8";
                if (!API_KEY) {
                    console.error("❌ Safe Browsing API Key is missing.");
                    resolve(false);
                    return;
                }

                const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`, {
                    method: "POST",
                    body: JSON.stringify({
                        client: { clientId: "SafeBrowsingGuard", clientVersion: "1.0" },
                        threatInfo: {
                            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
                            platformTypes: ["ANY_PLATFORM"],
                            threatEntryTypes: ["URL"],
                            threatEntries: [{ url }]
                        }
                    }),
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    console.error("🔴 Safe Browsing API request failed:", response.status);
                    resolve(false);
                    return;
                }

                const result = await response.json();
                console.log("📋 API Result:", result);

                resolve(result.matches ? true : false);
            });
        });
    } catch (error) {
        console.error("❌ Error checking URL:", error);
        return false;
    }
}

// Function to block a detected threat and notify the user
function blockThreat(url, tabId) {
    chrome.storage.local.get("blockedUrls", (data) => {
        let blockedUrls = data.blockedUrls || [];
        if (!blockedUrls.includes(url)) {
            blockedUrls.push(url);
            chrome.storage.local.set({ blockedUrls });
        }
    });

    // Increment the badge count
    updateBadgeCount();

    // Send a message to the popup UI
    chrome.runtime.sendMessage({ action: "blockedSite", url });

    // Send message to popup or content script to play the sound
    chrome.runtime.sendMessage({ action: "playSound" });

    // 🚀 Show notification
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png", // Ensure this file exists
        title: "⚠️ Malicious Activity Detected!",
        message: `A threat has been detected: ${url}`,
        priority: 2
    });

    // 🚫 Close the tab
    if (tabId) {
        chrome.tabs.remove(tabId, () => {
            console.log(`🚨 Tab closed: ${url}`);
        });
    }
}

// Listen for navigation and check if the site is a threat
chrome.webNavigation.onCommitted.addListener((details) => {
    chrome.storage.local.get("protectionEnabled", (data) => {
        if (data.protectionEnabled === false) return;

        console.log(`🔍 Checking: ${details.url}`);
        checkURL(details.url).then(isThreat => {
            if (isThreat) {
                console.warn(`🚨 BLOCKED: ${details.url}`);
                blockThreat(details.url, details.tabId);
            }
        });
    });
});

// Handle UI toggle for enabling/disabling protection
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleProtection") {
        chrome.storage.local.set({ protectionEnabled: message.enabled });
    }
});

// Reset badge count when the extension starts
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ blockedCount: 0 });
    chrome.action.setBadgeText({ text: "" });
});
