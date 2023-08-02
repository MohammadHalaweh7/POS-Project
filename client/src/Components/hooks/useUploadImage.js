import { storage } from "utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";

const useUploadImage = () => {
  const [isPending, setIsPending] = useState(false);
  const [imageLinkUrl, setImageLinkUrl] = useState(null);

  const uploadImage = async (image) => {
    setIsPending(true);
    if (!image) return;

    const imageRef = ref(storage, `images/${image.name}-${v4()}`);
    try {
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      setImageLinkUrl(downloadURL);
      setIsPending(false);
      console.log("Download URL:", downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageLinkUrl(null);
      setIsPending(false);
    }
  };

  return { uploadImage, imageLinkUrl, isPending };
};

export default useUploadImage;