import { storage } from "utils/firebase";
import { ref, deleteObject } from "firebase/storage";
import { useState } from "react";

const useDeleteImage = () => {
  const [isPending, setIsPending] = useState(false)


  const deleteImage = async (image) => {
    if (!image.includes("firebase")) return
    setIsPending(true)
    console.log(image);
    console.log(isPending)
    // if (!selectedImage) throw new Error("no image provided")
    const imageRef = ref(storage, image)
    try {
      const response = await deleteObject(imageRef);
      console.log(response);
      console.log("Image Deleted");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  return { deleteImage, isPending }
}

export default useDeleteImage