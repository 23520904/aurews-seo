"use client";

import { useState } from "react";
import { getCloudinarySignature } from "@/lib/actions/cloudinary";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultValue?: string;
}

export function ImageUpload({ onUpload, defaultValue = "" }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(defaultValue);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // 1. Get signature from server
      const { timestamp, signature, cloudName, apiKey } = await getCloudinarySignature();

      // 2. Upload directly to Cloudinary from client
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey!);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "aurews");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload(data.secure_url);
        console.log("Upload successful:", data.secure_url);
      } else {
        console.error("Cloudinary error:", data);
        alert(`Upload failed: ${data.error?.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Network error during upload. Please check your connection.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ 
        width: '100%', 
        aspectRatio: '16/9', 
        border: '2px dashed var(--wired-black)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#f8f8f8'
      }}>
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span className="wired-mono" style={{ fontSize: '11px', color: 'var(--caption-gray)' }}>
            {loading ? "UPLOADING..." : "NO IMAGE SELECTED"}
          </span>
        )}
      </div>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="image-upload-input"
      />
      <label 
        htmlFor="image-upload-input" 
        className="wired-button inverted" 
        style={{ textAlign: 'center', cursor: 'pointer', padding: '10px' }}
      >
        {loading ? "PROCESSING..." : "CHOOSE ARCHITECTURAL COVER"}
      </label>
    </div>
  );
}
