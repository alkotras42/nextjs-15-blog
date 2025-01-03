import SearchForm from '../../components/SearchForm';

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
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
    </>
  );
}
