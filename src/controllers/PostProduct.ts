import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../middlewares/fileUpload.middleware";

export const AddProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price, category, description } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const imageFiles = files["images"] || [];
  const videoFile = files["video"] ? files["video"][0] : null;
  try {
    const imageUrlPromises = imageFiles.map((file) =>
      uploadToCloudinary(file.buffer, "image"),
    );
    const uploadedImages = await Promise.all(imageUrlPromises);

    let uploadedVideoUrl: string | null = null;
    if (videoFile) {
      uploadedVideoUrl = await uploadToCloudinary(videoFile.buffer, "video");
    }

    console.log("Uploaded Images:", uploadedImages);
    console.log("Uploaded Video:", uploadedVideoUrl);

    // Save uploadedImages (array of strings) and uploadedVideoUrl to MongoDB here...

    res
      .status(201)
      .json({ success: true, images: uploadedImages, video: uploadedVideoUrl });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Media streaming sync failed." });
  }
};
