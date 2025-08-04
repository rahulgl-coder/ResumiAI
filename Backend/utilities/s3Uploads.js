// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// require('dotenv').config();

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });





// function generateReadableFilename(originalName, name) {
//   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//   const cleanName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
//   const ext = path.extname(originalName);
//   return `resume_${cleanName}_${timestamp}${ext}`;
// }

// const uploadToS3 = async (fileBuffer, originalName, name) => {
//   const Key = generateReadableFilename(originalName, name);

//   const uploadParams = {
//     Bucket:process.env.AWS_BUCKET_NAME,
//     Key,
//     Body:fileBuffer,
//     ContentType: 'application/pdf',
//     ACL: 'public-read',
//   };

//   const command = new PutObjectCommand(uploadParams);

//   try {
//     await s3Client.send(command);

//     return {
//       Location: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`,
//       Key,
//     };
//   } catch (error) {
//     console.error('S3 upload error:', error);
//     throw error;
//   }
// };

// module.exports = { uploadToS3 };
