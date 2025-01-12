import React from 'react';
import Ping from './Ping';
import {client} from '@/sanity/lib/client';
import {IDEA_VIEWS_QUERY} from '@/sanity/lib/queries';
import {writeClient} from '@/sanity/lib/write-client';
import {after} from 'next/server';

const formatViews = (views: number): string => {
  return views === 1 ? 'view' : 'views';
};

const View = async ({id}: {id: string}) => {
  const {views} = await client.withConfig({useCdn: false}).fetch(IDEA_VIEWS_QUERY, {id});

  // Increments the view count for the idea with the specified `id` by 1 and commits the change to the Sanity database.
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({views: views + 1})
        .commit()
  );

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>
      <p className='view-text'>
        <span className='font-black'>
          {views} {formatViews(views)}
        </span>
      </p>
    </div>
  );
};

export default View;
