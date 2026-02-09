  import { createOpenRouter } from "@openrouter/ai-sdk-provider";
  import { inngest } from "./client";
  import { generateText } from "ai";
  import { log } from "console";
  import { firecrawl } from "@/lib/fire-crawl";


  const urlRegex = /https?:\/\/[^\s]+/g


  export const nonBlocking = inngest.createFunction(
    { id: "non-blocking" },
    { event: "demo/generate" },

    async ({  event,step }) => {

      const {prompt} = event.data as {prompt:string}

      const urls =await step.run("extract-url", async ()=>{
        return prompt.match(urlRegex) ?? []
      }) as string[]


      const scrapedContent = await step.run("scrape-content", async ()=>{
      
        const results = await Promise.all(urls.map(async (url)=>{
        
          const scraped = await firecrawl.scrape(
            url,
            {formats:["markdown"]}
          )
            return scraped.markdown ?? null
        }))
        return results.filter(Boolean).join("\n\n")
  })

      const finalPrompt = scrapedContent? `Context:\n${scrapedContent}\n\nPrompt:${prompt}` : prompt

      
        await step.run("generate-text", async ()=>{
        const apiKey = process.env.OPENROUTER_API_KEY!;
          
          
          const openrouter = createOpenRouter({
        apiKey,  
      });
    
      const response = await generateText({
        model: openrouter.chat('arcee-ai/trinity-large-preview:free'),
        prompt: finalPrompt,  
      });
    
      

      return response.text;
      });

    },
  );