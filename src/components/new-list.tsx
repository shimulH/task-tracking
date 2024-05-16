import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import createList from '@/app/actions/createList';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';

export const NewColumn = () => {
  const params = useSearchParams();

  const [isCreateForm, setCreateForm] = useState(false);

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });
  const submitForm = async ({ name }: { name: string }) => {
    const payload = {
      name,
      boardId: params.get('boardId')!,
      position: '1',
    };
    const res = await createList(payload);
    setCreateForm(false);
  };

  return (
    <div className='bg-gray-800 rounded-lg shadow-lg p-4'>
      <div className='flex flex-col'>
        <div className='cursor-grab rounded-lg bg-gray-700 p-4 shadow-md hover:bg-gray-600 transition-colors active:animate-pulse active:cursor-grabbing flex self-center'>
          {!isCreateForm && (
            <Button onClick={() => setCreateForm(true)}>
              Create New Column
            </Button>
          )}
          {isCreateForm && (
            <form onSubmit={form.handleSubmit(submitForm)}>
              <div className='flex flex-col gap-4'>
                <Input {...form.register('name')} />
                <Button type='submit'>Create</Button>
                <Button onClick={() => setCreateForm(false)}>close</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
