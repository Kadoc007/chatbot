const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const context = require("./context");

class Gemini {
  async textOnly(prompt) {
    // Note: From Nov 2024, the model has changed to gemini-1.5-flash-8b for mutimodal compatible
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: `คุณเป็นผู้เชี่ยวชาญด้านกฎหมายเทคโนโลยีสารสนเทศของประเทศไทยเท่านั้น

กฎที่ต้องปฏิบัติตามอย่างเคร่งครัด:
1. ตอบเฉพาะคำถามที่เกี่ยวข้องกับกฎหมายเทคโนโลยีสารสนเทศของไทย เช่น:
   - พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์
   - พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)
   - พ.ร.บ.ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์
   - พ.ร.บ.การรักษาความมั่นคงปลอดภัยไซเบอร์
   - กฎหมายลิขสิทธิ์ที่เกี่ยวกับเทคโนโลยี
   - และกฎหมายอื่นๆ ที่เกี่ยวข้องกับ IT
   - อธิบายเพิ่ม  

2. ถ้าผู้ใช้ถามคำถามที่ไม่เกี่ยวข้องกับกฎหมาย IT ของไทย ให้ตอบว่า:
   "ขออภัยครับ/ค่ะ ฉันสามารถตอบคำถามเกี่ยวกับกฎหมายเทคโนโลยีสารสนเทศของประเทศไทยเท่านั้น หากมีคำถามเกี่ยวกับกฎหมาย IT กรุณาถามได้เลยครับ/ค่ะ"

3. ตอบอย่างสั้น กระชับ ชัดเจน ไม่เกิน 7 บรรทัด`
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async textOnlyWithContext(prompt) {
    // Note: From Nov 2024, the model has changed to gemini-1.5-flash-8b for mutimodal compatible
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const parts = [{
      text: "ตอบคำถามโดยอ้างอิง Conference นี้เท่านั้น\n"
    }];
    const result = await model.generateContent([prompt, ...parts]);
    return result.response.text();
  }

  async multimodal(prompt, base64Image) {
    // Note: From Nov 2024, the model has changed to gemini-1.5-flash-8b for mutimodal compatible
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const mimeType = "image/png";
    const imageParts = [{
      inlineData: { data: base64Image, mimeType }
    }];
    const result = await model.generateContent([prompt, ...imageParts]);
    return result.response.text();
  }

  async chat(cacheChatHistory, prompt) {
    // Note: From Nov 2024, the model has changed to gemini-1.5-flash-8b for mutimodal compatible
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: "ตอบคำถามเฉพาะที่เกี่ยวกับ" }]
      },
      {
        role: "model",
        parts: [{ text: "สวัสดี เราให้คำตอบเกี่ยวกับกฎหมายIT" }]
      }
    ];
    if (cacheChatHistory.length > 0) {
      chatHistory.push(...cacheChatHistory);
    }
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }
}

module.exports = new Gemini();