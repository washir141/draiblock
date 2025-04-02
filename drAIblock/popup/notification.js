function showAlert(message) {
    // Remove existing alert if present
    let oldAlert = document.getElementById("solana-alert");
    if (oldAlert) oldAlert.remove();

    // Create notification div
    let alertDiv = document.createElement("div");
    alertDiv.id = "solana-alert";
    alertDiv.innerText = message;

    // Append to the page
    document.body.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => alertDiv.remove(), 5000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "SCAM_ALERT") {
        showAlert(request.message);
    }
});
