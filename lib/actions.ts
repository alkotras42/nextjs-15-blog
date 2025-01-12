'use server';

import {auth} from '@/auth';
import {parseServerActionResponse} from './utils';
import slugify from 'slugify';
import {writeClient} from '@/sanity/lib/write-client';

export const createIdea = async (state: any, formData: FormData, pitch: string) => {
  const session = await auth();
  if (!session?.user)
    return parseServerActionResponse({status: 'error', message: 'You must be logged in to create an idea'});

  const {title, description, category, link} = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== 'pitch')
  );

  const slug = slugify(title as string, {lower: true, strict: true});

  try {
    const idea = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({_type: 'idea', ...idea});

    return parseServerActionResponse({error: '', status: 'success', id: result._id, ...result});
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({status: 'error', message: JSON.stringify(error)});
  }
};
