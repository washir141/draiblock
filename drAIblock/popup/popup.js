
document.addEventListener("DOMContentLoaded", () => {
    const toggleProtection = document.getElementById("toggleProtection");
    const statusText = document.getElementById("status");
    const blockedCount = document.getElementById("blockedCount");
    const totalCount = document.getElementById("totalCount");

    // Load saved settings
    chrome.storage.local.get(["protectionEnabled"], (data) => {
        const isEnabled = data.protectionEnabled !== false; // Default to enabled if not set
        updateProtectionUI(isEnabled);
    });

    // Toggle protection when button is clicked
    toggleProtection.addEventListener("click", () => {
        chrome.storage.local.get(["protectionEnabled"], (data) => {
            const newStatus = !data.protectionEnabled;
            chrome.storage.local.set({ protectionEnabled: newStatus });
            chrome.runtime.sendMessage({ action: "toggleProtection", enabled: newStatus });
            updateProtectionUI(newStatus);
        });
    });

    // Function to update button and status UI
    function updateProtectionUI(enabled) {
        statusText.innerHTML = `Protection is <strong>${enabled ? "ENABLED" : "DISABLED"}</strong>`;
        toggleProtection.innerHTML = `<img src="../assets/${enabled ? "on" : "on"}.png" alt="ON Icon" style="width: 30px;">`;
        toggleProtection.style.backgroundColor = enabled ? "#0e4da7" : "#0e4da7";
        if (enabled) {
            toggleProtection.classList.add("enabled");
        } else {        
            toggleProtection.classList.remove("enabled");
        }
    }

});
