import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage();

export async function uploadImage(file) {
  const bucketName = 'eu.artifacts.integral-hold-411309.appspot.com';
  const uniquePrefix = uuidv4();
  const fileName = `${uniquePrefix}-${file.originalname}`;

  // Uploads a local file to the bucket
  const [uploadedFile] = await storage.bucket(bucketName).upload(file.path, {
    destination: fileName,
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  // Make the uploaded file public
  await uploadedFile.makePublic();


  // Get the signed URL of the uploaded file
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;


  return publicUrl;
}