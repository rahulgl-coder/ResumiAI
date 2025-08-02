

const OpenAI= require('openai') 
const InterviewResult=require('../Models/interviewResult')
const Resume=require('../Models/resumeSchema');
const SkillQuestionaire = require("../Models/questionaireSchema");
require('dotenv').config








const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:process.env.OPEN_ROUTER_KEY ,
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

  const id=req.user.id
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

    let raw = completion.choices[0]?.message?.content || "";

    // ✅ Clean markdown/code block wrappers like ```json ... ```
    raw = raw.trim();
    if (raw.startsWith("```")) {
      raw = raw.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();
    }


    // ✅ Sometimes fancy quotes cause issues
    raw = raw.replace(/[“”‘’]/g, '"');

    const data = JSON.parse(raw);

    
    return res.status(201).json({questions:data});

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

const questionDatabase = async (req, res) => {
  try {
    const id = req.user.id;
    const skills = await getSkills(id);
     
    const questions = await getQuestionsDatabase(skills);
   
    

    return res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("Error in quest controller:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


const getQuestionsDatabase = async (skills) => {
  try {
    const normalizedSkills = skills
      .map(skill => {
        const clean = skill.trim().toLowerCase();
        return skillSynonyms[clean];
      })
      .filter(Boolean); 

    if (!normalizedSkills.length) {
      console.log("No valid normalized skills found");
      return [];
    }

    const docs = await SkillQuestionaire.find({
      skill: { $in: normalizedSkills }
    });

     const allQuestions = docs.flatMap(doc => doc.questions);

    if (allQuestions.length === 0) {
      console.log("No questions found for the provided skills");
      return [];
    }

    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());

    return shuffledQuestions.slice(0, 25);

  } catch (err) {
    console.error("Error in getQuestionsDatabase:", err);
    return [];
  }
};


 const skillSynonyms = {
      'node.js': 'Node',
      'node js': 'Node',
      'node': 'Node',
      'nodejs': 'Node',

      'js': 'javascript',
      'java script': 'javascript',
      'javascript': 'javascript',

      'reactjs': 'React',
      'react.js': 'React',
      'react': 'React',

      'mongo': 'MongoDB',
      'mongodb': 'MongoDB',

      'express.js': 'Express',
      'express': 'Express',

      'c plus plus': 'C++',
      'cpp': 'C++',

      'sql': 'SQL',
      'postman': 'Postman',
      'git': 'Git',
      'java': 'Java'
    };







    module.exports={mainHandler,saveResult,questionDatabase}
 