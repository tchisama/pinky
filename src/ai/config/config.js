import OpenAI from "openai";
import "dotenv/config";
import {  getData } from "../../core/agents/settings/funs.js"


const data = await getData()
const openai = new OpenAI({
  apiKey:data["openai-key"],
});

export default openai;
