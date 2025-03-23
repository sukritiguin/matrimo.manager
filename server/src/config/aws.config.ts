import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { MultipartFile } from "@fastify/multipart";

dotenv.config();

export const s3 = new S3Client({
  region: "us-east-1",
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export const uploadFileInS3 = async (data: MultipartFile) => {
  try {
    // Convert Readable Stream to Buffer
    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      data.file.on("data", (chunk) => chunks.push(chunk));
      data.file.on("end", () => resolve(Buffer.concat(chunks)));
      data.file.on("error", reject);
    });

    const fileKey = `${Date.now()}-${data.filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.MINIO_BUCKET!,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: data.mimetype,
      ContentLength: fileBuffer.length,
    });

    await s3.send(command);

    const fileUrl = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET}/${fileKey}`;

    return {
      url: fileUrl,
      mimetype: data.mimetype,
      filename: data.filename,
      fileKey,
      size: fileBuffer.length,
    };
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw error;
  }
};

export const downloadFileFromS3 = async (fileKey: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.MINIO_BUCKET!,
      Key: fileKey,
    });

    const response = await s3.send(command);
    return response;
  } catch (error) {
    console.error("Error downloading file from S3", error);
    throw error;
  }
};

export const deleteFileFromS3 = async (fileKey: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.MINIO_BUCKET!,
      Key: fileKey,
    });

    await s3.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting file from S3", error);
    throw error;
  }
};
