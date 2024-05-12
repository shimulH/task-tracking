'use client';
import React, { useState } from 'react';

type Props = {
  onUpload: (files: File[]) => void;
};

const Dropzone = () => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleDragEnter = () => {
    setIsDragActive(true);
    console.log('enter');
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    //onUpload(files);
  };

  return (
    <div
      className={
        isDragActive
          ? ' bg-white p-3 rounded-lg shadow-sm mb-4 border-sky-400 opacity-100 transition-all ease-in-out delay-75'
          : 'opacity-0'
      }
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      /*    onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop} */
    >
      Drop here
    </div>
  );
};

export default Dropzone;
