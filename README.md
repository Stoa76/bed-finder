# Bed Finder

A simple Progressive Web App (PWA) for searching hotel bed configurations by room number.

## Features

- Search bed type by room number
- Indonesian user interface
- Works offline after the first launch
- Installable on the iPhone home screen
- Stores recent searches locally

## Installation on iPhone

1. Open the GitHub Pages URL in Safari.
2. Tap the **Share** button.
3. Select **Add to Home Screen**.
4. Tap **Add**.

The app can be used offline after it has been opened online at least once.

## Data Source

- Room data is based on the bed layout table dated **2025-01-31**.
- Room **1122** is configured as `S+S`.
- The rightmost rooms (`327`, `427`, ..., `1127`) are treated as `Suite` rooms.
- The interface uses the neutral, gray, and light-blue colors shown in the original table.
- Room **313** was corrected from `S+S` to `D` after an on-site check.

## Updating Room Information

All room configuration data is currently stored directly in `index.html`.

Example:

```javascript
"313":{"bed":"D","suite":false}
```

To update a room:

1. Open `index.html`.
2. Click the pencil icon to edit the file.
3. Search for the room number.
4. Change the `bed` value or the `suite` value.
5. Commit the change.
6. Open `sw.js`.
7. Increase the cache version.
8. Commit the cache version change.
9. Wait for GitHub Pages deployment.

Example cache update:

```javascript
const CACHE='bed-finder-v1.0.2';
```

Users should open the app while connected to the internet, close it completely, and open it again to receive the update.

## Changelog

### v1.0.1

- Corrected room 313 bed type from `S+S` to `D`.
- Updated the cache version to `bed-finder-v1.0.1`.

### v1.0.0

- Initial release
- Indonesian interface
- Offline support
- iPhone home-screen installation
- Recent search history

## License

For internal hotel use.
