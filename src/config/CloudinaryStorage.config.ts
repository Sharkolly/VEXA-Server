import { Request, Response, NextFunction } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import cloudinary from "./cloudinary.config";
import { UploadApiResponse } from "cloudinary";
export interface IProductRequestBody {
  name: string;
  description: string;
  images?: string[];
  video?: string | null;
}

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync("./temp")) {
      fs.mkdirSync("./temp");
    }
    cb(null, "temp/");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

const uploadFields = multer({
  storage,
  
}).fields([
  { name: "images", maxCount: 4 },
  { name: "video", maxCount: 1 },
]);

const deleteLocalFile = (filePath: string): void => {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`Failed to delete local temp file: ${filePath}`, err);
    }
  }
};

const uploadVideoToCloudinary = (
  filePath: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      filePath,
      {
        folder: "products/videos",
        resource_type: "video",
        
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(
            new Error("Cloudinary completed upload but returned no response."),
          );
        }
        resolve(result as UploadApiResponse);
      },
    );
  });
};

export const processMediaUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  uploadFields(req, res, async (err: any) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const imageFiles = files?.["images"] || [];
    const videoFile = files?.["video"] ? files["video"][0] : null;

    try {
      const imagePromises = imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products/images",
          resource_type: "image",
        });
        deleteLocalFile(file.path);
        return result.secure_url;
      });

      const imageUrls: string[] = await Promise.all(imagePromises);

      let videoUrl: string | null = null;

      if (videoFile) {
        const videoResult = await uploadVideoToCloudinary(videoFile.path);

        deleteLocalFile(videoFile.path);
        videoUrl = videoResult.secure_url;
      }

      req.body.images = imageUrls;
      req.body.video = videoUrl;

      next();
    } catch (uploadError: any) {
      imageFiles.forEach((file) => deleteLocalFile(file.path));
      if (videoFile) deleteLocalFile(videoFile.path);
      
      res.status(500).json({
        success: false,
        message: "Failed to upload media to Cloudinary",
        error: uploadError.message || uploadError,
      });
    }
  });
};
