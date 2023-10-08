const CHATGPT_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
const DALLE_ENDPOINT = 'https://api.openai.com/v1/images/generations'

const API_KEY = '<OpenAI API Key>';

const gpt = async (messages) => {
  const result = await fetch(CHATGPT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [...messages]
    })
  })
  return result.json();
}

const dallE = async (prompt) => {
  const result = await fetch(DALLE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "512x512"
    })
  })
  return result.json();
}

export default async (messages, prompt) => {
  const isImageResponse = await gpt([{ role: 'user', content: `Does this message wants to or generate an AI picture/image/art or anything similar or wants an image/picture?. If the following prompt wants an image say yes. Prompt: ${prompt} Reply with yes or no.` }]);
  const isImageQuery = isImageResponse?.choices?.[0]?.message?.content?.startsWith('Yes');
  if (isImageQuery) {
    // DALL-E
    const createdImageResponse = await dallE(prompt);
    const url = createdImageResponse?.data?.[0]?.url;
    return url;
  } else {
    // GPT
    const chatCompletionResponse = await gpt(messages);
    if (chatCompletionResponse.error) throw new Error(chatCompletionResponse.error.message);
    return chatCompletionResponse?.choices?.[0]?.message?.content;
  }
}