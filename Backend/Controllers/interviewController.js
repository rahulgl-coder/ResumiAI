

const OpenAI= require('openai') 




    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey:"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",
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000', // Optional
        'X-Title': 'MCQ Generator',              // Optional
      },
    });
    
 const mainHandler = async (req, res) => {
      try {
        const skills = ["JavaScript", "React", "Node.js"];

        

        const prompt=`Generate a total of 20 multiple-choice questions in a mixed order from the skills:${skills.join(", ")}.

Each question must be a JSON object with the following structure:
{
  "id": number,
  "question": string,
  "options": [string, string, string, string, string],
  "correctAnswer": number // index of the correct answer (0 to 4)
}

Return only a single valid JSON array containing 20 objects in total, randomly mixed from all skills. Do not include any comments, explanations, headings, markdown, or formatting. Just output the raw JSON array.

`
    const fetch=async()=>{

    
        const completion = await openai.chat.completions.create({
          model: 'mistralai/mistral-7b-instruct', // or 'openai/gpt-4o' if allowed
          messages: [{ role: 'user', content:prompt}],
        });
    
        const content = completion.choices[0].message.content;
// console.log(content,"????");

 return content
       
    }

   const content= await fetch()
   console.log(content);
   
   
   
        let parsed;
        try {
          // Step 1: Remove markdown wrappers if present
          let raw = content.replace(/```json|```/g, '').trim();
        
          // Step 2: Try to extract a valid JSON array using a forgiving regex
          const arrayMatch = raw.match(/\[\s*{[\s\S]*?}\s*]/);
          if (!arrayMatch) {
            throw new Error("No valid JSON array found in response.");
            
          }
        
          // Step 3: Attempt to parse
          parsed = JSON.parse(arrayMatch[0]);
        
          // Optional: Validate shape of each object
          const valid = parsed.every(
            q =>
              typeof q.id === 'number' &&
              typeof q.question === 'string' &&
              Array.isArray(q.options) &&
              q.options.length === 5 &&
              typeof q.correctAnswer === 'number'
          );
        
          if (!valid) {
            throw new Error("Invalid question format found in parsed array.");
          }
        
          return res.status(200).json({ data: parsed });
        } catch (err) {
          console.error("Manual cleaning failed:", err.message);
          return res.status(500).json({ error: 'Failed to clean and parse AI response.' });
        }
        
        
    
     
 
      } catch (error) {
        console.error('Error generating MCQs:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
      }
    };


    module.exports={mainHandler}