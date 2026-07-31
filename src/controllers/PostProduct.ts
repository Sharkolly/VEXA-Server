// import { Request, Response, NextFunction } from "express";
// import { uploadToCloudinary } from "../middlewares/fileUpload.middleware";

// export const AddProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { name, price, category, description } = req.body;
//   const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//   const imageFiles = files["images"] || [];
//   const videoFile = files["video"] ? files["video"][0] : null;
//   try {
//     const imageUrlPromises = imageFiles.map((file) =>
//       uploadToCloudinary(file.buffer, "image"),
//     );
//     const uploadedImages = await Promise.all(imageUrlPromises);

//     let uploadedVideoUrl: string | null = null;
//     if (videoFile) {
//       uploadedVideoUrl = await uploadToCloudinary(videoFile.buffer, "video");
//     }

//     console.log("Uploaded Images:", uploadedImages);
//     console.log("Uploaded Video:", uploadedVideoUrl);

//     // Save uploadedImages (array of strings) and uploadedVideoUrl to MongoDB here...

//     res
//       .status(201)
//       .json({ success: true, images: uploadedImages, video: uploadedVideoUrl });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     res.status(500).json({ message: "Media streaming sync failed." });
//   }
// };


import { Request, Response } from "express";
// import { IProductRequestBody } from "../";

export const AddProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, images, video } = req.body;

    // console.log("Product Name:", name);
    // console.log("Cloudinary Images Array:", images); // Typed as string[] | undefined
    console.log("Cloudinary Video URL:", video);     // Typed as string | null | undefined


    // console.log(req.body);
    // Example DB operation (Prisma, Mongoose, TypeORM, etc.):
    // const newProduct = await Product.create({ name, description, images, video });

    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: { name, description, images, video },
    });
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ success: false, message: error.message });
  }
};