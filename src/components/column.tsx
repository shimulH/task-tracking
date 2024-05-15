import React, { useEffect, useState } from 'react';
import { ColumnProps } from '@/types/types';
import { DropArea } from '@/components/drop-area';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useBoardStore } from '@/store/board-store';
import CardMod from './card-mod';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import CreateCard from './create-card';
import deleteList from '@/app/actions/deleteList';
import { TrashIcon } from '@radix-ui/react-icons';
import getCardIndex from '@/app/actions/getCardIndex';

export const Column = ({ title, id, cards, onDrop, index }: ColumnProps) => {
  const setDraggingCard = useBoardStore((state) => state.setDraggingColumn);
  const [open, setOpen] = useState(false);

  const deleteColumn = async () => {
    await deleteList({ id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('id', index.toString());
          setDraggingCard(String(index));
        }}
        className='bg-gray-800 max-h-[calc(100vh-8.2rem)] w-96  rounded-lg shadow-lg p-4'
      >
        <div className='flex justify-between'>
          <h2 className='mb-3 text-xl'>{title}</h2>
          <div className='flex gap-4'>
            <DialogTrigger>
              <PlusIcon
                onClick={() => setOpen(true)}
                className='cursor-pointer'
              />
            </DialogTrigger>
            <TrashIcon
              className='cursor-pointer h-8 w-7 '
              onClick={() => deleteColumn()}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <DropArea onDrop={() => onDrop(id, 0, index)} />
          <ScrollArea className='max-h-[calc(100vh-12.2rem)]  flex flex-col flex-grow flex-shrink  rounded-md overflow-x-hidden overflow-y-auto'>
            {cards?.map((card, cardIndex) => (
              <React.Fragment key={card?.id}>
                <CardMod
                  card={card}
                  cardIndex={cardIndex}
                  columnIndex={index}
                />
                <DropArea onDrop={() => onDrop(id, cardIndex + 1, index)} />
              </React.Fragment>
            ))}
          </ScrollArea>
        </div>
      </div>
      <CreateCard columnId={id} setOpen={() => setOpen(false)} />
    </Dialog>
  );
};
