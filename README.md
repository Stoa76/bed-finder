# Bed Finder

A simple Progressive Web App (PWA) for searching hotel bed configurations by room number at **Hotel Bridge Seogwipo**.

---

## Features

- Search bed type by room number
- Indonesian user interface
- Installable on the iPhone home screen
- Works offline after the first launch
- Automatically downloads updated room data in the background
- Stores recent searches locally

---

## Installation (iPhone)

1. Open the GitHub Pages URL in Safari.
2. Tap the **Share** button.
3. Select **Add to Home Screen**.
4. Tap **Add**.

After the first online launch, the app can also be used offline.

---

## Data Source

- Room data is based on the hotel bed layout table dated **2025-01-31**.
- Room **1122** is configured as `S+S`.
- The rightmost rooms (`327`, `427`, ..., `1127`) are treated as **Suite** rooms.
- Room **313** was corrected from `S+S` to `D` after an on-site verification.

---

## Updating Room Information

All room configuration data is stored directly in `index.html`.

Example:

```javascript
"313":{"bed":"D","suite":false}
```

To update room information:

1. Open `index.html`.
2. Click the pencil icon.
3. Search for the room number.
4. Update the `bed` or `suite` value.
5. Commit the changes.

The app automatically downloads updated data in the background using a **Stale-While-Revalidate** caching strategy.

Users only need to:

1. Open the app while connected to the Internet.
2. Close the app completely.
3. Open it again.

The latest room information will then be available.

---

## Offline Support

The app uses a Service Worker.

- Runs without an Internet connection after the first successful launch.
- Automatically refreshes cached room data when online.
- Falls back to cached data when offline.

---

## Changelog

### v1.1.0

- Changed the Service Worker caching strategy to **Stale-While-Revalidate**.
- Room data is now updated automatically in the background.
- Improved update experience for installed PWA users.

### v1.0.1

- Corrected room **313** bed type from `S+S` to `D`.

### v1.0.0

- Initial release.
- Indonesian interface.
- Offline support.
- Installable on iPhone.
- Recent search history.

---

## Usage

Created as a small utility for use at **Hotel Bridge Seogwipo**.
