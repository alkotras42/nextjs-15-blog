import {defineField, defineType} from 'sanity';

export const idea = defineType({
  name: 'idea',
  title: 'Idea',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) => Rule.min(1).max(20).required().error('Category is required'),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
    }),
  ],
});
