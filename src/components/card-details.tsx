import { CardDef } from '@/app/db/schema';
import React, { useEffect } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';
import { Form, useForm } from 'react-hook-form';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Textarea } from './ui/textarea';

function CardDetails({
  openDetails,
  card,
  setOpen,
}: {
  openDetails: boolean;
  card: CardDef;
  setOpen: () => void;
}) {
  const form = useForm<{
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: Date;
  }>({
    defaultValues: {
      name: '',
      description: '',
      dueDate: new Date(),
      reminderDate: new Date(),
    },
  });

  const { register, setValue, handleSubmit } = form;

  function onSubmit(data: {
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: Date;
  }) {
    console.log(data);
  }
  useEffect(() => {
    setValue('name', card.title);
    setValue('description', card.description);
    setValue('data', card.createdAt);
    setValue('dueDate', card.dueDate);
    setValue('reminderDate', card.reminderDate);
  }, [card]);
  return (
    <DialogContent
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      className='sm:max-w-[425px]'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              {...form.register('name')}
              placeholder='Enter a title'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              className='min-h-[100px]'
              id='description'
              placeholder='Enter a description'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='due-date'>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className='w-full justify-start text-left font-normal'
                    variant='outline'
                  >
                    <CalendarDaysIcon className='mr-1 h-4 w-4 -translate-x-1' />
                    Select a date
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='start' className='w-auto p-0'>
                  <Calendar initialFocus mode='single' />
                </PopoverContent>
              </Popover>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='reminder-date'>Reminder Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className='w-full justify-start text-left font-normal'
                    variant='outline'
                  >
                    <CalendarDaysIcon className='mr-1 h-4 w-4 -translate-x-1' />
                    Select a date
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='start' className='w-auto p-0'>
                  <Calendar initialFocus mode='single' />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
          <Button type='submit'>Create Task</Button>
        </form>
      </Form>

      <DialogClose asChild>
        <Button type='button' variant='secondary'>
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  );
}

export default CardDetails;

function CalendarDaysIcon(props) {
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
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
      <path d='M8 14h.01' />
      <path d='M12 14h.01' />
      <path d='M16 14h.01' />
      <path d='M8 18h.01' />
      <path d='M12 18h.01' />
      <path d='M16 18h.01' />
    </svg>
  );
}
