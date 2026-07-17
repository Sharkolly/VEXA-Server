import cloudinary from "../config/cloudinary.config";


export const uploadToCloudinary = (fileBuffer: Buffer, resourceType: 'image' | 'video' | 'auto'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'urbancube-products',
        resource_type: resourceType, // Tells Cloudinary exactly how to process it
      },
      (error, result) => {
        if (error) return reject(error);
        if (result) return resolve(result.secure_url);
        reject(new Error("Upload failed with no result profile returned."));
      }
    );
    
    uploadStream.end(fileBuffer);
  });
};