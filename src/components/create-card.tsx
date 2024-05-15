import { useEffect, useState } from 'react';

import { DialogClose, DialogContent, DialogFooter } from './ui/dialog';
import DateTimePicker from 'react-datetime-picker';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { CalendarIcon } from '@radix-ui/react-icons';
import { format, sub, subMinutes } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Textarea } from './ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { DefaultRemindMeTime } from '@/lib/constsnts';
import createCard from '@/app/actions/createCard';
import getLists from '@/app/actions/getLists';
import { useSearchParams } from 'next/navigation';
import { ListDef } from '@/app/db/schema';

function CreateCard({
  columnId,
  setOpen,
}: {
  columnId: string;
  setOpen: () => void;
}) {
  const form = useForm<{
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: number;
    category: string;
  }>({
    defaultValues: {
      name: '',
      description: '',
      dueDate: new Date(),
      reminderDate: 0,
    },
  });
  const params = useSearchParams();
  const [columns, setColumns] = useState<ListDef[] | undefined>(); //const boardId = params.boardId

  const { register, setValue, handleSubmit } = form;

  async function onSubmit(data: {
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: number;
    category: string;
  }) {
    const payload = {
      title: data.name,
      description: data.description,
      dueDate: data.dueDate,
      reminderDate: subMinutes(data.dueDate, Number(data.reminderDate)),
      listId: columnId,
    };

    const res = await createCard(payload);
    setOpen();
  }

  useEffect(() => {
    const fetchLists = async () => {
      const res = await getLists(params.get('boardId')!);
      setColumns(res?.data);
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
            <Label>Title</Label>
            <Input
              id='title'
              {...form.register('name')}
              placeholder='Enter a title'
            />
          </div>
          <div className='space-y-2'>
            <Label>Description</Label>
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
                <Select onValueChange={field.onChange} defaultValue={'0'}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='max-h-48 overflow-y-auto'>
                    {columns?.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.name}
                      </SelectItem>
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
              <Label>Change Due Date</Label>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DefaultRemindMeTime.map((item) => (
                        <SelectItem
                          key={item.value + 1}
                          value={String(item.value)}
                        >
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

export default CreateCard;
