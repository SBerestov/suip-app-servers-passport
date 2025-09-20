import React from 'react';
import type { MaterialsItem } from '../../types';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { ViewItemModal } from '../Modals/ViewItemModal';

interface MaterialsItemProps {
  data: MaterialsItem;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: any) => Promise<void>;
}

export const MaterialsListItem: React.FC<MaterialsItemProps> = ({ data, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageUrl, setCurrentImageUrl] = React.useState(
    data.IMAGE_PATH ? `/api/${data.IMAGE_PATH}` : '/public/images/krisa.webp'
  );

  const handleImageChange = (newUrl: string | null) => {
    setCurrentImageUrl(newUrl || '/public/images/krisa.webp');
  };
  
  const scrollRef = useHorizontalScroll();

  return (
    <>
      <li 
        className="flex items-center min-w-0 bg-white rounded-xl box-border gap-2 p-2 cursor-pointer lg:gap-3 lg:px-4 lg:py-1.25"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={currentImageUrl} className="object-cover rounded-xl px-0 py-1.25 h-15 w-15 lg:h-22.5 lg:w-22.5" loading="lazy" />
        <div className="flex-1 min-w-0">
          <div ref={scrollRef} className="item-data grid grid-cols-[auto_auto] auto-cols-auto cursor-grab gap-x-2 gap-y-1 overflow-x pb-2.5 mb-[-10px] [scrollbar-width:none] transition-[overflow-x] duration-300 ease-in-out relative select-none overflow-hidden lg:pb-2 lg:mb-[-8px]">
            <div className="flex gap-2 whitespace-nowrap order-1">
              <strong className="text-[18px] sticky left-0 lg:text-2xl">
                {data.TYPE}
              </strong>
            </div>
            <div className="flex gap-1.75 text-sm whitespace-nowrap order-3 lg:text-base">
              <span className="bg-black text-white rounded-xl px-3 py-0.75 text-sm font-bold lg:text-base">
                {data.NAME}
              </span>
              <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold lg:text-base">
                {`Кол-во: 
                  ${data.QUANTITY}
                `}
              </span>
              <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold lg:text-base">
                {data.STORE_ADDRESS}
              </span>
              <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold lg:text-base">
                {data.SERIAL_NUMBER}
              </span>
              <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold lg:text-base">
                {data.PART_NUMBER}
              </span>
              <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold lg:text-base">
                {data.RECEIVE_DATE}
              </span>
            </div>
            <div className="flex gap-2 text-sm whitespace-nowrap pt-2.5 row-span-2 order-2 lg:text-base">
              <div className="flex items-center justify-between py-1.25 px-1.75 rounded-xl h-[40px] self-end gap-6 bg-[#FF7556] lg:h-[50px]">
                <span className="self-start font-bold leading-none lg:text-lg lg:font-semibold">Ряд</span>
                <span className="text-2xl self-end leading-5.5 font-bold lg:text-[28px]">{data.ROW}</span>
              </div>
              <div className="flex items-center justify-between py-1.25 px-1.75 rounded-xl h-[40px] self-end gap-6 bg-[#08F29B] lg:h-[50px]">
                <span className="self-start font-bold leading-none lg:text-lg lg:font-semibold">Полка</span>
                <span className="text-2xl self-end leading-5.5 font-bold lg:text-[28px]">{data.SHELF}</span>
              </div>
              <div className="flex items-center justify-between py-1.25 px-1.75 rounded-xl h-[40px] self-end gap-6 bg-[#3DADFF] lg:h-[50px]">
                <span className="self-start font-bold leading-none lg:text-lg lg:font-semibold">Конт.</span>
                <span className="text-2xl self-end leading-5.5 font-bold lg:text-[28px]">{data.CONTAINER}</span>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/alt-arrow-right.svg" loading="lazy" height={24} width={24} />
      </li>

      <ViewItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
        tableType="materials"
        imageUrl={currentImageUrl}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onImageChange={handleImageChange}
        title='Детали записи'
      />
    </>
  );
};