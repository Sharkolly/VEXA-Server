import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

//configure the cloudinary

const CLOUDNAME = process.env.CLOUDINARY_NAME
const APIKEY = process.env.CLOUDINARY_API_KEY
const APISECRET = process.env.CLOUDINARY_API_SECRET

 if (!CLOUDNAME || !APIKEY || !APISECRET  ) {
      throw new Error(" URL is not defined in environment variables");
    }

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




export default cloudinary ;
