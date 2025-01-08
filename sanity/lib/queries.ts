import {defineQuery} from 'next-sanity';

export const IDEA_QUERY =
  defineQuery(`*[_type == "idea" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  author->{
  _id,
    name,
    username,
    image
  },
  views,
  description,
  category,
  image,
}`);

export const IDEA_BY_ID_QUERY = defineQuery(`*[_type == "idea" && _id == $id][0]{
  _id,
  _createdAt,
  title,
  slug,
  author->{
    _id,
    name,
    username,
    image,
    bio,
  },
  views,
  description,
  category,
  image,
  pitch,
}`);

export const IDEA_VIEWS_QUERY = defineQuery(`*[_type == "idea" && _id == $id][0]{
  _id,
  views
}`);
