# About This Site

This website was developed using [React](https://reactjs.org/), [React Redux](https://react-redux.js.org/), [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/).

It is hosted on [GitHub Pages](https://pages.github.com/) and the source code can be found [here](https://github.com/Milleus/portfolio-mac-os).

## Features

System:

- [x] Simulate macOS sleep, restart, shutdown and lock screen behaviour.
- [x] Simulate clock behaviour (updates every 1 minute).
- [x] Set light/dark mode based on system preference, if available.
- [x] Display actual battery status of device using [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API), if available.
- [x] Open/close/maximize + drag and resize applications.
- [ ] Minimize applications.

Control Center:

- [x] Toggle light/dark mode (Notes app does not have different themes yet)
- [x] Toggle full screen mode using [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).
- [x] Control brightness.
- [x] Control volume.
- [x] Play, pause and skip music.

Notes app:

- [x] View different notes (markdown files).

VSCode app:

- [x] View code repository (iframe to [github1s.com](https://github1s.com/)).

Safari app:

- [x] Display clickable links on 'Start' page.
- [x] Search user input in address bar (iframe to Bing search results).
- [x] Display 'No Internet' page if Wifi is toggled off.

Spotlight app:

- [ ] Search and launch applications with spotlight.

Siri app:

- [ ] Accept user speech input and respond using [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

FaceTime app:

- [ ] Simulate a FaceTime call using [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices).

ITerm app:

- [ ] Accept user input to execute linux commands.

## Features in Consideration

- Calculator app
- Notification center menu
- Battery menu
- Launchpad app
- Animated 'memoji' profile for login screen
