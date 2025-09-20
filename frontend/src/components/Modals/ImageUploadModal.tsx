import React from "react";
import { Modal } from "./Modal";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl: string | null;
  tableType: string;
  entryId: number;
  onImageChange: (newUrl: string | null) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  tableType,
  entryId,
  onImageChange,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch(`/api/upload_image/${tableType}/${entryId}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      onImageChange(result.image_url);
      onClose();
    } else {
      alert("Ошибка загрузки изображения");
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/delete_image/${tableType}/${entryId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onImageChange(null);
      onClose();
    } else {
      alert("Ошибка удаления изображения");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
        }`}
        onClick={() => document.getElementById("fileInput")?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {selectedFile ? (
          <p className="text-sm text-gray-700">{selectedFile.name}</p>
        ) : (
          <p className="text-gray-500">Перетащите изображение сюда или кликните для выбора</p>
        )}
      </div>

      {currentImageUrl && !selectedFile && (
        <img
          src={currentImageUrl}
          alt="current"
          className="mt-4 max-h-48 mx-auto rounded-lg"
        />
      )}

      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="preview"
          className="mt-4 max-h-48 mx-auto rounded-lg"
        />
      )}

      <div className="flex justify-end gap-2 mt-5">
        <button
          type="button"
          onClick={handleDelete}
          className="flex text-base font-bold items-center py-3 px-6.75 rounded-4xl border-0 gap-2 bg-[#FF0000] text-white cursor-pointer hover:bg-[#FF4E4E]"
        >
          Удалить
        </button>
        <button
          type="button"
          onClick={handleUpload}
          className="font-base font-bold items-center py-3 px-6.75 rounded-[30px] border-0 gap-2 h-[48px] cursor-pointer bg-black text-white box-border hover:bg-gray-800"
        >
          Сохранить
        </button>
      </div>
    </Modal>
  );
};
