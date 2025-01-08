import React from 'react';
import Ping from './Ping';
import {client} from '@/sanity/lib/client';
import {IDEA_VIEWS_QUERY} from '@/sanity/lib/queries';

const formatViews = (views: number): string => {
  return views === 1 ? 'view' : 'views';
};

// TODO: Update views when user views the page

const View = async ({id}: {id: string}) => {
  const {views} = await client.withConfig({useCdn: false}).fetch(IDEA_VIEWS_QUERY, {id});

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
