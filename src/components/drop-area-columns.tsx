import { cn } from '@/lib/utils';
import { useState } from 'react';

type DropAreaProps = {
  handleDrop: () => void;
};

export const DropAreaColumn = ({ handleDrop }: DropAreaProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const showArea = () => {
    setIsVisible(true);
  };

  const hideArea = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        'relative w-2 transition-[padding,opacity] before:absolute before:inset-2 before:rounded-xl before:border-2 before:border-dashed before:border-gray-500 before:bg-gray-600 only:h-32 last:h-32',
        isVisible && 'py-12 opacity-100',
        !isVisible && 'opacity-0'
      )}
      onDrop={() => {
        handleDrop();
        hideArea();
      }}
      onDragOver={(ev) => ev.preventDefault()}
      onDragEnter={showArea}
      onDragLeave={hideArea}
    />
  );
};
