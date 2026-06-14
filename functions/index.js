/* 0. Initial */
// 0.1. Install dependencies
// 0.2. Fill out values in .env

const { onRequest } = require("firebase-functions/v2/https");
const line = require("./utils/line");
const gemini = require("./utils/gemini");


const NodeCache = require("node-cache");
const cache = new NodeCache();
const CACHE_IMAGE = "image_";
const CACHE_CHAT = "chat_";

exports.webhook = onRequest(async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    const userId = event.source.userId;
    console.log("userId", userId);

    switch (event.type) {
      case "message":
        if (event.message.type === "text") {
          const prompt = event.message.text;
          console.log("prompt", prompt);

          /* 1. Generate text from text-only input */
          const text = await gemini.textOnly(prompt);
          await line.reply(event.replyToken, [{ type: "text", text: text }]);

          /* 2. Generate text from text-only input with contextual info */
          // const text = await gemini.textOnlyWithContext(prompt);
          // await line.reply(event.replyToken, [{ type: "text", text: text }]);

          /* 3. Generate text from text-and-image input (multimodal) */
          // 3.5. Get cache image
          // 3.6. Check available cache
          // 3.7. Send a prompt to Gemini multimodal
          // 3.8. Reply a generated text

          /* 4. Build multi-turn conversations (chat) */
          // 4.1. Get a cache chat history
          // 4.2. Check available cache
          // 4.3. Send a prompt to Gemini
          // 4.4. Reply a generated text
          // 4.5. Push a new chat history
          // Note: From Mar 2024, the spec of parts value has changed to [{ text: xxx }]
          // 4.6. Set a cache chat history
          break;
        }

        if (event.message.type === "image") {
          /* 3. Generate text from text-and-image input (multimodal) */
          // 3.1. Get an image binary
          // 3.2. Convert binary to base64
          // 3.3. Set a cache image
          // 3.4. Ask for prompt
          break;
        }
        break;
    }
  }

  res.status(200).send("OK"); // ✅ ย้ายมาไว้ท้ายสุด หลัง loop จบ
});