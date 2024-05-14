import React from 'react';
import type { Card as CardType, ColumnProps, Columns } from '@/types/types';

import { DropArea } from '@/components/drop-area';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/card';
import { PlusIcon } from '@/components/icons/plus-icon';

export const Column = ({ title, id, cards, onDrop, index }: ColumnProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('id', index.toString())}
      className='bg-gray-800 max-h-[calc(100vh-8.2rem)]  rounded-lg shadow-lg p-4'
    >
      <div className='flex justify-between'>
        <h2 className='mb-3 text-xl'>{title}</h2>
        <PlusIcon className='cursor-pointer' />
      </div>
      <div className='flex flex-col'>
        <DropArea onDrop={() => onDrop(id, 0)} />
        <ScrollArea className='max-h-[calc(100vh-12.2rem)]  flex flex-col flex-grow flex-shrink  rounded-md overflow-x-hidden overflow-y-auto'>
          {cards.map((card, index) => (
            <React.Fragment key={card.id}>
              <Card {...card} />
              <DropArea onDrop={() => onDrop(id, index + 1)} />
            </React.Fragment>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
