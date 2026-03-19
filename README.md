# NPTEL/SWAYAM Dark Mode Extension 🌙

A Chrome extension that adds a beautiful dark mode to NPTEL Online Courses and SWAYAM websites - perfect for late-night studying!

## Features

✨ **Beautiful Dark Theme** - Easy on the eyes with carefully chosen colors  
🔋 **Battery Friendly** - Dark mode saves battery on OLED screens  
🎯 **Simple Toggle** - One-click on/off from the extension popup  
💾 **Remembers Your Choice** - Your preference is saved automatically  
🌐 **Works on Both Sites** - SWAYAM courses page and NPTEL online courses

## Installation

### Step 1: Download the Extension
Download all the files in this folder to your computer.

### Step 2: Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in the top-right corner)
3. Click **"Load unpacked"**
4. Select the `nptel-dark-mode` folder
5. Done! You should see the extension icon 🌙 in your toolbar

## Usage

1. **Go to SWAYAM or NPTEL courses**
   - https://swayam.gov.in/mycourses
   - https://onlinecourses.nptel.ac.in/

2. **Click the extension icon** in your toolbar

3. **Toggle dark mode on/off** using the switch

4. **Enjoy studying at night!** 🎓

## How It Works

- **Content Script** - Injects dark mode CSS into the pages
- **Storage** - Remembers your preference across sessions
- **Auto-applies** - Works automatically on both SWAYAM and NPTEL sites

## Customization

Want to change the colors? Edit `dark-mode.css` and modify these variables:

```css
:root {
  --bg-primary: #1a1a1a;      /* Main background */
  --bg-secondary: #2d2d2d;    /* Cards/panels */
  --text-primary: #e0e0e0;    /* Main text */
  --link-color: #6db3f2;      /* Links */
}
```

## Troubleshooting

**Dark mode not working?**
- Make sure you're on the correct websites (SWAYAM or NPTEL)
- Try refreshing the page
- Click the extension icon and toggle it off and on again

**Some elements still bright?**
- The sites may have updated their structure
- You can customize the CSS to target specific elements

## Files Included

- `manifest.json` - Extension configuration
- `dark-mode.css` - Dark mode styles
- `content.js` - Script that applies dark mode
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons

## Made With ❤️

Built for NPTEL learners who love studying at night!

Happy Learning! 📚✨
