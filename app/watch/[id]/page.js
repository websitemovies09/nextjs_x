
import dynamic from 'next/dynamic'
const DynamicComponent  = dynamic(() => import('@/AllPage/Watching'))

export async function generateMetadata({ params }) {
  const id = params.id;
  const response = await fetch(`${process.env.NEXT_BASE_URL}/api/movies/${id}`);
  const movie = await response.json();
  if (movie) {
    return {
      title: movie.movies[0].title,
      openGraph: {
        images: [ movie.movies[0].thumbnail],
      },
    };
  }
  
}

function Page() {
  return ( <DynamicComponent /> );
}

export default Page;