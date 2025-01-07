import IdeaCard, {TIdeaCard} from '@/components/IdeaCard';
import SearchForm from '@/components/SearchForm';
import {sanityFetch, SanityLive} from '@/sanity/lib/live';
import {IDEA_QUERY} from '@/sanity/lib/queries';

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;

  const {data: posts} = await sanityFetch({query: IDEA_QUERY});

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
            posts.map((post: TIdeaCard, index: number) => <IdeaCard key={post._id} post={post} />)
          ) : (
            <p className='no-results'>No posts found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
