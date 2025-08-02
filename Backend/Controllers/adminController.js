
const SkillQuestionaire=require('../Models/questionaireSchema')


const addSkill = async (req, res) => {

  try {
    const newSkill = req.body.skill;
    const skill = await SkillQuestionaire.findOne({ skill: newSkill });
    if (skill) return res.status(409).json({ message: "Skill already present" });

    const saveSkill = await SkillQuestionaire.create({ skill: newSkill });
 

    res.status(201).json(saveSkill);
  } catch (error) {
    console.error("❌ Error in addSkill:", error); 
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSkill=async(req,res)=>{

try {
const skills = await SkillQuestionaire.find({}, { skill: 1, _id: 0 });
const skillNames = skills.map(item => item.skill);


return res.status(201).json(skillNames)
    
    
} catch (error) {
    
}


}

const addQuestion = async (req, res) => {
  try {
 
    
    const questionData = req.body;
    

    const { skill, ...question } = questionData;

    const skillDoc = await SkillQuestionaire.findOne({ skill });

    if (!skillDoc) {
      return res.status(404).json({ message: "Skill not found" });
    }

    
    skillDoc.questions.push(question);
    await skillDoc.save();

    res.status(200).json({ message: "Question added successfully", data: question });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};







module.exports={addSkill,getSkill,addQuestion}