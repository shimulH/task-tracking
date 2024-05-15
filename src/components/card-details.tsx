import { CardDef, ListDef } from '@/app/db/schema';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import { Textarea } from './ui/textarea';
import { DefaultRemindMeTime } from '@/lib/constsnts';
import updateCard from '@/app/actions/updateCard.';
import { format, subMinutes } from 'date-fns';
import getLists from '@/app/actions/getLists';
import { useSearchParams } from 'next/navigation';

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
    category: string;
  }>({
    defaultValues: {
      name: '',
      description: '',
      dueDate: new Date(),
      reminderDate: new Date(),
    },
  });
  const params = useSearchParams();
  const [columns, setColumns] = useState<ListDef[] | undefined>();

  const { register, setValue, handleSubmit } = form;

  async function onSubmit(data: {
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: Date;
    category: string;
  }) {
    console.log(data);
    const payload = {
      id: card.id,
      title: data.name,
      description: data.description,
      dueDate: data.dueDate,
      reminderDate: card.reminderDate,
      listId: data.category,
    };
    const res = await updateCard(payload);

    console.log(res);
  }
  useEffect(() => {
    setValue('name', card.title);
    setValue('description', card.description);
    setValue('data', card.createdAt);
    setValue('dueDate', card.dueDate);
    setValue('reminderDate', card.reminderDate);
    setValue('category', card.listId ?? '');
  }, [card]);

  useEffect(() => {
    const fetchLists = async () => {
      const res = await getLists(params.get('boardId')!);
      setColumns(res?.data);
      console.log(res);
    };
    fetchLists();
  }, []);
  return (
    <DialogContent
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      className='sm:max-w-[625px]'
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
              {...register('description')}
              placeholder='Enter a description'
            />
          </div>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='max-h-48 overflow-y-auto'>
                    {columns?.map((column) => (
                      <SelectItem value={column.id}>{column.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-2 justify-between pl-4 pr-4 '>
            <div className='w-66'>
              <Label className='font-bold'>Due Date</Label>
              <div>{format(form.watch('dueDate'), 'yy/MM/dd: h:m:s')}</div>
            </div>
            <div className='w-[230px]'>
              <Label className='font-bold'>Remind me at</Label>
              <div>
                Remind me before
                {Number(form.watch('reminderDate')) > 0
                  ? DefaultRemindMeTime[0].text
                  : DefaultRemindMeTime[1].text}
              </div>
            </div>
          </div>
          <div className='flex gap-2 justify-between pl-4 pr-4  '>
            <div className='bg-white '>
              <Label htmlFor='date'>Change Due Date</Label>
              <input
                className='max-w-66 mt-2'
                id='date'
                type='datetime-local'
                {...register('dueDate', { valueAsDate: true })}
                min={Date.now()}
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
            </div>

            <FormField
              control={form.control}
              name='reminderDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remind Me</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={'0'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DefaultRemindMeTime.map((item) => (
                        <SelectItem value={String(item.value)}>
                          {item.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <div className='flex justify-between gap-3'>
              <Button type='submit'>Save changes</Button>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </Form>
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
