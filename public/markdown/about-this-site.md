# About This Site

This website was developed using [React](https://reactjs.org/), [React Redux](https://react-redux.js.org/), [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/).

It is hosted on [GitHub Pages](https://pages.github.com/) and the source code can be found [here](https://github.com/Milleus/portfolio-mac-os).

Depending on your browser, certain features may not work as the browser API is either not supported yet or is deprecated. For a better experience, use the latest Google Chrome.

## Features

System:

- [x] Simulate macOS sleep, restart, shutdown and lock screen behaviour.
- [x] Simulate clock behaviour (updates every 1 minute).
- [x] Set light/dark mode based on system preference, if available.
- [x] Display actual battery status of device using [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API), if browser supported.
- [x] Open/close applications.
- [ ] Maximize/minimize applications (partial completion).
- [x] Drag/resize applications.
- [x] Handle layering of applications.
- [ ] Configure to be mobile responsive.

Control Center:

- [x] Toggle light/dark mode.
- [x] Toggle full screen mode using [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API), if browser supported.
- [x] Control brightness.
- [x] Control volume.
- [x] Play, pause and skip music.

Notes app:

- [ ] Mimic actual app behaviour/styling when window is resized or inactive (partial completion).
- [x] View different notes (markdown files) in different folders.

VSCode app:

- [x] Mimic actual app behaviour/styling when window is resized or inactive.
- [x] View code repository (iframe to [github1s.com](https://github1s.com/)).

Safari app:

- [x] Mimic actual app behaviour/styling when window is resized or inactive.
- [x] Display clickable links on 'Start' page.
- [x] Search user input in address bar (iframe to Bing search results).
- [x] Display 'No Internet' page if Wifi is toggled off.

Spotlight app:

- [ ] Search and launch applications with spotlight.

Siri app:

- [ ] Accept user speech input and convert to text using [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), if browser supported.
- [ ] Execute speech commands, e.g. "Open Notes" should open Notes app.

FaceTime app:

- [x] Mimic actual app behaviour/styling when window is resized or inactive (partial completion).
- [x] Simulate camera streaming of FaceTime app using [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices), if browser supported.

ITerm app:

- [ ] Mimic actual app behaviour/styling when window is resized or inactive.
- [ ] Accept user input to execute linux commands.

## Features in Consideration

- Calculator app
- Notification center menu
- Battery menu
- Launchpad app
- Animated 'memoji' profile for login screen
