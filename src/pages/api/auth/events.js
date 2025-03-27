import { connectToDatabase } from '../../../lib/mongodb';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Parse form data
    const data = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Handle file upload
    let logoUrl = '';
    if (files.file) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const fileExtension = path.extname(files.file.originalFilename);
      const newFilename = `${Date.now()}${fileExtension}`;
      const newPath = path.join(uploadDir, newFilename);

      await fs.rename(files.file.filepath, newPath);
      logoUrl = `/uploads/${newFilename}`;
    }

    // Prepare event data
    const eventData = {
      opportunityType: fields.opportunityType,
      opportunitySubType: fields.opportunitySubType,
      visibility: fields.visibility,
      opportunityTitle: fields.opportunityTitle,
      organization: fields.organization,
      websiteUrl: fields.websiteUrl,
      festival: fields.festival,
      startDate: new Date(fields.startDate),
      endDate: new Date(fields.endDate),
      categories: JSON.parse(fields.categories),
      skills: JSON.parse(fields.skills),
      aboutOpportunity: fields.aboutOpportunity,
      opportunityLogo: logoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert into MongoDB
    const result = await db.collection('events').insertOne(eventData);
    
    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: {
        eventId: result.insertedId,
        logoUrl: logoUrl
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(400).json({
      success: false,
      message: 'Error creating event',
      error: error.message
    });
  }
}