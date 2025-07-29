

const OpenAI= require('openai') 
const InterviewResult=require('../Models/interviewResult')
const Resume=require('../Models/resumeSchema')




//     const openai = new OpenAI({
//       baseURL: 'https://openrouter.ai/api/v1',
//       apiKey:"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",
//       defaultHeaders: {
//         'HTTP-Referer': 'http://localhost:3000', 
//         'X-Title': 'MCQ Generator',              
//       },
//     });
    
//  const mainHandler = async (req, res) => {
//       try {
//         const skills = ["JavaScript", "React", "Node.js"];

        


//     const fetch=async()=>{

    
//         const completion = await openai.chat.completions.create({
//           model: 'mistralai/mistral-7b-instruct', // or 'openai/gpt-4o' if allowed
//           messages: [{ role: 'user', content:prompt}],
//         });
    
//         const content = completion.choices[0].message.content;
//         console.log(content);
        


//  return content
       
//     }




const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
});

const getSkills=async(id)=>{

  let skills=[]

  try {

    const resume=await Resume.findOne({userId:id})
     skills=resume.skills
    
  } catch (error) {
    console.log(error);
    
  }

  return skills;
}


 

 const mainHandler=async(req,res)=>{

  const{id}=req.params
  const skills= await getSkills(id)
  
  

  const prompt=`Generate a total of 20 multiple-choice questions in a mixed order from the skills:${skills.join(", ")}.

 Each question must be a JSON object with the following structure:
 {
  "id": number,
  "question": string,
   "options": [string, string, string, string, string],
   "correctAnswer": number // index of the correct answer (0 to 4)
 }

 Return only a single valid JSON array containing 20 objects in total, randomly mixed from all skills. Do not include any comments, explanations, headings, markdown, or formatting. Just output the raw JSON array.`

 try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;

   
    const data = JSON.parse(raw);
   
    
    return res.status(201).json(data);

  } catch (error) {
    console.error("Error fetching MCQs:", error.response?.data || error.message);
    return null;
  }

}

const saveResult = async (req, res) => {
  try {
    const result = req.body;

     if (!result || !result.userId || !result.totalQuestions || result.score === undefined) {
      return res.status(400).json({ message: "Invalid result data" });
    }

    await InterviewResult.deleteMany({ userId: result.userId });

  
    const savedResult = await InterviewResult.create(result);

    return res.status(201).json({
      message: "Interview result saved successfully",
      data: savedResult,
    });

  } catch (error) {
    console.error("Error saving result:", error.message);
    return res.status(500).json({
      message: "Failed to save result",
      error: error.message,
    });
  }
};



    module.exports={mainHandler,saveResult}
 