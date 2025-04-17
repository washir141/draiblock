# Drainblock 🔒
Chrome Extension for Malicious Website/Link Detection

## Overview
Drainblock is a lightweight Chrome extension that protects users from **malicious websites** by automatically checking URLs against Google's Safe Browsing API.

✅ Detects Malware  
✅ Blocks Phishing & Social Engineering Sites  
✅ Real-time Protection  
✅ Badge Counter for Blocked Sites  

---

## How It Works 🔍
1. The extension monitors websites during navigation.
2. It sends URLs to Google's **Safe Browsing API**.
3. If a threat is detected, the extension:
   - Blocks the page
   - Closes the tab
   - Shows a notification  
   - Increments the blocked count on the extension icon  

---

## Installation
1. Download the **Drainblock** extension from this link https://chromewebstore.google.com/detail/drainblock/gdobafllegdffohfkigakkklilkfocge
2. Click on the extension icon.
3. Toggle **Protection ON/OFF** from the popup window.

---

## Permissions
The extension uses the following Chrome permissions:
| Permission        | Reason                              |
|----------------|-------------------------------------|
| `webNavigation` | Detect URL loading events           |
| `notifications` | Show threat alerts                  |
| `storage`      | Save blocked sites & protection state |
| `activeTab`    | Access the currently active tab      |

---

## How to Verify the Code 🔑
To verify the code's authenticity:
1. Download the source code from this repository.
2. Go to `chrome://extensions/` in your browser.
3. Enable **Developer Mode**.
4. Click **Load unpacked**.
5. Select the folder containing the source code.
6. Test the extension functionality.

---

## Tech Stack
- JavaScript (ES6+)
- Chrome Extensions API
- Google Safe Browsing API v4

---

## API Key Setup 🔑
By default, the extension uses a **Free API Key** from Google Safe Browsing.

---

## Demo 🎥
https://youtu.be/jC6dJTIwkzI

---

## Contributing
If you'd like to contribute or report an issue, feel free to submit a pull request or open an issue.

---

## License
This project is licensed under the **MIT License**.
