import openai from "./chatgpt";

const query = async (prompt: string, id: string, model: string) => {
  const res = await openai.chat.completions
    .create({
      model, // Use the specified chat model, e.g., "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are ChatGPT, a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message.content)
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err?.message})`
    );

  return res;
};

export default query;
