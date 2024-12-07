import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/StartupCard'

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
	const query = (await searchParams).query

	const posts = [
		{_id:1,
			_createdAt:new Date(),
			views:55,
			author:{_id:1,name:"Donald Kaczka"},
			description:"This is a description",
			title:"This is a title",
			category:"This is a category",
			image:"https://picsum.photos/600/600",
		},
		{_id:2,
			_createdAt:new Date(),
			views:55,
			author:{_id:1,name:"Donald Kaczka"},
			description:"This is a description",
			title:"This is a title",
			category:"This is a category",
			image:"https://picsum.photos/600/600",
		},
		{_id:3,
			_createdAt:new Date(),
			views:55,
			author:{_id:1,name:"Donald Kaczka"},
			description:"This is a description",
			title:"This is a title",
			category:"This is a category",
			image:"https://picsum.photos/600/600",
		},
	]

	return (
		<>
			<section className='pink_container'>
				<h1 className='heading'>Pitch Your Startup</h1>
				<p className='sub-heading !max-w-3xl'>Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competition</p>
				<SearchForm query={query} />
			</section>

			<section className='section_container'>
				<p className='text-30-semibold'>{query ? `Showing results for ${query}` : 'All Startups'}</p>

				<ul className='mt-7 card_grid'>
  {posts?.length > 0 ? (
    posts.map((post: StartupCardType) => (
      <StartupCard key={post?._id} post={post} />
    ))
  ) : (
    <p className='no-result'>No results found</p>
  )}
</ul>

			</section>
		</>
	)
}
