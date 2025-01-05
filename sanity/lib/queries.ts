import { defineQuery } from 'next-sanity';

export const IDEA_QUERY = defineQuery(`*[_type == "idea" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  author->{
    name,
    username,
    image
  },
  views,
  category,
  image,
  pitch,
}`);