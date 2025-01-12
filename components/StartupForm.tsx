'use client';

import React, {useActionState} from 'react';
import {Input} from './ui/input';
import {Textarea} from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import {Button} from './ui/button';
import {Send} from 'lucide-react';
import {formSchema} from '@/lib/validation';
import {z} from 'zod';

const StartupForm = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [pitch, setPitch] = React.useState<string>('');

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      console.log(formValues);

      //const result = await createIdea(prevState, formData, pitch);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;

        setErrors(errors as unknown as Record<string, string>);

        return {...prevState, error: 'Validation Error', status: 'error'};
      }
      return {...prevState, error: 'Something went wrong', status: 'error'};
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'initial',
  });

  return (
    <form action={formAction} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form_label'>
          Title
        </label>
        <Input
          id='title'
          name='title'
          type='text'
          required
          placeholder='Enter your title'
          className='startup-form_input'
        />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor='desciption' className='startup-form_label'>
          Description
        </label>
        <Textarea
          id='description'
          name='description'
          placeholder='Provide description of your idea'
          className='startup-form_textarea'
        />
        {errors.description && <p className='startup-form_error'>{errors.description}</p>}
      </div>
      <div>
        <label htmlFor='category' className='startup-form_label'>
          Category
        </label>
        <Input
          id='category'
          name='category'
          type='text'
          required
          placeholder='Enter your category (e.g. Technology, Business, etc.)'
          className='startup-form_input'
        />
        {errors.category && <p className='startup-form_error'>{errors.category}</p>}
      </div>
      <div>
        <label htmlFor='link' className='startup-form_label'>
          Image URL
        </label>
        <Input id='link' name='link' type='text' required placeholder='Image URL' className='startup-form_input' />
        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>
      <div data-color-mode='light'>
        <label htmlFor='pitch' className='startup-form_label'>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={300}
          style={{borderRadius: 20, overflow: 'hidden'}}
          textareaProps={{
            placeholder: "Desccribe your idea, your vision, and why it's important.",
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />
        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
      </div>
      <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Your Idea'}
        <Send className='size-6 ml-2' />
      </Button>
    </form>
  );
};

export default StartupForm;
