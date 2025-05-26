"use client";

import { useState, useRef, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "../ui/button";

const ProfileImageUploader = ({
  setProfileImageFile,
  profileImageUrl,
}: {
  setProfileImageFile: (file: File | null) => void;
  profileImageUrl: string;
}) => {
  const [image, setImage] = useState<string | null>(profileImageUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImage(profileImageUrl);
  }, [profileImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setProfileImageFile(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 relative">
      {/* Image Preview */}
      <div
        className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-sm">
            Click or Drop Image
          </div>
        )}
      </div>
      {image && (
        <Button
          onClick={handleDeleteImage}
          className="col-span-10 bg-red-600 hover:bg-red-600 rounded-full px-2 absolute top-0 right-0"
          type="button"
        >
          <DeleteForeverIcon />
        </Button>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUploader;
