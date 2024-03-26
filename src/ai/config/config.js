import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "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",
});

export default openai;

