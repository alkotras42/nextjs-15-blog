import IdeaCard from '@/components/IdeaCard';
import SearchForm from '@/components/SearchForm';
import {client} from '@/sanity/lib/client';
import {IDEA_QUERY} from '@/sanity/lib/queries';

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(IDEA_QUERY);

  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          Post Your Ideas, <br /> Share Your Thoughts
        </h1>
        <p className='sub-heading !max-w-3xl'>
          Submit your startup ideas, share your thoughts, and connect with the world.
        </p>
        <SearchForm query={query}></SearchForm>
      </section>
      <section className='section_container'>
        <p className='text-30-semibold'>{query ? `Search results for "${query}"` : 'Latest Ideas'}</p>
        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post, index) => <IdeaCard key={post._id} post={post} />)
          ) : (
            <p className='no-results'>No posts found</p>
          )}
        </ul>
      </section>
    </>
  );
}
