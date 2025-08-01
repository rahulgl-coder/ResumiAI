
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Resume=require('../Models/resumeSchema')
const {uploadToS3}=require('../utilities/s3Uploads')
const supabase =require('../utilities/supabaseClient')


 const resumeParser=async (req, res) => {
  try {
    const file = req.file;
  
    

    if (!file) return res.status(400).send('No file uploaded');

    let text = '';

    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer);
  
      
      text = data.text;
   
    } else if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    } else {
      return res.status(400).send('Unsupported file type');
    }

    // Simple detail extraction (name/email regex, etc.)
    const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0];
    const phone = text.match(/\+?\d[\d\s().-]{8,}/)?.[0];
 const name=extractName(text)
 const data=extractDetails(text)

  data.name=name
 data.email=email
 data.phone=phone

 
 

 
    
    
    

   return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error parsing resume');
  }
}


const extractName = (text) => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines.slice(0, 5)) {
    if (line.length < 5 || line.length > 50) continue;
    if (/\d/.test(line)) continue;
    if (line.match(/[@:]/)) continue;
    if (/^[A-Z][a-z]+(\s[A-Z][a-z]+){1,2}$/.test(line)) {
      return line;
    }
  }

  return lines[0]; // fallback
};


const knownSkills = [
  "JavaScript",
  "Node.js",
  "React",
  "MongoDB",
  "Express",
  "Python",
  "AWS",
  "Java",
  "C++",
  "SQL",
  "Git",
  "Docker",
  "Postman",
  "AWS",
  "HandleBars",
  "SocketIO"
];

function extractSkills(text) {
  const lowerText = text.toLowerCase();
  return knownSkills.filter(skill =>
    lowerText.includes(skill.toLowerCase())
  );
}


const knownQualifications = [
  "Bachelor of Technology",
  "Bachelor of Commerce",
  "B.Tech",
  "Master of Technology",
  "M.Tech",
  "Bachelor of Engineering",
  "B.E",
  "Master of Business Administration",
  "MBA",
  "B.Sc",
  "M.Sc",
  "Ph.D",
  "Diploma",
  "Higher Secondary",
  "12th",
  "10th"
];

function extractQualifications(text) {
  const lowerText = text.toLowerCase();
  return knownQualifications.filter(q =>
    lowerText.includes(q.toLowerCase())
  );
}


function extractDOB(text) {

  const dobRegex = /(date of birth|dob)[:\s]*([\d]{1,2}[\/\-\.][\d]{1,2}[\/\-\.][\d]{2,4})/i;
  const match = text.match(dobRegex);
  return match ? match[2] : null;
}



const extractDetails = (text) => {
  return {
    skills: extractSkills(text),
    qualifications: extractQualifications(text),
    dob: extractDOB(text),

  };
};





const saveResume = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.data);
    const {
      userId,
      phone,
      dob,
      skills,
      qualifications,
      passoutYear,
      preferredLocation,
      currentLocation,
      workModes,
      name,
      email,
      replace 
    } = parsedData;
 
    

    const file = req.file;
  
if (
      !userId || !phone || !dob || !skills?.length || !qualifications ||
      !passoutYear || !preferredLocation?.length || !currentLocation || !workModes?.length || !file
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingResume = await Resume.findOne({ userId });

   
    

    if (existingResume && !replace) {
      return res.status(200).json({ 
        message: "Resume already exists", 
        exists: true 
      });
    }

    if (existingResume && replace) {
      await Resume.findOneAndDelete({ userId });
    }

    // const s3Response = await uploadToS3(file.buffer, file.originalname, name);
    // const resumeURL = s3Response.Location;

     const fileName = `resumes/${userId}-${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("resume") // your bucket name
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return res.status(500).json({ message: "Resume upload failed" });
    }

    const { data: publicUrlData } = supabase.storage
      .from("resume")
      .getPublicUrl(fileName);

    const resumeURL = publicUrlData.publicUrl;
  

    const newResume = await Resume.create({
      userId,
      name,
      email,
      phone,
      dob,
      skills,
      qualifications,
      passoutYear,
      preferredLocation,
      currentLocation,
      workModes,
      resume: resumeURL
    });

    return res.status(201).json({ message: "Resume saved successfully", resume: newResume });
  } catch (error) {
    console.error("Save Resume Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};






module.exports={resumeParser,saveResume}
