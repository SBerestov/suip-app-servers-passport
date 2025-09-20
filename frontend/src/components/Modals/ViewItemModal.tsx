import React from "react";
import { Modal } from "./Modal";
import { useNotifications } from "../../context/NotificationContext";
import { ImageUploadModal } from "./ImageUploadModal";

interface ViewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  tableType: string;
  imageUrl: string | null;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: any) => Promise<void>;
  onImageChange?: (newUrl: string | null) => void;
  title?: string;
}

export const ViewItemModal: React.FC<ViewItemModalProps> = ({
  isOpen,
  onClose,
  data,
  tableType,
  imageUrl,
  onDelete,
  onUpdate,
  onImageChange,
  title
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(data);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState<string | null>(imageUrl);

  const { showNotification } = useNotifications();

  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await onUpdate(data.ID, formData);
      showNotification(tableType, "update");
      setIsEditing(false);
    } catch (error: any) {
      alert("Ошибка редактирования записи: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить эту запись?")) {
      try {
        await onDelete(data.ID);
        showNotification(tableType, "delete");
        onClose();
      } catch (error: any) {
        alert("Ошибка удаления записи: " + error.message);
      }
    }
  };

  const renderFields = () => {
    if (!data) return null;

    return Object.entries(data)
      .filter(([key]) => key !== "IMAGE_PATH" && key !== "COMMENT" && key !== "ID")
      .map(([key, value]) => (
        <div key={key} className="flex items-center flex-wrap mb-4">
          <label className="basis-[150px] mr-5 text-sm text-[#515151]">
            {key}:
          </label>
          <input
            className="text-[16px] font-semibold border-0 pt-1.25 outline-none relative border-b-2 border-transparent hover:border-gray-300 focus:border-black focus:outline-none"
            type="text"
            onChange={(e) => handleInputChange(key, e.target.value)}
            value={String(formData[key] || '')}
          />
        </div>
      ));
  };

  const handleImageChange = (newUrl: string | null) => {
    setCurrentImage(newUrl);
    if (onImageChange) {
      onImageChange(newUrl);
    }
  };

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 max-h-75 overflow-y-auto overflow-x-hidden pr-2 mr-[-8px]">
        <div className="flex flex-col col-start-1 col-end-[-1] justify-center items-center gap-2">
          <img
            src={currentImage || "/images/krisa.webp"}
            id="currentImage"
            className="max-w-[300px] max-h-[300px] object-cover rounded-[20px] cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          />
          <button
            type="button"
            onClick={() => setIsImageModalOpen(true)}
            className="bg-[#0079FF] text-white cursor-pointer text-[16px] font-bold py-2.5 px-6.75 rounded-4xl border-0"
          >
            Изменить
          </button>
        </div>

        <ImageUploadModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          currentImageUrl={currentImage}
          tableType={tableType}
          entryId={data.ID}
          onImageChange={handleImageChange}
        />

        {renderFields()}
        <div className="col-start-1 col-end-[-1] md:col-span-2 lg:col-span-3">
          <label className="pb-1.25 basis-[150px] mr-5 text-sm text-[#515151]">
            COMMENT
          </label>
          <textarea
            onChange={(e) => handleInputChange("COMMENT", e.target.value)}
            value={formData.COMMENT}
            className="w-[100%] min-h-[100px] rounded-xl border-2 border-[#9f9f9f] py-3 px-4.5 text-[16px] font-semibold box-content font-sans"
          />
        </div>
      </div>
      <div className="flex justify-between gap-3 mt-5 md:justify-end md:gap-2">
        <button
          type="button"
          onClick={handleDelete}
          className="flex text-base font-bold w-full justify-center items-center py-3 px-6.75 rounded-4xl border-0 gap-2 bg-[#FF0000] text-white cursor-pointer md:w-auto hover:bg-[#FF4E4E]"
        >
          <img src="/images/delete.svg" height={24} width={24} />
          <span>Удалить</span>
        </button>
        {!isEditing ? (
          <button className="flex text-base font-bold w-full justify-center items-center py-3 px-6.75 rounded-4xl border-0 gap-2 bg-[#F0F0F0] text-[#c3c3c3] md:w-auto">
            <img src="/images/change-gray.svg" height={24} width={24} />
            <span>Изменить</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            className="flex text-base font-bold w-full justify-center items-center py-3 px-6.75 rounded-4xl border-0 gap-2 bg-black text-white cursor-pointer md:w-auto hover:bg-[#2f2f2f]"
          >
            <img src="/images/change-white.svg" height={24} width={24} />
            <span>Изменить</span>
          </button>
        )}
      </div>
    </Modal>
  );
};
