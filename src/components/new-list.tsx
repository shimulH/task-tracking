import React from 'react';
import type { ColumnProps } from '@/types/types';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@/components/icons/plus-icon';

export const NewColumn = ({
  title,
  addColumns,
}: {
  title: ColumnProps['title'];
  addColumns: () => void;
}) => {
  return (
    <div className='bg-gray-800 rounded-lg shadow-lg p-4'>
      <div className='flex flex-col'>
        <div className='cursor-grab rounded-lg bg-gray-700 p-4 shadow-md hover:bg-gray-600 transition-colors active:animate-pulse active:cursor-grabbing flex self-center'>
          <Button onClick={() => addColumns()}>Create New Column</Button>
        </div>
      </div>
    </div>
  );
};
