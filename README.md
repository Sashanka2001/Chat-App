# Chat App

A simple chat UI built with React and Tailwind CSS. This repository contains the frontend source under the `chat-app` folder and some shared types in `types/`.

**Features**
- Real-time chat UI (front-end only)
- Responsive layout using Tailwind CSS
- Componentized UI: chat list and chat window

**Tech stack**
- React (Create React App)
- Tailwind CSS + PostCSS

## Getting started
1. Open a terminal and navigate to the project root.
2. Change into the frontend folder and install dependencies:

```bash
cd chat-app
npm install
```

3. Start the development server:

```bash
npm start
```

The app will be available at http://localhost:3000.

## Available scripts
- Start dev server: `npm start` (run from `chat-app`)
- Run tests: `npm test`
- Build production bundle: `npm run build`

See the project's package manifest: [chat-app/package.json](chat-app/package.json)

## Project structure (key files)
- `chat-app/public` — static HTML and manifest
- `chat-app/src` — React source
	- [chat-app/src/App.js](chat-app/src/App.js)
	- [chat-app/src/index.js](chat-app/src/index.js)
	- [chat-app/src/App.css](chat-app/src/App.css)
	- [chat-app/src/components/ChatList.js](chat-app/src/components/ChatList.js)
	- [chat-app/src/components/ChatWindow.js](chat-app/src/components/ChatWindow.js)
- [tailwind.config.js](tailwind.config.js)
- [postcss.config.js](postcss.config.js)
- [types/chat.ts](types/chat.ts)

## Development notes
- Tailwind is configured in `tailwind.config.js` and wired via PostCSS. If styles don't appear, rebuild the dev server after changing config.
- The app is intentionally front-end only; integrate a backend (WebSocket/REST) to add persistence and real-time messaging.

## Contributing
Feel free to open issues or PRs. For large changes, open an issue first to discuss the approach.

## License
This project currently has no license specified. Add a `LICENSE` file if you want to make the project open source.
