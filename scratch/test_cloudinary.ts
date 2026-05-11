import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  try {
    console.log("Testing with Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    const result = await cloudinary.uploader.upload("c:/Users/dinhl/Desktop/aurews/image2.jpg", {
      folder: "test_aurews"
    });
    console.log("Success! Uploaded to:", result.secure_url);
  } catch (error) {
    console.error("Upload failed with current config:", error);
    
    console.log("\nTrying with docpflk0p...");
    cloudinary.config({
      cloud_name: "docpflk0p",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    try {
      const result = await cloudinary.uploader.upload("c:/Users/dinhl/Desktop/aurews/image2.jpg", {
        folder: "test_aurews"
      });
      console.log("Success with docpflk0p! Uploaded to:", result.secure_url);
    } catch (err) {
      console.error("Failed again with docpflk0p:", err);
    }
  }
}

testUpload();
