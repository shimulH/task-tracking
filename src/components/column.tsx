import React, { useEffect, useState } from 'react';
import { ColumnProps } from '@/types/types';

import { DropArea } from '@/components/drop-area';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useBoardStore } from '@/store/board-store';
import { flushSync } from 'react-dom';
import { CardDef } from '@/app/db/schema';
import CardMod from './card-mod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import CardDetails from './card-details';
import CreateCard from './create-card';

export const Column = ({ title, id, cards, onDrop, index }: ColumnProps) => {
  const setDraggingCard = useBoardStore((state) => state.setDraggingColumn);

  return (
    <Dialog>
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('id', index.toString());
          setDraggingCard(String(index));
        }}
        className='bg-gray-800 max-h-[calc(100vh-8.2rem)]  rounded-lg shadow-lg p-4'
      >
        <div className='flex justify-between'>
          <h2 className='mb-3 text-xl'>{title}</h2>
          <DialogTrigger>
            <PlusIcon className='cursor-pointer' />
          </DialogTrigger>
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
      <CreateCard columnId={id} />
    </Dialog>
  );
};
