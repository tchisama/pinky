import openai from "../config/config.js";

export const generate = async ({ messages, functions }) => {
  const reqObj = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const response = await openai.chat.completions.create(reqObj);
  console.log(response.choices[0].message.content)
  return response.choices[0].message.content;
};
