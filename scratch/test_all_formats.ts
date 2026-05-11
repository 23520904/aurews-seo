import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "docpflk0p",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testAll() {
  const images = [
    "c:/Users/dinhl/Desktop/aurews/image1.webp",
    "c:/Users/dinhl/Desktop/aurews/image2.jpg",
    "c:/Users/dinhl/Desktop/aurews/image3.avif"
  ];

  for (const img of images) {
    try {
      console.log(`Testing upload for: ${img}`);
      const result = await cloudinary.uploader.upload(img, {
        folder: "aurews_production"
      });
      console.log(`Success! URL: ${result.secure_url}`);
    } catch (error) {
      console.error(`Failed to upload ${img}:`, error);
    }
  }
}

testAll();
