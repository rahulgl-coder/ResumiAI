
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');


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
    const name = text.split('\n')[0]; // naive guess

    res.json({ name, email, phone, rawText: text });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error parsing resume');
  }
}

module.exports=resumeParser