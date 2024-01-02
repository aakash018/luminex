import { s3Client } from "server";

// Create a local .txt file with conte
// createLocalTxtFile();
// Upload the created file to S3
// uploadFileToS3();

async function getObjectUrl(bucketName, objectKey) {
  try {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    // Generate URL for the object
    const objectUrl = s3Client.getSignedUrl("getObject", {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 3600, // URL expiration time in seconds (adjust as needed)
    });

    console.log("Object URL:", objectUrl);
    return objectUrl;
  } catch (err) {
    console.error("Error getting object URL:", err);
    return null;
  }
}
