# ChatBot

Firebase Functions webhook for a LINE bot that sends user messages to Gemini and replies through the LINE Messaging API.

## Setup

1. Copy `.env.example` to `.env` and fill in the required values.
2. If running Firebase CLI directly from `functions`, also provide the same LINE/Gemini values in `functions/.env`.
3. Install dependencies:

```sh
cd functions
npm install
```

## Run Locally

```sh
firebase emulators:start --only functions
```

Or with Docker Compose:

```sh
docker compose up
```

The Functions emulator listens on port `5001`, and the Emulator UI listens on port `4000`.
