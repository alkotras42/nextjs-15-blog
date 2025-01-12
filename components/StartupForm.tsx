'use client';

import React from 'react';
import {Input} from './ui/input';
import {Textarea} from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import {Button} from './ui/button';
import {Send} from 'lucide-react';

const StartupForm = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [pitch, setPitch] = React.useState<string>('');

  const isPending = false;

  return (
    <form action={() => {}} className='startup-form'>
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
      <Button disabled={isPending} type='submit' className='startup-form_btn text-white'>
        {isPending ? 'Submitting...' : 'Submit your idea'}
        <Send className='size-6 ml-2' />
      </Button>
    </form>
  );
};

export default StartupForm;
