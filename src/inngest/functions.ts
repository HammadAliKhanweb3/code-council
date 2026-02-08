import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { inngest } from "./client";
import { generateText } from "ai";
import { log } from "console";

export const nonBlocking = inngest.createFunction(
  { id: "non-blocking" },
  { event: "demo/generate" },

  async ({  step }) => {

      console.log("Before Run");
      await step.run("generate-text", async ()=>{
        console.log("Inside Run");
        
        
        const apiKey = process.env.OPENROUTER_API_KEY!;
        console.log("apikey:",apiKey);
        
         const openrouter = createOpenRouter({
      apiKey,  
    });
  
    const response = await generateText({
      model: openrouter.chat('arcee-ai/trinity-large-preview:free'),
      prompt: 'What is Artificial Intelligence?',
    });
    console.log(response.text);
    

    return response.text;
    });

  },
);