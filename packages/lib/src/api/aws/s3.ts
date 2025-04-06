import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Readable } from "stream";
import type { Express } from "express";

dotenv.config();

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export const uploadMulterFileToS3 = async (data: Express.Multer.File) => {
  const buffer = data.buffer;

  const key = `${Date.now()}-${data.filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.MINIO_BUCKET!,
    Key: key,
    Body: buffer,
    ContentType: data.mimetype,
  });

  await s3.send(command);

  return {
    url: `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET}/${key}`,
    fileKey: key,
    originalName: data.filename,
    mimetype: data.mimetype,
    size: buffer.length,
  };
};

export const downloadFileFromS3 = async (fileKey: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.MINIO_BUCKET!,
    Key: fileKey,
  });

  const response = await s3.send(command);
  return response.Body as Readable;
};

export const deleteFileFromS3 = async (fileKey: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.MINIO_BUCKET!,
    Key: fileKey,
  });

  await s3.send(command);
  return true;
};

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};
