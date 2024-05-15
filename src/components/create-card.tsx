import { useEffect } from 'react';

import { DialogClose, DialogContent, DialogFooter } from './ui/dialog';
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
import { format, sub } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { DefaultRemindMeTime } from '@/lib/constsnts';
import createCard from '@/app/actions/createCard';

function CreateCard({ columnId }: { columnId: string }) {
  const form = useForm<{
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: number;
  }>({
    defaultValues: {
      name: '',
      description: '',
      dueDate: new Date(),
      reminderDate: 0,
    },
  });

  const { register, setValue, handleSubmit } = form;

  async function onSubmit(data: {
    name: string;
    description: string;
    data: Date;
    dueDate: Date;
    reminderDate: number;
  }) {
    console.log(
      data.dueDate,
      sub(data.dueDate, { minutes: data.reminderDate })
    );

    const payload = {
      title: data.name,
      description: data.description,
      dueDate: sub(data.dueDate, { minutes: data.reminderDate }),
      reminderDate: sub(data.dueDate, { minutes: data.reminderDate }),
      listId: columnId,
    };

    const res = await createCard(payload);

    console.log(res);
  }

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
              {...register('description')}
              placeholder='Enter a description'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date('1900-01-01')
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='reminderDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remind Me</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DefaultRemindMeTime.map((item) => (
                        <SelectItem value={item.value}>{item.text}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
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

export default CreateCard;

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
