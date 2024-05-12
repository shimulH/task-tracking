'use client';

import { testAction } from '@/app/actions/text';
import { currentUser } from '@clerk/nextjs/server';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QY0XF2BLo7p
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { CardContent, Card } from '@/components/ui/card';
import Test from '@/components/test';
import Dropzone from '@/components/dropzone';
import { useState } from 'react';

const data = {
  col: [
    {
      name: 'col 1',
      cards: [
        {
          name: 'card 1',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
        {
          name: 'card 2',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
        {
          name: 'card 3',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
      ],
    },
    {
      name: 'col 2',
      cards: [
        {
          name: 'card 1',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
        {
          name: 'card 2',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
        {
          name: 'card 3',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
      ],
    },
    {
      name: 'col 2',
      cards: [
        {
          name: 'Implement new feature',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
        {
          name: 'card 2',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
        {
          name: 'card 3',
          date: 'May 1, 2023',
          description:
            'Add a new feature to the app to improve user experience.',
        },
      ],
    },
  ],
};

function Component() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className='flex h-full w-full flex-col bg-gray-100 mt-10 rounded-sm'>
      <div className='flex h-full w-full flex-col gap-6 p-6 md:flex-row'>
        {data?.col.map((colum: any, i) => (
          <div key={i + 1} className='flex flex-1 flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>{colum.name}</h2>
              <Button size='icon' variant='ghost'>
                <PlusIcon className='h-5 w-5' />
                <span className='sr-only'>Add new</span>
              </Button>
            </div>
            <Dropzone />

            <div className='flex flex-col gap-1 overflow-y-auto'>
              {console.log('ccc', colum.cards[0].name)}

              {colum.cards.map((card: any, i: number) => (
                <>
                  <div
                    key={i + 1}
                    className='bg-white p-3 rounded-lg shadow-sm mb-1'
                    draggable={true}
                  >
                    <h3 className='text-sm font-semibold mb-1'>Task 1</h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      This is a description for task 1.
                    </p>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      May 1, 2023
                    </div>
                  </div>
                  <Dropzone />
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  );
}
export default function Page() {
  //const user = await currentUser();
  //const res = await testAction();
  //console.log('----', res);
  return (
    <section className=''>
      <Component />
    </section>
  );
}
