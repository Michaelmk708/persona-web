
# PersonaPulse Browser Extension

A cross-browser extension that detects gig worker usernames on marketplace websites and displays their verified PersonaPulse personas.

## Features

- 🔍 **Auto-Detection**: Automatically scans marketplace websites for usernames
- 🎯 **Smart Matching**: Matches usernames against PersonaPulse database
- 📋 **Hover Cards**: Beautiful persona cards with ratings, skills, and portfolio previews
- 🌐 **Multi-Platform**: Works on Fiverr, Upwork, Freelancer, and more
- 🔒 **Privacy-First**: Only shows verified, publicly available persona data

## Supported Marketplaces

- Fiverr.com
- Upwork.com
- Freelancer.com
- 99designs.com
- Guru.com
- PeoplePerHour.com

## Installation

### Chrome/Edge
1. Download the extension files
2. Open Chrome/Edge and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Download the extension files
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file

## Development

### Setup
1. Clone the repository
2. Update the `apiUrl` in `content.js` with your backend URL
3. Replace mock data with actual API calls
4. Test on various marketplace websites

### File Structure
```
extension/
├── manifest.json       # Extension configuration
├── content.js         # Main detection logic
├── content.css        # Styles for persona cards
├── popup.html         # Extension popup interface
├── icons/             # Extension icons
├── README.md          # Documentation
```

### Key Components
- **PersonaPulseDetector**: Main class that handles username detection
- **Content Scripts**: Injected into marketplace pages
- **Popup Interface**: Extension management and statistics

## Configuration

Update these settings in `content.js`:
- `apiUrl`: Your PersonaPulse backend URL
- `getUsernameSelectors()`: CSS selectors for different platforms
- `getMockPersonaData()`: Remove in production

## Privacy & Security

- Only accesses usernames visible on public profiles
- Communicates with PersonaPulse backend via secure HTTPS
- No personal data is stored locally
- Users can disable the extension at any time

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test on multiple browsers and platforms
4. Submit a pull request

## License

MIT License - See LICENSE file for details
