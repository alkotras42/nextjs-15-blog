import IdeaCard from '@/components/IdeaCard';
import SearchForm from '@/components/SearchForm';

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: Date.now(),
      views: 30,
      author: {
        _id: 1,
        name: 'John Doe',
      },
      _id: 1,
      desciption: 'Test description',
      image:
        'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      category: 'Robots',
      title: 'Test robots title',
    },
  ];
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
