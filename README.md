# On-device Automatic Speech Recognition

<p align="center">
  <img src="/static/images/screenshot.png" alt="App Screenshot" />
</p>

### About

A ready-to-use, minimal app that converts any speech into text, processed entirely locally using [Ratchet](https://github.com/huggingface/ratchet). You can deploy it as a website or build it as a desktop application.
Try the web version [here](https://huggingface.co/spaces/HugoDzz/ratchet-demo).

Important: This application requires access to the WebGPU API. If you're using it on the web, please ensure your browser supports WebGPU.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Npm](https://docs.npmjs.com/getting-started)

### Run it locally

- Clone the project.

```bash
    git clone https://github.com/Hugo-Dz/ratchet-desktop-public.git
    cd ratchet-desktop-public
```

- Install the dependencies.

```bash
    npm install
```

- Start the dev server

```bash
    npm run dev
```

### Build the desktop application

- Build the Svelte application.

```bash
    npm run build:svelte
```

- (optional) Start the Electron application in dev mode.

```bash
    npm run dev:electron
```

- Build the Electron executable.

```bash
    npm run build:electron
```

## Resources

- [OpenAI Whisper](https://openai.com/index/whisper/)
- [Ratchet SDK](https://github.com/huggingface/ratchet)
- [Electron with SvelteKit](https://github.com/mhkeller/sveltekit-electron)

## License

MIT License [Hugo Duprez](https://www.hugoduprez.com/)
