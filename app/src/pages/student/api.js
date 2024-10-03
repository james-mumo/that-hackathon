import axios from axios

const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/chat/completions";

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const data = {
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Whats the weather like today?" },
  ],
};

axios
  .post(apiUrl, data, { headers })
  .then((response) => {
    if (response.status === 200) {
      const assistantResponse = response.data.choices[0].message.content;
      console.log("Assistant:", assistantResponse);
    } else {
      console.error("Error:", response.status, response.data);
    }
  })
  .catch((error) => {
    console.error("Request failed:", error);
  });
