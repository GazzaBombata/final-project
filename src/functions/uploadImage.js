import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import stream from 'stream';

const storage = new Storage();

export async function uploadImage(file) {
  const bucketName = 'eu.artifacts.integral-hold-411309.appspot.com';
  const uniquePrefix = uuidv4();
  const fileName = `${uniquePrefix}-${file.originalname}`;

  // Create a new stream.PassThrough instance
  const passThrough = new stream.PassThrough();

  // Upload the file to the bucket
  const fileUpload = storage.bucket(bucketName).file(fileName);

  const writeStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
      cacheControl: 'public, max-age=31536000',
    },
  });

  passThrough.end(file.buffer);
  passThrough.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);
  });

  // Make the uploaded file public
  await fileUpload.makePublic();

  // Get the signed URL of the uploaded file
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;


  return publicUrl;
}