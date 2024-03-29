import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const credentials = {
  accessKeyId: "QWftktT0VnFO0GCI",
  secretAccessKey: "15EFdoF8YyDvnw1ViEYw5qoTikzhFq4EqnwehUT8",
};

const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "eu-central-1",
});

// Function to get bucket location
export async function uploadFileToS3(key: string, body: any) {
  try {
    const uploadParams = {
      Bucket: "luminex", // Replace with your bucket name
      Key: key, // Specify the desired name for the file in the bucket
      Body: body, // Read the local file for upload
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);

    return response;
  } catch (err) {
    console.error("Error uploading file:", err);
    return null;
  }
}

export async function getObjectUrl(key: string) {
  try {
    const get_command = new GetObjectCommand({
      Bucket: "luminex",
      Key: key,
      ResponseContentDisposition: `attachment; filename=${key}`,
    });

    // Generate URL for the object
    const url = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });

    console.log("Object URL:", url);
    return url;
  } catch (err) {
    console.error("Error getting object URL:", err);
    return null;
  }
}

// Usage example: Call the function to get the URL of an object
