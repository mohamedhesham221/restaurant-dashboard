import { useState } from "react";

export function useUploadImageImgbb(apiKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        return data.data.url; 
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { uploadImage, loading, error, setError };
}
